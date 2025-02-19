import { ThankYouCard } from "../components/ThankYou/ThankYouCard";
import { BannerContent } from "../components/common/BannerContent";

export const ThankYou = () => {
  return (
    <div className="mt-[5rem] xl:mt-[6rem]">
      <div>
        <BannerContent bannerTitle="Booking Success" />
      </div>
      <div>
        <ThankYouCard />
      </div>
    </div>
  );
};
