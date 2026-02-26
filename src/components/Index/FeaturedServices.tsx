import React from "react";
import acrossOmanBg from "../../assets/omonimgs/acrossomanbg.png";
import constructionImg from "../../assets/omonimgs/construction.png";
import healthcareImg from "../../assets/omonimgs/healthcare.png";
import legalImg from "../../assets/omonimgs/legal.png";
import restaurantImg from "../../assets/omonimgs/restaurants.png";
import realEstateImg from "../../assets/omonimgs/realestate.png";
import itImg from "../../assets/omonimgs/IT.png";
import educationImg from "../../assets/omonimgs/education.png";

const CATEGORIES = [
  { name: "Construction & Contractors", count: "248+", subtext: "Verified Businesses", image: constructionImg, icon: "👷", type: "large-dark" },
  { name: "Healthcare & Clinics", count: "132+", subtext: "Verified Businesses", image: healthcareImg, icon: "🩺", type: "large-blue" },
  { name: "Legal & Consultancy", count: "96+", subtext: "Verified Businesses", image: legalImg, icon: "⚖️", type: "small-light" },
  { name: "Restaurants & Cafes", count: "310+", subtext: "Verified Businesses", image: restaurantImg, icon: "🍴", type: "small-dark" },
  { name: "Real Estate", count: "204+", subtext: "Verified Properties", image: realEstateImg, icon: "🏢", type: "small-blue" },
  { name: "IT & Software", count: "88+", subtext: "Tech Companies", image: itImg, icon: "💻", type: "small-dark-blue" },
  { name: "Education & Training", count: "67+", subtext: "Learning Centers", image: educationImg, icon: "🎓", type: "small-light" },
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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg ${isLightText ? 'bg-white/20 border-white/30 text-white' : 'bg-white border-gray-100 text-[#c18d4d]'}`}>
                    {cat.icon}
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