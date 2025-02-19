import React, { useEffect, useState } from 'react'
import { BannerContent } from '../components/common/BannerContent'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { FiUpload } from "react-icons/fi";
import { OtpPopup } from '../components/DateTime/OtpPopup';
import { bookNow, fetchTimeSlot } from '../api/ApiConfig';
import { ShimmerTable } from 'shimmer-effects-react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// import { Index } from './Index';


// API Proptypes
interface DateTimeProps {
    closePopup: () => void;
}

// API Proptypes
interface APIDateTimeProps {
    // API Props
    provider_id: number;
    available_slots: string;
}

export const DateTime: React.FC<DateTimeProps> = () => {


    const userID = useSelector((state: RootState) => state.cart.userID);
    console.log("User ID taken from Redux Store: ", userID);

    const cartItems = useSelector((state: RootState) => state.cart.items);
    console.log("cart items data log:", cartItems);

    const quantity = useSelector((state: RootState) => state.cart.quantities);    // Default to 1 if not found
    console.log("Quantity data log:", quantity);


    // Convert the object to a string of key-value pairs
    // const quantityString = Object.entries(quantity)
    //     .map(([key, value]) => `${key}:${value}`) // Format each key-value pair as "key:value"
    //     .join(", "); // Join all pairs with a comma and space

    // console.log("Quantity String:", quantityString);

    // Extract values and join them with a comma
    const quantityValuesString = Object.values(quantity).join(", ");

    console.log("Quantity Values String:", quantityValuesString);



    const joinedServiceIDs = cartItems.map(item => item.serviceID).join(',');
    // const joinedQuantities = quantity.map(q => q[0]).join(',');

    console.log("Joined service IDs:", joinedServiceIDs);

    cartItems.forEach((value) => {
        console.log("cart value", value);
        console.log("cart value ID", value.serviceID);
        // console.log("cart value ID", value.serviceName);
        // console.log("cart value ID", value.price);
        // console.log("cart value ID", value.serviceDesc);
        // console.log("cart value ID", value.serviceTime);
        // console.log("cart value ID", value.image);

    })

    // State Declaration for Time slot API
    const [timeSlot, setTimeSlot] = useState<APIDateTimeProps[]>([]); // Store API response
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [timeSlotError, setTimeSlotError] = useState<string | null>(null);  // Error state for time slot



    // State to store the available slots
    // const [availableSlots, setAvailableSlots] = useState("");

    // Assuming timeSlot is passed as a prop, update the availableSlots state when timeSlot changes
    // Dependency on timeSlot prop


    // State Declaration for date
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    // State to manage the background color

    // Toggle the background color on click
    const handleDateClick = (time: string) => {
        setSelectedTime(time);
        console.log("Selected time slot", time);
        setTimeSlotError(null);  // Clear the error when a time slot is selected

    };

    // const isSlotDisabled = (slot: string): boolean => {
    //     const currentTime = new Date(); // Get current real time
    //     const slotTime = new Date(`${dateOnly}T${slot}:00`); // Convert slot to a Date object

    //     console.log(slotTime, "Checking Slot Time");
    //     console.log(currentTime, "Current Time");

    //     console.log("Greater", slotTime, currentTime);



    //     return slotTime <= currentTime; // Disable if slot time is less than or equal to current time
    // };

    const isSlotDisabled = (slot: string): boolean => {
        const currentTime = new Date(); // Get current real time

        // Convert the 12-hour format slot time (e.g., "8:00 AM") to 24-hour format
        const [time, modifier] = slot.split(" "); // Split into time and AM/PM
        let [hours, minutes] = time.split(":").map(Number); // Split hours and minutes

        if (modifier === "PM" && hours !== 12) hours += 12; // Convert PM to 24-hour format
        if (modifier === "AM" && hours === 12) hours = 0;   // Handle 12 AM case

        const slotTime = new Date(`${dateOnly}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`);

        console.log("Slot Time:", slotTime);
        console.log("Current Time:", currentTime);

        return slotTime <= currentTime; // Disable if slot time is earlier than or equal to current time
    };

    // Ensure the startDate is not null before extracting the date
    const dateOnly = startDate ? startDate.toISOString().split("T")[0] : "";

    console.log("Date Only:", dateOnly); // Output: "2024-12-10"


    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // const handleFileChange = (event: { target: { files: React.SetStateAction<null>[]; }; }) => {
    //     setSelectedFile(event.target.files[0]);
    //     // You can handle the file upload logic here
    // };

    // File change handler
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };



    // State Declaration for OTP Popup
    const [showOtpPopup, setShowOtpPopup] = useState(false);

    const handleOtpPopup = () => {
        setShowOtpPopup(!showOtpPopup);
    }


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [appointmentID, setAppointmentID] = useState("");

    // Getting the stored provider_id from sessionStorage
    const sessionProviderID = sessionStorage.getItem('selectedProviderId');
    console.log("Selected Provider ID from session storage", sessionProviderID);

    // Access the branch_id from the first item in the cart (if applicable)
    const branchID = cartItems.length > 0 ? cartItems[0].branchID : null;

    console.log("Branch ID from cart:", branchID);

    useEffect(() => {
        const loadTimeSlotDate = async (sessionProviderID: number) => {
            setLoading(true);
            try {
                const data = await fetchTimeSlot(sessionProviderID);  // Fetch the time slots using the provider ID
                setTimeSlot(data);
                console.log("Fetched time slot data log", data);
            }
            catch (error: any) {
                setError(error.message || "Failed to fetch time slot data");
            }
            finally {
                setLoading(false);
            }
        }

        console.log("timeslottttt", timeSlot);
        // loadTimeSlotDate();

        // Convert sessionProviderID to a number if it's not null
        if (sessionProviderID) {
            const providerIdAsNumber = Number(sessionProviderID);
            if (!isNaN(providerIdAsNumber)) {
                loadTimeSlotDate(providerIdAsNumber);
            } else {
                setError("Invalid provider ID stored in session storage");
            }
        } else {
            setError("No provider ID found in session storage");
        }
    }, [sessionProviderID]);


    const onConfirm = async () => {
        // Check if both date and time slot are selected
        if (!startDate || !selectedTime) {
            setTimeSlotError("Please select a time slot.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setLoading(true);
        setError(null); // Clear any previous errors

        try {
            if (!userID || !sessionProviderID) {
                throw new Error("Missing required booking information. Please try again.");
            }

            const data = await bookNow(
                String(userID),                  // Replace with actual user ID from state/auth
                sessionProviderID || "",
                String(branchID || 0),          // Convert branchID to string, default to "0" if null or undefined
                joinedServiceIDs,                // Replace with selected service ID(s)
                dateOnly,                        // Format the date
                selectedTime || "",
                quantityValuesString             // Replace with actual quantity
            );

            if (data.status === "success") {
                setAppointmentID(data.appointment_id);
                sessionStorage.setItem("appointmentID", data.appointment_id);
                handleOtpPopup();
            } else {
                throw new Error(data.error || "Booking failed. Please try again.");
            }

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "Booking failed. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Add a new useEffect to handle error message timeout
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Update the ErrorMessage component to include a transition
    const ErrorMessage = () => error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 transition-opacity duration-500 ease-in-out">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <section className="mt-32">
            {/* Banner Content */}
            <div>
                <BannerContent bannerTitle="Select Date and Time" />
            </div>

            <div className="container mx-auto">
                <div className="w-1/2 mx-auto mb-20">

                    {/* Icons Div */}
                    <div className="my-16">
                        <div className="relative flex justify-between items-center">

                            {/* Back Line */}
                            <div className="w-full absolute top-8 left-0 z-[-2]">
                                <div className="w-full h-[2px] bg-mindfulLightGrey rounded-lg"></div>
                            </div>

                            {/* Login Icon */}
                            {/* <Link to="/Login"> */}
                            <div className="bg-white w-[60px] h-[60px] border-2 border-mindfulBlack rounded-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29.999" height="30" viewBox="0 0 29.999 30">
                                    <defs>
                                        <clipPath id="clip-path">
                                            <rect id="Rectangle_328" data-name="Rectangle 328" width="29.999" height="30" fill="#fff" />
                                        </clipPath>
                                    </defs>
                                    <g id="Group_403" data-name="Group 403" clip-path="url(#clip-path)">
                                        <path id="Path_574" data-name="Path 574" d="M58.041,26.06v-22c-.134-.007-.248-.017-.362-.017q-2.25,0-4.5,0a1.861,1.861,0,0,0-2.007,2.021c0,.422.006.844,0,1.266A1.213,1.213,0,0,1,49.915,8.6a1.2,1.2,0,0,1-1.2-1.287,14.774,14.774,0,0,1,.065-2.069A4.307,4.307,0,0,1,52.968,1.63c1.84-.017,3.681,0,5.521-.014a.865.865,0,0,0,.545-.218A4.381,4.381,0,0,1,64.009.361c2.527.959,5.073,1.87,7.585,2.866a3.941,3.941,0,0,1,2.521,3.444,3.856,3.856,0,0,1,.013.457q0,7.791,0,15.581a4.108,4.108,0,0,1-2.879,4.169c-1.1.421-2.212.831-3.318,1.247-1.358.511-2.721,1.009-4.072,1.536a4.309,4.309,0,0,1-4.094-.4,3.685,3.685,0,0,1-.711-.671.659.659,0,0,0-.544-.243q-2.69.013-5.38,0a4.253,4.253,0,0,1-4.176-2.9,5.532,5.532,0,0,1-.226-1.308c-.038-.489-.011-.984-.009-1.477a1.037,1.037,0,0,1,.93-1.125,1.209,1.209,0,0,1,1.44.773,1.984,1.984,0,0,1,.08.552c.012.492-.008.985.01,1.477a1.838,1.838,0,0,0,1.592,1.7,3.394,3.394,0,0,0,.351.011h4.92" transform="translate(-44.13 0)" fill="#000" />
                                        <path id="Path_575" data-name="Path 575" d="M7.426,120c-.316-.311-.637-.618-.948-.934a1.174,1.174,0,0,1-.073-1.7,1.192,1.192,0,0,1,1.73.007c.94.916,1.866,1.847,2.8,2.771a7.014,7.014,0,0,1,.574.582.627.627,0,0,1-.083.866c-1.1,1.134-2.215,2.257-3.351,3.357a1.073,1.073,0,0,1-1.592-.127,1.152,1.152,0,0,1,.229-1.647,5.527,5.527,0,0,0,.815-.674h-.37c-1.981,0-3.961.005-5.942,0A1.111,1.111,0,0,1,.006,121.17a1.169,1.169,0,0,1,1.247-1.078c1.535-.008,3.071,0,4.606,0H7.394L7.426,120" transform="translate(0 -106.01)" fill="#000" />
                                    </g>
                                </svg>
                            </div>
                            {/* </Link> */}

                            {/* Calendar Time Icon */}
                            <Link to="/DateTime">
                                <div
                                    className="bg-main w-[60px] h-[60px] rounded-full flex justify-center items-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="27.868" viewBox="0 0 30 27.868">
                                        <defs>
                                            <clipPath id="clip-path">
                                                <rect id="Rectangle_330" data-name="Rectangle 330" width="30" height="27.868" fill="#fff" />
                                            </clipPath>
                                        </defs>
                                        <g id="Group_407" data-name="Group 407" clip-path="url(#clip-path)">
                                            <path id="Path_579" data-name="Path 579" d="M14.231,119.224c-.108.006-.194.014-.281.014-3.057,0-6.115.017-9.172-.005A4.5,4.5,0,0,1,.4,116.394a4.271,4.271,0,0,1-.359-1.65C.009,110.972.023,107.2.023,103.428c0-.055.008-.11.014-.19h25.2v1.944c-4.069-.9-7.571.051-10.166,3.353s-2.694,6.926-.84,10.689" transform="translate(-0.018 -94.005)" fill="#fff" />
                                            <path id="Path_580" data-name="Path 580" d="M176.562,160.163a7.437,7.437,0,1,1,7.449-7.41,7.42,7.42,0,0,1-7.449,7.41m1.078-8.5c0-.408.012-.774,0-1.139a1.068,1.068,0,1,0-2.136.025q-.012,1.086,0,2.172a1.047,1.047,0,0,0,1.073,1.082c.69.01,1.381.008,2.071,0a1.07,1.07,0,1,0,.011-2.139c-.322-.008-.643,0-1.017,0" transform="translate(-154.011 -132.295)" fill="#fff" />
                                            <path id="Path_581" data-name="Path 581" d="M17.369,19.227a1.407,1.407,0,0,0-.048.255c0,.814-.008,1.629,0,2.443a1.072,1.072,0,1,0,2.137.011c.012-.781,0-1.562,0-2.343,0-.12,0-.24,0-.354,3.919-.543,6.105,2.442,5.734,5.266H.025a4.689,4.689,0,0,1,1.7-4.281A4.369,4.369,0,0,1,4.562,19.2c.4,0,.8.009,1.2.013L5.757,19.2c.005.066.015.133.015.2,0,.856-.008,1.713,0,2.569a1.069,1.069,0,1,0,2.137,0c.006-.923,0-1.846,0-2.769l-.013.013c.122-.007.244-.019.366-.019q4.342,0,8.684,0c.143,0,.286.025.429.038Z" transform="translate(0 -17.46)" fill="#fff" />
                                            <path id="Path_582" data-name="Path 582" d="M64.384,1.754c0-.233,0-.467.011-.7a1.069,1.069,0,1,1,2.137.037c0,.222-.01.444-.016.666l.013-.013H64.377Z" transform="translate(-58.619 -0.002)" fill="#fff" />
                                            <path id="Path_583" data-name="Path 583" d="M193.989,1.774a5.146,5.146,0,0,1,0-1.02,1.056,1.056,0,0,1,2.051.116,7.146,7.146,0,0,1,.007.9h-2.065l.007.007" transform="translate(-176.613 0)" fill="#fff" />
                                        </g>
                                    </svg>
                                </div>
                            </Link>

                            {/* Cart Icon */}
                            {/* <Link to="/Cart"> */}
                            <div className="bg-white w-[60px] h-[60px] border-2 border-mindfulBlack rounded-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29.171" viewBox="0 0 30 29.171">
                                    <defs>
                                        <clipPath id="clip-path">
                                            <rect id="Rectangle_329" data-name="Rectangle 329" width="30" height="29.171" fill="#000" />
                                        </clipPath>
                                    </defs>
                                    <g id="Group_405" data-name="Group 405" clip-path="url(#clip-path)">
                                        <path id="Path_576" data-name="Path 576" d="M98,308.733a7.539,7.539,0,0,1-.714-.263,2.527,2.527,0,1,1,1.763.176c-.093.025-.184.058-.277.088Z" transform="translate(-88.248 -279.562)" fill="#000" />
                                        <path id="Path_577" data-name="Path 577" d="M289.693,308.733a7.519,7.519,0,0,1-.714-.263,2.527,2.527,0,1,1,1.763.176c-.093.025-.184.058-.277.088Z" transform="translate(-264.726 -279.562)" fill="#000" />
                                        <path id="Path_578" data-name="Path 578" d="M18.895,22.826q-3.686,0-7.371,0a3.241,3.241,0,0,1-3.34-3.066A4.124,4.124,0,0,1,8.289,18.7c.076-.407.2-.807.3-1.21a3.252,3.252,0,0,0-.07-1.871Q6.455,9.446,4.4,3.269a.907.907,0,0,0-1.015-.725c-.684,0-1.367,0-2.051,0A1.27,1.27,0,1,1,1.32.006C2.538,0,3.757,0,4.975,0a1.278,1.278,0,0,1,1.331.97c.37,1.1.734,2.194,1.1,3.291a.964.964,0,0,0,1.13.819q9.972,0,19.944,0a2.438,2.438,0,0,1,.59.043,1.257,1.257,0,0,1,.849,1.688c-.425,1.3-.857,2.59-1.289,3.884q-1,3-2,5.992a1.321,1.321,0,0,1-1.468,1.066H12.027c-.724,0-.927.157-1.1.851-.065.259-.136.517-.2.777a.686.686,0,0,0,.659.909c.108.009.218,0,.327,0q7.342,0,14.683,0a2.257,2.257,0,0,1,.588.052,1.244,1.244,0,0,1,.9,1.393,1.228,1.228,0,0,1-1.2,1.072c-1.169.015-2.338.007-3.507.007h-4.28" transform="translate(0 0.001)" fill="#000" />
                                    </g>
                                </svg>
                            </div>
                            {/* </Link> */}
                        </div>
                    </div>

                    {/* Date & Time Grid */}
                    <div className="grid grid-cols-2 space-x-5 mb-20">
                        {/* Date */}
                        <div>
                            <div>
                                <h5 className="text-lg text-mindfulBlack font-bold mb-2">Date</h5>
                            </div>
                            <div className="w-full">
                                <DatePicker
                                    selected={startDate}
                                    // onChange={(date) => setStartDate(date)}
                                    onChange={(date: Date | null) => {
                                        setStartDate(date); // Update state
                                        console.log("Selected date:", date); // Log the selected date
                                    }}
                                    inline
                                    minDate={new Date()}  // This restricts previous dates/
                                    className="schedule-date-picker w-full"
                                />
                            </div>
                        </div>

                        {/* Time Slot */}
                        <div>
                            <div>
                                <h5 className="text-lg text-mindfulBlack font-bold mb-2">Time</h5>
                            </div>


                            <div className="grid grid-cols-1 items-center gap-2">

                                {/* {timeSlot.map((time) => (
                                    <div key={time.provider_id} className="text-center">
                                        <p
                                            onClick={() => handleDateClick(time)}  // Update selected time
                                            className={`text-sm text-mindfulBlack border-[1px] border-mindfulBlack rounded-[6px] px-2 py-1 cursor-pointer
                                    ${selectedTime === time ? "bg-main text-white border-white" : ""}
                                    `} // Highlight selected time
                                        >
                                            {time.available_slots}
                                        </p>
                                    </div>
                                ))} */}

                                {loading ? (
                                    <div>
                                        <ShimmerTable
                                            mode="light"
                                            row={10}
                                            col={1}
                                            border={1}
                                            borderColor={"#cbd5e1"}
                                            rounded={0.25}
                                            rowGap={16}
                                            colPadding={[20, 10, 20, 10]}
                                        />
                                    </div>
                                ) : (
                                    // Render time slots when not loading
                                    timeSlot.map((time) => (
                                        // <div key={time.provider_id} className="text-center">
                                        //     <p className="grid grid-cols-3 gap-2 text-sm text-mindfulBlack rounded-[6px] px-2 py-1">
                                        //         {/* Check if available_slots is an array and access the first element */}
                                        //         {Array.isArray(time.available_slots) && time.available_slots.length > 0
                                        //             ? time.available_slots[0].split(",").map((slot: any) => (
                                        //                 <span
                                        //                     key={slot}
                                        //                     onClick={() => handleDateClick(slot.trim())} // Set the clicked time slot
                                        //                     className={`text-sm cursor-pointer mx-1 px-2 py-1 text-mindfulBlack border-[1px] border-mindfulBlack rounded
                                        //                          ${selectedTime === slot.trim() ? "bg-main text-white border-white" : ""}`}
                                        //                 >
                                        //                     {slot.trim()} {/* Trim in case of extra spaces */}
                                        //                 </span>
                                        //             ))
                                        //             : <span>No available slots</span>
                                        //         }
                                        //     </p>
                                        // </div>

                                        <div key={time.provider_id} className="text-center">
                                            <p className="grid grid-cols-3 gap-2 text-sm text-mindfulBlack rounded-[6px] px-2 py-1">
                                                {Array.isArray(time.available_slots) && time.available_slots.length > 0
                                                    ? time.available_slots[0].split(",").map((slot: string) => {
                                                        const trimmedSlot = slot.trim();
                                                        const disabled = isSlotDisabled(trimmedSlot);

                                                        return (
                                                            <span
                                                                key={trimmedSlot}
                                                                onClick={() => !disabled && handleDateClick(trimmedSlot)} // Only allow click if not disabled
                                                                className={`text-sm mx-1 px-2 py-1 rounded
                                        ${selectedTime === trimmedSlot ? "bg-main text-white border-white" : ""}
                                        ${disabled ? "bg-[#d6d6d6] text-gray-400 font-semibold cursor-not-allowed" : "text-mindfulBlack border-[1px] border-mindfulBlack cursor-pointer"}`}
                                                            >
                                                                {trimmedSlot}
                                                            </span>
                                                        );
                                                    })
                                                    : <span>No available slots</span>
                                                }
                                            </p>
                                        </div>
                                    ))
                                )}

                            </div>

                            {/* Error Message for Time Slot */}
                            {timeSlotError && (
                                <p className="text-sm text-red-500 mt-2 ml-2">{timeSlotError}</p>
                            )}
                        </div>
                    </div>

                    {/* File Upload Area */}
                    <div>
                        <div className="">
                            <label
                                htmlFor="upload-photo"
                                className="w-full border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col justify-center items-center py-5 cursor-pointer hover:border-mindfulGreyTypeThree"
                            >
                                {/* File Upload Icon */}
                                <div>
                                    <FiUpload className="text-[36px] text-mindfulBlack mb-2" />
                                </div>
                                <span className="text-md text-mindfulBlack">
                                    {selectedFile ? selectedFile.name : 'Upload Virtual Try-on Photo'}
                                </span>
                            </label>
                            <div>
                                <input
                                    id="upload-photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-mindfulYellow rounded-[8px] px-2 py-2 text-center my-10">
                        <p className="text-md text-mindfulBlack">Note: Post confirmation you will receive
                            <span className="font-bold"> OTP </span>
                            from the service provider for Booking.</p>
                    </div>


                    <div id="confirm-section" className="text-center space-y-4">
                        <ErrorMessage />
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className={`w-72 mx-auto bg-main rounded-[7px] text-lg text-mindfulWhite px-4 py-2 
                                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-main/90 transition-colors'}
                                ${error ? 'mt-0' : 'mt-4'}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                'Confirm'
                            )}
                        </button>
                    </div>

                </div>

                {showOtpPopup && <OtpPopup onClose={() => setShowOtpPopup(false)} appID={appointmentID} />}
            </div>

        </section >
    )
}
