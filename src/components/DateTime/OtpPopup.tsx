import React, { useEffect, useState, } from 'react';
import { appointmentStatus, verifyOTP, cancelAppointment } from '../../api/ApiConfig';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';

interface OtpPopupProps {
    appID: string;
    onClose: () => void;
}

// Define the Zod schema for OTP validation
const otpSchema = zod.object({
    otp: zod.string()
    // .length(4, "OTP must be exactly 4 digits") // Ensure length is 4
    // .regex(/^\d{4}$/, "OTP must be a 4-digit number"), // Validates it contains only digits
});

// Define the OTP form data type
type OtpFormData = zod.infer<typeof otpSchema>;

export const OtpPopup: React.FC<OtpPopupProps> = ({ onClose, appID }) => {

    const navigate = useNavigate();

    const [isClosing, setIsClosing] = useState(false);
    const [otpInput, setOtpInput] = useState(['', '', '', '']);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // const [appointmentResponse, setAppointmentResponse] = useState<number | null>(null);

    // const [isVerified, setIsVerified] = useState<boolean>(false); // Track success response

    const [statusResponse, setStatusResponse] = useState(0);
    const [timer, setTimer] = useState(120);
    const [isResendEnabled, setIsResendEnabled] = useState(true);

    // Getting the stored provider_id from sessionStorage
    const sessionProviderID = sessionStorage.getItem('selectedProviderId');
    console.log("Selected Provider ID from session storage", sessionProviderID);


    // Getting the stored provider_id from sessionStorage
    const sessionProviderName = sessionStorage.getItem('serviceProviderName');
    console.log("Selected Provider Name from session storage", sessionProviderName);


    const { handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
    });

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const data = await appointmentStatus(appID);
                setStatusResponse(data.status_id);
            } catch (error: any) {
                setError(error.message || "Failed to fetch appointment.");
            }
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [appID]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsResendEnabled(true); // Enable resend after 60 seconds
            handleClose(); // Automatically close the popup when the timer finishes
        }
    }, [timer]);


    const handleClose = async () => {
        setLoading(true);
        try {
            // Call the cancel appointment API
            const data = await cancelAppointment(appID);
            console.log("cancelled response ", data);
            setIsClosing(false);
            onClose();
            //sessionStorage.removeItem("selectedLocation");
            // sessionStorage.removeItem("selectedProviderId");
            // sessionStorage.removeItem("selectedServiceId");
            // sessionStorage.removeItem("selectedServiceName");
            navigate("/");
        } catch (error) {
            console.error("Error cancelling appointment:", error);
            setError("Failed to cancel appointment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePopupClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };


    const onSubmit = async () => {
        setLoading(true);
        try {
            const otp = otpInput.join("");
            const data = await verifyOTP(appID, Number(otp));
            console.log("OTP Response data:", data);
            setError("");
            navigate("/Cart");
            window.scrollTo(0, 0);

            // setIsVerified(true); // Mark verification as successful
        } catch (error: any) {
            // setError("Failed to verify OTP. Please try again.");
            setError("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const handleOtpInputChange = (value: string, index: number) => {
        const newOtpInput = [...otpInput];
        newOtpInput[index] = value;
        setOtpInput(newOtpInput);

        if (value && index < otpInput.length - 1) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) (nextInput as HTMLInputElement).focus();
        }

        if (newOtpInput.every(input => input.length > 0)) {
            clearErrors("otp");
        }
    };


    // useEffect(() => {
    //     // API call to fetch data
    //     const loadAppointmentData = async () => {
    //         try {
    //             // const data = await fetchFAQs();
    //             const data = await appointmentStatus(appID);

    //             // setAppointmentResponse(data.status_id); // Directly set the fetched data

    //             setStatusResponse(data.status_id); // Directly set the fetched data
    //             console.log("Appointment ID data log:", data);

    //         } catch (error: any) {
    //             setError(error.message || "Failed to fetch appointment.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadAppointmentData();

    // }, [statusResponse]);    // Only run this effect when `appID` changes




    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;



    return (
        <div
            // onClick={handleClose}
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50 transition-opacity duration-300
            ${isClosing ? 'opacity-0' : 'opacity-100'}`}>

            <div
                onClick={handlePopupClick}
                className={`w-full bg-white px-5 py-10 transform transition-transform duration-300
                ${isClosing ? 'translate-y-full' : 'translate-y-0'}`}>

                {/* Close Button */}
                <div>
                    <button onClick={handleClose} className="absolute top-3 right-3">
                        <IoCloseOutline className="text-[28px] text-mindfulBlack hover:text-main" />
                    </button>
                </div>

                <div className="w-1/2 mx-auto mb-20 max-xl:w-[75%] max-md:mb-0 max-lg:w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-fit mx-auto">

                            <p className="text-md text-mindfulBlack text-center">
                                Your appointment ID
                                <span className="font-semibold"> {appID} </span>
                                is created successfully & waiting for confirmation from the "Service Provider ID & Name :
                                <span className="font-semibold"> {sessionProviderID} : {sessionProviderName} </span>".
                            </p>


                            <p className="text-md text-mindfulBlack text-center">
                                Please enter the 4 digit OTP which you received from the "Service Provider"
                            </p>

                            {statusResponse == 1 &&
                                <p className="text-md text-mindfulGreen text-center pt-5">Service Provider ID :
                                    <span className="font-semibold"> {sessionProviderID} </span>
                                    has accepted your appointment request</p>
                            }

                            <div className="text-center my-5 space-x-3">

                                {otpInput.map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        id={`otp-input-${index}`}
                                        value={otpInput[index]}
                                        onChange={(e) => {
                                            handleOtpInputChange(e.target.value, index);
                                            setValue("otp", otpInput.join(""));
                                        }}
                                        className={`w-10 h-10 border-2 border-mindfulLightGrey rounded-[6px] px-3 py-3 text-center focus:outline-none
                                        ${errors.otp ? 'border-red-500' : ''}`}
                                    />
                                ))}

                                {errors.otp && <p className="text-sm text-red-500">{errors.otp.message}</p>}

                                {/* Error from the API Response */}
                                {error && <p className="text-sm text-red-500">{error}</p>}

                            </div>

                            <div className="w-6/12 mx-auto max-md:w-full text-center">

                                {/* <button className="w-full bg-main rounded-[7px] text-lg text-mindfulWhite px-4 py-2.5">Submit</button> */}
                                <button
                                    type="submit"
                                    className="w-full bg-main rounded-[7px] text-lg text-mindfulWhite px-4 py-2.5"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>

                                {isResendEnabled && (
                                    <span className="text-red-500 text-center mx-auto">Auto cancelled in {timer} seconds</span>
                                )}
                                {/* <button
                                    type="submit"
                                    className={`w-full rounded-[7px] text-lg px-4 py-2.5
        ${appointmentResponse === 1 ? "bg-main text-mindfulWhite" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                                    disabled={appointmentResponse !== 1}
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};