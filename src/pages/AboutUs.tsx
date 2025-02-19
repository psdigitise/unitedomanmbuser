import { AboutBanner } from "../components/About/AboutBanner";
import { AboutOurStory } from "../components/About/AboutOurStory";
import { WhyChooseUs } from "../components/About/WhyChooseUs";
import { AboutContent } from "../components/About/AboutContent";

export const AboutUs = () => {
  return (
    <div>
      <AboutBanner
        bannerTitle="About Us"
        bannerDesc="A Joyful Journey of Mindful Beauty and Imagination"
      />

      <AboutOurStory
        bgColor="bg-main"
        textColor="text-white"
        title={"Our Story"}
        description={
          "Founded by a dynamic duo with complementary backgrounds, Mindful Beauty is the culmination of passion, expertise, and a shared vision. Driven by the belief that beauty is more than skin deep, our founders bring unique perspectives from diverse experiences, uniting to redefine the beauty industry beyond borders."
        }
      />

      <AboutOurStory
        bgColor="bg-white"
        textColor="text-black"
        title={"Our Approach"}
        description={`
                At Mindful Beauty, our approach to beauty is grounded in decades of collective experience and fueled by an innovative spirit. We seamlessly integrate technology into our services, ensuring that each beauty solution is not only effective but also tailored to your unique needs.`}
      />

      <WhyChooseUs />

      {/* <AboutOurStory
        bgColor="bg-white"
        textColor="text-black"
        title={`Our Leadership: Pioneers in Beauty and Technology`}
        description={"Meet the visionaries behind Mindful Beauty"}
      /> */}

      <div className="xl:pt-[40px] pb-[30px]">
        <div className="container mx-auto px-4 text-center">
          <h5 className={`subpage-section-title text-black`}>
            Our Leadership: Pioneers in Beauty and Technology
          </h5>
          <div className="">
            <div className="border-b-[3px] border-mindfulYellow w-36 mx-auto mb-6"></div>
          </div>
          <p className={`text-black font-normal`}>
            Meet the visionaries behind Mindful Beauty
          </p>
        </div>
      </div>

      <div className="mt-0 lg:mb-20">
        <div>
          <AboutContent
            title="Dr. Preeth"
            descriptions={[
              "Dr. Preeth is a passionate visionary crafting ultimate beauty experiences, and a compassionate orthodontist perfecting smiles. Over the past two decades he has seamlessly blended the realms of aesthetics and wellness through clinics, salons, and training academies.",
              "Driven by the vision to offer holistic aesthetic solutions under one roof, Dr. Preeth is not confined to orthodontia alone. He is a master of versatility, having received professional training in hairdressing and hairstyling from prestigious academies in Singapore like L’Oreal and Tony & Guy. This expertise extends to the finer details of beauty, as he is also professionally trained in nail art, makeup application, and the art of photography.",
              "Immerse yourself in the expertise of a professional who not only aligns teeth but also aligns with the diverse facets of beauty. Dr. Preeth brings a unique combination of orthodontic precision and a rich palette of beauty skills, creating a harmonious symphony in the world of aesthetic transformations.",
            ]}
            listTitle="Contributions to Beauty : "
            listDescription="Dr Preeth is the cofounder of Ashtamudi Wellness, an international beauty salon committed to enhancing customer's natural beauty and helping them get the look they desire. He is a dedicated specialist providing top-notch bridal make up services to make their special day truly magical with 14 branches across Kerala & UAE. His salons offer a comprehensive range of beauty services that cater to all customer needs, from hair styling and skin care to nail care and make up applications. His journey in cosmetic dentistry has taken him to the vibrant communities of Kerala, the lush landscapes of Karnataka, and across seas to the dynamic cities of the UAE and the historic charm of Russia, spreading smiles along the way."
          />
        </div>
        <div className="my-10">
          <AboutContent
            title="Mr. Max"
            descriptions={[
              "Mr. Max, a dynamic executive with a global footprint in the technology and business sectors. With a distinguished career spanning renowned organizations like IBM, AT&T, and Cisco, Max has accumulated a wealth of experience in navigating complex industry landscapes. His journey is adorned with global accolades earned during his tenure at firms such as McKinsey and Morgan Stanley, where his strategic insights and ethical leadership style set him apart. Max’s academic pedigree is equally impressive, with a management degree from MIT Sloan, and a series of publications in prestigious journals. His LinkedIn posts are a testament to his commitment to business ethics, innovation, and continuous learning. What really sets Max apart is how he rolls up his sleeves and leads coding sprints as well as board room deliberations.",
              "Beyond business, he is a co-founder of two social good companies and an impact investor in several Indian startups, demonstrating his dedication to driving positive change. As a humanitarian at heart, Max goes beyond professional success to make a meaningful impact on the lives of others. He has actively recruited and mentored dozens of young minds, empowering the next generation of leaders to realize their potential.",
            ]}
            listTitle="Technology Insights : "
            listDescription="Max is of the firm opinion that the real champions are those who master the art of understanding and meeting their customers' needs, rather than the creators of the underlying technology. He is a savvy investor and operator, currently involved in the strategic positioning of 15 technology companies across USA and India. Max doesn't just work with Artificial Intelligence and Augmented Reality but lives and breathes it, always pondering how it can brighten up our lives and workspaces. He isn't just playing the game; he's changing it, rooting his innovations in ethics. He is on a quest to craft tech with heart—tech that respects our shared humanity, crosses borders and elevates lives."
          />
        </div>
        <div className="my-10">
          <AboutContent
            title="Mr. Tor"
            descriptions={[
              "Tor Ramsoy is a distinguished leader in big data, advanced analytics, and machine learning, bringing his extensive expertise to MindfulBeauty.ai. As the Founder of Arundo Analytics, Inc., he has been instrumental in providing innovative software solutions across industries. His visionary leadership has been crucial in harnessing the power of data to transform operational efficiency and innovation.",
              "Throughout his illustrious career, Tor has demonstrated a profound ability to integrate technology strategy with practical business applications. His tenure at McKinsey & Co as the Global leader of the big data and analytics service lines, positioned him as a key figure in driving technological advancements across multiple industries. This experience has imbued him with unique insights into the strategic deployment of AI and AR technologies.",
              "In his advisory role at MindfulBeauty.ai, Tor applies his groundbreaking work in analytics and machine learning to the beauty industry, advising on the integration of these technologies to enhance customer experiences and business operations. His commitment to innovation and excellence makes him a pivotal asset to the MindfulBeauty.ai team, guiding the company towards leveraging technology to redefine beauty industry standards. Tor holds degrees from Massachusetts Institute of Technology, and Norwegian Business School.",
            ]}
          />
        </div>
        <div className="my-10">
          <AboutContent
            title="Mr. Bhupesh"
            descriptions={[
              "Mr. Bhupesh is a seasoned leader with a profound impact on the operations and growth strategies within the retail and beauty industries. Bhupesh’s strategic vision has been honed over decades of leadership, notably as a senior executive and a member of the board of directors at Enrich during 2012-2024, where he elevated the company to a leading position in India’s beauty services sector. He graduated from IIM, Bangalore and served Kodak and Reliance Retail before joining Enrich.",
              "Throughout his career, Bhupesh has been at the forefront of transforming businesses by integrating innovative processes with core company values. His tenure at Reliance was marked by pioneering efforts to instill a process-driven culture, setting a new benchmark for corporate efficiency. His expertise in operational restructuring and his ability to envision and execute complex business strategies have consistently resulted in robust growth and market leadership.",
              "At MindfulBeauty.ai, Bhupesh leverages his expertise to guide strategic initiatives and operational integration, helping to shape the future of beauty services. His leadership is not just about business growth but also about enhancing customer engagement through innovative beauty solutions. Bhupesh’s role as an Advisor is crucial in steering MindfulBeauty.ai towards becoming a catalyst for transformation in the beauty industry, promising an era of quality services, operational excellence and enhanced customer satisfaction.",
            ]}
          />
        </div>
      </div>
    </div>
  );
};
