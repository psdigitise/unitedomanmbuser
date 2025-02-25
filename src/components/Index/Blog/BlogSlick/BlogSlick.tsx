import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BlogCard } from "./BlogCard";
import blogImgOne from "../../../../assets/images/blogImgOne.png";
import blogImgTwo from "../../../../assets/images/blogImgTwo.png";
import blogImgThree from "../../../../assets/images/blogImgThree.png";

export const BlogSlick = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
          <BlogCard
            cardImage={blogImgOne}
            cardDate={"March 23, 2024"}
            cardTitle={"Donec egestas, tellus quis pulvinar ultricies,"}
            cardDesc={
              "Donec egestas, tellus quis pulvinar ultricies, mi ligula fermentum ipsum, et viverra lorem odio a mi. Ut sodales sapien orci, nec tincidunt ligula ultrices vitae. Pellentesque a volutpat nisi, at interdum libero."
            }
          />

          <BlogCard
            cardImage={blogImgTwo}
            cardDate={"March 23, 2024"}
            cardTitle={"Donec egestas, tellus quis pulvinar ultricies,"}
            cardDesc={
              "Donec egestas, tellus quis pulvinar ultricies, mi ligula fermentum ipsum, et viverra lorem odio a mi. Ut sodales sapien orci, nec tincidunt ligula ultrices vitae. Pellentesque a volutpat nisi, at interdum libero."
            }
          />

          <BlogCard
            cardImage={blogImgThree}
            cardDate={"March 23, 2024"}
            cardTitle={"Donec egestas, tellus quis pulvinar ultricies,"}
            cardDesc={
              "Donec egestas, tellus quis pulvinar ultricies, mi ligula fermentum ipsum, et viverra lorem odio a mi. Ut sodales sapien orci, nec tincidunt ligula ultrices vitae. Pellentesque a volutpat nisi, at interdum libero."
            }
          />
        </Slider>
      </div>
    </div>
  );
};
