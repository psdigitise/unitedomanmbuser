import { IoCloseOutline } from "react-icons/io5"
import loginImg from "../../../assets/images/loginImg.png"
import { useDispatch } from 'react-redux';
import { closeLoginPopup } from '../../../redux/loginSlice';
import { openRegisterPopup } from '../../../redux/registerSlice';
import { openVerificationCodePopup } from '../../../redux/VerificationCodeSlice';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState } from "react";
import { fetchLogin } from "../../../api/ApiConfig";
// import { RootState } from "../../../redux/store";
// import { VerificationCodePopup } from "./VerificationCodePopup";

// Define the Zod schema for validating phone number
const phoneNumberSchema = zod.object({
    phoneNumber: zod.string()
        .min(10, { message: "Phone number must be 10 digits" })
        .max(10, { message: "Phone number must be 10 digits" })
        .regex(/^\d{10}$/, { message: "Invalid phone number format" }), // Must be 10 digits
    receiveUpdates: zod.boolean().optional(), // Optional field for receiving updates
});

type PhoneNumberFormValues = zod.infer<typeof phoneNumberSchema>;

export const LoginPopup = () => {

    // Error state to handle OTP submission errors
    const [otpError, setOtpError] = useState<string | null>(null);  // State for OTP error handling

    const dispatch = useDispatch();

    const handleCloseLoginPopup = () => {
        dispatch(closeLoginPopup());
    };

    const handleOpenRegisterPopup = () => {
        dispatch(closeLoginPopup());   // Close Login Popup
        dispatch(openRegisterPopup()); // Open Register Popup
    };

    // const showVerificationCodePopup = useSelector((state: RootState) => state.verificationCodePopup.showVerificationCodePopup);

    // const handleOpenVerificationCodePopup = () => {
    //     dispatch(closeLoginPopup());
    //     dispatch(openVerificationCodePopup());
    // }

    // Set up React Hook Form with Zod validation
    const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<PhoneNumberFormValues>({
        resolver: zodResolver(phoneNumberSchema), // Use Zod schema for validation
        defaultValues: {
            phoneNumber: "", // Initialize phone number field
            receiveUpdates: true, // Default: receive updates
        },
    });

    // Watch the phone number input dynamically
    const phoneNumber = watch("phoneNumber");

    // The function handling OTP request submission
    const onSubmit = async (data: PhoneNumberFormValues) => {
        const { phoneNumber } = data;  // Extract phone number from form data

        try {
            // Call the API to request OTP
            const otpResponse = await fetchLogin(Number(phoneNumber));
            // Log response for debugging (this can be removed later)
            console.log("OTP Response:", otpResponse);

            dispatch(closeLoginPopup());
            dispatch(openVerificationCodePopup());

            // If the OTP request is successful, trigger the verification code popup
            // if (otpResponse.success) { // Assuming `otpResponse.success` is true on success
            //     dispatch(closeLoginPopup()); // Close login popup
            //     dispatch(openVerificationCodePopup()); // Open OTP popup
            // } else {
            //     throw new Error(otpResponse.message || "Failed to send OTP");
            // }

        } catch (error: any) {
            // Handle errors, log them and set form-level errors using setError from React Hook Form
            // console.error("Error in OTP request:", error);
            setOtpError(error.message || "Failed to send OTP.");
            setError("phoneNumber", { message: error.message || "Invalid phone number" });
        } finally {
            // Always clear the OTP error state after submission attempt
            setOtpError(null);

            // Store the phone number in sessionStorage for future use (in case of successful OTP request)
            sessionStorage.setItem('EnteredPhoneNumber', String(phoneNumber));
            console.log("Phone number stored in session:", String(phoneNumber));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative w-6/12 bg-mindfulWhite rounded-lg px-8 py-8">

                {/* Close Button */}
                <div>
                    <button onClick={handleCloseLoginPopup} className="absolute top-3 right-3">
                        <IoCloseOutline className="text-[28px] text-mindfulBlack hover:text-main" />
                    </button>
                </div>

                {/* Popup Title */}
                <div className="text-center">
                    <h2 className="text-4xl text-mindfulBlack pb-5 cursor-pointer">Login</h2>
                </div>

                <div className="flex items-center space-x-10">

                    {/* Sign In Content */}
                    <div className="">

                        <div className="mb-8">
                            <div className="flex items-center space-x-10">
                                {/* Login Image */}
                                <div>
                                    <img src={loginImg} alt="Haircut-image" className="w-full" />
                                </div>
                                <div>
                                    <div>
                                        <div>
                                            <p className="text-lg text-mindfulBlack mb-3">Please sign in to continue.</p>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <input
                                                    type="tel"
                                                    placeholder="Mobile Number"
                                                    {...register("phoneNumber")}
                                                    className="w-96 border-[1px] border-mindfulGreyTypeThree rounded-[6px] px-3 py-3 focus-within:outline-none" />

                                                {/* Display phone number validation error */}
                                                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                                                {/* OTP Error */}
                                                {otpError && <p className="text-red-500">{otpError}</p>}
                                            </div>

                                            <div className="text-sm text-gray-500 mb-2">
                                                Current phone number : {phoneNumber || "No phone number entered yet"}
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="receiveUpdated"
                                                    {...register("receiveUpdates")}
                                                    className="mr-2 focus-within:outline-none" />
                                                <label htmlFor="receiveUpdated" className="text-xs text-mindfulGreyTertiary">
                                                    Receive updates and communications via WhatsApp and call. Uncheck if you do not wish to receive WhatsApp messages.
                                                </label>
                                            </div>

                                            <div className="my-8">
                                                <button
                                                    // onClick={handleOpenVerificationCodePopup}
                                                    type="submit"
                                                    className="w-8/12 bg-main rounded-[7px] text-lg text-mindfulWhite px-4 py-2.5">
                                                    Get OTP
                                                </button>
                                            </div>
                                        </form>
                                        <div>
                                            <p className="text-md text-mindfulGreyTertiary">New to Mindful Beauty? {" "}
                                                <span onClick={handleOpenRegisterPopup} className="text-mindfulBlack font-bold underline cursor-pointer">Register Now</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sign In or Register */}
                        <div>
                            <p className="text-lg text-mindfulBlack font-bold">Cancellation &amp; reschedule policy</p>
                            <p className="text-md text-mindfulBlack">Free cancellations/reschedules if done more than 3 hrs before the service or if a professional isn’t assigned. A fee will be charged otherwise.</p>
                        </div>

                        {/* Learn More */}
                        <div className="mt-8">
                            <p className="text-mindfulBlack underline cursor-pointer">Learn More</p>
                        </div>

                    </div>

                </div>
            </div>
            {/* {showVerificationCodePopup && <VerificationCodePopup />} */}
        </div>
    )
}
