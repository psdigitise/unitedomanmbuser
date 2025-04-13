import { Helmet } from "react-helmet-async";
import { AboutBanner } from "../components/About/AboutBanner";
import { Gallery } from "../components/AiAvatar/Gallery";

export const AiAvatar = () => {
  return (
    <div>
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
        bannerTitle="Imagine"
        bannerDesc="Reimagine Yourself with our Beauty Specialists"
      />

      <Gallery />
    </div>
  );
};
