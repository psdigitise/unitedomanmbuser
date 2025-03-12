import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cancelBooking } from "../../api/ApiConfig";

interface CancelPopupProps {
    closePopup: () => void;
    appointmentID: string;
    userID: number;
    refreshBookings: () => void; // Accept the function as a prop

}

type addReasonormData = zod.infer<typeof addReasonSchema>;

// Zod schema for form validation
const addReasonSchema = zod.object({
    reason: zod.string().min(1, "Reason is required"),
});

export const CancelPopup: React.FC<CancelPopupProps> = ({
    closePopup,
    appointmentID,
    userID,
    refreshBookings
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<addReasonormData>({
        resolver: zodResolver(addReasonSchema),
    });

    const onSubmit = async (data: addReasonormData) => {
        setLoading(true);
        setError(null); // Reset previous errors

        try {
            // Call the cancelBooking API with the userID, appointmentID, and reason
            const response = await cancelBooking(userID, Number(appointmentID), data.reason);
            console.log("Booking canceled successfully:", response.message);
            // Refresh bookings after cancellation
            refreshBookings();
            // Handle the success - close the popup and reset loading state
            setTimeout(() => {
                setLoading(false);
                closePopup(); // Close the popup if needed
            }, 500); // Simulate slight delay for better UX
        } catch (err: any) {
            // Handle API error
            setError(err.message || "Failed to cancel the booking. Please try again.");
            setLoading(false); // Reset loading state on error
        }
    };
    return (
        <div>
            <div>
                <div>
                    <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                        <div className="container mx-auto">
                            <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-10 py-10">
                                <div className="relative mb-5">
                                    <div className="text-center">
                                        <h2 className="text-2xl text-mindfulBlack font-semibold">
                                            Reason for Cancellation
                                        </h2>
                                    </div>
                                </div>


                                <div
                                    onClick={closePopup}
                                    className="absolute top-5 right-5 w-fit cursor-pointer"
                                >
                                    <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                                </div>

                                {loading ? (
                                    <div>
                                        loading
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} method="post">
                                        <div>

                                            <div>
                                                <select
                                                    {...register("reason")}
                                                    className="w-full rounded-[5px] border-2 border-mindfulgrey px-2 py-1.5 focus-within:outline-none"
                                                >
                                                    <option >Personal Reasons</option>
                                                    <option>Scheduling Conflict</option>
                                                    <option>Emergency</option>
                                                    <option>Other</option>
                                                </select>

                                                {errors.reason && (
                                                    <p className="text-sm text-red-600">
                                                        {errors.reason.message}
                                                    </p>
                                                )}

                                                {error && (
                                                    <p className="text-sm text-red-600">{error}</p>
                                                )}
                                            </div>


                                            <div className="pt-5">
                                                <div className="flex items-center justify-center space-x-5">
                                                    <button
                                                        type="submit"
                                                        className="bg-mindfulBlue text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};