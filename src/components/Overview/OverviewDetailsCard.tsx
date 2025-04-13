import React, { useState } from "react";
// import overviewCardImg from "../../assets/images/overviewCardImg.png";
import salonIcon from "../../assets/icons/salonIcon.svg";
import specialistIcon from "../../assets/icons/specialistIcon.svg"
// import femaleIcon from "../../assets/icons/femaleIcon.png";
import verified from "../../assets/icons/verified.png";
import { FaStar } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import locationIconBlack from "../../assets/icons/locationIconBlack.png";
import getDirectionIcon from "../../assets/icons/getDirectionIcon.svg";
import virtualTryOn from "../../assets/icons/virtualTryOn.png";
import { SharePopup } from "./OverviewDetailsCard/SharePopup";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { scrollToLocationMap } from "../../redux/scrollSlice"; // Adjust path

interface ServiceBookingCardProps {
  serviceProviderID?: number;
  serviceProviderName: string;
  serviceProviderRating: number;
  verifiedCheckmark: boolean;
  serviceProviderCity: string;
  serviceProviderState: string;
  serviceProviderImage: string;
  branchID: number;
  branchCity: string;
  branchName: string;
  branchState: string;
  branch_latitude: number;
  branch_longitude: number;
  reviewCount: string;
  starRating: number;
  ServiceType: string;
}

