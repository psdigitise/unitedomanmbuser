import { Link } from "react-router-dom"
import mackupkit from "../../assets/images/mackupkit.svg"

export const ThankYouCard = () => {
  return (
    <div>

      <div className="contaniner mx-auto py-16">
        <div className="space-y-4 text-center pb-20">
          <h5 className="text-[36px] text-black font-bold">Thank You for Booking with Us!</h5>
          <p className='text-lg font-normal text-black'>Your appointment has been successfully scheduled. We’re excited to be part of your beauty journey.</p>
        </div>
        <div>

          <div className='text-center space-y-6'>
            <div className=''>
              <img className='mx-auto' src={mackupkit} alt="" />
            </div>

            <div>
              <h5 className="text-main text-[32px] font-bold">What's Next?</h5>
            </div>


            <button className='bg-main py-5 px-6 text-xl text-white font-medium '>You will receive a confirmation email shortly.</button>
            <div className='text-center'>
              <Link to="/">
                <p className="text-main text-md font-medium text-center">Back to Home</p>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
