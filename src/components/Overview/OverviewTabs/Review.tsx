import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { CiStar } from "react-icons/ci";
import { ReviewCard } from "./Review/ReviewCard";
import { fetchReviews, postReview } from "../../../api/ApiConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { TiRefresh, TiStar } from "react-icons/ti";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface ReviewsProps {
  review_id: number;
  rating: string; // Adjusted to number for ease of use
  comment: string;
  user_id: string;
  user_name: string;
  created_at: string;
  status: number;
  provider: number;
}

// Define Zod schema for form validation
const reviewSchema = zod.object({
  comment: zod.string().min(1, "Comment is required").max(500, "Comment must be under 500 characters"),
  rating: zod.number().min(1, "Rating is required"), // Ensure rating is between 1 and 5
  captcha: zod.string().min(1, "Enter CAPTCHA"), // Add CAPTCHA validation  

});

type ReviewFormData = zod.infer<typeof reviewSchema>; // Define types based on schema

export const Review = () => {

  // State to manage the providerId from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const providerId = query.get("provider_id");

  // State Declaration for API
  // Local state to track loading and error states

  // API handling State Declaration
  const [reviewsData, setReviewsData] = useState<ReviewsProps[]>([]);
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
      captcha: "",
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

  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 7; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return captcha;
  };

  const [captcha, setCaptcha] = useState(generateCaptcha());

  const userID = useSelector((state: RootState) => state.cart.userID);
  console.log("User ID taken from Redux Store: ", userID);

  // Handle form submission
  const onSubmit = async (data: ReviewFormData) => {
    setLoading(true);
    setError(null);
    setButtonState({ ...buttonState, isSubmitted: false }); // Reset submission state

    // Check CAPTCHA validity
    if (data.captcha !== captcha) {
      // Manually set an error if CAPTCHA is incorrect
      setFormError("captcha", {
        type: "manual",
        message: "Incorrect CAPTCHA. Please try again.",
      });
      setLoading(false); // Stop loading when CAPTCHA is incorrect
      return; // Exit the function without proceeding further
    }

    try {
      if (!providerId) {
        throw new Error("Provider ID is missing.");
      }

      // Call the API to submit the review
      const response = await postReview(data.rating, data.comment, parseInt(providerId), userID || 0);
      console.log("Review submitted successfully:", response);

      // Update button text and color on success
      setButtonState({ buttonText: "Review Submitted Successfully", isSubmitted: true });

      // Reset the form after successful submission
      reset(); // Clears all form fields including rating and comment

      // Reset button text and color after 3 seconds
      setTimeout(() => {
        setButtonState({ buttonText: "Submit", isSubmitted: false });
        setCaptcha(generateCaptcha()); // Regenerate CAPTCHA
      }, 3000);

      // Optionally reset the form after submission
    } catch (error: any) {
      setError(error.message || "Error submitting the review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // API call to fetch review data
    const loadReviewData = async () => {
      try {
        // const data = await fetchFAQs();
        const data = await fetchReviews();
        setReviewsData(data.reviews); // Directly set the fetched data
        console.log("Reviews data log", data.reviews);

      } catch (error: any) {
        setError(error.message || "Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    loadReviewData();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>
  // }

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
          {/* <CiStar className="text-[28px] text-mindfulGreyTypeOne" />
          <CiStar className="text-[28px] text-mindfulGreyTypeOne" />
          <CiStar className="text-[28px] text-mindfulGreyTypeOne" />
          <CiStar className="text-[28px] text-mindfulGreyTypeOne" />
          <CiStar className="text-[28px] text-mindfulGreyTypeOne" /> */}
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

            <div className="flex items-center mb-3">

              <div className="w-32 bg-mindfulLightGrey rounded-md">
                <p className="w-fit mx-auto text-lg text-mindfulBlack font-semibold px-5 py-1">{captcha}</p>
              </div>

              <div onClick={() => setCaptcha(generateCaptcha())}>
                <TiRefresh title="Refresh Captcha" className="text-mindfulBlack text-[28px] cursor-pointer" />
              </div>
            </div>


            <div className="mb-5">
              <input
                type="text"
                //  name=""
                id="captcha"
                placeholder="Enter the captcha above"
                className="w-72 border-[1px] border-mindfulGrey rounded-[5px] px-3 py-1 focus-within:outline-none max-sm:w-full"
                {...register("captcha")}
              />

              {errors.captcha && errors.captcha.message && (<p className="text-sm text-red-500 mt-2">{errors.captcha.message}</p>)}
            </div>

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

      {/* Review Card */}
      <div className="">
        {reviewsData.map((review) => (
          <ReviewCard
            key={review.review_id}
            reviewID={review.review_id} // Replace with a proper name if available
            rating={parseInt(review.rating, 10)}
            userID={review.user_id} // Replace with a proper name if available
            userName={review.user_name}
            createdAt={new Date(review.created_at).toLocaleDateString()}
            comment={review.comment}
            status={review.status}
          />
        ))}
        {/* <ReviewCard />
        <ReviewCard /> */}
      </div>
    </div>
  );
};
