import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import pluslogo from "../../assets/omonimgs/pluslogo.jpg";
import alogo from "../../assets/omonimgs/Alogo.jpg";
import sarahlogo from "../../assets/omonimgs/saharimg.jpg";
import featuredbg from "../../assets/omonvideos/featuredbgnew3.mp4"
// import { RootState } from "../../redux/store";
// import { NotifyError, NotifyInfo } from "../common/Toast/ToastMessage";
// import { setLocation } from "../../redux/locationSlice";
import { Star, Check, ArrowRight } from "lucide-react";

export const FeaturedBusinesses: React.FC = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingCard, setLoadingCard] = React.useState<string | null>(null);

  const businesses = [
    {
      id: "1",
      name: "Muscat Clinic",
      verified: true,
      category: "Healthcare & Medical",
      location: "Muscat",
      rating: "4.9 / 5.0",
      reviews: "Based on 190 reviews",
      logo: pluslogo,
    },
    {
      id: "2",
      name: "Al Noor Construction LLC",
      verified: true,
      category: "Construction & Contractors",
      location: "Muscat",
      rating: "4.8 / 5.0",
      reviews: "Based on 132 reviews",
      logo: alogo,
    },
    {
      id: "3",
      name: "Sahar Real Estate",
      verified: true,
      category: "Real Estate",
      location: "Salalah",
      rating: "4.7 / 5.0",
      reviews: "Based on 124 reviews",
      logo: sarahlogo,
    },
  ];

  const handleAction = async (businessName: string) => {
    setLoadingCard(businessName);
    setTimeout(() => {
      setLoadingCard(null);
      navigate("/SearchResults", { state: { businessName } });
    }, 500);
  };

  return (
    <section className="relative py-20 bg-[#aebde5] overflow-hidden">
      {/* Background Video Implementation */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      >
        <source src={featuredbg} type="video/mp4" />
      </video>
      {/* Background with abstract soft curves to match image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#2d3a6d] font-Montserrat">
            Featured Businesses <br />
            Across <span className="text-[#c08c4c]">Oman</span>
          </h2>
          <div className="w-20 h-0.5 bg-gray-200 mx-auto my-4 opacity-0"></div> {/* Spacer */}
          <p className="text-gray-600 text-[18px]">Discover trusted and verified companies.</p>
        </div>

        {/* Outer Frosted Container */}
        <div className="bg-white/40 backdrop-blur-[15px] p-6 md:p-10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-white/60 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businesses.map((biz) => (
              <div
                key={biz.id}
                className="bg-white rounded-[20px] p-8 border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header Row: Logo and Text */}
                <div className="flex gap-4 items-start mb-6">
                  <div className="w-14 h-14 flex-shrink-0">
                    <img src={biz.logo} alt={biz.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[19px] font-bold text-[#1e293b] leading-tight mb-1">{biz.name}</h3>
                    <div className="flex items-center text-[#22c55e] text-[13px] font-medium">
                      <Check className="w-3.5 h-3.5 mr-1 stroke-[3px]" /> Verified
                    </div>
                  </div>
                </div>

                {/* Info Block */}
                <div className="text-[#64748b] text-[15px] mb-4 space-y-1">
                  <p>{biz.category}</p>
                  <p>• {biz.location}</p>
                </div>

                {/* Thin Dotted/Solid Line Divider */}
                <div className="w-full border-t border-gray-100 mb-5"></div>

                {/* Rating Block */}
                <div className="mb-8 mt-auto">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#eab308] text-[#eab308]" />
                    ))}
                    <span className="ml-2 font-semibold text-[#1e293b] text-[15px]">{biz.rating}</span>
                  </div>
                  <p className="text-[#94a3b8] text-[14px]">{biz.reviews}</p>
                </div>

                {/* Button: Matching Gradient and Arrow */}
                <button
                  onClick={() => handleAction(biz.name)}
                  className="w-full bg-gradient-to-r from-[#2d3a6d] to-[#3b4b8a] hover:from-[#1e293b] hover:to-[#2d3a6d] text-white py-3.5 rounded-xl flex items-center justify-center transition-all text-[15px] font-semibold group shadow-lg shadow-blue-900/10"
                >
                  {loadingCard === biz.name ? "Loading..." : "View Profile"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Explore All Button - Styled to match the bottom button in image */}
        <div className="flex justify-center mt-12">
          <button className="bg-[#212b50] hover:bg-[#151b33] text-white px-10 py-3.5 rounded-xl font-semibold flex items-center transition-all group">
            Explore All Businesses
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};