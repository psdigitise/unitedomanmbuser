// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OverviewSlickCard } from "./OverviewSlick/OverviewSlickCard";
import "./OverviewSlick/OverviewSlickStyle.css"

export const OverviewSlick = () => {
  // const settings = {
  //   dots: true,
  //   arrows: false,
  //   infinite: true,
  //   speed: 5000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   autoplay: false,
  //   // autoplaySpeed: 5000,
  //   // cssEase: "linear",
  //   pauseOnHover: true,
  //   // rtl: true,
  //   // nextArrow: <SlickNextArrow onClick={function (): void {
  //   //     throw new Error("Function not implemented.");
  //   // }} />,
  //   // prevArrow: <SlickPrevArrow onClick={function (): void {
  //   //     throw new Error("Function not implemented.");
  //   // }} />,

  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  return (
    <div>
      <div className="slider-container overviewSlickStyle">
        {/* <Slider {...settings}> */}
          <OverviewSlickCard />
          {/* <OverviewSlickCard /> */}
          {/* <OverviewSlickCard /> */}
        {/* </Slider> */}
      </div>
    </div>
  );
};
