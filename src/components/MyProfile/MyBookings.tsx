import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { fetchUserBookings } from '../../api/ApiConfig';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

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
}

export const MyBookings = () => {
    const userID = useSelector((state: RootState) => state.cart.userID);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUserBookings = async (userId: string | number | null) => {
            if (!userId) throw new Error("User ID is required");

            try {
                const response = await fetchUserBookings(userID);
                console.log("Booking response ==>", response)
                setBookings(response.data || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadUserBookings(userID);
    }, [userID]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
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
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking) => (
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
                                <div>
                                    <button
                                        className={`text-md text-mindfulWhite rounded-2xl px-3 py-1 ${booking.status_name === 'Completed' ? 'bg-mindfulGreen' :
                                            booking.status_name === 'Accepted' ? 'bg-mindfulYellow' : 'bg-mindfulGrey'
                                            }`}
                                    >
                                        {booking.status_name}
                                    </button>
                                </div>
                            </td>
                            <td className="text-start px-2 py-5">
                                <div className="w-10 h-10 flex items-center justify-center border-[1px] bg-mindfulGrey rounded-full px-2 py-1.5 cursor-pointer hover:bg-main">
                                    <FiDownload className="text-[18px] text-mindfulWhite" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
