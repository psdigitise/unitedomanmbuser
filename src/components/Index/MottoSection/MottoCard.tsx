import React from "react";
import { Link } from "react-router-dom";

interface MottoCardProps {
  cardCount: string;
  cardHeading: string;
  cardDesc: string;
  cardLink: string;
  cardLinkUrl: string;
}

export const MottoCard: React.FC<MottoCardProps> = ({
  cardCount,
  cardHeading,
  cardDesc,
  cardLink,
  cardLinkUrl,
}) => {
  return (
    <div className="margin-bottom-md-40">
      <div className="relative">
        <h4 className="absolute top-[-70px] left-0 font-HenriDidot text-[100px] text-main">
          {cardCount}
        </h4>
        <h5 className="translate-x-8 text-[21px] sm:text-[24px] text-mindfulBlack font-semibold mb-[20px] motto-section-heading">
          {cardHeading}
        </h5>
      </div>
      <div>
        <p className="text-mindfulBlack mb-3 leading-6">{cardDesc}</p>
      </div>

      <Link to={cardLinkUrl} className="underline">
        {cardLink}
      </Link>
    </div>
  );
};
