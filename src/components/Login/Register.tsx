import React, { useState } from 'react';
import { loginRegister } from '../../api/ApiConfig';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

interface RegisterProps {
    onLogin: () => void;
    // onGetOTP: () => void;
}

// Define Zod schema for validation
const registerSchema = zod.object({
    name: zod.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: zod.string().email({ message: "Invalid email address" }),
    phone: zod.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
    receiveUpdates: zod.boolean().optional()
});


type RegisterFormData = zod.infer<typeof registerSchema>;

export const Register: React.FC<RegisterProps> = ({ onLogin }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const [registrationData, setRegistrationData] = useState<any>(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state for success

    // React Hook Form setup with Zod validation
    const { register, handleSubmit, formState: { errors }, setError: setFormError } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });



    // Function to handle form submission
    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        setError(null); // Clear previous error
        setRegistrationSuccess(false); // Reset success state on each form submit

        try {
            // Call the API to check registration
            const registrationData = await loginRegister(data.name, data.email, parseInt(data.phone));

            if (registrationData.status === "success") {
                // Handle successful registration
                setRegistrationSuccess(true); // Set success state to true
                console.log("Registration successful", registrationData);

                // Set timeout to navigate to login page after 3 seconds
                setTimeout(() => {
                    // navigate("/login"); // Redirect to login page
                    onLogin();
                }, 3000); // Wait for 3 seconds before redirecting

                return;
            }

            if (registrationData.status === "failure") {
                // If there's a failure, check if it's related to existing email or phone
                if (registrationData.errors.email) {
                    setFormError("email", {
                        type: "manual",
                        message: registrationData.errors.email || "Email already exists",
                    });
                }
                if (registrationData.errors.phone) {
                    setFormError("phone", {
                        type: "manual",
                        message: registrationData.errors.phone || "Phone number already exists",
                    });
                }
            }

        } catch (error: any) {
            setError(error.message || "Failed to register.");
        } finally {
            setLoading(false);
        }
    };

    // if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div>
                {/* Sign In Content */}
                <div>
                    <p className="text-lg text-mindfulBlack mb-3">Please sign up to continue.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Input Field */}
                    <div className="space-y-3 mb-3">

                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                id=""
                                placeholder="Name"
                                // className="w-96 border-[1px] border-mindfulGreyTypeThree rounded-[6px] px-3 py-3 focus-within:outline-none"
                                className={`w-96 border-[1px] ${errors.name ? 'border-red-500' : 'border-mindfulGreyTypeThree'} rounded-[6px] px-3 py-3 focus-within:outline-none`}
                                {...register("name")}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <input
                                type="tel"
                                id=""
                                placeholder="Phone Number"
                                // className="w-96 border-[1px] border-mindfulGreyTypeThree rounded-[6px] px-3 py-3 focus-within:outline-none"
                                className={`w-96 border-[1px] ${errors.phone ? 'border-red-500' : 'border-mindfulGreyTypeThree'} rounded-[6px] px-3 py-3 focus-within:outline-none`}
                                {...register("phone")}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                id=""
                                placeholder="Email ID"
                                // className="w-96 border-[1px] border-mindfulGreyTypeThree rounded-[6px] px-3 py-3 focus-within:outline-none"
                                className={`w-96 border-[1px] ${errors.email ? 'border-red-500' : 'border-mindfulGreyTypeThree'} rounded-[6px] px-3 py-3 focus-within:outline-none`}
                                {...register("email")}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="receiveUpdated"
                            className="mr-2 focus-within:outline-none"
                            {...register("receiveUpdates")}
                        // accent-color="bg-main text-main"
                        />
                        <label
                            htmlFor="receiveUpdated"
                            className="text-xs text-mindfulGreyTertiary">Receive updates and communications via WhatsApp and call. Uncheck if you do not wish to receive WhatsApp messages.
                        </label>
                    </div>

                    <div className="my-8">
                        {/* <button
                            // onClick={onGetOTP}
                            type="button"
                            className="w-8/12 bg-main rounded-[7px] text-lg text-mindfulWhite px-4 py-2.5">
                            Register
                        </button> */}
                        <button
                            type="submit"
                            className={`w-8/12 rounded-[7px] text-lg px-4 py-2.5 
                            ${registrationSuccess ? "bg-green-500" : "bg-main"} text-mindfulWhite transition-colors duration-300`}
                            disabled={loading || registrationSuccess} // Disable button after success
                        >
                            {loading ? "Registering..." : registrationSuccess ? "Registration Successful" : "Register"}
                        </button>

                        {/* Success message to be displayed after successful registration */}
                        {registrationSuccess && (
                            <div className="mt-4 text-green-500">
                                Registration successful! You can now log in.
                            </div>
                        )}
                    </div>
                </form>

                {/* Register Now */}
                <div>
                    <p className="text-md text-mindfulGreyTertiary">Already a member ? {" "}
                        <span onClick={onLogin} className="text-mindfulBlack font-bold underline cursor-pointer">Login Now</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
