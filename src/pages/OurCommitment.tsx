import { AboutBanner } from "../components/About/AboutBanner";
import { AboutContent } from "../components/About/AboutContent";
import MindSetBoxImg from "../assets/images/mindSetBoxImg.jpg";
import { TechnologyImgBox } from "../components/OurTechnology/TechnologyImgBox";

export const OurCommitment = () => {
  return (
    <div>
      <AboutBanner
        bannerTitle="Our Commitment"
        bannerDesc="Our Commitment to Ethical Excellence"
      />

      <div className="lg:py-[60px] py-[40px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Innovation with Integrity"
                descriptions={[
                  "We leverage the latest in AI and AR not just to enhance beauty services, but to set new standards in ethical practice and personal care, ensuring our technologies serve the well-being of our clients and professionals.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Transparent Practices"
                descriptions={[
                  "At the core of Mindful Beauty is a commitment to transparency. We believe in clear communication about how our technologies work and how they are used to benefit all stakeholders.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Continuous Improvement"
                descriptions={[
                  "Mindful Beauty is a learning organization, constantly evolving through feedback and foresight, aiming to provide services that not only meet but exceed professional and industry standards",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Empowerment through Employment"
                descriptions={[
                  "We’re dedicated to creating enriching professional opportunities that offer not just gainful employment but also a chance for beauty professionals to develop and flourish in their careers.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Ethical Sourcing"
                descriptions={[
                  "We source our products and technologies responsibly, with a keen eye on sustainability and ethical implications, ensuring our offerings are a force for good in the beauty industry.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Collaborative Growth"
                descriptions={[
                  "Our platform is designed as a collaborative ecosystem, supporting informed decision-making and fostering partnerships that respect both individual autonomy and collective advancement",
                ]}
              />
            </div>
            <div className="lg:w-3/12 w-full"></div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Privacy Assurance"
                descriptions={[
                  "At Mindful Beauty, we are deeply committed to the confidentiality and privacy of both our customers seeking beauty services and the professionals providing them. We employ robust data protection measures, adhere to strict privacy policies, and utilize state-of-the-art encryption to safeguard personal and sensitive information. Our platform is designed to ensure that the trust placed in us by our community is honored with the highest standard of privacy preservation.",
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
