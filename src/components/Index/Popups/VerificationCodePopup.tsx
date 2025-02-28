import { useEffect, useRef, useState } from "react";
import loginImg from "../../../assets/images/loginImg.png"
import { IoCloseOutline } from 'react-icons/io5';
import { closeVerificationCodePopup, openVerificationCodePopup } from "../../../redux/VerificationCodeSlice";
import { openLoginPopup } from "../../../redux/loginSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store'; // Import RootState
import { validateOTPThunk, setPhoneNumber } from "../../../redux/cartSlice";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { fetchLogin } from "../../../api/ApiConfig";

// Define the Zod schema
const otpSchema = zod.object({
    otp: zod.array(zod.string().length(1, "Each OTP field must contain exactly 1 digit").regex(/^\d$/, "OTP must be a number")).length(4, "OTP must be 4 digits"),
});

type OtpFormValues = zod.infer<typeof otpSchema>;

export const VerificationCodePopup = () => {

    const [loginSuccess, setLoginSuccess] = useState(false); // Track login success state
    const [timer, setTimer] = useState(60);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form has been submitted
    // const [otpError, setOtpError] = useState<string | null>(null);
    // const dispatch = useDispatch();
    const dispatch: AppDispatch = useDispatch();

    // Get necessary states from Redux store
    const { otpError, phoneNumber } = useSelector((state: RootState) => state.cart);

    const handleOpenLoginPopup = () => {
        dispatch(closeVerificationCodePopup()); // Close current popup
        dispatch(openLoginPopup());             // Open login popup
    };

    const handleCloseVerificationCodePopup = () => {
        dispatch(closeVerificationCodePopup()); // Close verification code popup
    };

    // Set up React Hook Form with zod validation
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: ['', '', '', ''] }  // Initial values for OTP fields
    });

    // Watch the OTP input values dynamically
    const otpFields = watch('otp', ['', '', '', '']); // Default values for OTP fields
    const otpValue = otpFields.join(''); // Combine OTP fields into a single string

    // Refs for OTP input fields
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
        // Sync Redux state with sessionStorage for phone number
        const storedPhoneNumber = sessionStorage.getItem('EnteredPhoneNumber');
        if (storedPhoneNumber) {
            dispatch(setPhoneNumber(storedPhoneNumber)); // Set phone number in Redux
        }
    }, [dispatch]);

    const handleResendOtp = async () => {
        try {
            // Call the API to request OTP
            const otpResponse = await fetchLogin(Number(phoneNumber));
            console.log("OTP Response:", otpResponse);
            setIsResendEnabled(false);
            setTimer(60);
            dispatch(openVerificationCodePopup());
        } catch (error: any) {
            // setOtpError(error.message || "Failed to send OTP.");
        } finally {
            // setOtpError(null);
            sessionStorage.setItem('EnteredPhoneNumber', String(phoneNumber));
            console.log("Phone number stored in session:", String(phoneNumber));
        }
    };

    const onSubmit = (data: OtpFormValues) => {
        setIsSubmitted(true); // Set submitted state to true
        const userOtp = data.otp.join(''); // Combine OTP digits into a string
        if (phoneNumber && userOtp) {
            dispatch(validateOTPThunk({ phoneNumber: phoneNumber, otp: userOtp }))
                .then((result) => {
                    if (result.meta.requestStatus === 'fulfilled') {
                        setLoginSuccess(true);  // Mark as success on successful login
                        dispatch(closeVerificationCodePopup()); // Close verificationCode popup
                    }
                })
                .catch(() => {
                    console.error("OTP validation failed");
                });
        } else {
            console.error("Phone number or OTP is missing");
        }
    };

    // Handle OTP input changes and move focus
    // const handleOtpInputChange = (value: string, index: number) => {
    //     setValue(`otp.${index}`, value); // Set value in React Hook Form

    //     // Focus on the next input field if input is not empty
    //     if (value && index < otpFields.length - 1) {
    //         otpRefs.current[index + 1]?.focus();
    //     }

    //     // Move to the previous input if backspace is pressed and current field is empty
    //     if (!value && index > 0) {
    //         otpRefs.current[index - 1]?.focus();
    //     }
    // };

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 py-5">
                <div className="relative w-6/12 bg-mindfulWhite rounded-lg px-8 py-8 max-2xl:overflow-y-auto max-2xl:h-[95%] max-xl:w-[800px] max-lg:w-[700px] max-md:w-[90%] max-md:p-5">

                    {/* Close Button */}
                    <div>
                        <button onClick={handleCloseVerificationCodePopup} className="absolute top-3 right-3">
                            <IoCloseOutline className="text-[28px] text-mindfulBlack hover:text-main" />
                        </button>
                    </div>

                    {/* Popup Title */}
                    <div className="text-center">
                        <h2 className="text-4xl text-mindfulBlack pb-5 cursor-pointer">Login / Register</h2>
                    </div>

                    <div className="flex items-center space-x-10">

                        <div className="mb-8">
                            <div className="flex items-center space-x-10 max-md:space-x-0">
                                {/* Login Image */}
                                <div>
                                    <img src={loginImg} alt="Haircut-image" className="w-full h-[300px]  max-md:hidden" />
                                </div>

                                <div>
                                    <div>
                                        <div>
                                            <p onClick={handleOpenLoginPopup}
                                                className="text-sm text-mindfulBlack font-semibold underline mb-5 cursor-pointer">Edit Number</p>
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
                                                <p className="text-lg text-gray-500 my-2">Didn't receive OTP? {" "}
                                                    {isResendEnabled ? (
                                                        <span className="underline cursor-pointer hover:no-underline" onClick={handleResendOtp}>Resend</span>
                                                    ) : (
                                                        <span className="text-red-500">Resend in {timer} seconds</span>
                                                    )}
                                                </p>
                                            </div>

                                            {/* Display validation and server errors only after form submission */}
                                            {isSubmitted && errors.otp && <p className="text-red-500 text-sm">{errors.otp[0]?.message || "Please enter a valid 4-digit OTP."}</p>}
                                            {isSubmitted && otpError && <p className="text-red-500 text-sm">{otpError}</p>}

                                            <div>
                                                <button
                                                    type="submit"
                                                    className={`w-full rounded-[7px] text-lg text-mindfulWhite px-4 py-2.5 
                                                        ${loginSuccess ? "bg-green-500" : "bg-main"}`}
                                                >
                                                    {loginSuccess ? "Logged In Successfully" : "Login"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sign In or Register */}
                    <div>
                        <p className="text-lg text-mindfulBlack font-bold">Cancellation &amp; reschedule policy</p>
                        <p className="text-md text-mindfulBlack">Free cancellations/reschedules if done more than 3 hrs before the service or if a professional isn't assigned. A fee will be charged otherwise.</p>
                    </div>

                    {/* Learn More */}
                    <div className="mt-8">
                        <p className="text-mindfulBlack underline cursor-pointer">Learn More</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
