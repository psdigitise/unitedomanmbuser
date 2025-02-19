import teamImgGalleryOne from "../../assets/images/teamImgGalleryOne.jpg";
import teamImgGalleryTwo from "../../assets/images/teamImgGallerytwo.jpg";

export const TeamBeforeAftergallery = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="w-full">
            <div>
              <img src={teamImgGalleryOne} alt="" className="w-full h-full" />
            </div>
          </div>
          <div className="w-full">
            <div className="h-full">
              <img src={teamImgGalleryTwo} alt="" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
