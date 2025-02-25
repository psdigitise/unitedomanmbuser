import React from "react";

interface TeamMembersProps {
  title?: string;
  descriptions?: string[];
  teammemberimg?: string;
}
export const TeamMembers: React.FC<TeamMembersProps> = ({
  title,
  descriptions = [],
  teammemberimg,
}) => {
  return (
    <div className="mb-8">
      <div className="container mx-auto px-4">
        <div className="border-[1px] rounded-lg border-mindfulGreySecondary p-8 max-md:p-4">
          <div className="flex flex-wrap">
            <div className="w-full mb-5">
              <h5 className="text-[27px] text-black font-semibold max-md:text-xl">{title}</h5>
              <div className="border-b-[3px] border-mindfulYellow w-36 mb-3"></div>
            </div>
            <div className="lg:w-8/12 w-full mb-6 team-members lg:order-1 order-2">
              <div className="lg:px-[15px]">
                {descriptions[0] && <p>{descriptions[0]}</p>}
                {descriptions[1] && <p>{descriptions[1]}</p>}
                {descriptions[2] && <p>{descriptions[2]}</p>}
                {descriptions[3] && <p>{descriptions[3]}</p>}
              </div>
            </div>

            <div className="lg:w-4/12 w-full mb-6 lg-order-2 order-1">
              <img src={teammemberimg} alt="" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
