import { Helmet } from "react-helmet-async";
import { ThankYouCard } from "../components/ThankYou/ThankYouCard";
import { BannerContent } from "../components/common/BannerContent";

export const ThankYou = () => {
  return (
    <div className="mt-[5rem] xl:mt-[6rem]">
      <div>
        <BannerContent bannerTitle="Booking Success" />
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
      </div>
      <div>
        <ThankYouCard />
      </div>
    </div>
  );
};
