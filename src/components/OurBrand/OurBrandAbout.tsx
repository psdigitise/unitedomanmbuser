import ourBrandAboutImg from "../../assets/images/ourBrandAboutImg.png";

export const OurBrandAbout = () => {
  return (
    <div className="lg:py-[60px] py-[40px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="lg:w-7/12 w-full lg:order-1 order-2">
            <p className="text-black mb-3">
              At Mindful Beauty, our fabric of operations is intricately woven
              with the dual threads of excellence and innovation. In the dynamic
              landscape of beauty, we spearhead a quiet revolution, harnessing
              the transformative powers of Augmented Reality (AR) and Artificial
              Intelligence (AI). Our journey is one of reimagination and
              enrichment, guiding personal beauty explorations with tools that
              whisper bespoke advice, tailored to each unique individual.
            </p>
            <p className="text-black mb-3">
              We blend the tactile warmth of personalized service with the
              precision of technology. Our innovative solutions, from virtual
              makeup trials to precise skin analyses, are not just technologies;
              they are your personal beauty consultants. By bridging dreams with
              reality, aspiration with tangible results, we’re redefining the
              beauty journey.
            </p>
            <p className="text-black mb-3">
              Our commitment extends beyond the present—into a future painted
              with the brushstrokes of AR and AI integration. These are not
              fleeting trends but the foundation of a new beauty era. We are
              pioneering a world where digital-first experiences set the new
              standard, and personalized beauty is a universal language.
            </p>
            <p className="text-black mb-3">
              Mindful Beauty is more than a brand; it’s a beacon in the beauty
              industry, lighting the path to a future where every product is a
              step towards discovering your truest reflection.
            </p>
          </div>
          <div className="lg:w-5/12 w-full order-1 lg:order-2">
            <img
              src={ourBrandAboutImg}
              alt="ourBrandAboutImg"
              className="w-full h-[380px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
