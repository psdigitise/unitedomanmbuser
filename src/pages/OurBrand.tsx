import { AboutBanner } from "../components/About/AboutBanner";
import { TechnologyImgBox } from "../components/OurTechnology/TechnologyImgBox";
import MindSetBoxImg from "../assets/images/mindSetBoxImg.jpg";
import { OurBrandAbout } from "../components/OurBrand/OurBrandAbout";
import { OurTagLine } from "../components/OurBrand/OurTagLine";
import { Helmet } from "react-helmet-async";

export const OurBrand = () => {
  return (
    <>
     <Helmet>
            <script>
              {`
                (function (c, s, q, u, a, r, e) {
                  c.hj = c.hj || function () { (c.hj.q = c.hj.q || []).push(arguments) };
                  c._hjSettings = { hjid: 6369861 };
                  r = s.getElementsByTagName('head')[0];
                  e = s.createElement('script');
                  e.async = true;
                  e.src = q + c._hjSettings.hjid + u;
                  r.appendChild(e);
                })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 6369861);
              `}
            </script>
          </Helmet>
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
