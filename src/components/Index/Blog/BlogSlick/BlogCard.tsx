import React from "react";

interface BlogCardProps {
  cardImage: string;
  cardDate: string;
  cardTitle: string;
  cardDesc: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  cardImage,
  cardDate,
  cardTitle,
  cardDesc,
}) => {
  return (
    <div className="mx-10 my-10">
      <div className="mb-5">
        <img src={cardImage} alt="" />
      </div>

      <div>
        <div className="w-fit bg-mindfulBlue rounded-[16px]  px-4 py-1">
          <p className="text-sm text-mindfulWhite">{cardDate}</p>
        </div>

        <h5 className="text-[20px] font-[600] text-mindfulBlack mb-[10px] mt-[10px] leading-tight">
          {cardTitle}
        </h5>
        <p className="text-[16px] text-mindfulBlack">{cardDesc}</p>
      </div>
    </div>
  );
};
