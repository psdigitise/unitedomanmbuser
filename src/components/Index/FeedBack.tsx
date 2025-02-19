import { FeedBackSlick } from "./FeedBack/FeedBackSlick/FeedBackSlick";

export const FeedBack = () => {
  return (
    <section className="lg:py-[60px] md:py-[40px] py-[40px]">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-Montserrat md:text-[40px] text-mindfulBlack font-bold sm:text-[35px] text-[24px] mb-[10px]">
            Our Customer Feedback
          </h2>
        </div>

        <div>
          <FeedBackSlick />
        </div>
      </div>
    </section>
  );
};
