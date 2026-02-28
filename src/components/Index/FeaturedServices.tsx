import React from "react";
import acrossOmanBg from "../../assets/omonimgs/acrossomanbg.png";
import constructionImg from "../../assets/omonimgs/construction.png";
import healthcareImg from "../../assets/omonimgs/healthcare.png";
import legalImg from "../../assets/omonimgs/legal.png";
import restaurantImg from "../../assets/omonimgs/restaurants.png";
import realEstateImg from "../../assets/omonimgs/realestate.png";
import itImg from "../../assets/omonimgs/IT.png";
import educationImg from "../../assets/omonimgs/education.png";
import restaurantslogo from "../../assets/omonimgs/restaurantslogo.png";
import constructorslogo from "../../assets/omonimgs/constructorslogo.png";
// import healthlogo from "../../assets/omonimgs/healthlogo.png";
// import { HiScale } from "react-icons/hi";
import { GiGraduateCap, GiScales } from "react-icons/gi";
import { PiStethoscopeBold } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiComputerLine } from "react-icons/ri";

const CATEGORIES = [
  {
    name: "Construction & Contractors",
    count: "248+",
    subtext: "Verified Businesses",
    image: constructionImg,
    // We'll apply the yellow color directly to the icon component
    // icon: <GiBilledCap className="text-[#ba8316] text-3xl" />,
    icon: <img src={constructorslogo} alt="Constructor Logo" className="w-8 h-8 object-contain" />,
    type: "large-dark",
    // Specific styles to match your uploaded image
    customStyle: {
      bg: "rgba(255, 215, 0, 0.1)", // Light yellow transparent background
      border: "rgba(255, 215, 0, 0.4)", // Golden border
      shadow: "0 0 15px rgba(255, 215, 0, 0.3)" // Outer glow
    }
  },
  {
    name: "Healthcare & Clinics",
    count: "132+",
    subtext: "Verified Businesses",
    image: healthcareImg,
    // If you have a custom logo for healthcare, import and use it here like constructorslogo
    icon: <PiStethoscopeBold className="w-8 h-8 object-contain" />,
    type: "large-blue",
    customStyle: {
      bg: "rgba(186, 230, 253, 0.15)", // Light icy blue background
      border: "rgba(125, 211, 252, 0.5)", // Bright blue border
      shadow: "0 0 20px rgba(56, 189, 248, 0.4)", // Soft blue outer glow

    }
  },
  { name: "Legal & Consultancy", count: "96+", subtext: "Verified Businesses", image: legalImg, icon: <GiScales className="w-5 h-5 object-contain" />, type: "small-light" },

  {
    name: "Restaurants & Cafes",
    count: "310+",
    subtext: "Verified Businesses",
    image: restaurantImg,
    icon: <img src={restaurantslogo} alt="Restaurant Logo" className="w-8 h-8 object-contain" />,
    type: "small-dark",
    customIconBg: "#7D4211"
  },
  {
    name: "Real Estate",
    count: "204+",
    subtext: "Verified Properties",
    image: realEstateImg,
    icon: <HiOutlineBuildingOffice2 className="w-5 h-5 object-contain" />,
    type: "small-blue",
    glowStyle: {
      bg: "rgba(67, 85, 230, 0.25)", // Indigo-Blue background
      border: "rgba(67, 85, 230, 0.6)", // Stronger blue border
      shadow: "0 0 20px rgba(67, 85, 230, 0.4)", // Blue glow
      iconColor: "#ffffff"
    }
  },
  {
    name: "IT & Software",
    count: "88+",
    subtext: "Tech Companies",
    image: itImg,
    icon: <RiComputerLine className="w-5 h-5 object-contain" />,
    type: "small-dark-blue",
    glowStyle: {
      bg: "rgba(30, 64, 175, 0.35)", // Deep Navy-Blue background
      border: "rgba(59, 130, 246, 0.7)", // Bright Electric Blue border
      shadow: "0 0 25px rgba(30, 64, 175, 0.5)", // Stronger tech glow
      iconColor: "#60a5fa"
    }
  },
  {
    name: "Education & Training",
    count: "67+",
    subtext: "Learning Centers",
    image: educationImg,
    icon: <GiGraduateCap className="w-5 h-5 text-white object-contain" />,
    type: "small-light",
    glowStyle: {
      bg: "rgba(37, 99, 235, 0.2)", // Pure Blue background
      border: "rgba(37, 99, 235, 0.5)", // Academic Blue border
      shadow: "0 0 20px rgba(37, 99, 235, 0.3)", // Soft blue glow
      iconColor: "#2563eb"
    }
  },
];

