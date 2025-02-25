import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store'; // Import RootState
import { validateOTPThunk, setPhoneNumber } from '../../redux/cartSlice';
import { fetchLogin } from '../../api/ApiConfig';

interface VerificationCodeProps {
    editNumber: () => void;
}

// Define Zod schema for OTP validation
const otpSchema = zod.object({
    otp: zod.array(zod.string().min(1, "Required").regex(/^[0-9]$/, "Must be a digit")).length(4, "Must be 4 digits"),
});

type OtpFormValues = zod.infer<typeof otpSchema>;

export const VerificationCode: React.FC<VerificationCodeProps> = ({ editNumber }) => {
    // const dispatch = useDispatch();
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();
    const [timer, setTimer] = useState(60);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const { token, phoneNumber } = useSelector((state: RootState) => state.cart);
    const [otpError, setOtpError] = useState<string | null>(null);
    // Initialize useForm with the zod schema
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
    });

    // Watch the OTP input values dynamically
    const otpFields = watch('otp', ['', '', '', '']); // Default values for OTP fields

    // Combine the OTP fields into one value
    const otpValue = otpFields.join('');

    // Initialize otpRefs as an array of refs for OTP input fields
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsResendEnabled(true); // Enable resend after 60 seconds
        }
    }, [timer]);

    useEffect(() => {
        const storedPhoneNumber = sessionStorage.getItem('EnteredPhoneNumber');
        if (storedPhoneNumber) {
            dispatch(setPhoneNumber(storedPhoneNumber)); // Sync Redux state with sessionStorage
        }
    }, [dispatch]);

    // Handle OTP submission
    const onSubmit = async (data: OtpFormValues) => {
        const userOtp = data.otp.join(''); // Combine OTP digits into a string
        if (!phoneNumber || !userOtp) {
            setOtpError("Phone number or OTP is missing");
            return;
        }
        try {
            const response = await dispatch(validateOTPThunk({ phoneNumber, otp: userOtp })).unwrap(); // Use unwrap() to handle errors properly
            console.log("OTP Verified Successfully", response);
        } catch (error: any) {
            setOtpError(error || "Invalid OTP. Please try again.");
        }
    };

    // Getting the stored provider_id from sessionStorage
    const sessionProviderID = sessionStorage.getItem('selectedProviderId');
    console.log("Selected Provider ID from session storage", sessionProviderID);

    useEffect(() => {
        if (token) {
            navigate('/DateTime'); // Redirect after successful OTP validation
            // navigate('/'); // Redirect after successful OTP validation
            // navigate(`/Overview?provider_id=${sessionProviderID}`);
        }
    }, [token, navigate]);

    // Handle OTP input changes and move focus
    // const handleOtpInputChange = (value: string, index: number) => {
    //     setValue(`otp.${index}`, value); // Set value in React Hook Form
    //     // setOtpError(null); // Clear any existing error

    //     // Focus on the next input field
    //     if (value && index < otpFields.length - 1) {
    //         otpRefs.current[index + 1]?.focus();
    //     }

    //     // Move to the previous input if backspace is pressed and current field is empty
    //     if (!value && index > 0) {
    //         otpRefs.current[index - 1]?.focus();
    //     }
    // };

    const handleResendOtp = async () => {
        try {
            // Call the API to request OTP
            const otpResponse = await fetchLogin(Number(phoneNumber));
            console.log("OTP Response:", otpResponse);
            setIsResendEnabled(false);
            setTimer(60);
        } catch (error: any) {
            setOtpError(error.message || "Failed to send OTP.");
            console.error(error.message || "Failed to send OTP.");
        } finally {
            setOtpError(null);
            sessionStorage.setItem('EnteredPhoneNumber', String(phoneNumber));
            console.log("Phone number stored in session:", String(phoneNumber));
        }
    };

    return (
        <div>
            <div>
                <p onClick={editNumber} className="text-sm text-mindfulBlack font-semibold underline mb-5 cursor-pointer">Edit Number</p>
            </div>
            <div>
                <h5 className="text-lg font-semibold mb-2">Verification Code</h5>
                <p className="text-md text-mindfulBlack">We have sent you a OTP on +91 {phoneNumber}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5 space-x-3">
                    {otpFields.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            {...register(`otp.${index}`)}
                            className="w-10 h-10 border-2 border-mindfulLightGrey rounded-[6px] px-3 py-3 text-center focus:outline-none"
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // Allow only numbers

                                // Set the value properly
                                setValue(`otp.${index}`, value);

                                // Move focus to the next input if user types a digit
                                if (value && index < otpFields.length - 1) {
                                    otpRefs.current[index + 1]?.focus();
                                }
                            }}
                            onKeyDown={(e) => {
                                if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                    e.preventDefault(); // Prevent non-numeric input
                                }

                                if (e.key === "Backspace") {
                                    setValue(`otp.${index}`, ""); // Clear the current input

                                    // Move to previous input if it's empty
                                    if (index > 0) {
                                        otpRefs.current[index - 1]?.focus();
                                    }
                                }
                            }}
                            value={otpFields[index]} // Ensure reactivity
                            ref={(el) => (otpRefs.current[index] = el)}
                        />
                    ))}
                </div>

                <div className="text-sm text-gray-500 my-2">
                    Current OTP : {otpValue || "No OTP entered yet"}
                </div>

                <div className="pb-5">
                    <p className="text-lg text-gray-500 my-2 max-sm:text-base">Didn't receive OTP? {" "}
                        {isResendEnabled ? (
                            <span className="underline cursor-pointer hover:no-underline" onClick={handleResendOtp}>Resend</span>
                        ) : (
                            <span className="text-red-500">Resend in {timer} seconds</span>
                        )}
                    </p>
                </div>

                {errors.otp && <p className="text-sm text-mindfulWhite">
                    {errors.otp?.message || "Please enter a valid 4-digit OTP."}
                </p>
                }
                {otpError && <p className="text-sm text-mindfulWhite">{otpError}</p>}

                <div>
                    <button type="submit" className="w-full bg-main rounded-[7px] text-lg text-mindfulWhite px-4 py-2.5">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};
