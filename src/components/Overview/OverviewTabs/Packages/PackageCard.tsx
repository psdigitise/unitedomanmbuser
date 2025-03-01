import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addToCart } from '../../../../redux/cartSlice'; // Adjust path as necessary
import { BsCartPlusFill } from "react-icons/bs";
import { scrollToCartItemArea } from "../../../../redux/scrollSlice";
// import aiModel from "../../../../assets/images/gallery-img-1.jpeg"

interface PackageCardProps {
    packageID: number;
    packageName?: string;
    packageImage?: string;
    packageAmount?: string;
    packageServices?: string | string[];  // Specify string array
    packageStatus?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({ packageID, packageName, packageImage, packageAmount, packageServices }) => {

    // Ensure packageServices is an array before rendering
    const servicesArray = Array.isArray(packageServices) ? packageServices : packageServices?.split(',')
        .map(service => service.trim()); // Handle string case

    console.log("Converting string into an array:", servicesArray);


    // Accordion state declaration
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState("0px");

    const contentRef = useRef<HTMLDivElement>(null);

    const handleAccordion = () => {
        if (contentRef.current) {
            setIsOpen(!isOpen);
            setHeight(isOpen ? "0px" : `${contentRef.current.scrollHeight}px`);
        }
    };

    // const [isOpen, setIsOpen] = useState(true); // Default state is open
    // const [height, setHeight] = useState("0px");

    // const contentRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     // Delay height calculation to ensure accurate scrollHeight
    //     setTimeout(() => {
    //         if (contentRef.current) {
    //             setHeight(`${contentRef.current.scrollHeight}px`);
    //         }
    //     }, 500); // Minimal delay
    // }, []);


    // const handleAccordion = () => {
    //     if (contentRef.current) {
    //         setIsOpen(!isOpen);
    //         setHeight(isOpen ? "0px" : `${contentRef.current.scrollHeight}px`);
    //     }
    // };

    const dispatch = useDispatch();

    const cartItems = useSelector((state: RootState) => state.cart.items); // Access the cart from Redux

    const [isAdded, setIsAdded] = useState(false); // State to track if the item is added



    const handleAddToCart = () => {
        const packageItem = {
            // serviceID: packageID || '',                        // Use `id` as serviceID
            serviceID: packageID,                        // Use `id` as serviceID
            serviceName: packageName || '',             // Use `packageName` as serviceName
            price: packageAmount || '0',                // Use `packageAmount` as price
            categoryName: packageName || 'Bridal Package',             // Set a category name
            image: packageImage || '',                  // Use `packageImage` as image
            serviceDesc: packageName || 'Bridal Package Services',     // Optional description
            serviceTime: '3 hours',                     // Optional service time
        };

        dispatch(addToCart(packageItem)); // Dispatch action to add the package to the cart
        setIsAdded(true); // Set the button state to "Added"

        // Dispatch action to scroll to cart area
        dispatch(scrollToCartItemArea());

    };


    // Check if the item is in the cart and update the isAdded state
    useEffect(() => {
        const itemExistsInCart = cartItems.some(item => item.serviceID === packageID);
        setIsAdded(itemExistsInCart);
    }, [cartItems, packageID]);

    return (
        <div className="border-b-[1px] border-mindfulLightGrey mb-5">
            <div
                onClick={handleAccordion}
                className="flex justify-between items-center pb-5 cursor-pointer"
            >
                <h5 key={packageID} className="text-xl text-mindfulBlack font-semibold">
                    {packageName}
                </h5>
                <IoChevronDown
                    className={`text-[22px] text-mindfulGreyTertiary transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""
                        }`}
                />
            </div>
            <div
                ref={contentRef}
                style={{ maxHeight: `${height}` }}
                className="overflow-hidden transition-max-height duration-300 ease-in-out max-md:h-full"
            >
                {/* <p className="text-lg text-mindfulBlack mb-5">
                    {faqAnswer}
                </p> */}

                {/* Packages Content */}
                <div className="w-full flex items-center justify-between mb-5 max-md:flex-col max-md:items-start max-md:gap-4 max-md:space-x-0">

                    <div className="max-lg:w-[40%]">
                        {/* <img src={aiModel} alt="" className="w-60 rounded-lg" /> */}
                        {/* <img src={packageImage || aiModel} alt={packageName} className="w-60 rounded-lg" /> */}
                    </div>

                    <div className="max-lg:w-[60%] h-full max-md:w-full ">
                        <div className="flex items-center mb-5 max-lg:w-full max-sm:flex-col">
                            <ul role="list" className="w-[36rem] list-disc grid grid-cols-2 max-lg:w-[100%] max-md:w-full max-md:pl-5 max-sm:grid-cols-1">
                                {/* {Array.isArray(packageServices) &&
                                    packageServices.map((service, index) => (
                                        <li key={index} className="marker:text-main text-md text-mindfulBlack mb-3">
                                            {service}
                                        </li>
                                    ))} */}

                                {servicesArray?.map((service, index) => (
                                    <li key={index} className="marker:text-main text-md text-mindfulBlack mb-3">
                                        {service}
                                    </li>
                                ))}

                                {/* <li className="marker:text-main text-md text-mindfulBlack mb-3">Bridal Glow Facial</li>
                                <li className="marker:text-main text-md text-mindfulBlack mb-3">Hair Spa</li>
                                <li className="marker:text-main text-md text-mindfulBlack mb-3">Aroma Pedicure</li>
                                <li className="marker:text-main text-md text-mindfulBlack mb-3">Aroma Manicure</li>
                            </ul>

                            <ul role="list" className="w-80 list-disc">
                                <li className="marker:text-main text-md text-mindfulBlack mb-3">Full Arm Waxing</li>
                                <li className="marker:text-main text-md text-mindfulBlack mb-3">Full Leg Waxing</li>
                                <li className="marker:text-main text-md text-mindfulBlack mb-3">Eyebrows</li>
                                <li className="marker:text-main text-md text-mindfulBlack mb-3">Blouse </li> */}
                            </ul>
                        </div>

                        <div className="flex items-center justify-between w-10/12 max-sm:flex-wrap max-sm:items-start max-sm:gap-2 max-sm:space-x-0">
                            {/* Rate & Appointment */}
                            <div className="">
                                <div className="mb-2">
                                    <p className="text-[22px] text-mindfulGreen font-semibold">&#8377; {packageAmount}</p>
                                </div>
                            </div>

                            <div>
                                {/* <button
                                    onClick={handleAddToCart} // Call `handleAddToCart` on button click
                                    className="flex items-center bg-main rounded-[4px] text-lg text-mindfulWhite px-4 py-1.5"
                                >
                                    Book Appointment
                                </button> */}

                                <button
                                    onClick={handleAddToCart}
                                    className={`flex items-center bg-main rounded-[4px] text-lg text-mindfulWhite px-4 py-1.5
                                                 ${isAdded ? "opacity-50 cursor-not-allowed" : ""}`}  // Disable button styles
                                    disabled={isAdded}  // Disable button if item is added to cart
                                >
                                    <BsCartPlusFill className="text-[20px] text-mindfulWhite mr-2" />
                                    {isAdded ? "Added to Cart" : "Add to Cart"}
                                </button>

                            </div>


                        </div>
                    </div>
                </div>


            </div>
        </div >
    );
};
