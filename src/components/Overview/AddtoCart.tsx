// import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from './AddtoCart/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store'; // Adjust this path as needed
import { removeFromCart } from '../../redux/cartSlice';
// import { Link } from 'react-router-dom';
// import { NotifyError } from './common/Toast/ToastMessage';
import { NotifyError } from '../common/Toast/ToastMessage';

export const AddtoCart = () => {

    const cartItems = useSelector((state: RootState) => state.cart.items);
    console.log(cartItems, "cart items");
    const { token } = useSelector((state: RootState) => state.cart); // Token from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Getting the stored provider_id from sessionStorage
    const sessionProviderID = sessionStorage.getItem('selectedProviderId');
    console.log("Selected Provider ID from session storage", sessionProviderID);
    const quantities = useSelector((state: RootState) => state.cart.quantities); // Get quantities from Redux
    // Handle booking navigation on button click
    // const handleBookNow = () => {
    //     if (!token) {
    //         navigate('/Login'); // Navigate to Login if no token
    //     } else {
    //         navigate('/DateTime'); // Proceed to DateTime if token exists
    //     }
    // };
    const handleBookNow = () => {
        // Get the stored serviceType from sessionStorage
        const selectedServiceType = sessionStorage.getItem('selectedServiceType');
        console.log("Service Type Book Now:", selectedServiceType); // Log the serviceType
        // Calculate the total cart price
        const totalCartPrice = cartItems.reduce((total, item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQuantity = quantities[item.serviceID] || 1;
        return total + (itemPrice * itemQuantity);
        }, 0);
        console.log("Total Cart Price:", totalCartPrice); // Log the total price
        if (!token) {
            navigate('/Login'); // Navigate to Login if no token
        } else if (cartItems.length > 0 && sessionProviderID) {
            // navigate('/DateTime'); // Proceed to DateTime if token exists
            if (selectedServiceType === "Salon Service") {
                navigate('/DateTime');
            }
            else {
                //NotifyError("FreeLaunce");
                if (totalCartPrice < 1000) {
                    NotifyError("Please add more services to your cart to meet the minimum requirement . Thank you for your understanding!"); // Display error message
                } else {
                    navigate('/DateTime');
                }
            }
        }
    };
    console.log("Cart Items", cartItems);

    const handleRemove = (serviceID: number) => {
        dispatch(removeFromCart(serviceID));
    };

    return (
        <div className="rounded-[8px] border-[1px] border-mindfulLightGrey px-5 py-5">
            <div>
                <h5 className="text-[22px] text-mindfulBlack font-semibold mb-2">Cart</h5>
            </div>

            <div>
                {/* {cartItems.map((item) => (
                    <CartItem key={item.id} id={item.id} name={item.name} removeItem={removeItem} />
                ))} */}
                {/* <CartItem />
                <CartItem /> */}
                {cartItems.length === 0 ? (
                    <p className="text-lg text-mindfulBlack font-medium">Your cart is empty</p> // Show empty message
                ) : (
                    cartItems.map((item) => (
                        <CartItem
                            key={item.serviceID}
                            serviceID={item.serviceID}
                            serviceName={item.serviceName}
                            price={item.price || 0} // Pass the price to CartItem
                            removeItem={() => handleRemove(item.serviceID)}
                        />
                    ))
                )}
            </div>

            <div>
                {/* <button className="w-full bg-main rounded-[7px] text-lg text-mindfulWhite font-semibold px-4 py-2">Book Now</button> */}

                {/* Conditionally render Book Now button if there are items in the cart */}
                {cartItems.length > 0 && (
                    // <Link to="/Login">
                    <div className="mt-5">
                        <button
                            onClick={handleBookNow}
                            className="w-full bg-main rounded-[7px] text-lg text-mindfulWhite font-semibold px-4 py-2"
                        >
                            Book Now
                        </button>
                    </div>
                    // </Link>
                )}
            </div>
        </div>
    )
}
