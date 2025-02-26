import React, { useState, useEffect } from "react";
import manicure from "../../../../assets/images/manicure.png";
import timerIcon from "../../../../assets/icons/timerIcon.svg";
import { BsCartPlusFill } from "react-icons/bs";
import { RootState } from '../../../../redux/store'; // Import RootState type
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../redux/cartSlice'; // Adjust this path as needed
import { scrollToCartItemArea } from '../../../../redux/scrollSlice'; // Import the scroll action
import { ClearItemsPopup } from '../../ClearItemsPopup';

export interface AppointmentCardProps {
  serviceID: number,
  serviceName: string,
  serviceDesc: string,
  price?: number | string; // Allow price to be either number or string;
  image?: string,
  serviceTime: string,
  branchID?: number; // Change to optional
}
export const AppointmentCard: React.FC<AppointmentCardProps> = ({ serviceID, serviceName, serviceDesc, price, image, serviceTime, branchID }) => {

  // const [isExpanded, setIsExpanded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);  // State to track if the item is added to the cart
  const cartItems = useSelector((state: RootState) => state.cart.items); // Access the cart from Redux

  const dispatch = useDispatch();

  // Add state for popup
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

  // Toggle between showing the full description or only the truncated version
  // const toggleReadMore = () => {
  //   setIsExpanded(!isExpanded);
  // };

  // State to manage cart items
  // const [cart, setCart] = useState<AppointmentCardProps[]>([]);
  // console.log("Cart items:", cart);

  // Add Service to Cart
  // const addToCart = (service: AppointmentCardProps) => {
  //   setCart([...cart, service]);
  //   console.log(`Added service: ${service.serviceName}`);
  // };

  // Add Service to Cart and disable the button
  const handleAddToCart = () => {
    const numericPrice = Number(price) || 0;
    const currentProviderId = sessionStorage.getItem('selectedProviderId');
    const lastProviderId = sessionStorage.getItem('lastProviderId');

    // If this is the first item being added to cart
    if (cartItems.length === 0) {
      sessionStorage.setItem('lastProviderId', currentProviderId || '');
      dispatch(addToCart({ serviceID, serviceName, serviceDesc, price: numericPrice, image, serviceTime, branchID }));
      setIsAdded(true);
      dispatch(scrollToCartItemArea());
    } else {
      if (currentProviderId === lastProviderId) {
        dispatch(addToCart({ serviceID, serviceName, serviceDesc, price: numericPrice, image, serviceTime, branchID }));
        setIsAdded(true);
        dispatch(scrollToCartItemArea());
      } else {
        setShowClearItemsPopup(true);
      }
    }
  };

  return (
    <>
      <div className="flex items-center space-x-5 max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:space-x-0 max-sm:border-b-2 max-sm:pb-4">
        <div className="relative flex-shrink-0">
          <div className="w-full h-full">
            <img src={image || manicure} alt="" className="w-44 h-40 rounded-lg flex-shrink-0" />
          </div>

          {/* Timer Icon */}
          <div className="absolute top-5 left-0 flex items-center space-x-1 bg-mindfulBlue py-1 px-2 rounded-r-full">
            <div>
              <img src={timerIcon} alt="timer-icon" />
            </div>
            <div>
              <p className="text-sm text-mindfulWhite">{serviceTime}</p>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-lg text-mindfulBlack font-semibold mb-2 max-sm:text-base">
            {serviceName}
          </h5>

          {/* <div className="mb-2">
            Use tailwind inline styles for truncation
            <p
              className={`w-3/4 text-lg text-mindfulBlack mb-2
                 ${!isExpanded ? "line-clamp-2" : ""}`} // Truncate to 3 lines if not expanded
            >
              {serviceDesc}
            </p>
            Read More / Read Less Button
            {serviceDesc.length > 100 && (
              <button
                onClick={toggleReadMore}
                className="text-blue-500"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div> */}

          <div className="flex justify-between items-center">
            <div className="mb-2">
              <p className="text-[22px] text-mindfulGreen font-semibold">
                &#8377; {price}
              </p>
            </div>

          </div>

          {/* Add "Add to Cart" Button */}
          <div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center bg-main rounded-[4px] text-lg text-mindfulWhite px-4 py-1.5 max-lg:text-base max-xl:px-2
                   ${isAdded ? "opacity-50 cursor-not-allowed" : ""}`}  // Disable button styles
              disabled={isAdded}  // Disable button if item is added to cart
            >
              <BsCartPlusFill className="text-[20px] text-mindfulWhite mr-2 max-xl:text-base" />
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Add ClearItemsPopup */}
      {showClearItemsPopup && (<ClearItemsPopup closePopup={handleClosePopup} />)}
    </>
  );
};
