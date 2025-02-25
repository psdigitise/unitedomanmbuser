import { TiStar } from "react-icons/ti";
import reviewCardImg from "../../../../assets/images/reviewCardImg.png";
// import { CiStar } from "react-icons/ci";

interface ReviewCardProps {
  userID: string;
  userName: string;
  reviewID: number;
  rating: number;
  comment: string;
  createdAt: string;
  status: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ userID, userName, reviewID, rating, comment, createdAt }) => {
  return (
    <div className="border-b-[1px] border-mindfulLightGrey border-dashed pb-5 mb-5">
      <div className="flex justify-between items-start max-sm:flex-wrap max-sm:items-start max-sm:gap-2 max-sm:space-x-0">
        <div className="flex items-start space-x-3 mb-2 max-sm:flex-wrap max-sm:items-start max-sm:gap-2 max-sm:space-x-0">
          <div key={reviewID}>
            <img src={reviewCardImg} alt="reviewCardImg" />
          </div>
          <h5 key={userID} className="text-lg text-mindfulBlack font-semibold">
            {userName || "Joyce Mridula"}

          </h5>
        </div>

        <div>
          <p className="text-sm text-mindfulGrey">
            {/* 20 July 2024 */}
            {createdAt}
          </p>
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <div className="flex items-center space-x-1 mb-2">
          {/* {rating ? "" : ""} */}
          {/* <CiStar className="text-[22px] text-mindfulGreyTypeOne" />
          <CiStar className="text-[22px] text-mindfulGreyTypeOne" />
          <CiStar className="text-[22px] text-mindfulGreyTypeOne" />
          <CiStar className="text-[22px] text-mindfulGreyTypeOne" />
          <CiStar className="text-[22px] text-mindfulGreyTypeOne" /> */}
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <TiStar
                key={index}
                className={`text-[22px] ${index < rating ? "text-mindfulYellow" : "text-mindfulGreyTypeOne"
                  }`}
              />
            ))}
        </div>
      </div>

      <div>
        <p className="text-md text-mindfulBlack">
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          venenatis turpis a sem viverra accumsan. Nunc porta sapien et accumsan
          ultricies. Proin vel viverra purus. Aliquam porta eros nec efficitur
          tincidunt. Fusce vitae bibendum nibh. Vestibulum sagittis dignissim
          eros at posuere. */}
          {comment}
        </p>
      </div>
    </div>
  );
};
