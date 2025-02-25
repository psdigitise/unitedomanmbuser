import { useNavigate } from "react-router-dom"
import mackupkit from "../../assets/images/mackupkit.svg"

export const ThankYouCard = () => {

  const navigate = useNavigate();

  const handleBackToHome = () => {
    // Replace the current history entry to prevent back navigation
    navigate("/", { replace: true });

    // Clear history state to prevent back button from working
    window.history.pushState({}, "", window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  };


  return (
    <div>

      <div className="contaniner mx-auto py-16 px-5 max-md:py-10">
        <div className="space-y-4 text-center pb-20 max-lg:pb-8">
          <h5 className="text-[36px] text-black font-bold max-lg:text-[32px] max-md:text-[28px] max-sm:text-[24px]">Thank You for Booking with Us!</h5>
          <p className='text-lg font-normal text-black max-sm:text-base'>Your appointment has been successfully scheduled. We’re excited to be part of your beauty journey.</p>
        </div>
        <div>

          <div className='text-center space-y-6 max-md:space-y-3'>
            <div className=''>
              <img className='mx-auto' src={mackupkit} alt="" />
            </div>

            <div>
              <h5 className="text-main text-[32px] font-bold max-lg:text-[28px] max-md:text-[24px] max-sm:text-[22px]">What's Next?</h5>
            </div>


            <button className='bg-main py-5 px-6 text-xl text-white font-medium max-sm:text-sm max-sm:px-4 max-sm:py-3'>
              You will receive a confirmation email shortly.
            </button>

            <div className='text-center'>
              {/* <Link to="/"> */}
              <p onClick={handleBackToHome} className="text-main text-md font-medium text-center">Back to Home</p>
              {/* </Link> */}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
