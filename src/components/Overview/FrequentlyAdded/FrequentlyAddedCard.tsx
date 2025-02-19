import { useEffect, useState } from "react";
import frequentlyAddedImg from "../../../assets/images/frequentlyAddedImg.png"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../../redux/cartSlice'; // Adjust path as necessary
import { scrollToCartItemArea } from "../../../redux/scrollSlice";
import { RootState } from "../../../redux/store";

interface FrequentlyAddedCard {
    serviceID: number;
    serviceName: string;
    image: string;
    price: string;
    categoryName: string;
    serviceDesc: string;
    serviceTime: string;
}

export const FrequentlyAddedCard: React.FC<FrequentlyAddedCard> = ({ serviceID, serviceName, image, price, categoryName, serviceDesc, serviceTime }) => {

    const dispatch = useDispatch();

    const cartItems = useSelector((state: RootState) => state.cart.items); // Access the cart from Redux

    const [isAdded, setIsAdded] = useState(false); // State to track if the item is added

    // Check if the item is in the cart and update the isAdded state
    useEffect(() => {
        const itemExistsInCart = cartItems.some(item => item.serviceID === serviceID);
        setIsAdded(itemExistsInCart);
    }, [cartItems, serviceID]);

    // Function to handle adding the service to the cart
    const handleAddToCart = () => {
        const item = {
            serviceID,
            serviceName,
            price,
            categoryName,
            image,
            serviceDesc,
            serviceTime
        };
        dispatch(addToCart(item)); // Dispatch action to add the service to the cart
        setIsAdded(true); // Set the button state to "Added"


        // Dispatch action to scroll to cart area
        dispatch(scrollToCartItemArea());
    };

    // const handleRemove = (serviceID: number) => {
    //     dispatch(removeFromCart(serviceID));
    // };

    return (
        <div key={serviceID} className="flex items-start border-b-2 border-mindfulLightGrey pb-5 space-x-5">
            <div>
                <img src={frequentlyAddedImg || image} alt={serviceName} />
            </div>
            <div>
                <div className="mb-2">
                    <h5 className="text-lg text-mindfulBlack font-semibold">{serviceName}</h5>
                    <p className="text-md text-mindfulGreyTertiary font-semibold">{categoryName}</p>
                    <p className="text-md text-mindfulGreyTertiary font-semibold">&#8377; {price}</p>
                </div>

                <div>
                    <button
                        onClick={handleAddToCart}
                        // className="w-fit text-main font-semibold rounded-[7px] border-[2px] border-mindfulLightGrey px-5 py-1"
                        className={`w-fit font-semibold rounded-[7px] border-[2px] px-5 py-1 
                            ${isAdded
                                ? "text-gray-400 border-gray-400 cursor-not-allowed"
                                : "text-main border-mindfulLightGrey"
                            }`}
                        disabled={isAdded} // Disable the button if item is added
                    >
                        {isAdded ? "Added" : "Add"}
                    </button>
                </div>
            </div>

        </div>
    )
}
