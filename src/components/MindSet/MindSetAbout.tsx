import mindsetIng from "../../assets/images/mindsetabout.jpg";
import { IoIosArrowForward } from "react-icons/io";

export const MindSetAbout = () => {
  return (
    <div className="bg-mindfulshadowgray lg:py-[60px] py-[40px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full mb-5">
            <h5 className="subpage-section-title text-black">
              Mindful Beauty Begins In Your Mind
            </h5>
            <div className="border-b-[3px] border-mindfulYellow w-24"></div>
          </div>
          <div className="lg:w-7/12 w-full lg:order-1 order-2">
            <p className="font-semibold py-5">
              Mindful Beauty is an intentional approach to self-expression,
              where you actively engage in imagining and shaping the beauty of
              your own presentation, steered by self-identity and personal
              values.
            </p>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                At Mindful Beauty, we promote a nuanced understanding of beauty
                that goes beyond superficial aesthetics.
              </p>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                We believe that true beauty emanates from within. Hence, we
                suggest that cosmetic products are most impactful when they
                enhance one's inner self.
              </p>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                We encourage consumers to use fashion and beauty products as
                tools for self-expression rather than conforming to any
                universal standard.
              </p>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                We teach consumers about the history of beauty standards, the
                importance of self-acceptance, and how to use products in a way
                that enhances rather than masks their natural appearance.
              </p>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                We emphasize qualities like kindness, confidence, and happiness.
              </p>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                We advocate for more inclusive, ethical, and diverse
                representations of beauty.
              </p>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                We advocate inclusivity, body positivity, and mental health
                awareness.
              </p>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <div>
                <IoIosArrowForward className="text-lg text-main" />
              </div>
              <p>
                Our product ranges include a variety of body types, skin colors,
                genders, and ages, reflecting a more inclusive understanding of
                beauty.
              </p>
            </div>
          </div>
          <div className="lg:w-5/12 w-full order-1 lg:order-2">
            <img src={mindsetIng} alt="Why Choose us image" />
          </div>
        </div>
      </div>
    </div>
  );
};
