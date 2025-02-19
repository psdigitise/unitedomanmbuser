import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FeedBackCard } from "./FeedBackCard";
import rhea from "../../../../assets/images/rhea.jpg";
import parshimta from "../../../../assets/images/parshimta.jpg";
import manusha from "../../../../assets/images/manusha.jpg";
import priya from "../../../../assets/images/priya.jpg";
import naina from "../../../../assets/images/naina.jpg";
import shruti from "../../../../assets/images/shruti.jpg";
import "./FeedBackSlickStyle.css";

export const FeedBackSlick = () => {
  const settings = {
    dots: true,
    arrows: false,
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    centerPadding: "10px",
    // autoplaySpeed: 5000,
    // cssEase: "linear",
    pauseOnHover: true,
    // rtl: true,
    // nextArrow: <SlickNextArrow onClick={function (): void {
    //     throw new Error("Function not implemented.");
    // }} />,
    // prevArrow: <SlickPrevArrow onClick={function (): void {
    //     throw new Error("Function not implemented.");
    // }} />,

    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="slider-container feedBackSlick">
        <Slider {...settings}>
          <FeedBackCard
            cardDesc={
              "My experience with the hair spa at Ashtamudi was absolutely rejuvenating! The ambiance was soothing, and the treatments left my hair feeling healthier than ever. Booking through Mindful Beauty was a breeze, allowing me to focus on relaxing rather than dealing with logistics!"
            }
            cardImage={rhea}
            cardName={"Rhea"}
            className="feedback-card"
          />

          <FeedBackCard
            cardDesc={
              "I had an incredible manicure at Ashtamudi that exceeded all my expectations! The attention to detail was exceptional, and the staff made me feel completely pampered. I also loved how Mindful Beauty made scheduling my appointment incredibly easy—everything was just a few clicks away!"
            }
            cardImage={parshimta}
            cardName={"Parshimta"}
            className="feedback-card"
          />

          <FeedBackCard
            cardDesc={
              "I treated myself to a massage at Ashtamudi, and it was a heavenly escape! The therapist was highly skilled and attentive, targeting all my tension spots perfectly. Thanks to Mindful Beauty, reserving my session was incredibly convenient—highly recommend this experience!"
            }
            cardImage={manusha}
            cardName={"Manusha"}
            className="feedback-card"
          />

          <FeedBackCard
            cardDesc={
              "I had an amazing hair spa experience at Ashtamudi—my hair has never felt better! The treatment was relaxing and revitalizing, and the staff made sure I was comfortable throughout. Mindful Beauty’s straightforward booking process made it easy to arrange my visit, which I truly appreciated!"
            }
            cardImage={priya}
            cardName={"Priya"}
            className="feedback-card"
          />

          <FeedBackCard
            cardDesc={
              "Ashtamudi’s team gave me the most gorgeous bridal look I could have imagined! They understood my style perfectly, and I felt radiant on my special day. I loved how easy it was to book my appointment through Mindful Beauty—no complications at all!"
            }
            cardImage={naina}
            cardName={"Naina"}
            className="feedback-card"
          />

          <FeedBackCard
            cardDesc={
              "Ashtamudi provided the perfect bridal makeup for my big day! The artist truly understood my vision and executed it flawlessly, making me feel like a dream. The whole experience was enhanced by the effortless booking process through Mindful Beauty—no barriers, just pure elegance and ease!"
            }
            cardImage={shruti}
            cardName={"Shruti"}
            className="feedback-card"
          />
        </Slider>
      </div>
    </div>
  );
};