export const OverviewDetailsCard: React.FC<ServiceBookingCardProps> = ({
  // serviceProviderID,
  serviceProviderName,
  // serviceProviderRating,
  verifiedCheckmark,
  serviceProviderCity,
  serviceProviderState,
  serviceProviderImage,
  branchCity,
  branchName,
  branchState,
  branch_latitude,
  branch_longitude,
  reviewCount,
  starRating,
  ServiceType
}) => {
  // const dispatch = useDispatch();

  const [showSharePopup, setShowSharePopup] = useState(false);

  const openSharePopup = () => {
    setShowSharePopup(true);
  }

  const closeSharePopup = () => {
    setShowSharePopup(false);
  }

  const handleGetDirectionClick = () => {
    // dispatch(scrollToLocationMap());
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
      branch_latitude
    )},${encodeURIComponent(branch_longitude)}`;
    window.open(mapsUrl, "_blank"); // Opens the map URL in a new tab
  };

  const providerName = sessionStorage.setItem("serviceProviderName", serviceProviderName);
  const providerLocalName = localStorage.setItem("serviceProviderName", serviceProviderName);
  const providerBranchName = localStorage.setItem("serviceProviderBranchName", branchName);
  console.log("Service Provider Name, providerLocalName & providerBranchName log:", providerName, providerLocalName, providerBranchName);


  return (
    <>
      <div className="flex flex-wrap py-[40px] max-sm:flex-col max-sm:gap-3 max-sm:py-5">

        {/* Service Image */}
        <div className="2xl:w-[20%] xl:w-[22%] lg:w-[20%] md:w-[27%] sm:w-[33%] w-[24%]">
          <div className="sm:w-[180px] sm:h-[180px] rounded-md border-[1px] border-mindfulLightGrey flex items-center p-5 max-sm:w-[200px] max-sm:h-[100px]">
            {/* <img src={overviewCardImg} alt="" className="w-fit" /> */}
            <img src={serviceProviderImage} alt="" className="w-fit max-sm:h-[100px] max-sm:object-contain max-sm:flex-shrink-0" />
          </div>
        </div>

        <div className="2xl:w-[80%] xl:w-[78%] lg:w-[80%] md:w-[73%] sm:w-[67%] w-[74%] pl-[15px] sm:pl-[0]">
          {/* Service Booking Card Content */}
          <div className="w-full space-y-3">
            <div className="md:border-b-2 md:border-dotted space-y-3 pb-4">
              {/* Service Provider Name */}
              <div className="flex justify-between lg:items-center items-start">
                <div className="flex items-center space-x-2">
                  {/* Gender Icon  */}
                  {/* <div className="bg-mindfulBlue rounded-full px-1 py-1 lg:block hidden">
                    <img src={salonIcon} alt="" />
                  </div> */}
                  <div >
                    {ServiceType === "Salon Service" ? (
                      <div className="bg-mindfulBlue rounded-full px-1 py-1 lg:block hidden">
                      <img src={salonIcon} alt="parlour-icon" />
                      </div>
                    ) : (
                      <div className="bg-main rounded-full px-1 py-1 lg:block hidden">
                      <img src={specialistIcon} alt="specialist-icon" />
                      </div>
                    )}
                  </div>


                  {/* Service Provider Name */}
                  <h5 className="sm:text-[20px] text-mindfulBlack font-semibold text-[16px] lg:pl-[5px]">
                    {/* {serviceProviderName} */}
                    {branchName}
                  </h5>
                </div>

                {/* Verified */}
                {verifiedCheckmark === true && (
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <div className="block lg:pt-[0] pt-[5px]">
                      <img
                        src={verified}
                        alt="verified-icon"
                        className="w-[15px]"
                      />
                    </div>
                    <div className="lg:block hidden">
                      <p className="text-md text-mindfulBlack font-semibold">
                        Verified
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Ratings & Reviews */}
              <div className="flex items-center space-x-2">
                {starRating > 0 &&
                  <div className="flex items-center w-fit bg-mindfulYellow rounded-sm px-2 py-1 space-x-1">
                    <FaStar className="sm:text-[18px] text-mindfulWhite text-[16px]" />
                    <p className="text-sm text-mindfulWhite font-semibold text-[16px]">
                      {/* {serviceProviderRating} */}
                      {starRating}
                    </p>
                  </div>
                }


                {/* <div>
                  <p className="text-md text-mindfulGreyTertiary sm:text-[16px] text-[14px]">
                    (69.2K reviews)
                    ({reviewCount})
                  </p>
                </div> */}

                <div>
                  {String(reviewCount) !== "0 reviews" && (
                    <p className="text-md text-mindfulGreyTertiary sm:text-[16px] text-[14px]">
                      {/* (69.2K reviews) */}
                      ({reviewCount})
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Location & Distance & Virual Try-on Desktop*/}
            <div className="md:flex justify-between items-center hidden">
              <div className="space-y-3">
                {/* Location Details */}
                <div className="flex items-center space-x-2">
                  {/* Location Icon */}
                  <div>
                    <img src={locationIconBlack} alt="" />
                  </div>

                  <div className="">
                    <p className="text-[16px] text-mindfulBlack font-medium">
                      {/* {serviceProviderCity}, {serviceProviderState} */}
                      {branchCity}, {branchState}
                    </p>
                  </div>
                </div>

                {/* Rating, Share & Get Direction Tags */}
                <div className="">
                  <div className="flex items-center space-x-3">
                    {/* Tap to Rate */}
                    {/* <div className="w-fit bg-mindfulWhite border-[1px] border-mindfulYellow rounded-md px-3 py-1">
                      <div className="flex items-center text-sm text-mindfulBlack font-semibold space-x-2">
                        <FaStar className="text-[18px] text-mindfulYellow" />
                        <p>Tap to Rate</p>
                      </div>
                    </div> */}

                    {/* Share */}
                    <div
                      onClick={openSharePopup}
                      className="w-fit bg-mindfulWhite border-[1px] border-mindfulBlack rounded-md px-3 py-1 cursor-pointer">
                      <div className="flex items-center text-[14px] text-mindfulBlack font-semibold space-x-2">
                        <PiShareFat className="text-[14px]" />
                        <p className="sm:text-[16px] text-[14px]">Share</p>
                      </div>
                    </div>

                    {/* Get Direction */}
                    <div
                      onClick={handleGetDirectionClick}
                      className="w-fit bg-mindfulWhite border-[1px] border-mindfulBlack rounded-md px-3 py-1 cursor-pointer"
                    >
                      <div className="flex items-center text-[14px] text-mindfulBlack font-semibold space-x-2">
                        <div>
                          <img
                            src={getDirectionIcon}
                            alt=""
                            className="w-[18px]"
                          />
                        </div>
                        <p className="sm:text-[16px] text-[14px]">
                          Get Direction
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual TryOn */}
              <a
                href="https://try.mindfulbeauty.ai/"
                //  href="http://localhost:5174/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center">
                  <div className="w-[45px] h-[45px] bg-mindfulYellow px-2 py-2 rounded-full flex items-center sm:translate-x-7">
                    <img
                      src={virtualTryOn}
                      alt="virtual try-on image"
                      className="p-0.5"
                    />
                  </div>

                  <button className="bg-main text-mindfulWhite rounded-[20px] pl-10 pr-4 py-2 sm:flex items-center hidden">
                    Virtual Try-on
                  </button>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* {Mobile} */}
        <div className="w-full sm:mt-[25px] md:hidden border-t-2 border-dotted pt-[15px]">
          {/* Location & Distance & Virual Try-on Mobile*/}
          <div className="flex justify-between items-center md:hidden max-md:flex-wrap max-md:items-start max-md:gap-3">
            <div className="space-y-3">
              {/* Location Details */}
              <div className="flex items-center space-x-2">
                {/* Location Icon */}
                <div>
                  <img src={locationIconBlack} alt="" />
                </div>

                <p className="text-[16px] text-mindfulBlack font-medium">
                  {serviceProviderCity}, {serviceProviderState}
                </p>
              </div>

              {/* Rating, Share & Get Direction Tags */}
              <div className="flex items-center space-x-3 max-sm:flex-wrap max-sm:gap-3 max-sm:items-start max-sm:space-x-0">
                {/* Share */}
                <div className="w-fit bg-mindfulWhite border-[1px] border-mindfulBlack rounded-md px-3 py-1">
                  <div className="flex items-center text-[14px] text-mindfulBlack font-semibold space-x-2">
                    <PiShareFat className="text-[14px]" />
                    <p className="sm:text-[16px] text-[14px]"> Share</p>
                  </div>
                </div>

                {/* Get Direction */}
                <div
                  onClick={handleGetDirectionClick}
                  className="w-fit bg-mindfulWhite border-[1px] border-mindfulBlack rounded-md px-3 py-1 cursor-pointer"
                >
                  <div className="flex items-center text-[14px] text-mindfulBlack font-semibold space-x-2">
                    <div>
                      <img src={getDirectionIcon} alt="" className="w-[18px]" />
                    </div>
                    <p className="sm:text-[16px] text-[14px]">Get Direction</p>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="https://try.mindfulbeauty.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Virtual */}
              <div className="flex items-center">
                <div className="w-[45px] h-[45px] bg-mindfulYellow px-2 py-2 rounded-full flex items-center sm:translate-x-7">
                  <img
                    src={virtualTryOn}
                    alt="virtual try-on image"
                    className="p-0.5"
                  />
                </div>
                <button className="bg-main text-mindfulWhite rounded-[20px] pl-10 pr-4 py-2 sm:flex items-center hidden">
                  Virtual Try-on
                </button>
              </div>
            </a>
          </div>
        </div>
      </div>

      {showSharePopup && <SharePopup closePopup={closeSharePopup} />}
    </>
  );
};
