/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../../../redux/cartSlice'; // Adjust the path as needed
import { RootState } from '../../../redux/store'; // Assuming you have the RootState type from Redux store


interface CartItemProps {
    serviceID: number,
    serviceName: string,
    price?: number | string; // Allow price to be number or string initially,
    removeItem: (id?: number) => void; // Accepts serviceID as an argument
}



export const CartItem: React.FC<CartItemProps> = ({ serviceID, serviceName, price = 0, removeItem }) => {
    console.log(serviceID);

    const dispatch = useDispatch();

    // Get the quantity of the current item from the Redux store
    const quantity = useSelector((state: RootState) => state.cart.quantities[serviceID] || 1); // Default to 1 if not found

    // const [count, setCount] = useState(1); // Start with a minimum of 1
    // const basePrice = 799; // Base price of the item
    const numericPrice = Number(price) || 0; // Ensure price is a number

    const handleIncrement = () => {
        // setCount(count + 1);
        dispatch(incrementQuantity(serviceID)); // Dispatch increment action
    };

    const handleDecrement = () => {
        // if (count > 1) {
        //     setCount(count - 1);
        // }
        if (quantity > 1) {
            dispatch(decrementQuantity(serviceID)); // Dispatch decrement action if quantity > 1
        }
    };

    const handleRemove = () => {
        dispatch(removeFromCart(serviceID)); // Dispatch action to remove from cart
        removeItem(serviceID); // Also call the passed removeItem function
    };

    // const totalPrice = numericPrice * count; //  // Calculate total price dynamically based on count and price

    // Calculate the total price for this item
    const totalPrice = numericPrice * quantity;

    return (
        <div>
            <div className="flex justify-between items-center border-b-2 border-mindfulLightGrey border-dashed pb-5 mb-5 space-x-5">
                <div className="w-6/12">
                    {/* <p className="text-md text-mindfulBlack font-medium">Elysian British Rose Manicure</p> */}
                    <p className="text-md text-mindfulBlack font-medium">{serviceName}</p>

                    <div>
                        <p onClick={handleRemove} className="text-sm text-main cursor-pointer">Remove service</p>
                    </div>
                </div>



                <div className="w-fit rounded-[5px] border-[2px] border-mindfulLightGrey">
                    <div className="flex items-center px-3 py-1 space-x-5">
                        <p onClick={handleDecrement} className="text-lg text-mindfulBlack font-medium cursor-pointer">-</p>
                        {/* <p className="text-md text-mindfulBlack font-medium">{count}</p> */}
                        <p className="text-md text-mindfulBlack font-medium">{quantity}</p>
                        <p onClick={handleIncrement} className="text-lg text-mindfulBlack font-medium cursor-pointer">+</p>
                    </div>
                </div>

                <div>
                    {/* Dynamically show total price */}
                    <p className="text-md text-mindfulBlack font-medium">&#8377; {totalPrice} </p>
                </div>
            </div>
        </div>
    )
}