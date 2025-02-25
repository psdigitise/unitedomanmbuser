import { FlowCard } from "./BookingFlow/FlowCard";
// import dottedBg from "../../assets/images/dottedBg.png"
import step1 from "../../assets/images/step01.png";
import step2 from "../../assets/images/step02.png";
import step3 from "../../assets/images/step03.png";
import step4 from "../../assets/images/step04.png";

export const BookingFlow = () => {
  return (
    <section className="bg-mindfulLightPink py-[60px]">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-Montserrat text-[40px] text-mindfulBlack font-bold mb-[30px] max-lg:text-[35px] max-md:text-[30px] max-md:mb-[20px] max-sm:text-[24px]">
            Bridal Beauty Service Booking Flow
          </h2>
        </div>

        <div className="bg-bookingFlowBgImg bg-no-repeat bg-top bg-contain">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 translate-y-10">
            {/* <div>
            <img src={dottedBg} alt="" className="w-full" />
          </div> */}
            <FlowCard
              cardImage={step1}
              cardCount={"01"}
              cardTitle={"Search or Try a service"}
              cardDesc={"Find the perfect home or salon beauty service."}
            />
            <FlowCard
              cardImage={step2}
              cardCount={"02"}
              cardTitle={"Schedule an appointment"}
              cardDesc={"Select a convenient date and time."}
            />
            <FlowCard
              cardImage={step3}
              cardCount={"03"}
              cardTitle={"Pay, track and receive"}
              cardDesc={
                "Complete payment, track the booking, and enjoy the service."
              }
            />
            <FlowCard
              cardImage={step4}
              cardCount={"04"}
              cardTitle={"Rate and review"}
              cardDesc={"Share your experience and feedback."}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
