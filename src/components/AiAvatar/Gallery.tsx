import galleryImg1 from "../../assets/images/gallery-img-1.jpeg";
import galleryImg2 from "../../assets/images/gallery-img-2.jpeg";
import galleryImg3 from "../../assets/images/gallery-img-3.jpeg";
import galleryImg4 from "../../assets/images//gallery-img-4.webp";
import galleryImg5 from "../../assets/images/gallery-img-5.jpg";
import galleryImg6 from "../../assets/images/gallery-img-6.webp";
import galleryImg7 from "../../assets/images/gallery-img-7.webp";
import galleryImg8 from "../../assets/images/gallery-img-8.jpg";
import galleryImg9 from "../../assets/images/gallery-img-9.webp";

export const Gallery = () => {
  return (
    <div className="lg:py-[60px] py-[40px]">
      <div className="container mx-auto px-4">
        <div className="mb-[20px]">
          <h2 className="subpage-section-title text-black text-center">
            Portraits Of Mindful Beauty
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          <img src={galleryImg1} alt="" />
          <img src={galleryImg2} alt="" />
          <img src={galleryImg3} alt="" />
          <img src={galleryImg4} alt="" />
          <img src={galleryImg5} alt="" />
          <img src={galleryImg6} alt="" />
          <img src={galleryImg7} alt="" />
          <img src={galleryImg8} alt="" />
          <img src={galleryImg9} alt="" />
        </div>
      </div>
    </div>
  );
};
