import React from "react";
import stylistCardImg from "../../../../assets/images/stylistCardImg.png";
// import { CiStar } from "react-icons/ci";
// import { TiStar } from "react-icons/ti";

interface StylistCardProps {
  id?: string;
  name?: string;
  role?: string;
  years_of_experience?: string;
  rating: number;
  profile_image?: string;
}


export const StylistCard: React.FC<StylistCardProps> = ({
  // id,
  name,
  role,
  years_of_experience,
  // rating,
  profile_image
}) => {

  return (

    <div className="w-fit text-center rounded-[8px] border-[1px] border-mindfulGreyTypeTwo px-10 py-10 mx-auto">

      <div>
        {/* Card Image */}
        <div className="mb-5">
          <img src={profile_image || stylistCardImg} alt={name} className="w-fit mx-auto" />
        </div>

        {/* Card Content */}
        <div className="mb-3">
          <h5 className="text-lg text-mindfulBlack font-semibold">{name}</h5>
          <p className="text-md text-mindfulBlack">{role}</p>
          <p className="text-sm text-mindfulGreyTypeOne">{years_of_experience}</p>
        </div>

        {/* Star */}
        <div>
          <div className="flex items-center space-x-1">
            {/* {Array.from({ length: 5 }, (_, index) => (
              <CiStar
                key={index}
                className="text-[28px] text-mindfulGreyTypeOne"
              />
            ))} */}

            {/* {Array(5).fill(null).map((_, index) => (
              <TiStar
                key={index}
                className={`text-[22px] ${index < rating ? "text-mindfulYellow" : "text-mindfulGreyTypeOne"
                  }`}
              />
            ))} */}
          </div>
        </div>
      </div>

    </div>

  );
};
