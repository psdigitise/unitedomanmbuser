import React from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface SalonCardProps {
  cardImage: string;
  cardTitle: string;
  cardLocation: string;
  cardreviews: string;
  providerID: number;
  starRating: number;
}

export const SalonCard: React.FC<SalonCardProps> = ({
  cardImage,
  cardTitle,
  cardLocation,
  cardreviews,
  providerID,
  starRating
}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Card clicked", providerID);
    navigate(`/Overview?provider_id=${providerID}`)
  }

  return (
    <div className="mx-3 my-5 cursor-pointer" onClick={handleClick}>
      <div key={providerID}>
        <img src={cardImage} alt="" className="w-fit " />
      </div>

      <div className="text-start my-3">
        <h5 className="text-[16px] text-mindfulBlack font-semibold">
          {cardTitle}
        </h5>

        <p className="text-mindfulBlack mb-2">{cardLocation}</p>

        <div className="flex items-center space-x-5">
          <div className="flex items-center">

            {/* <FaStar className="text-[#FFD700] text-[20px] mr-1" />
            <FaStar className="text-[#FFD700] text-[20px] mr-1" />
            <FaStar className="text-[#FFD700] text-[20px] mr-1" />
            <FaStar className="text-[#FFD700] text-[20px] mr-1" />
            <FaStar className="text-[#FFD700] text-[20px] mr-1" /> */}

            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-[20px] mr-1 ${index < starRating ? "text-[#FFD700]" : "text-gray-400"
                  }`}
              />
            ))}

            {/* {starRating > 0 &&
              <div className="flex items-center w-fit bg-mindfulYellow rounded-sm px-2 py-1 space-x-1">
                <FaStar className="sm:text-[18px] text-mindfulWhite text-[16px]" />
                <p className="text-sm text-mindfulWhite font-semibold text-[16px]">
                  {starRating}
                </p>
              </div>} */}
          </div>

          <div>
            <p className="text-[14px]">({cardreviews})</p>
          </div>
        </div>
      </div>
    </div>
  );
};
