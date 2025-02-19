import { AboutBanner } from "../components/About/AboutBanner";
import { Gallery } from "../components/AiAvatar/Gallery";

export const AiAvatar = () => {
  return (
    <div>
      <AboutBanner
        bannerTitle="Imagine"
        bannerDesc="Reimagine Yourself with our Beauty Specialists"
      />

      <Gallery />
    </div>
  );
};
