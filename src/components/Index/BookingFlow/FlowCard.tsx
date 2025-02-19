import React from "react";

interface FlowCardProps {
  cardImage: string;
  cardCount: string;
  cardTitle: string;
  cardDesc: string;
}

export const FlowCard: React.FC<FlowCardProps> = ({
  cardImage,
  cardCount,
  cardTitle,
  cardDesc,
}) => {
  return (
    <div className="text-center">
      <div className="relative mb-4">
        <img src={cardImage} alt="" className="w-fit mx-auto" />
        <div className="absolute top-0 right-[80px] home-custom-flow-card-count-position rounded-full w-14 h-14 flex justify-center items-center bg-mindfulBlue">
          <p className="text-xl text-mindfulWhite">{cardCount}</p>
        </div>
      </div>

      <div className="w-48 mx-auto">
        <h5 className="text-lg text-mindfulBlack font-semibold mb-2 leading-tight">
          {cardTitle}
        </h5>
        <p className="text-mindfulBlack mb-2">{cardDesc}</p>
      </div>
    </div>
  );
};
