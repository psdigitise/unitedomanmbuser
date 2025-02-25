import { useState } from "react";
// import { HiArrowSmRight } from "react-icons/hi";
import { HomeServiceFaq } from "./Faq/HomeServiceFaq/HomeServiceFaq";
import { SalonServiceFaq } from "./Faq/SalonServiceFaq/SalonServiceFaq";

export const Faq = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <section className="bg-faqBgImg w-full bg-cover bg-center lg:py-[60px] md:py-[40px] py-[40px] home-faq">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-Montserrat text-[40px] text-mindfulBlack font-bold mb-[30px] max-lg:text-[35px] max-md:text-[30px] max-md:mb-[20px] max-sm:text-[24px]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="">
          <div className="flex justify-center items-center space-x-10 mb-10 max-sm:flex-col max-sm:gap-4 max-sm:space-x-0 max-md:mb-5">
            <h5
              className={`sm:text-[26px] text-[21px] font-semibold cursor-pointer 
                                ${
                                  activeSection === "home"
                                    ? "text-main border-main border-b-2 pb-1"
                                    : "text-mindfulBlack"
                                }`}
              onClick={() => setActiveSection("home")}
            >
              Home Service
            </h5>

            <h5
              className={`sm:text-[26px] text-[21px] font-semibold cursor-pointer
                                 ${
                                   activeSection === "salon"
                                     ? "text-main border-main border-b-2 pb-1"
                                     : "text-mindfulBlack"
                                 }`}
              onClick={() => setActiveSection("salon")}
            >
              Salon Service
            </h5>
          </div>

          <div className="mb-10">
            {/* View All Button */}
            {/* <div className="flex justify-end items-center mb-5">
                        <button className="bg-main text-sm text-mindfulWhite rounded-[17px] px-4 py-1 flex items-center">
                            View all
                            <HiArrowSmRight className="text-mindfulWhite ml-1" />
                        </button>
                    </div> */}

            {activeSection === "home" && (
              <HomeServiceFaq
                faq_id={0}
                service_type={0}
                question={""}
                answer={""}
                created_at={""}
                updated_at={""}
              />
            )}
            {activeSection === "salon" && (
              <SalonServiceFaq
                faq_id={0}
                service_type={0}
                question={""}
                answer={""}
                created_at={""}
                updated_at={""}
              />
            )}
          </div>
        </div>

        {/* <div>
                <HomeService />
            </div> */}
      </div>
    </section>
  );
};
