import { AboutBanner } from "../components/About/AboutBanner";
import { AboutContent } from "../components/About/AboutContent";
import { TechnologyImgBox } from "../components/OurTechnology/TechnologyImgBox";
import { OurImpactContent } from "../components/OurImpact/OurImpactContent";
import MindSetBoxImg from "../assets/images/mindSetBoxImg.jpg";

export const OurImpact = () => {
  return (
    <div>
      <AboutBanner
        bannerTitle="Our Impact"
        bannerDesc="A Joyful Journey of Mindful Beauty and Imagination"
      />

      <OurImpactContent />
      <div className="lg:py-[60px] py-[40px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Empowering Beauty Professionals"
                descriptions={[
                  "We’ve empowered beauty professionals with tools that provide insightful data analytics and tailored treatment plans, ensuring they can deliver exceptional services. Our platform’s predictive capabilities have helped salons increase their operational efficiency, reduce waste, and elevate the level of personalized care offered to each customer.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Transformative Customer Experiences"
                descriptions={[
                  "For our customers, the journey to finding the perfect beauty match has been transformed. Through AR, they can now try before they buy, enjoying a risk-free exploration of products and styles. Our AI-driven platform offers a personalized shopping experience, recommending products and treatments that align with their unique preferences and needs.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Sustainable Choices Made Simple"
                descriptions={[
                  "Mindful Beauty is also at the forefront of encouraging sustainable practices within the industry. By integrating a curated selection of ethically-sourced and environmentally-friendly products into our platform, we make it easier for customers and salons alike to make choices that align with their values and our planet’s wellbeing.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Stories of Success"
                descriptions={[
                  "Our impact resonates in the stories shared by our users – from the salon owner who saw a significant uptick in customer satisfaction and retention, to the individual who discovered the perfect skincare routine through our platform’s guidance. These stories are the heartbeat of Mindful Beauty, driving us to continuously innovate and improve.",
                ]}
              />
            </div>
            <div className="lg:w-3/12 w-full"></div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Quantifying Our Impact"
                descriptions={[
                  "We measure our success not just in profit margins, but in the positive feedback, the repeat bookings, the community engagement, and the knowledge that we are making a real difference in people’s lives, one beauty experience at a time.",
                ]}
              />
            </div>
            <div className="lg:w-3/12 w-full"></div>
          </div>
        </div>
      </div>
      <div className="pb-[40px]">
        <TechnologyImgBox bgImage={MindSetBoxImg} />
      </div>
    </div>
  );
};
