import { AboutBanner } from "../components/About/AboutBanner";
import { TeamMembers } from "../components/OurTeam/TeamMembers";
import teamMemberimg from "../assets/images/teamMemberImg.jpg";
import deviSriPalla from "../assets/images/deviSriPalla.jpg";
import { TechnologyImgBox } from "../components/OurTechnology/TechnologyImgBox";
import ourTeamBoxImg from "../assets/images/ourTeamBoxImg.jpg";
import { TeamBeforeAftergallery } from "../components/OurTeam/TeamBeforeAftergallery";
import { Helmet } from "react-helmet-async";

export const OurTeam = () => {
  return (
    <div>
      <AboutBanner
        bannerTitle="About Us"
        bannerDesc="A Joyful Journey of Mindful Beauty and Imagination"
      />
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

      <div className="bg-cover w-full bg-white lg:py-[60px] py-[40px]  max-md:py-6">
        <div className="container mx-auto px-4">
          <h5 className="subpage-section-title text-center text-black max-md:text-lg">
            Meet the Growing Team at Mindful Beauty
          </h5>
          <div className="">
            <div className="border-b-[3px] border-mindfulYellow w-36 mx-auto"></div>
          </div>
        </div>
      </div>
      <div className="lg:pb-[30px]">
        <TeamMembers
          title="Meet Toshi Rane: A Visionary Marketer Redefining Beauty with Heart and Verve"
          descriptions={[
            `Toshi Rane’s journey from Nagpur’s colorful streets to Kerala’s serene academic life reflects a profound connection to India’s cultural tapestry. Holding a master’s in Marketing Operations, she brings academic depth and worldly insight to the beauty industry. Her path showcases a commitment to reinventing beauty services, underpinned by a deep comprehension of customer desires and excellence.`,
            `Toshi, an MBA from XIME with a heart, transcends analytics to prioritize customer well-being. Her sustainable, memorable approaches to luxury beauty experiences set new industry standards. Her work with HDFC Life showcased her diverse skills, yet it’s her drive to integrate AI and innovative technologies in beauty that truly distinguishes her work, enhancing customer experiences remarkably.`,
            `Her achievements include national recognition in marketing competitions, but her ambitions stretch further—to revolutionize beauty standards with technology, ensuring high-end services are widely available. Toshi’s philosophy merges the charm of traditional beauty with modern innovation. Join her as she crafts a future where beauty’s heritage and progress resonate deeply and authentically.`,
          ]}
          teammemberimg={teamMemberimg}
        />
        <TeamMembers
          title="Meet Devi Sri Palla: The Cultural Virtuoso Shaping the Beauty Industry"
          descriptions={[
            `Join Devi Sri Palla, a linguistic virtuoso and marketing expert, reshaping the beauty industry into high art. Her journey spans from Nellore to Chennai, mastering languages and marketing with equal finesse. Devi’s dynamic career has evolved from guest services to pioneering marketing and sales, leaving a significant impact from Bairagarh’s charm to Hyderabad’s tech-savvy environment.`,
            `An MBA from XIME and a master of social media campaigns, Devi stands out for her creative and analytical skills, effortlessly navigating the digital landscape. Her cultural agility is rare, crafting narratives that bridge linguistic and regional divides, enriching every customer interaction with deeper understanding and connection.`,
            `Under Devi’s guidance, beauty services become more than mere transactions; they are significant, culturally attuned experiences that celebrate individual client’s backgrounds. She envisions a future where beauty is inclusive and innovative, intertwining the diversity of languages with service excellence. Devi’s leadership promises bespoke beauty encounters that resonate on a personal level—one conversation, one customer at a time.`,
          ]}
          teammemberimg={deviSriPalla}
        />
      </div>

      <div className="pb-[30px]">
        <TeamBeforeAftergallery />
      </div>
      <div className="pb-[40px]">
        <TechnologyImgBox bgImage={ourTeamBoxImg} />
      </div>
    </div>
  );
};
