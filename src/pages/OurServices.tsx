import { AboutBanner } from "../components/About/AboutBanner";
import { AboutContent } from "../components/About/AboutContent";
import { TeamBeforeAftergallery } from "../components/OurTeam/TeamBeforeAftergallery";
import { TechnologyImgBox } from "../components/OurTechnology/TechnologyImgBox";
import ourTeamBoxImg from "../assets/images/ourTeamBoxImg.jpg";
import { OurServicesAbout } from "../components/OurServices/OurServicesAbout";

export const OurServices = () => {
  return (
    <div>
      <AboutBanner
        bannerTitle="Our Services"
        bannerDesc="A Joyful Journey of Mindful Beauty and Imagination"
      />

      <OurServicesAbout />

      <div className="lg:py-[60px] py-[40px]  max-md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="For Beauty Professionals"
                descriptions={[
                  "Data-Driven Insights We empower beauty professionals with in-depth analytics and insights. Our platform not only streamlines appointment scheduling and inventory management but also provides real-time data on consumer preferences and industry trends, enabling you to stay ahead of the curve.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="For Our Customers"
                descriptions={[
                  "A Journey of Discovery Explore an array of beauty options, learn about the latest trends, and connect with top-rated professionals, all through our user-friendly platform. Your journey towards discovering the perfect beauty routine is supported by our dedicated customer service team, ready to assist you at every step.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Education and Training"
                descriptions={[
                  "Elevating Industry Standards We believe in raising the bar for beauty services, which is why we offer comprehensive training and education modules for professionals. By staying up-to-date with the latest techniques and ethical practices, we ensure that your experience with any provider from Mindful Beauty is nothing short of exceptional.",
                ]}
              />
            </div>
            <div className="lg:w-6/12 w-full mb-6">
              <AboutContent
                title="Community Outreach"
                descriptions={[
                  "Beauty Beyond Boundaries Mindful Beauty is not just about individual services; it’s about building a community. We regularly engage in outreach programs to educate and inspire, fostering a network where beauty enthusiasts and professionals can grow together",
                ]}
              />
            </div>
          </div>
          <div className="w-full">
            <p className="text-main text-md font-normal text-center lg:pt-8">
              Come, experience the future of beauty services at Mindful Beauty,
              where every service is an opportunity to feel and look your best.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-8">
        <TeamBeforeAftergallery />
      </div>
      <div className="pb-[40px]">
        <TechnologyImgBox bgImage={ourTeamBoxImg} />
      </div>
    </div>
  );
};
