import React from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface SpecialistCardProps {
  cardImage: string;
  cardTitle: string;
  cardLocation: string;
  cardreviews: string;
  providerID: number;
  branchID: number;
  starRating: number;
}

export const SpecialistCard: React.FC<SpecialistCardProps> = ({
  cardImage,
  cardTitle,
  cardLocation,
  cardreviews,
  providerID,
  branchID,
  starRating
}) => {


  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Card clicked", providerID, branchID);
    navigate(`/Overview?provider_id=${providerID}&branch_id=${branchID}`)
  }

  return (
    <div className="mx-3 my-5 cursor-pointer" onClick={handleClick}>
      <div>
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
          </div>

          <div>
            <p className="text-[14px]">({cardreviews})</p>
          </div>
        </div>
      </div>
    </div>
  );
};
