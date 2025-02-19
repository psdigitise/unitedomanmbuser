import { Link } from "react-router-dom";
import { RadioInput } from "../../common/RadioInput";
import { IoMdClose } from "react-icons/io";

interface PersonalizePopupProps {
  closePopup: () => void;
}

export const PersonalizePopup: React.FC<PersonalizePopupProps> = ({
  closePopup,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="container mx-auto">
        <div className="relative bg-white rounded-[40px] w-7/12 mx-auto px-10 py-10">
          {/* Close Button */}
          <div
            onClick={closePopup}
            className="absolute top-5 right-5 w-fit border-[1px] border-mindfulGrey rounded-full p-3"
          >
            <IoMdClose className="text-mindfulGrey text-[22px]" />
          </div>

          <div className="relative mt-5 mb-16">
            <h2 className="text-3xl text-mindfulBlack font-semibold">
              Personalize your Beauty experience
            </h2>
            <div className="absolute inset-x-0 bottom-[-20px] mx-auto bg-mindfulLightGrey rounded-md w-4/12 h-0.5"></div>
          </div>

          {/* Question & Answer */}
          <form action="" method="post">
            <div>
              <div className="text-start">
                <div className="mb-5">
                  <h5 className="text-lg text-mindfulBlack font-bold mb-2">
                    1. Lorem ipsum dolor sit amet consectetur, adipisicing ?
                  </h5>

                  <div className="w-8/12 flex justify-start items-center space-x-10 pl-5">
                    <RadioInput id={"lorem"} value={"radio"} label="Lorem" />
                    <RadioInput id={"ipsum"} value={"radio"} label="Ipsum" />
                    <RadioInput
                      id={"dolor"}
                      value={"radio"}
                      label="Dolor sit amet"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <h5 className="text-lg text-mindfulBlack font-bold mb-2">
                    2. Sed vitae arcu quis ex ullacorper aliquam ?
                  </h5>

                  <div className="w-8/12 flex justify-start items-center space-x-10 pl-5">
                    <RadioInput id={"yes"} value={"radio"} label="Yes" />
                    <RadioInput id={"no"} value={"radio"} label="No" />
                  </div>
                </div>
              </div>

              <div className="text-start mb-5">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Please enter"
                  className="w-10/12 border-2 border-mindfulLightGrey rounded-3xl px-5 py-1.5 focus-visible:outline-none"
                />
              </div>

              <div className="text-end">
                <Link to="/SearchResults">
                  <button
                    type="submit"
                    className="bg-main rounded-[33px] text-mindfulWhite px-8 py-3"
                  >
                    Send
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
