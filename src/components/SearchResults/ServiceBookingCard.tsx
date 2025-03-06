// import serviceImg from "../../assets/images/serviceImg.png";
import salonIcon from "../../assets/icons/salonIcon.svg";
import specialistIcon from "../../assets/icons/specialistIcon.svg";
// import femaleIcon from "../../assets/icons/femaleIcon.png";
// import timerIcon from "../../assets/icons/timerIcon.svg";
import verified from "../../assets/icons/verified.png";
import { FaStar } from "react-icons/fa";
import locationIconGreen from "../../assets/icons/locationIconGreen.png";
import distanceIcon from "../../assets/icons/distanceIcon.png";
import { Link } from "react-router-dom";

interface ServiceBookingCardProps {
  serviceProviderID?: number;
  serviceProviderName: string;
  serviceProviderRating: number;
  city: string;
  state: string;
  branchID: number;
  branchCity: string;
  branchName: string;
  branchState: string;
  distance?: number;
  verifiedCheckmark?: boolean;
  serviceName?: string;
  allServices: string;
  serviceTypeID: number;
  image_url: string;
  reviewCount: string;
  starRating: number;
}

export const ServiceBookingCard: React.FC<ServiceBookingCardProps> = ({
  serviceProviderID,
  // serviceProviderName,
  // serviceProviderRating,
  city,
  state,
  branchID,
  branchCity,
  branchName,
  branchState,
  distance,
  verifiedCheckmark,
  // serviceName,
  allServices,
  serviceTypeID,
  image_url,
  reviewCount,
  starRating
}) => {
  return (
    <>
      <div className="pb-5">
        <div className="border-b-2 pb-5">
          <div className="flex flex-wrap max-sm:flex-col max-sm:gap-3">
            <div className="2xl:w-[20%] xl:w-[22%] lg:w-[20%] md:w-[27%] sm:w-[33%] w-[24%]">
              <div className="relative">
                {/* {/ Service Image /} */}
                <div className="sm:w-[180px] sm:h-[180px] rounded-md border-[1px] border-mindfulLightGrey flex items-center sm:p-5 p-[10px] max-sm:w-[200px] max-sm:h-[100px]">
                  {/* <img src={serviceImg} alt="" className="w-full" /> */}
                  <img src={image_url} alt="" className="w-fit max-sm:w-[200px] max-sm:h-[100px] max-sm:object-contain max-sm:flex-shrink-0" />
                </div>

                {/* Timer Icon */}
                {/* <div className="absolute top-5 left-0 flex items-center bg-mindfulBlue py-1 px-2 rounded-r-full">
                <div>
                  <img src={timerIcon} alt="timer-icon" />
                </div>
                <div>
                  <p className="text-sm text-mindfulWhite">45 mins</p>
                </div>
              </div> */}
              </div>
            </div>
            <div className="2xl:w-[80%] xl:w-[78%] lg:w-[80%] md:w-[73%] sm:w-[67%] w-[74%] pl-[15px] sm:pl-[0] max-sm:pl-0">
              {/* {/ Service Booking Card Content /} */}
              <div className="w-full space-y-3">
                <div className="md:border-b-2 md:border-dotted space-y-3 pb-4">
                  {/* {/ Service Provider Name /} */}
                  <div className="flex justify-between lg:items-center items-start">
                    <div className="flex items-center">
                      {/* <div>
                      Salon Icon
                      <div className="bg-mindfulBlue rounded-full px-1 py-1">
                        <img src={salonIcon} alt="parlour-icon" />
                      </div>

                      Specialist Icon
                      <div className="bg-main rounded-full px-1 py-1">
                        <img src={specialistIcon} alt="specialist-icon" />
                      </div>
                    </div> */}

                      {serviceTypeID === 1 ? (
                        <div className="bg-mindfulBlue rounded-full px-1 py-1 lg:block hidden">
                          {/* {/ Salon Icon /} */}
                          <img src={salonIcon} alt="parlour-icon" />
                        </div>
                      ) : serviceTypeID === 2 ? (
                        <div className="bg-main rounded-full px-1 py-1 lg:block hidden">
                          {/* {/ Specialist Icon /} */}
                          <img src={specialistIcon} alt="specialist-icon" />
                        </div>
                      ) : (
                        <div className="bg-mindfulBlue rounded-full px-1 py-1 lg:block hidden">
                          {/* {/ Salon Icon /} */}
                          <img src={salonIcon} alt="parlour-icon" />
                        </div>
                      )}

                      {/* {/ Service Provider Name /} */}
                      <h5 className="sm:text-[18px] text-mindfulBlack font-semibold text-[16px] lg:pl-[5px]">
                        {/* {serviceProviderName} */}
                        {branchName} 
                      </h5>
                    </div>

                    {/* {/ Verified /} */}
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

                  {/* {/ Ratings & Reviews /} */}
                  <div className="flex items-center space-x-2">
                    {starRating > 0 &&
                      <div className="flex items-center w-fit bg-mindfulYellow rounded-sm px-2 py-1 space-x-1">
                        <FaStar className="sm:text-[18px] text-mindfulWhite text-[16px]" />
                        <p className="text-sm text-mindfulWhite font-semibold text-[16px]">
                          {/* {serviceProviderRating} */}
                          {starRating}
                        </p>
                      </div>}


                    {/* <div>
                      <p className="text-md text-mindfulGreyTertiary sm:text-[16px] text-[14px]">
                        ({reviewCount})
                      </p>
                    </div> */}

                    {/* If the user has reviewed the service provider, display the review count. 
                    Otherwise, display a message (Not show the reviewCount) indicating that the user has not reviewed the service provider yet. */}
                    <div>
                      {String(reviewCount) !== "0 reviews" && (
                        <p className="text-md text-mindfulGreyTertiary sm:text-[16px] text-[14px]">
                          ({reviewCount})
                        </p>
                      )}
                    </div>
                  </div>

                  {/* {/ Service Provider Tags /} */}
                  <div className="flex items-center space-x-2">
                    {allServices.split(",").map((service) => (
                      <div
                        key={serviceProviderID}
                        className="w-fit bg-mindfulLightBlue text-mindfulBlack px-2 py-1"
                      >
                        <p className="text-[14px]">{service}</p>
                      </div>
                    ))}
                    {/* <div className="w-fit bg-mindfulLightBlue text-sm text-mindfulBlack px-2 py-1">
                    <p>{allServices}</p>
                  </div> */}
                    {/* <div className="w-fit bg-mindfulLightBlue text-sm text-mindfulBlack px-2 py-1">
                    <p>Manicure</p>
                  </div>
                  <div className="w-fit bg-mindfulLightBlue text-sm text-mindfulBlack px-2 py-1">
                    <p>Hair Spa</p>
                  </div>
                  <div className="w-fit bg-mindfulLightBlue text-sm text-mindfulBlack px-2 py-1">
                    <p>Facial</p>
                  </div> */}
                  </div>
                </div>

                {/* {/ Location & Distance Desktop/} */}
                <div className="md:flex justify-between items-center hidden">
                  <div className="flex items-center space-x-2">
                    {/* {/ Location Icon /} */}
                    <div>
                      <img src={locationIconGreen} alt="" />
                    </div>

                    <div className="">
                      <p className="text-[16px] text-mindfulBlack font-medium">
                        {/* {city}, {state} */}
                        {branchCity}, {branchState}
                      </p>
                    </div>
                  </div>

                  {/* {/ Distance /} */}
                  <div className="flex items-center space-x-2">
                    <div className="">
                      <img src={distanceIcon} alt="distance icon" />
                    </div>

                    <div>
                      <p className="text-[16px] text-mindfulBlack font-medium">
                        Distance {distance} km
                      </p>
                    </div>
                  </div>
                </div>

                {/* {/ Book a Service Button /} */}
                <div className="md:block hidden">
                  {/* {/ Dynamically set provider_id in the URL /} */}
                  <Link to={`/Overview?provider_id=${serviceProviderID}&branch_id=${branchID}`}>
                    <button className="bg-main rounded-[4px] text-mindfulWhite font-normal px-4 py-2 text-[16px]">
                      Book a Service
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* {Mobile} */}
            <div className="w-full sm:mt-[25px] md:hidden border-t-2 border-dotted pt-[15px]">
              {/* {/ Location & Distance Mobile/} */}
              <div className="flex service-list-location-distance-custom-class md:hidden">
                <div className="flex items-center space-x-2">
                  {/* {/ Location Icon /} */}
                  <div>
                    <img src={locationIconGreen} alt="" />
                  </div>

                  <div className="">
                    <p className="text-[14px] text-mindfulBlack font-medium">
                      {city}, {state}
                    </p>
                  </div>
                </div>

                {/* {/ Distance /} */}
                <div className="flex items-center space-x-2 mobile-margin-top">
                  <div className="">
                    <img src={distanceIcon} alt="distance icon" />
                  </div>

                  <div>
                    <p className="text-[14px] text-mindfulBlack font-medium">
                      Distance {distance} km
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:hidden block mt-[20px]">
                {/* {/ Dynamically set provider_id in the URL /} */}
                <Link to={`/Overview?provider_id=${serviceProviderID}&branch_id=${branchID}`}>
                  <button className="bg-main rounded-[4px] text-mindfulWhite font-normal px-4 py-2 text-[14px]">
                    Book a Service
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
