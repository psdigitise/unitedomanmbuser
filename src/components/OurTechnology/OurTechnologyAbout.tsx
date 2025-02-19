import OurTechnologyimg from "../../assets/images/outtechnologyimg.jpeg";

export const OurTechnologyAbout = () => {
  return (
    <div className="bg-gray-50 lg:py-[60px] py-[40px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full mb-5">
            <h5 className="subpage-section-title text-black">Our Technology</h5>
            <div className="border-b-[3px] border-mindfulYellow w-36"></div>
          </div>
          <div className="lg:w-8/12 w-full lg:px-[15px] lg:order-1 order-2">
            <p className="mb-3">
              In the beauty world, a big change is happening, but it’s kind of
              quiet. Think of it like a secret revolution where Artificial
              Intelligence (AI) and Augmented Reality (AR) are starting to play
              a huge part. It’s a game-changer, making the way we find and enjoy
              beauty products completely different and much cooler. Now, we can
              try on makeup, check out new hair colors, get skin advice, and
              find the perfect foundation without even leaving our homes. These
              technologies are like friendly helpers, giving us advice and
              helping us see how we can look our best
            </p>
            <p className="mb-3">
              Shopping for beauty products has become way more fun and
              interactive, thanks to this tech. We’re not just looking at
              products on shelves anymore. We can actually try things out
              virtually, get detailed skin advice, and feel more connected to
              our favorite brands. AI and AR have knocked down the old limits,
              letting us experiment with our look without any mess-ups. And with
              the latest AI, we can see super realistic previews of how we’d
              look after a makeover, which helps if we’re unsure about trying
              something new.
            </p>
            <p className="mb-3">
              Looking ahead, it’s pretty clear that AI and AR are here to stay
              in the beauty industry. They’re becoming a big part of how beauty
              products are sold and experienced. This move towards tech-savvy,
              personalized shopping is changing what we expect from beauty
              brands. In this new world, brands that use these technologies
              smartly will stand out. They’re the ones showing us not just what
              we can buy, but helping us discover our best selves through the
              magic of digital tools.
            </p>
          </div>
          <div className="lg:w-4/12 w-full lg-order-2 order-1 mb-4">
            <img src={OurTechnologyimg} alt="Why Choose us image" />
          </div>
        </div>
      </div>
    </div>
  );
};
