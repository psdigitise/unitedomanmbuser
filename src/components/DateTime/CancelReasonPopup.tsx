import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
//import { useNavigate } from 'react-router-dom';
// import { ShimmerTable } from 'shimmer-effects-react';

interface CancelReasonPopupProps {
    closePopup: () => void;
    cancellationMessage: string;
    // refreshData: () => void;
}

export const CancelReasonPopup: React.FC<CancelReasonPopupProps> = ({ closePopup, cancellationMessage }) => {
    // const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);
     const [error,] = useState<string | null>(null);
    // if (loading) return <div>Loading...</div>;
    // if (loading) return <div>
    //     <div>
    //         <ShimmerTable
    //             mode="light"
    //             row={2}
    //             col={4}
    //             border={1}
    //             borderColor={"#cbd5e1"}
    //             rounded={0.25}
    //             rowGap={16}
    //             colPadding={[15, 5, 15, 5]}
    //         />
    //     </div>
    // </div>;
    // if (error) return <div>{error}</div>;


    return (
        <div>
            <div>
                <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                    <div className="container mx-auto">
                        <div className="relative bg-white rounded-[5px] w-5/12 mx-auto px-5 py-5 max-xl:w-2/4">
                            <div className="relative mb-10 text-center">
                                <h2 className="text-2xl text-mindfulBlack font-semibold border-b-2 border-gray-300">Your Booking Has Been Cancelled</h2>
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
                                <p className="text-lg text-mindfulBlack"> {cancellationMessage}</p>
                                {error && <p className="text-sm text-red-600">{error}</p>}

                                {/* Buttons */}
                                {/* <div className="pt-5">
                                    <div className="flex items-center justify-center space-x-5">
                                        <Button
                                            onClick={closePopup}
                                            buttonType="button"
                                            buttonTitle="Cancel"
                                            className="bg-mindfulWhite text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        />
                                        <Button
                                            buttonType="submit"
                                            buttonTitle={loading ? "Deleting..." : "Delete"}
                                            disabled={loading}
                                            className="bg-mindfulRed text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
