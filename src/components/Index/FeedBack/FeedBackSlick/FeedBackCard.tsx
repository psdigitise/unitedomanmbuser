import React from "react";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { BsFillTriangleFill } from "react-icons/bs";

interface FeedBackCardProps {
  cardDesc: string;
  cardImage: string;
  cardName: string;
  className: string;
}

export const FeedBackCard: React.FC<FeedBackCardProps> = ({
  cardDesc,
  cardImage,
  cardName,
  className,
}) => {
  return (
    <div className="my-5">
      <div
        className={`sm:px-10 sm:py-10 px-[20px] py-[20px] rounded-lg ${className}`}
      >
        {/* <h4 className="text-[100px] text-mindfulWhite float-left translate-y-[-30px]">“</h4> */}

        <div className="flex items-start">
          <div>
            <BiSolidQuoteAltLeft className="quoteColor text-[36px] text-mindfulGrey" />
          </div>
          <div>
            <p className="text-[18px] text-mindfulBlack pl-5">{cardDesc}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="translate-y-[-4px] w-fit mx-auto feedback-triangleicon">
          <BsFillTriangleFill className="text-main rotate-180" />
        </div>
      </div>

      {/* Image & Name */}
      <div className="text-center my-8">
        <div className="imageBorder w-fit mx-auto rounded-full border-2 border-mindfulgrey p-1">
          <img
            src={cardImage}
            alt="Card Image"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        <div className="my-2">
          <p className="name text-lg text-mindfulgrey font-bold">{cardName}</p>
        </div>
      </div>
    </div>
  );
};