export const FeaturedServices: React.FC = () => {
  return (
    <section
      className="py-20 bg-cover bg-center font-sans"
      style={{ backgroundImage: `url(${acrossOmanBg})` }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b49] mb-4">
            Explore Businesses <span className="text-[#c18d4d]">Across Oman</span>
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="h-[1px] w-12 bg-gray-300"></div>
              <p className="text-gray-500 text-lg">Find trusted service providers in every major industry</p>
              <div className="h-[1px] w-12 bg-gray-300"></div>
            </div>
            <div className="h-[2px] w-24 bg-[#c18d4d]"></div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 items-start">
          {CATEGORIES.map((cat, index) => {
            const getOverlay = (type: string) => {
              switch (type) {
                case 'large-dark': return "bg-black/40";
                case 'large-blue': return "bg-blue-900/40";
                case 'small-light': return "bg-gradient-to-t from-white via-white/20 to-transparent";
                case 'small-dark': return "bg-gradient-to-t from-black via-black/40 to-transparent";
                case 'small-blue': return "bg-gradient-to-t from-[#0a192f] via-transparent to-transparent";
                case 'small-dark-blue': return "bg-gradient-to-t from-[#001f3f] via-[#001f3f]/60 to-transparent";
                default: return "bg-black/20";
              }
            };

            const isLightText = cat.type.includes('dark') || cat.type.includes('blue');

            const isHalfImage = cat.name === "Legal & Consultancy" || cat.name === "Education & Training";

            let layoutClasses = "";
            let inlineStyle: React.CSSProperties = {};

            if (index < 2) {
              layoutClasses = "md:col-span-5 h-[290px] mb-6";
            } else {
              layoutClasses = "md:col-span-2";
              if (index === 2) inlineStyle = { height: "200px" };
              if (index === 3) inlineStyle = { height: "300px" };
              if (index === 4) inlineStyle = { height: "260px" };
              if (index === 5) inlineStyle = { height: "220px" };
              if (index === 6) inlineStyle = { height: "250px" };
            }

            return (
              <div
                key={index}
                style={inlineStyle}
                className={`relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-2 transform-gpu ${layoutClasses} ${!isLightText ? 'bg-white' : ''}`}
              >
                {/* Background Image Container */}
                <div className={`absolute inset-0 w-full transition-transform duration-700 group-hover:scale-110 ${isHalfImage ? 'h-1/2' : 'h-full'}`}>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  />
                  <div className={`absolute inset-0 transition-opacity duration-300 ${getOverlay(cat.type)}`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  {/* Icon Container */}
                  <div
                    className={`rounded-full flex items-center justify-center transition-all duration-300 border backdrop-blur-md shadow-lg 
    ${cat.name === "Construction & Contractors" && "Healthcare & Clinics" ? "w-14 h-14" : "w-10 h-10"} 
    ${isLightText ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-gray-100 text-[#c18d4d]'}`}
                    style={{
                      ...(cat.name === "Construction & Contractors" ? {
                        backgroundColor: "rgba(255, 215, 0, 0.15)", // Subtle yellow glow bg
                        borderColor: "rgba(255, 215, 0, 0.5)",      // Golden border
                        boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)", // The "Glow" effect
                      } : {}),
                      ...(cat.name === "Healthcare & Clinics" ? {
                        backgroundColor: "rgba(173, 216, 230, 0.15)",
                        borderColor: "rgba(173, 216, 230, 0.5)",
                        boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                      } : {}),
                      ...(cat.name === "Legal & Consultancy" ? {
                        background: "linear-gradient(135deg, #4d2b12 0%, #2b180a 100%)", // Deep bronze/chocolate gradient
                        borderColor: "rgba(193, 141, 77, 0.4)", // Muted gold border
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(193, 141, 77, 0.2)",
                      } : {}),
                      ...(cat.name === "Restaurants & Cafes" ? {
                        backgroundColor: "#814512",                  // Your navy blue
                        borderColor: "transparent",
                      } : {}),
                      ...(cat.name === "Real Estate" ? {
                        background: "linear-gradient(135deg, #4355e6 0%, #2a36b3 100%)", // Vibrant Royal Blue
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 20px rgba(67, 85, 230, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
                      } : {}),
                      ...(cat.name === "IT & Software" ? {
                        background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)", // Deep Tech Blue
                        borderColor: "rgba(96, 165, 250, 0.5)", // Bright Electric Blue border
                        boxShadow: "0 0 25px rgba(30, 64, 175, 0.6), inset 0 0 15px rgba(96, 165, 250, 0.2)",
                      } : {}),
                      ...(cat.name === "Education & Training" ? {
                        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", // Academic Blue
                        borderColor: "rgba(191, 219, 254, 0.4)",
                        boxShadow: "0 6px 15px rgba(37, 99, 235, 0.3), inset 0 0 8px rgba(255, 255, 255, 0.15)",
                      } : {})
                    }}
                  >
                    {/* Apply yellow color and larger size specifically to the Construction icon */}
                    {cat.name === "Construction & Contractors"
                      ? React.cloneElement(cat.icon as React.ReactElement, {
                        className: "text-[#ba8316] text-3xl"
                      })
                      : cat.icon}
                  </div>

                  <div className="mb-5 space-y-4">
                    <h3 className={`font-bold leading-tight mb-1 ${isLightText ? "text-white" : "text-[#1a2b49]"} ${index < 2 ? 'text-2xl' : 'text-base'}`}>
                      {cat.name}
                    </h3>
                    <p className={`
    ${index < 2 ? "text-sm md:text-base" : "text-xs"}
    mb-4
    ${isLightText ? "text-gray-200" : "text-gray-500"}
  `}>
                      <span className="text-[#c18d4d] font-bold">{cat.count}</span> {cat.subtext}
                    </p>
                  </div >
                  <div >
                    <button className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-xs transition-all ${isLightText
                      ? "bg-white text-[#1a2b49] hover:bg-gray-100"
                      : "text-[#1a2b49] border border-gray-200 bg-white hover:bg-gray-50"
                      }`}>
                      Explore <span>→</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className={`absolute bottom-0 left-1/4 right-1/4 h-1 rounded-t-full ${index % 2 === 0 ? "bg-[#c18d4d]" : "bg-blue-500"}`} />
              </div>
            );
          })}
        </div>

        {/* Footer Button */}
        {/* View All Button Section */}


        <div className="mt-20 flex flex-col items-center">
          {/* The Button */}
          <button className="flex items-center gap-4 bg-white text-[#1a2b49] font-bold px-12 py-4 rounded-xl border border-gray-100 transition-all group relative z-10">
            View All Categories
            <span className="text-[#c18d4d] text-xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          {/* The Clean Gold Line (No Blur/Shadow) */}
          <div
            className="w-40 h-[4px] -mt-[1px] rounded-full"
            style={{
              background: `linear-gradient(to right, transparent 0%, #c18d4d 30%, #ffd7a8 50%, #c18d4d 70%, transparent 100%)`
            }}
          />
        </div>


      </div>
    </section >
  );
};