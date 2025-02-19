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
        <div className="mb-10">
          <ul className="flex items-center border-b-[1px] border-mindfulLightGrey space-x-2">
            <li
              onClick={() => setActiveSection("Overview")}
              className={`${activeSection === "Overview" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer`}
            >
              Overview
            </li>
            <li
              onClick={() => setActiveSection("Services")}
              className={`${activeSection === "Services" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer`}
            >
              Services
            </li>
            <li
              onClick={() => setActiveSection("Packages")}
              className={`${activeSection === "Packages" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer`}
            >
              Packages
            </li>
            <li
              onClick={() => setActiveSection("OurStylists")}
              className={`${activeSection === "OurStylists" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer`}
            >
              Our Stylists
            </li>
            <li
              onClick={() => setActiveSection("Photos")}
              className={`${activeSection === "Photos" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer`}
            >
              Photos
            </li>
            {/* <li
              onClick={() => setActiveSection("Faq")}
              className={`${activeSection === "Faq" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer`}
            >
              FAQ
            </li> */}
            <li
              onClick={() => setActiveSection("Review")}
              className={`${activeSection === "Review" ? "active bg-main text-mindfulWhite" : ""}
                text-lg font-semibold border-[1px] border-mindfulLightGrey rounded-lg rounded-b-none px-5 py-3 cursor-pointer`}
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
