import { useEffect, useState } from "react";
import frequentlyAddedImg from "../../../assets/images/frequentlyAddedImg.png"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../../redux/cartSlice'; // Adjust path as necessary
import { scrollToCartItemArea } from "../../../redux/scrollSlice";
import { RootState } from "../../../redux/store";
import { ClearItemsPopup } from "../ClearItemsPopup";

interface FrequentlyAddedCard {
    serviceID: number;
    serviceName: string;
    image: string;
    price: string;
    categoryName: string;
    serviceDesc: string;
    serviceTime: string;
    branchID?: number;
}

export const FrequentlyAddedCard: React.FC<FrequentlyAddedCard> = ({ serviceID, serviceName, image, price, categoryName, serviceDesc, serviceTime, branchID }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [isAdded, setIsAdded] = useState(false);
    const [showClearItemsPopup, setShowClearItemsPopup] = useState(false);

    // Add close handler
    const handleClosePopup = () => {
        setShowClearItemsPopup(false);
    };
    // Check if the item is in the cart and update the isAdded state
    useEffect(() => {
        const itemExistsInCart = cartItems.some(item => item.serviceID === serviceID);
        setIsAdded(itemExistsInCart);
    }, [cartItems, serviceID]);

    // Function to handle adding the service to the cart
    // const handleAddToCart = () => {
    //     const item = {
    //         serviceID,
    //         serviceName,
    //         price,
    //         categoryName,
    //         image,
    //         serviceDesc,
    //         serviceTime,
    //         branchID
    //     };
    //     dispatch(addToCart(item)); // Dispatch action to add the service to the cart
    //     setIsAdded(true); // Set the button state to "Added"
    //     // Dispatch action to scroll to cart area
    //     dispatch(scrollToCartItemArea());
    // };

    const handleAddToCart = () => {
        const currentProviderId = sessionStorage.getItem('selectedProviderId');
        const lastProviderId = sessionStorage.getItem('lastProviderId');
        const currentBranchId = sessionStorage.getItem('selectedBranchId'); // Get the current branch ID from sessionStorage
        const lastBranchId = sessionStorage.getItem('lastBranchId');

        if (cartItems.length === 0) {
            sessionStorage.setItem('lastProviderId', currentProviderId || '');
            sessionStorage.setItem('lastBranchId', lastBranchId || ''); // Set the current branch ID
            const item = {
                serviceID,
                serviceName,
                price,
                categoryName,
                image,
                serviceDesc,
                serviceTime,
                branchID
            };

            dispatch(addToCart(item)); // Dispatch action to add the package to the cart
            setIsAdded(true); // Set the button state to "Added"

            // Dispatch action to scroll to cart area
            dispatch(scrollToCartItemArea());
        } else {
            if (currentProviderId === lastProviderId && currentBranchId === lastBranchId) {
                const item = {
                    serviceID,
                    serviceName,
                    price,
                    categoryName,
                    image,
                    serviceDesc,
                    serviceTime,
                    branchID
                };
                dispatch(addToCart(item)); // Dispatch action to add the package to the cart
                setIsAdded(true); // Set the button state to "Added"
                dispatch(scrollToCartItemArea());
            } else {
                setShowClearItemsPopup(true);
            }
        }
    };

    return (
        <div key={serviceID} className="flex items-start border-b-2 border-mindfulLightGrey pb-5 space-x-5 max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:space-x-0">
            <div>
                <img
                    src={image || frequentlyAddedImg}
                    alt={serviceName}
                    className="w-32 h-28 rounded-lg flex-shrink-0 max-sm:w-[120px] max-sm:h-[120px]"
                />
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
            {/* Add ClearItemsPopup */}
            {showClearItemsPopup && (<ClearItemsPopup closePopup={handleClosePopup} />)}
        </div>
    )
}
