import React from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';

interface ClearItemsPopupProps {
    closePopup: () => void;
}

export const ClearItemsPopup: React.FC<ClearItemsPopupProps> = ({ closePopup }) => {
    const dispatch = useDispatch();

    const handleClearItems = () => {
        dispatch(clearCart());
        const currentProviderId = sessionStorage.getItem('selectedProviderId');
        const currentBranchId = sessionStorage.getItem('selectedBranchId');
        if (currentProviderId && currentBranchId) {
            sessionStorage.setItem('lastProviderId', currentProviderId);
            sessionStorage.setItem('lastBranchId', currentBranchId);
        }
        closePopup();
    };

    return (
        <div>
            <div>
                <div>
                    <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                        <div className="container mx-auto">

                            <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5 max-lg:w-[300px]">


                                <div className="relative mb-10">
                                    <h2 className="text-2xl text-mindfulBlack font-semibold">Clear Items</h2>
                                    <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulgrey rounded-md w-full h-0.5">
                                    </div>
                                </div>

                                {/* Close Button */}
                                <div
                                    onClick={closePopup}
                                    className="absolute top-5 right-5 w-fit cursor-pointer"
                                >
                                    <IoCloseCircle className="text-mindfulGrey text-[32px]" />
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <p className="text-lg text-mindfulBlack">Are you sure you want to clear items in the cart for the provider ?</p>

                                    {/* Buttons */}
                                    <div className="pt-5">
                                        <div className="flex items-center justify-center space-x-5">
                                            {/* Cancel Button */}
                                            <button
                                                onClick={closePopup}
                                                className="bg-mindfulLightBlue text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                            >
                                                No
                                            </button>

                                            {/* Submit Button */}
                                            <button
                                                onClick={handleClearItems}
                                                className="bg-main text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
