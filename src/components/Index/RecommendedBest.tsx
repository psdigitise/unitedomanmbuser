import { useState } from "react";
import { SalonSlick } from "./RecommendedBest/SalonSlick/SalonSlick";
import { SpecialistSlick } from "./RecommendedBest/SpecialistSlick/SpecialistSlick";
//import { HiArrowSmRight } from "react-icons/hi";

export const RecommendedBest = () => {
  const [activeSection, setActiveSection] = useState("salon"); // default to salon

  return (
    <section className="home-recommended-tab">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="">
            <h4 className="font-Montserrat text-[40px] text-mindfulBlack font-bold mb-[30px] max-lg:text-[35px] max-md:text-[30px] max-md:mb-[20px] max-sm:text-[24px]">
              Recommended Best
            </h4>
          </div>

          <div>
            <div className="flex justify-evenly items-center custom-d-block-mobile tab-title mb-5 max-sm:flex-col max-sm:gap-4">
              <h5
                className={`lg:text-[25px] sm:text-[20px] text-[18px] font-semibold leading-tight cursor-pointer font-Montserrat 
                                ${
                                  activeSection === "salon"
                                    ? "text-main border-main border-b-2 pb-2 "
                                    : "text-mindfulBlack"
                                }`}
                onClick={() => setActiveSection("salon")}
              >
                Salon from your Location
              </h5>

              <h5
                className={`lg:text-[25px] sm:text-[20px] text-[18px] font-semibold font-Montserrat cursor-pointer tab-title leading-tight
                                 ${
                                   activeSection === "specialist"
                                     ? "text-main border-main border-b-2 pb-2"
                                     : "text-mindfulBlack"
                                 }`}
                onClick={() => setActiveSection("specialist")}
              >
                Specialist from your Location
              </h5>
            </div>

            <div className="mb-[40px]">
              {/* View All Button */}
              {/* <div className="flex justify-end items-center mb-5">
                            <button className="bg-main text-sm text-mindfulWhite rounded-[17px] px-4 py-1 flex items-center">
                                View all
                                <HiArrowSmRight className="text-mindfulWhite ml-1" />
                            </button>
                        </div> */}
              {activeSection === "salon" && <SalonSlick />}
              {activeSection === "specialist" && <SpecialistSlick />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
