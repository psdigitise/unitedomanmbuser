import React from "react";
import AboutUSBanner from "../../assets/images/sub-banner.jpg";

interface AboutBannerProps {
  bannerTitle: string;
  bannerDesc: string;
}

export const AboutBanner: React.FC<AboutBannerProps> = ({
  bannerTitle,
  bannerDesc,
}) => {
  return (
    // <div className="bg-black bg-opacity-50">
    //   <div
    //     className="relative bg-cover w-full p-52  bg-fixed z-[5]"
    //     style={{ backgroundImage: `url(${AboutUSBanner})` }}
    //   >
    //     <div className="absolute inset-0 bg-black bg-opacity-50 z-[-1]"></div>
    //     <div className="container mx-auto">
    //       <h5 className="text-[48px] text-white font-bold">{bannerTitle}</h5>
    //       <p className="text-xl text-white font-normal">{bannerDesc}</p>
    //     </div>
    //   </div>
    // </div>
    <div
      className="subpage-banner"
      style={{ backgroundImage: `url(${AboutUSBanner})` }}
    >
      <div className="container mx-auto px-4">
        <div className="subpage-banner-content">
          <h1 className="subpage-banner-title">{bannerTitle}</h1>
          <p className="subpage-banner-description">{bannerDesc}</p>
        </div>
      </div>
    </div>
  );
};
