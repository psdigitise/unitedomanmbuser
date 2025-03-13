import React from "react";

interface BannerContentProps {
  bannerTitle: string;
}

export const BannerContent: React.FC<BannerContentProps> = ({
  bannerTitle,
}) => {
  return (
    <div>
      <div className="bg-bannerBg login-header-banner max-md:h-20">
        <div className="container mx-auto px-4">
          <div className="login-header-content max-md:h-20">
            <h2 className="login-header-banner-title max-sm:text-2xl">{bannerTitle}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
