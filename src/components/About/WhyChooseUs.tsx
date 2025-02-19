import bannerImg from "../../assets/images/bannerImg.png";
import { IoIosArrowForward } from "react-icons/io";

export const WhyChooseUs = () => {
  return (
    <div className="bg-mindfulshadowgray xl:py-[60px] xl:pb-[60px] pb-[30px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full">
            <h5 className="subpage-section-title text-black">Why Choose us</h5>
            <div className="border-b-[3px] border-mindfulYellow w-36 mb-6"></div>
          </div>
          <div className="lg:w-6/12 w-full lg:order-1 order-2">
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                <b>Decades of Expertise:</b> Our team boasts a wealth of
                experience in the beauty industry, providing a foundation for
                unparalleled service quality.
              </p>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                <b>Innovative Technology:</b> Embracing the latest advancements,
                we leverage technology to create personalized beauty solutions.
                From AI-driven consultations to AR-enhanced experiences, we
                redefine beauty with a modern touch.
              </p>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                <b>Mindful Beauty Philosophy:</b> We believe in the power of
                Beauty—nurturing not only your external appearance but also
                fostering confidence and well-being from within.
              </p>
            </div>
          </div>

          <div className="lg:w-6/12 w-full order-1 lg:order-2 lg:mb-[0] mb-[30px]">
            <img src={bannerImg} alt="Why Choose us image" />
          </div>
        </div>
      </div>
    </div>
  );
};
