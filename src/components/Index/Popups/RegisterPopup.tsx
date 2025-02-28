import { useState } from "react";
import loginImg from "../../../assets/images/loginImg.png"
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { closeRegisterPopup } from '../../../redux/registerSlice';
import { openLoginPopup } from '../../../redux/loginSlice';

import { loginRegister } from "../../../api/ApiConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

// Define Zod schema for validation
const registerSchema = zod.object({
    name: zod.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: zod.string().email({ message: "Invalid email address" }),
    phone: zod.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
    receiveUpdates: zod.boolean().optional()
});


type RegisterFormData = zod.infer<typeof registerSchema>;


export const RegisterPopup = () => {

    const dispatch = useDispatch();

    const handleCloseRegisterPopup = () => {
        dispatch(closeRegisterPopup());
    };

    const handleOpenLoginPopup = () => {
        dispatch(closeRegisterPopup());  // Close Register Popup
        dispatch(openLoginPopup());      // Open Login Popup
    };


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
                    handleOpenLoginPopup();
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

    // if (error) return <div>{error}</div>;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 py-5">
            <div className="relative w-6/12 bg-mindfulWhite rounded-lg px-8 py-8 max-2xl:overflow-y-auto max-2xl:h-[95%] max-xl:w-[800px] max-lg:w-[700px] max-md:w-[90%] max-md:p-5">

                {/* Close Button */}
                <div>
                    <button onClick={handleCloseRegisterPopup} className="absolute top-3 right-3">
                        <IoCloseOutline className="text-[28px] text-mindfulBlack hover:text-main" />
                    </button>
                </div>

                {/* Popup Title */}
                <div className="text-center">
                    <h2 className="text-4xl text-mindfulBlack pb-5 cursor-pointer max-md:text-2xl">Register</h2>
                </div>

                <div className="flex items-center space-x-10">

                    {/* Sign In Content */}
                    <div className="">

                        <div className="mb-8">
                            <div className="flex items-center space-x-10 max-md:space-x-0">
                                {/* Login Image */}
                                <div>
                                    <img src={loginImg} alt="Haircut-image" className="w-full max-md:hidden" />
                                </div>

                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <p className="text-lg text-mindfulBlack mb-3">Please sign up to continue.</p>
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="space-y-3 mb-3">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            id=""
                                                            placeholder="Name"
                                                            className={`w-96 border-[1px] max-md:w-full ${errors.name ? 'border-red-500' : 'border-mindfulGreyTypeThree'} rounded-[6px] px-3 py-3 focus-within:outline-none`}
                                                            {...register("name")}
                                                        />
                                                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="tel"
                                                            id=""
                                                            placeholder="Phone Number"
                                                            className={`w-96 border-[1px] max-md:w-full ${errors.phone ? 'border-red-500' : 'border-mindfulGreyTypeThree'} rounded-[6px] px-3 py-3 focus-within:outline-none`}
                                                            {...register("phone")}
                                                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                                                            }}
                                                        />
                                                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="email"
                                                            id=""
                                                            placeholder="Email ID"
                                                            className={`w-96 border-[1px] max-md:w-full ${errors.email ? 'border-red-500' : 'border-mindfulGreyTypeThree'} rounded-[6px] px-3 py-3 focus-within:outline-none`}
                                                            {...register("email")}
                                                        />
                                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                                                    </div>
                                                </div>
                                                <div className="flex items-center  max-md:items-start max-md:gap-1">
                                                    <input
                                                        type="checkbox"
                                                        id="receiveUpdated"
                                                        className="mr-2 focus-within:outline-none"
                                                        {...register("receiveUpdates")}
                                                    />
                                                    <label
                                                        htmlFor="receiveUpdated"
                                                        className="text-xs text-mindfulGreyTertiary">
                                                        Receive updates and communications via WhatsApp and call. Uncheck if you do not wish to receive WhatsApp messages.
                                                    </label>
                                                </div>


                                                {/* Error from the API Response */}
                                                {error && <p className="text-sm text-red-500">{error}</p>}

                                                <div className="my-8  max-md:my-4">
                                                    {/* <button type="submit" className="w-8/12 rounded-[7px] text-lg px-4 py-2.5 bg-main text-mindfulWhite transition-colors duration-300">Register
                                                    </button> */}
                                                    <button
                                                        type="submit"
                                                        className={`w-8/12 rounded-[7px] text-lg px-4 py-2.5  max-md:py-2
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

                                            <div>
                                                <p className="text-md text-mindfulGreyTertiary  max-md:text-base">Already a member? {" "}
                                                    <span onClick={handleOpenLoginPopup} className="text-mindfulBlack font-bold underline cursor-pointer  max-md:text-sm">Login Now</span>
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sign In or Register */}
                        <div>
                            <p className="text-lg text-mindfulBlack font-bold  max-md:text-sm">Cancellation &amp; reschedule policy</p>
                            <p className="text-md text-mindfulBlack  max-md:text-sm">Free cancellations/reschedules if done more than 3 hrs before the service or if a professional isn’t assigned. A fee will be charged otherwise.</p>
                        </div>

                        {/* Learn More */}
                        <div className="mt-8  max-md:my-4">
                            <p className="text-mindfulBlack underline cursor-pointer">Learn More</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
