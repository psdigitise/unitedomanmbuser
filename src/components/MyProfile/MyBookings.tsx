import { useEffect, useState } from 'react';
import { FiDownload, FiEdit } from 'react-icons/fi';
import { fetchUserBookings, salesTransactionsInvoice, fetchAppointmentDetails } from '../../api/ApiConfig';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, clearCart } from '../../redux/cartSlice';
import { ShimmerTable } from 'shimmer-effects-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotifyError } from '../common/Toast/ToastMessage';
import { CancelPopup } from './CancelPopup';
import { useNavigate } from 'react-router-dom';
import { ReviewCompleted } from '../Overview/OverviewTabs/ReviewCompleted';

interface Booking {
    id: string;
    appointment_id: string;
    formatted_date: string;
    formatted_time: string;
    branch_name: string;
    services: Array<string>;
    stylist_name: string;
    payment_amount: number;
    status_name: string;
    reason: string;
    provider_id: string;
}

export const MyBookings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userID = useSelector((state: RootState) => state.cart.userID);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCancelPopup, setCancelShowPopup] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
        null
    );
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    // const [selectedBookingForRating, setSelectedBookingForRating] = useState<Booking | null>(null);
    const [, setSelectedBookingForRating] = useState<Booking | null>(null);
    const [ratingProviderId, setRatingProviderId] = useState<string | null>(null);
    console.log("selectedAppointment", selectedAppointment);

    const loadUserBookings = async (userId: string | number | null) => {
        setLoading(true);
        if (!userId) {
            toast.error("User ID is required");
            return;
        }
        try {
            const response = await fetchUserBookings(userID);
            console.log("Booking response ==>", response);
            setBookings(response.data || []);
        } catch (err: any) {
            NotifyError(err.message || "Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadUserBookings(userID);
    }, [userID]);

    const handleDownloadInvoice = async (appointmentID: number) => {
        console.log("Invoice ID check ==>", appointmentID);

        try {
            const blob = await salesTransactionsInvoice(appointmentID);

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `invoice_${appointmentID}.pdf`);
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            // showToast("success", "My Booking invoice downloaded successfully.");
        } catch (error: any) {
            // showToast("error", error.message || "Failed to download My Booking Invoice.");
            NotifyError(error.message || "Failed to download My Booking Invoice.");
        }
    };

    const handleCancelClick = (appointmentID: string) => {
        setSelectedAppointment(appointmentID);
        setCancelShowPopup(true);
    };

    const handleAppointmentDetails = async (appointmentId: string) => {
        try {
            const response = await fetchAppointmentDetails(appointmentId);
            console.log('Appointment Details:', response);
            
            // Set provider and branch IDs in session storage
            sessionStorage.setItem('selectedProviderId', response.provider_id.toString());
            sessionStorage.setItem('selectedBranchId', response.branch_id.toString());
            sessionStorage.setItem('lastProviderId', response.provider_id.toString());
            sessionStorage.setItem('lastBranchId', response.branch_id.toString());

            // Clear the cart before adding new items
            dispatch(clearCart());

            // Add services to cart before navigation
            response.services.forEach((service: any) => {
                dispatch(addToCart({
                    serviceID: service.service_id,
                    serviceName: service.servicename,
                    serviceDesc: service.servicedesc || '',
                    price: service.price,
                    image: service.image,
                    serviceTime: service.service_time,
                    branchID: response.branch_id
                }));
            });

            // Navigate to Overview page
            navigate(`/Overview?provider_id=${response.provider_id}&branch_id=${response.branch_id}`);
        } catch (err: any) {
            NotifyError(err.message || 'Failed to fetch appointment details');
        }
    };

    const handleRatingClick = (booking: Booking) => {
        setRatingProviderId(booking.provider_id);
        setSelectedBookingForRating(booking);
        setShowRatingPopup(true);
    };

    return (
        <div className="max-lg:overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b-2">
                        <th className="text-start px-2 py-2">Booking ID</th>
                        <th className="text-start px-2 py-2">Date</th>
                        <th className="text-start px-2 py-2">Time</th>
                        <th className="text-start px-2 py-2">Branch</th>
                        <th className="text-start px-2 py-2">Service</th>
                        <th className="text-start px-2 py-2">Stylist</th>
                        <th className="text-start px-2 py-2">Amount</th>
                        <th className="text-start px-2 py-2">Status</th>
                        <th className="text-start px-2 py-2">Action</th>
                        <th className="text-start px-2 py-2">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={10} className="text-center px-2 py-5">
                                <ShimmerTable
                                    mode="light"
                                    row={bookings.length + 1}
                                    col={10}
                                    border={1}
                                    borderColor={"#cbd5e1"}
                                    rounded={0.25}
                                    rowGap={16}
                                    colPadding={[15, 5, 15, 5]}
                                />
                            </td>
                        </tr>
                    ) : bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking.id} className="border-b-2">
                                <td className="text-start px-2 py-5">{booking.appointment_id}</td>
                                <td className="text-start px-2 py-5">{booking.formatted_date}</td>
                                <td className="text-start px-2 py-5">{booking.formatted_time}</td>
                                <td className="text-start px-2 py-5">{booking.branch_name}</td>
                                <td className="text-start px-2 py-5">
                                    <ul>
                                        {booking.services.map((service, index) => (
                                            <li key={index}>{service}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="text-start px-2 py-5">{booking.stylist_name}</td>
                                <td className="text-start px-2 py-5">Rs. {booking.payment_amount}/-</td>
                                <td className="text-start px-2 py-5">
                                    <div className="flex items-center gap-2">
                                        <button
                                            // className={`text-md text-mindfulWhite rounded-2xl px-3 py-1 flex items-center justify-between gap-2 ${
                                            className={`w-[7rem] text-sm text-mindfulWhite rounded-2xl px-3 py-1 
                                                ${booking.status_name === "Completed" ? "bg-mindfulGreen"
                                                    : booking.status_name === "Inprogress" ? "bg-[#3A96F8]"  // Set background color for "Inprogress"
                                                        : booking.status_name === "Schedule" ? "bg-[#FABC2A]"  // Set background color for "Schedule"
                                                            : booking.status_name === "Pending" ? "bg-[#FF5733]"  // Set background color for "Pending"
                                                                : "bg-mindfulGrey"
                                                }`}
                                        >
                                            {booking.status_name}

                                        </button>
                                        {booking.status_name === "Completed" && (
                                            <FiEdit 
                                            className="text-gray-600 text-lg cursor-pointer" 
                                            title="Rating" 
                                            onClick={() => handleRatingClick(booking)}
                                        />
                                        )}
                                    </div>
                                </td>

                                {/*Action */}
                                <td className="text-start px-2 py-5">
                                    {/* {(booking.status_name === "Inprogress" ||
                                            booking.status_name === "Schedule") && (
                                                <IoIosClose
                                                    onClick={() =>
                                                        handleCancelClick(booking.appointment_id)
                                                    }
                                                    className="text-red-500 cursor-pointer text-2xl "
                                                />
                                            )} */}
                                    <div className="flex gap-2"> {/* Flex container with gap between buttons */}
                                        <button
                                            onClick={() => handleAppointmentDetails(booking.appointment_id)}
                                            className="flex items-center justify-center text-white bg-main rounded-md px-3 py-1"
                                        >
                                            <span className="text-sm">Reschedule</span>
                                        </button>
                                        {(booking.status_name === "Inprogress" ||
                                            booking.status_name === "Schedule") && (
                                        <button
                                            onClick={() => handleCancelClick(booking.appointment_id)}
                                            className="flex items-center justify-center text-main bg-white rounded-md px-3 py-1 border-2 border-main "
                                        >
                                            <span className="text-sm">Cancel</span>
                                        </button>
                                            )}
                                    </div>
                                </td>

                                {booking.status_name === "Completed" &&
                                    <td className="text-start px-2 py-5">
                                        <div
                                            onClick={() => handleDownloadInvoice(Number(booking.appointment_id))}
                                            className="w-10 h-10 flex items-center justify-center border-[1px] bg-mindfulGrey rounded-full px-2 py-1.5 cursor-pointer hover:bg-main"
                                        >
                                            <FiDownload className="text-[18px] text-mindfulWhite" />
                                        </div>
                                    </td>
                                }

                                {booking.status_name === "Cancelled" &&
                                    <td className="text-start px-2 py-5">
                                        {booking.reason || "N/A"}
                                    </td>
                                }
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center py-4">
                                No bookings available.
                            </td>
                        </tr>
                    )}
                </tbody>
                {showCancelPopup && selectedAppointment && userID !== null && (
                    <CancelPopup
                        closePopup={() => setCancelShowPopup(false)}
                        appointmentID={selectedAppointment}
                        userID={userID}
                        // refreshBookings={loadUserBookings} // Pass the function as a prop
                        refreshBookings={() => loadUserBookings(userID)} // Wrap in a function
                    />
                )}
            </table>

            {showRatingPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Rate Your Experience</h2>
                <button 
                    onClick={() => setShowRatingPopup(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>
            <ReviewCompleted
                ratingProviderId={ratingProviderId}
                onClose={() => setShowRatingPopup(false)}
                refreshBookings={() => loadUserBookings(userID)}
            />
        </div>
    </div>
)}
        </div>
    );
};