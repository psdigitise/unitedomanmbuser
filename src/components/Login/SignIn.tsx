import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { fetchLogin } from "../../api/ApiConfig";

interface SignInProps {
    // onGetOTP: (email: string, password: string) => void;
    onGetOTP: () => void;
    onRegister: () => void;
}

// Zod validation schema for the form
const signInSchema = zod.object({
    phoneNumber: zod.string().min(10, { message: "Phone number must be 10 digits" }).max(10, { message: "Phone number must be 10 digits" }),
    receiveUpdates: zod.boolean().optional(),
});

type SignInFormValues = zod.infer<typeof signInSchema>;

export const SignIn: React.FC<SignInProps> = ({ onGetOTP, onRegister }) => {

    // State declarations for OTP error
    const [otpError, setOtpError] = useState<string>("");

    // Initialize useForm with the zod resolver
    const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    });

    // Watch the phone number input dynamically
    const phoneNumber = watch("phoneNumber");

    // Handle OTP request submission
    const onSubmit = async (data: SignInFormValues) => {
        const { phoneNumber } = data;
        try {
            const otpResponse = await fetchLogin(Number(phoneNumber));  // Call the API to fetch OTP
            console.log(otpResponse);  // Log the response for debugging
            onGetOTP();  // Call the onGetOTP function on success
        } catch (error: any) {
            setOtpError(error.message || "Failed to send OTP.");
            setError("phoneNumber", { message: error.message || "Invalid phone number" });
        }

        finally {
            // Clear the OTP error state after submission
            setOtpError("");

            // Store the phone number in sessionStorage
            sessionStorage.setItem('EnteredPhoneNumber', String(phoneNumber));  // Use setItem to store the value
            console.log("Entered Phone Number data log:", String(phoneNumber));

        }
    };




    // Handle OTP request
    // const handleGetOtp = async () => {
    //     if (validatePhoneNumber(phoneNumber)) {
    //         try {
    //             const data = await fetchLogin(Number(phoneNumber));  // Send the validated number
    //             if (phoneNumber.length == 10) {
    //                 setIsOtpValid(true);  // Set OTP validity to true
    //                 onGetOTP();  // Call the onGetOTP function
    //             }
    //             console.log(data);  // OTP data from API
    //         } catch (error: any) {
    //             setOtpError(error.message || "Failed to send OTP.");
    //         }
    //     } else {
    //         setOtpError("Please enter a valid 10-digit phone number.");
    //     }
    // };

    return (
        <div>
            {/* Sign In Content */}
            <div>
                <p className="text-lg text-mindfulBlack mb-3">Please sign in to continue.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Input Field for Mobile Number */}
                <div className="mb-3">
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        {...register("phoneNumber")}  // Register phone number input
                        className="w-96 border-[1px] border-mindfulGreyTypeThree rounded-[6px] px-3 py-3 focus-within:outline-none"
                    />
                    {/* Show error if the phone number is invalid */}
                    {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                    {/* OTP Error */}
                    {otpError && <p className="text-red-500">{otpError}</p>}
                </div>

                {/* Show dynamically updated phone number */}
                <div className="text-sm text-gray-500 mb-2">
                    Current phone number : {phoneNumber || "No phone number entered yet"}
                </div>

                {/* Checkbox for receiving updates */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register("receiveUpdates")}  // Register checkbox
                        id="receiveUpdated"
                        className="mr-2 focus-within:outline-none"
                    />
                    <label htmlFor="receiveUpdated" className="text-xs text-mindfulGreyTertiary">
                        Receive updates and communications via WhatsApp and call. Uncheck if you do not wish to receive WhatsApp messages.
                    </label>
                </div>

                {/* Button to trigger OTP request */}
                <div className="my-8">
                    <button
                        type="submit"  // Submit the form to trigger OTP
                        className="w-8/12 bg-main rounded-[7px] text-lg text-mindfulWhite px-4 py-2.5">
                        Get OTP
                    </button>
                </div>
            </form>

            {/* Register Now */}
            <div>
                <p className="text-md text-mindfulGreyTertiary">New to Mindful Beauty ? {" "}
                    <span onClick={onRegister} className="text-mindfulBlack font-bold underline cursor-pointer">Register Now</span>
                </p>
            </div>
        </div>
    )
}
