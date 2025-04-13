/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BannerContent } from "../components/common/BannerContent";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Adjust this import based on your store's path
import { checkOut, fetchCouponCode } from "../api/ApiConfig";

import { clearCart } from "../redux/cartSlice"; // Import clearCart action
import { clearFields } from "../redux/loginHeaderSlice";
import { persistor } from "../redux/store"; // Import the persistor from your store configuration
import { ShimmerTable } from "shimmer-effects-react";
import { Helmet } from "react-helmet-async";

// Define the structure of a cart item
interface CartItem {
  serviceID: number;
  serviceName: string;
  // quantity: number;
  price: number;
}

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  // Fetch the cart items and quantities from the Redux store
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  ) as CartItem[];
  const quantities = useSelector((state: RootState) => state.cart.quantities);

  // State for the quantity of items
  // const [quantities, setQuantities] = useState<{ [serviceID: number]: number }>({});
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [isCouponInputVisible, setIsCouponInputVisible] = useState(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState(""); // State to hold the applied coupon code
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize quantities dynamically
  // useEffect(() => {
  //     const initialQuantities = cartItems.reduce((acc, item) => {
  //         acc[item.serviceID] = 1; // Initialize each item's quantity to 1
  //         return acc;
  //     }, {} as { [serviceID: number]: number });

  //     setQuantities(initialQuantities);
  // }, [cartItems]);

  // Calculate total for each item and the grand total
  const calculateItemTotal = (price: number, quantity: number) =>
    price * quantity;

  const grandTotal = cartItems.reduce((total, item) => {
    return (
      total + calculateItemTotal(item.price, quantities[item.serviceID] || 0)
    );
  }, 0);

  //CGST and SGST amount
  const CGST = (grandTotal * 0.09); // "9%" calculation
  const SGST = (grandTotal * 0.09); // "9%" calculation

  // Apply coupon discount if available
  // const discountedTotal = couponDiscount
  //     ? Math.max(0, grandTotal - (grandTotal * (couponDiscount / 100))) // Ensure it doesn't go below zero
  //     : grandTotal;

  // Apply coupon discount if available
  const discountedTotal: number = grandTotal - (couponDiscount || 0); // Use logical OR to default to 0 if couponDiscount is null

  // console.log(discountedTotal, "amount");

  const finalPayableAmount = discountedTotal + CGST + SGST;
  // console.log(finalPayableAmount, "finalPayableAmount");


  // Load coupon code data when coupon code is submitted
  const loadCouponCodeData = async (coupon_code: string) => {
    setLoading(true);
    try {
      const data = await fetchCouponCode(coupon_code); // Pass the coupon_code to your API
      // Set the coupon discount value based on the fetched data
      if (data && data.data.discount_value && data.status === "success") {
        setCouponDiscount(data.data.discount_value); // Set valid discount
        setError("");
      } else {
        setCouponDiscount(0); // Set to 0 if the coupon is invalid
        setError("Invalid coupon code");
      }
      console.log(data.data.discount_value);
    } catch (error: any) {
      setError(error.message || "Failed to fetch coupon code.");
    } finally {
      setLoading(false);
    }
  };

  // Coupon code submission handler
  const handleCouponSubmit = () => {
    loadCouponCodeData(couponCode); // Call the function with the coupon code

    // setIsCouponInputVisible(!isCouponInputVisible)
    // Add your coupon submission logic here
    if (couponCode) {
      setAppliedCoupon(couponCode); // Save the coupon code when submitted
      setIsCouponInputVisible(!isCouponInputVisible); // Hide the input after submission
    }
  };

  const toggleCouponInput = () => {
    setIsCouponInputVisible((prev) => !prev);
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;


  const sessionAppointmentID = sessionStorage.getItem("appointmentID");
  console.log("Appointment ID from session storage:", sessionAppointmentID);


  // Handle checkout button click
  const handleCheckout = async () => {
    // // Clear the cart in Redux state
    // dispatch(clearCart());

    // // Purge persisted state (this will remove Redux Persist data, i.e., localStorage data)
    // await persistor.purge();  // This clears the persisted Redux state from localStorage

    // // Add your checkout logic here
    // navigate("/ThankYou");
    // window.scrollTo(0, 0); // Scroll to the top of the page

    // Clear the input fields in the LoginHeader after checking out
    dispatch(clearFields());

    console.log(sessionAppointmentID, discountedTotal, couponCode, couponDiscount, "All response");


    try {

      // Validate if required data is available
      if (!sessionAppointmentID) {
        throw new Error("Appointment ID is missing. Please start over.");
      }

      if (discountedTotal <= 0) {
        throw new Error("Invalid total amount. Please review your cart.");
      }


      // Add your checkout logic here
      // For example, you can call an API to process the payment
      const response = await checkOut(
        String(sessionAppointmentID), // Ensure appointmentID is a string
        discountedTotal,
        couponCode || "", // Pass null if no coupon code is applied
        couponDiscount || 0 // Default to 0 if no discount is applied
      );
      console.log("Checkout button click response:", response);

      // Check if the response indicates success
      if (response.status !== "success") {
        throw new Error(response.message || "Checkout failed. Please try again.");
      }

      // If successful, clear the cart and persist state
      dispatch(clearCart()); // Clear the Redux cart state


      // Flush pending storage writes before purging
      await persistor.flush();

      // Purge persisted state (this clears Redux Persist data, i.e., localStorage data)
      await persistor.purge();

      // Proceed with checkout logic
      navigate("/ThankYou");
      window.scrollTo(0, 0); // Scroll to the top of the page
    } catch (error: any) {
      console.error("Error during checkout or state purge:", error);
      setError(error.message || "An unexpected error occurred during checkout.");
    }
  };

  return (
    <section className="mt-[15px]">
      {/* Banner Content */}
      <div>
        <BannerContent bannerTitle="Your Cart" />
      </div>
       <Helmet>
              <script>
                {`
                  (function (c, s, q, u, a, r, e) {
                    c.hj = c.hj || function () { (c.hj.q = c.hj.q || []).push(arguments) };
                    c._hjSettings = { hjid: 6369861 };
                    r = s.getElementsByTagName('head')[0];
                    e = s.createElement('script');
                    e.async = true;
                    e.src = q + c._hjSettings.hjid + u;
                    r.appendChild(e);
                  })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 6369861);
                `}
              </script>
            </Helmet>

      <div className="container mx-auto px-5">
        <div className="w-1/2 mx-auto mb-20 max-xl:w-[75%] max-md:mb-10 max-lg:w-full ">
          {/* Icons Div */}
          <div className="my-16 max-md:my-8">
            <div className="relative flex justify-between items-center">
              {/* Back Line */}
              <div className="w-full absolute top-8 left-0 z-[-2]">
                <div className="w-full h-[2px] bg-mindfulLightGrey rounded-lg"></div>
              </div>

              {/* Login Icon */}
              {/* <Link to="/Login"> */}
              <div className="bg-white w-[60px] h-[60px] border-2 border-mindfulBlack rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29.999"
                  height="30"
                  viewBox="0 0 29.999 30"
                >
                  <defs>
                    <clipPath id="clip-path">
                      <rect
                        id="Rectangle_328"
                        data-name="Rectangle 328"
                        width="29.999"
                        height="30"
                        fill="#fff"
                      />
                    </clipPath>
                  </defs>
                  <g
                    id="Group_403"
                    data-name="Group 403"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_574"
                      data-name="Path 574"
                      d="M58.041,26.06v-22c-.134-.007-.248-.017-.362-.017q-2.25,0-4.5,0a1.861,1.861,0,0,0-2.007,2.021c0,.422.006.844,0,1.266A1.213,1.213,0,0,1,49.915,8.6a1.2,1.2,0,0,1-1.2-1.287,14.774,14.774,0,0,1,.065-2.069A4.307,4.307,0,0,1,52.968,1.63c1.84-.017,3.681,0,5.521-.014a.865.865,0,0,0,.545-.218A4.381,4.381,0,0,1,64.009.361c2.527.959,5.073,1.87,7.585,2.866a3.941,3.941,0,0,1,2.521,3.444,3.856,3.856,0,0,1,.013.457q0,7.791,0,15.581a4.108,4.108,0,0,1-2.879,4.169c-1.1.421-2.212.831-3.318,1.247-1.358.511-2.721,1.009-4.072,1.536a4.309,4.309,0,0,1-4.094-.4,3.685,3.685,0,0,1-.711-.671.659.659,0,0,0-.544-.243q-2.69.013-5.38,0a4.253,4.253,0,0,1-4.176-2.9,5.532,5.532,0,0,1-.226-1.308c-.038-.489-.011-.984-.009-1.477a1.037,1.037,0,0,1,.93-1.125,1.209,1.209,0,0,1,1.44.773,1.984,1.984,0,0,1,.08.552c.012.492-.008.985.01,1.477a1.838,1.838,0,0,0,1.592,1.7,3.394,3.394,0,0,0,.351.011h4.92"
                      transform="translate(-44.13 0)"
                      fill="#000"
                    />
                    <path
                      id="Path_575"
                      data-name="Path 575"
                      d="M7.426,120c-.316-.311-.637-.618-.948-.934a1.174,1.174,0,0,1-.073-1.7,1.192,1.192,0,0,1,1.73.007c.94.916,1.866,1.847,2.8,2.771a7.014,7.014,0,0,1,.574.582.627.627,0,0,1-.083.866c-1.1,1.134-2.215,2.257-3.351,3.357a1.073,1.073,0,0,1-1.592-.127,1.152,1.152,0,0,1,.229-1.647,5.527,5.527,0,0,0,.815-.674h-.37c-1.981,0-3.961.005-5.942,0A1.111,1.111,0,0,1,.006,121.17a1.169,1.169,0,0,1,1.247-1.078c1.535-.008,3.071,0,4.606,0H7.394L7.426,120"
                      transform="translate(0 -106.01)"
                      fill="#000"
                    />
                  </g>
                </svg>
              </div>
              {/* </Link> */}

              {/* Calendar Time Icon */}
              {/* <Link to="/DateTime"> */}
              <div className="bg-white w-[60px] h-[60px] border-2 border-mindfulBlack rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="27.868"
                  viewBox="0 0 30 27.868"
                >
                  <defs>
                    <clipPath id="clip-path">
                      <rect
                        id="Rectangle_330"
                        data-name="Rectangle 330"
                        width="30"
                        height="27.868"
                        fill="#fff"
                      />
                    </clipPath>
                  </defs>
                  <g
                    id="Group_407"
                    data-name="Group 407"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_579"
                      data-name="Path 579"
                      d="M14.231,119.224c-.108.006-.194.014-.281.014-3.057,0-6.115.017-9.172-.005A4.5,4.5,0,0,1,.4,116.394a4.271,4.271,0,0,1-.359-1.65C.009,110.972.023,107.2.023,103.428c0-.055.008-.11.014-.19h25.2v1.944c-4.069-.9-7.571.051-10.166,3.353s-2.694,6.926-.84,10.689"
                      transform="translate(-0.018 -94.005)"
                      fill="#000"
                    />
                    <path
                      id="Path_580"
                      data-name="Path 580"
                      d="M176.562,160.163a7.437,7.437,0,1,1,7.449-7.41,7.42,7.42,0,0,1-7.449,7.41m1.078-8.5c0-.408.012-.774,0-1.139a1.068,1.068,0,1,0-2.136.025q-.012,1.086,0,2.172a1.047,1.047,0,0,0,1.073,1.082c.69.01,1.381.008,2.071,0a1.07,1.07,0,1,0,.011-2.139c-.322-.008-.643,0-1.017,0"
                      transform="translate(-154.011 -132.295)"
                      fill="#000"
                    />
                    <path
                      id="Path_581"
                      data-name="Path 581"
                      d="M17.369,19.227a1.407,1.407,0,0,0-.048.255c0,.814-.008,1.629,0,2.443a1.072,1.072,0,1,0,2.137.011c.012-.781,0-1.562,0-2.343,0-.12,0-.24,0-.354,3.919-.543,6.105,2.442,5.734,5.266H.025a4.689,4.689,0,0,1,1.7-4.281A4.369,4.369,0,0,1,4.562,19.2c.4,0,.8.009,1.2.013L5.757,19.2c.005.066.015.133.015.2,0,.856-.008,1.713,0,2.569a1.069,1.069,0,1,0,2.137,0c.006-.923,0-1.846,0-2.769l-.013.013c.122-.007.244-.019.366-.019q4.342,0,8.684,0c.143,0,.286.025.429.038Z"
                      transform="translate(0 -17.46)"
                      fill="#000"
                    />
                    <path
                      id="Path_582"
                      data-name="Path 582"
                      d="M64.384,1.754c0-.233,0-.467.011-.7a1.069,1.069,0,1,1,2.137.037c0,.222-.01.444-.016.666l.013-.013H64.377Z"
                      transform="translate(-58.619 -0.002)"
                      fill="#000"
                    />
                    <path
                      id="Path_583"
                      data-name="Path 583"
                      d="M193.989,1.774a5.146,5.146,0,0,1,0-1.02,1.056,1.056,0,0,1,2.051.116,7.146,7.146,0,0,1,.007.9h-2.065l.007.007"
                      transform="translate(-176.613 0)"
                      fill="#000"
                    />
                  </g>
                </svg>
              </div>
              {/* </Link> */}

              {/* Cart Icon */}
              <Link to="/Cart">
                <div className="bg-main w-[60px] h-[60px] rounded-full flex justify-center items-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="29.171"
                    viewBox="0 0 30 29.171"
                  >
                    <defs>
                      <clipPath id="clip-path">
                        <rect
                          id="Rectangle_329"
                          data-name="Rectangle 329"
                          width="30"
                          height="29.171"
                          fill="#000"
                        />
                      </clipPath>
                    </defs>
                    <g
                      id="Group_405"
                      data-name="Group 405"
                      clip-path="url(#clip-path)"
                    >
                      <path
                        id="Path_576"
                        data-name="Path 576"
                        d="M98,308.733a7.539,7.539,0,0,1-.714-.263,2.527,2.527,0,1,1,1.763.176c-.093.025-.184.058-.277.088Z"
                        transform="translate(-88.248 -279.562)"
                        fill="#fff"
                      />
                      <path
                        id="Path_577"
                        data-name="Path 577"
                        d="M289.693,308.733a7.519,7.519,0,0,1-.714-.263,2.527,2.527,0,1,1,1.763.176c-.093.025-.184.058-.277.088Z"
                        transform="translate(-264.726 -279.562)"
                        fill="#fff"
                      />
                      <path
                        id="Path_578"
                        data-name="Path 578"
                        d="M18.895,22.826q-3.686,0-7.371,0a3.241,3.241,0,0,1-3.34-3.066A4.124,4.124,0,0,1,8.289,18.7c.076-.407.2-.807.3-1.21a3.252,3.252,0,0,0-.07-1.871Q6.455,9.446,4.4,3.269a.907.907,0,0,0-1.015-.725c-.684,0-1.367,0-2.051,0A1.27,1.27,0,1,1,1.32.006C2.538,0,3.757,0,4.975,0a1.278,1.278,0,0,1,1.331.97c.37,1.1.734,2.194,1.1,3.291a.964.964,0,0,0,1.13.819q9.972,0,19.944,0a2.438,2.438,0,0,1,.59.043,1.257,1.257,0,0,1,.849,1.688c-.425,1.3-.857,2.59-1.289,3.884q-1,3-2,5.992a1.321,1.321,0,0,1-1.468,1.066H12.027c-.724,0-.927.157-1.1.851-.065.259-.136.517-.2.777a.686.686,0,0,0,.659.909c.108.009.218,0,.327,0q7.342,0,14.683,0a2.257,2.257,0,0,1,.588.052,1.244,1.244,0,0,1,.9,1.393,1.228,1.228,0,0,1-1.2,1.072c-1.169.015-2.338.007-3.507.007h-4.28"
                        transform="translate(0 0.001)"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Cart Item Table */}
          <div className="max-sm:overflow-x-scroll">
            <table className="w-full">
              <thead className="text-start">
                <tr>
                  <th className="text-start px-2 py-3">Items</th>
                  <th className="px-2 py-3">Price</th>
                  <th className="px-2 py-3">Quantity</th>
                  <th className="text-end px-2 py-3 w-64">Total</th>
                </tr>
              </thead>

              <tbody className="pb-5">
                {/* Dynamically load cart items */}
                {cartItems.map((item) => (
                  <tr
                    key={item.serviceID}
                    className="border-b-2 border-b-mindfulGreyTypeThree border-dashed"
                  >
                    <td className="px-2 py-5">{item.serviceName}</td>
                    <td className="text-center px-2 py-5">
                      &#8377; {item.price}
                    </td>
                    <td className="text-center px-2 py-5">
                      <div className="w-fit mx-auto rounded-[5px] border-[2px] border-mindfulLightGrey px-4 py-1">
                        <p className="text-md text-mindfulBlack font-medium">
                          {quantities[item.serviceID] || 1}
                        </p>
                      </div>
                    </td>
                    <td className="text-end px-2 py-5">
                      &#8377;{" "}
                      {calculateItemTotal(
                        item.price,
                        quantities[item.serviceID]
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={2} className="px-2 py-3"></td>
                  <td className="text-mindfulBlack font-semibold px-2 py-3">
                    Subtotal:
                  </td>
                  <td className="text-end px-2 py-3">&#8377; {grandTotal}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="px-2 py-3"></td>

                  <td className="text-mindfulBlack font-semibold px-2 py-3">
                    Coupon Code:
                  </td>

                  <td className="px-2 py-3">
                    <div
                      className="text-end underline pb-3 cursor-pointer"
                      onClick={toggleCouponInput}
                    >
                      {appliedCoupon || isCouponInputVisible
                        ? "Hide Coupon"
                        : "Add Coupon"}
                    </div>

                    {isCouponInputVisible && (
                      <div className="flex justify-end flex-col items-end space-y-2">
                        <input
                          type="text"
                          placeholder="Enter the coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="border-2 border-mindfulBlack px-4 py-2 rounded-md"
                        />
                        <button
                          onClick={handleCouponSubmit} // Call submit handler
                          className="ml-2 bg-main text-white rounded-md px-4 py-2"
                        >
                          Apply
                        </button>
                      </div>
                    )}

                    {error && (
                      <p className="text-sm text-red-500 text-end">{error}</p>
                    )}
                  </td>
                </tr>

                {/* {appliedCoupon && (
                                    <tr>
                                        <td colSpan={2} className="px-2 py-3"></td>
                                        <td className="text-mindfulBlack font-semibold px-2 py-3">Applied Coupon :</td>
                                        <td className="text-end px-2 py-3"> <strong>{appliedCoupon}</strong></td>
                                    </tr>
                                )} */}

                {loading ? (
                  // Show shimmer effect while loading
                  <tr>
                    <td colSpan={2} className="px-2 py-3"></td>
                    <td colSpan={2}>
                      <ShimmerTable
                        mode="light"
                        row={1}
                        col={1}
                        border={1}
                        borderColor={"#cbd5e1"}
                        rounded={0.25}
                        rowGap={16}
                        colPadding={[20, 10, 20, 10]}
                      />
                    </td>
                  </tr>
                ) : (
                  // Show the applied coupon details or other content after loading
                  appliedCoupon && (
                    <tr>
                      <td colSpan={2} className="px-2 py-3"></td>
                      <td className="text-mindfulBlack font-semibold px-2 py-3">
                        Applied Coupon :
                      </td>
                      <td className="text-end px-2 py-3">
                        {" "}
                        <strong>{appliedCoupon}</strong>
                      </td>
                    </tr>
                  )
                )}

                <tr>
                  <td colSpan={2} className="px-2 py-3"></td>
                  <td className="text-mindfulBlack font-semibold px-2 py-3">
                    Discounted Amount :
                  </td>
                  <td className="text-end text-mindfulBlack font-bold px-2 py-3">
                    &#8377; {couponDiscount}
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="px-2 py-3"></td>
                  <td className="text-mindfulBlack font-semibold px-2 py-3">
                    Grand Total:
                  </td>
                  <td className="text-end text-mindfulBlack font-bold px-2 py-3">
                    &#8377; {discountedTotal}
                  </td>
                </tr>


                <tr>
                  <td colSpan={2} className="px-2 py-3"></td>
                  <td className="text-mindfulBlack font-semibold px-2 py-3">
                    CGST(9%):
                  </td>
                  <td className="text-end text-mindfulBlack font-bold px-2 py-3">
                    &#8377; {CGST}
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="px-2 py-3"></td>
                  <td className="text-mindfulBlack font-semibold px-2 py-3">
                    SGST(9%):
                  </td>
                  <td className="text-end text-mindfulBlack font-bold px-2 py-3">
                    &#8377; {SGST}
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="px-2 py-3"></td>
                  <td className="text-mindfulBlack font-semibold px-2 py-3">
                    Taxable Grand Total:
                  </td>
                  <td className="text-end text-mindfulBlack font-bold px-2 py-3">
                    &#8377; {finalPayableAmount}
                  </td>
                </tr>


                <tr>
                  <td colSpan={2} className="px-2 py-3"></td>
                  <td colSpan={2} className="text-end">
                    <div className="mt-5">
                      <button
                        onClick={handleCheckout}
                        className="w-full mx-auto bg-main rounded-[7px] text-lg text-mindfulWhite px-4 py-2"
                      >
                        {/* Checkout */}
                        Confirm
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
