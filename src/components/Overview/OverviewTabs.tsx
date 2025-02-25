import { useState } from "react";
import { Overview } from "./OverviewTabs/Overview";
import { Services } from "./OverviewTabs/Services";
import { Packages } from "./OverviewTabs/Packages";
import { OurStylists } from "./OverviewTabs/OurStylists";
import { Photos } from "./OverviewTabs/Photos";
// import { Faq } from "./OverviewTabs/Faq";
import { Review } from "./OverviewTabs/Review";

interface OverviewTabsProps { }

export const OverviewTabs: React.FC<OverviewTabsProps> = () => {
  // Corresponding Component State Declaration
  const [activeSection, setActiveSection] = useState<string>("Services");

  const renderSection = () => {
    switch (activeSection) {
      case "Overview":
        return <Overview />;
      case "Services":
        return <Services />;
      case "Packages":
        return <Packages />;
      case "OurStylists":
        return <OurStylists />;
      case "Photos":
        return <Photos />;
      // case "Faq":
      //   return <Faq />;
      case "Review":
        return <Review />;
      default:
        return <Overview />;
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div>
        <div className="mb-10 max-md:mb-5">
          <ul className="flex items-center border-b-[1px] border-mindfulLightGrey space-x-2 max-xl:flex-wrap max-xl:space-x-0 max-xl:gap-3 max-xl:pb-4 max-md:grid max-md:grid-cols-3 max-sm:grid-cols-2">
            <li
              onClick={() => setActiveSection("Overview")}
              className={`${activeSection === "Overview" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer max-xl:rounded-lg max-sm:text-sm `}
            >
              Overview
            </li>
            <li
              onClick={() => setActiveSection("Services")}
              className={`${activeSection === "Services" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer max-xl:rounded-lg max-sm:text-sm `}
            >
              Services
            </li>
            <li
              onClick={() => setActiveSection("Packages")}
              className={`${activeSection === "Packages" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer max-xl:rounded-lg max-sm:text-sm `}
            >
              Packages
            </li>
            <li
              onClick={() => setActiveSection("OurStylists")}
              className={`${activeSection === "OurStylists" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer max-xl:rounded-lg max-sm:text-sm `}
            >
              Our Stylists
            </li>
            <li
              onClick={() => setActiveSection("Photos")}
              className={`${activeSection === "Photos" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer max-xl:rounded-lg max-sm:text-sm `}
            >
              Photos
            </li>
            {/* <li
              onClick={() => setActiveSection("Faq")}
              className={`${activeSection === "Faq" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer max-xl:rounded-lg max-sm:text-sm `}
            >
              FAQ
            </li> */}
            <li
              onClick={() => setActiveSection("Review")}
              className={`${activeSection === "Review" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer max-xl:rounded-lg max-sm:text-sm `}
            >
              Review
            </li>
          </ul>
        </div>
      </div>

      {/* Rendering Section */}
      <div>{renderSection()}</div>
    </div>
  );
};
