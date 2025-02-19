import mainBlogImg from "../../../assets/images/mainBlogImg.png";

export const MainBlogCard = () => {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <img src={mainBlogImg} alt="blog image" className="rounded-[5px]" />
        </div>

        <div className="w-4/4">
          <div className="w-fit bg-mindfulBlue rounded-[16px] px-4 py-1">
            <p className="text-sm text-mindfulWhite">March 23, 2024</p>
          </div>

          <h5 className="text-[20px] font-[600] text-mindfulBlack mb-[10px] mt-[10px]">
            Donec egestas, tellus quis pulvinar ultricies,
          </h5>
          <p className="text-[16px] text-mindfulBlack">
            Donec egestas, tellus quis pulvinar ultricies, mi ligula fermentum
            ipsum, et viverra lorem odio a mi. Ut sodales sapien orci, nec
            tincidunt ligula ultrices vitae. Pellentesque a volutpat nisi, at
            interdum libero. Proin pulvinar odio eu sapien molestie, quis
            hendrerit nisl aliquet. Aliquam blandit justo massa, nec dignissim
            lorem vehicula at.
          </p>
        </div>
      </div>
    </div>
  );
};
