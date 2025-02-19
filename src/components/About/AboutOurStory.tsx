import React from "react";

interface AboutOurStoryProps {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

export const AboutOurStory: React.FC<AboutOurStoryProps> = ({
  title,
  description,
  bgColor,
  textColor,
}) => {
  return (
    <div
      className={`bg-cover w-full bg-main ${bgColor} lg:py-[60px] py-[40px] text-center`}
    >
      <div className="container mx-auto px-4">
        <h5 className={`subpage-section-title ${textColor}`}>{title}</h5>
        <div className="">
          <div className="border-b-[3px] border-mindfulYellow w-36 mx-auto mb-6"></div>
        </div>
        <p className={`${textColor} font-normal`}>{description}</p>
      </div>
    </div>
  );
};
