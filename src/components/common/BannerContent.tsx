import React from "react";

interface BannerContentProps {
  bannerTitle: string;
}

export const BannerContent: React.FC<BannerContentProps> = ({
  bannerTitle,
}) => {
  return (
    <div>
      <div className="bg-bannerBg login-header-banner">
        <div className="container mx-auto px-4">
          <div className="login-header-content">
            <h2 className="login-header-banner-title">{bannerTitle}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
