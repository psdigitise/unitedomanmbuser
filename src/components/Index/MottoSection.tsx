import { MottoCard } from "./MottoSection/MottoCard";

export const MottoSection = () => {
  return (
    <section className="lg:py-[80px] md:pt-[80px] md:pb-[20px] pt-[80px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MottoCard
            cardCount={"01"}
            cardHeading={"Transforming Beauty"}
            cardDesc={
              "Step into Mindful Beauty, where enchantment meets elegance, and every bride's dream look becomes..."
            }
            cardLink={"Know More"}
            cardLinkUrl={"/AboutUs"}
          />

          <MottoCard
            cardCount={"02"}
            cardHeading={"Innovative Enchantment"}
            cardDesc={
              "Mindful Beauty is a tapestry where skilled artisans and innovative geniuses collaborate to redefine..."
            }
            cardLink={"Know More"}
            cardLinkUrl={"/OurTechnology"}
          />

          <MottoCard
            cardCount={"03"}
            cardHeading={"Join Our Community"}
            cardDesc={
              "Step into a realm where beauty and technology dance in perfect harmony. Whether you're a..."
            }
            cardLink={"Know More"}
            cardLinkUrl={"/OurTeam"}
          />

          <MottoCard
            cardCount={"04"}
            cardHeading={"Our Commitment to You"}
            cardDesc={
              "With each service, conversation, and interaction, we vow to, Ensure an unparalleled quality of..."
            }
            cardLink={"Know More"}
            cardLinkUrl={"/AboutUs"}
          />
        </div>
      </div>
    </section>
  );
};
