import React, { useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5'
import { useLocation } from 'react-router-dom';
import {
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

interface SharePopupProps {
    closePopup: () => void;
}

export const SharePopup: React.FC<SharePopupProps> = ({ closePopup }) => {

    const location = useLocation();
    const shareUrl = `${window.location.origin}${location.pathname}${location.search}`; // Construct full share URL

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reset after 3 seconds
    };

    return (
        <div>
            <div className="fixed inset-0 bg-mindfulBlack bg-opacity-50 flex justify-center items-center z-50">
                <div className="container mx-auto">

                    <div className="relative bg-white rounded-[5px] w-4/12 mx-auto px-5 py-5">


                        <div className="relative mb-10">
                            <h2 className="text-2xl text-mindfulBlack font-semibold">Share this page:</h2>
                            <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulGrey rounded-md w-full h-0.5">
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
                            {/* <p className="text-lg text-mindfulBlack">
                                Are you sure you want to clear items in the cart for the provider ?
                            </p> */}

                            <div className="flex items-center justify-center space-x-4 mb-3">
                                {/* Facebook */}
                                <FacebookShareButton url={shareUrl}>
                                    <FacebookIcon size={40} round />
                                </FacebookShareButton>

                                {/* Twitter */}
                                <TwitterShareButton url={shareUrl} title="Check this out!">
                                    <TwitterIcon size={40} round />
                                </TwitterShareButton>

                                {/* LinkedIn */}
                                <LinkedinShareButton url={shareUrl}>
                                    <LinkedinIcon size={40} round />
                                </LinkedinShareButton>

                                {/* WhatsApp */}
                                <WhatsappShareButton url={shareUrl} separator=":: ">
                                    <WhatsappIcon size={40} round />
                                </WhatsappShareButton>

                                {/* Telegram */}
                                <TelegramShareButton url={shareUrl}>
                                    <TelegramIcon size={40} round />
                                </TelegramShareButton>

                                {/* Pinterest */}
                                <PinterestShareButton url={shareUrl} media={`${shareUrl}/image.jpg`}>
                                    <PinterestIcon size={40} round />
                                </PinterestShareButton>

                                {/* Reddit */}
                                <RedditShareButton url={shareUrl} title="Check this out!">
                                    <RedditIcon size={40} round />
                                </RedditShareButton>

                            </div>


                            <div className="flex items-center bg-mindfulWhite text-mindfulBlack rounded-lg p-3 w-full max-w-md mx-auto">
                                {/* Input Field */}
                                <input
                                    type="text"
                                    value={shareUrl}
                                    readOnly
                                    className="flex-1 bg-mindfulWhite text-mindfulBlack border-[1px] border-mindfulBlack rounded-lg focus-within:outline-none px-2 py-1"
                                />

                                {/* Copy Button */}
                                <button
                                    onClick={handleCopy}
                                    className="ml-3 px-4 py-1 bg-main text-mindfulWhite rounded-md hover:bg-green-500"
                                >
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>

                            {/* Buttons */}
                            {/* <div className="pt-5">
                                <div className="flex items-center justify-center space-x-5">
                                    Cancel Button
                                    <button
                                        onClick={closePopup}
                                        className="bg-mindfulLightBlue text-md text-mindfulBlack rounded-sm px-4 py-1.5 focus-within:outline-none"
                                    >
                                        No
                                    </button>

                                    Submit Button
                                    <button
                                        onClick={handleClearItems}
                                        className="bg-main text-md text-mindfulWhite rounded-sm px-4 py-1.5 focus-within:outline-none"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div> */}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
