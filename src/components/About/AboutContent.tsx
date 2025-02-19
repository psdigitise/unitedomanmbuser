import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface AboutContentProps {
  title: string;
  descriptions?: string[]; // Optional
  listTitle?: string; // Optional
  listDescription?: string; // Optional
}

export const AboutContent: React.FC<AboutContentProps> = ({
  title,
  descriptions = [],
  listTitle,
  listDescription,
}) => {
  return (
    <div className="container mx-auto px-4 about-our-team">
      <div className="border-2 rounded-lg border-mindfulGreySecondary p-5">
        <div className="w-full">
          <h5 className="sub-heading text-black">{title}</h5>
          <div className="border-b-[3px] border-mindfulYellow w-36 mb-6"></div>

          {/* Render description only if provided */}
          {descriptions[0] && <p>{descriptions[0]}</p>}
          {descriptions[1] && <p>{descriptions[1]}</p>}
          {descriptions[2] && <p>{descriptions[2]}</p>}
          {descriptions[3] && <p>{descriptions[3]}</p>}

          {/* Render list title and description only if provided */}
          {(listTitle || listDescription) && (
            <div className="flex items-start gap-2">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                <b>{listTitle}</b> {listDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
