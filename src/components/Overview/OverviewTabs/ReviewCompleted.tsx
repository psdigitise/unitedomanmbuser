// ReviewCompleted
import { useEffect, useState } from "react";
import { TiStar } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { postReview } from "../../../api/ApiConfig";
import { RootState } from "../../../redux/store";

// First, add the interface for props
interface ReviewCompletedProps {
  ratingProviderId: string | null;
  onClose: () => void;
  refreshBookings: () => void;
}

// Define Zod schema for form validation
const reviewSchema = zod.object({
  comment: zod.string().min(1, "Comment is required").max(500, "Comment must be under 500 characters"),
  rating: zod.number().min(1, "Rating is required"), // Ensure rating is between 1 and 5
});

type ReviewFormData = zod.infer<typeof reviewSchema>; // Define types based on schema

export const ReviewCompleted = ({ 
  ratingProviderId, 
  onClose, 
  refreshBookings 
}: ReviewCompletedProps) => {
    console.log("Rating Provider ID:", ratingProviderId);
  // State Declaration for API
  // Local state to track loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Consolidated state for button text and submission status
  const [buttonState, setButtonState] = useState({
    buttonText: "Submit",
    isSubmitted: false,
  });

  // Initialize React Hook Form with Zod validation schema
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset, setError: setFormError } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0, // Default rating
      comment: "",
    //   captcha: "",
    },
  });

  const rating = watch("rating");

  // Handle star click and set the rating in form state
  const handleStarClick = (index: number) => {
    if (rating === index + 1) {
      setValue("rating", 0); // Unselect if clicking the same star
    } else {
      setValue("rating", index + 1); // Set new rating
    }
  };

  useEffect(() => { }, []);

  const userID = useSelector((state: RootState) => state.cart.userID);
  console.log("User ID taken from Redux Store: ", userID);

  // Handle form submission
  const onSubmit = async (data: ReviewFormData) => {
    setLoading(true);
    setError(null);
    setButtonState({ ...buttonState, isSubmitted: false });

    try {
      if (!ratingProviderId) {
        throw new Error("Provider ID is missing.");
      }

      const response = await postReview(
        data.rating, 
        data.comment, 
        parseInt(ratingProviderId), 
        userID || 0
      );
      
      console.log("Review submitted successfully:", response);
      setButtonState({ buttonText: "Review Submitted Successfully", isSubmitted: true });
      reset();

      setTimeout(() => {
        refreshBookings();
        onClose();
      }, 2000);

      setTimeout(() => {
        setButtonState({ buttonText: "Submit", isSubmitted: false });
      }, 3000);

    } catch (error: any) {
      setError(error.message || "Error submitting the review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Write a review */}
      <div>
        <h5 className="text-lg text-mindfulBlack font-semibold mb-2">
          Write a review
        </h5>
      </div>

      {/* Star Rating */}
      <div className="mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <TiStar
              key={index}
              className={`text-[28px] cursor-pointer ${rating > index ? "text-yellow-500" : "text-mindfulGreyTypeOne"}`}
              onClick={() => handleStarClick(index)} // Handle star click
            />
          ))}
        </div>
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
      </div>

      {/* Text Area */}
      <div className="border-b-[1px] border-mindfulLightGrey pb-8 mb-10">
        <form onSubmit={handleSubmit(onSubmit)} className="review-form">
          <div className="mb-3">
            <textarea
              id=""
              rows={3}
              {...register("comment")} // Registering the comment input for form validation
              placeholder="Enter your feedback message here"
              className="w-full border-[1px] border-mindfulGrey rounded-[5px] px-3 py-3 focus-within:outline-none"
            >
            </textarea>
            {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
          </div>


          {/* Captcha */}
          <div className="">

            {/* <div className="flex items-center mb-3">

              <div className="w-32 bg-mindfulLightGrey rounded-md">
                <p className="w-fit mx-auto text-lg text-mindfulBlack font-semibold px-5 py-1">{captcha}</p>
              </div>

              <div onClick={() => setCaptcha(generateCaptcha())}>
                <TiRefresh title="Refresh Captcha" className="text-mindfulBlack text-[28px] cursor-pointer" />
              </div>
            </div> */}


            {/* <div className="mb-5">
              <input
                type="text"
                //  name=""
                id="captcha"
                placeholder="Enter the captcha above"
                className="w-72 border-[1px] border-mindfulGrey rounded-[5px] px-3 py-1 focus-within:outline-none max-sm:w-full"
                {...register("captcha")}
              />

              {errors.captcha && errors.captcha.message && (<p className="text-sm text-red-500 mt-2">{errors.captcha.message}</p>)}
            </div> */}

          </div>


          <div>
            <button
              className={`rounded-[4px] text-lg text-mindfulWhite px-4 py-1.5 
                ${buttonState.isSubmitted ? "bg-green-500" : "bg-main"}`
              } // Conditionally change button color
              disabled={loading}
            >
              {/* {loading ? "Submitting..." : "Submit"} */}
              {loading ? "Submitting..." : buttonState.buttonText} {/* Use buttonText state */}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};
