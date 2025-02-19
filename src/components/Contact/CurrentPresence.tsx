export const CurrentPresence = () => {
  return (
    <div className="bg-mindfulshadowgray lg:pb-[60px] pb-[40px]">
      <div className="container mx-auto px-4">
        <h2 className="subpage-section-title pb-[5px] mb-5 text-center">
          Current Presence
        </h2>
        <div>
          <div className="border-b-[3px] border-mindfulYellow w-36 mx-auto"></div>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 items-center mt-10 gap-5">
          <p className="bg-white py-5 px-6 text-xl text-center text-main font-bold border-[1px] boder-mindfulGreySecondary">
            INDIA
          </p>
          <p className="bg-white py-5 px-6 text-xl text-center text-main font-bold border-[1px] boder-mindfulGreySecondary">
            UAE
          </p>
          <p className="bg-white py-5 px-6 text-xl text-center text-main font-bold border-[1px] boder-mindfulGreySecondary">
            USA
          </p>
        </div>
      </div>
    </div>
  );
};
