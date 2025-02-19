import { AboutBanner } from "../components/About/AboutBanner";
import { TechnologyImgBox } from "../components/OurTechnology/TechnologyImgBox";
import MindSetBoxImg from "../assets/images/mindSetBoxImg.jpg";
import { OurBrandAbout } from "../components/OurBrand/OurBrandAbout";
import { OurTagLine } from "../components/OurBrand/OurTagLine";

export const OurBrand = () => {
  return (
    <>
      <AboutBanner
        bannerTitle="Our Brand"
        bannerDesc="A Synthesis of Excellence and Innovation"
      />

      <OurBrandAbout />

      <TechnologyImgBox bgImage={MindSetBoxImg} />

      <OurTagLine />
    </>
  );
};
