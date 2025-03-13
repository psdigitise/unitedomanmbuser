import { useState, useEffect } from "react";
import mindfulBeautyLogoFooter from "../assets/icons/mindfulBeautyLogoFooter.png";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import instagram from "../assets/icons/instagram.png";
import facebook from "../assets/icons/facebook.png";
import linkedIn from "../assets/icons/linkedIn.png";
import x from "../assets/icons/x.png";
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { subscribeNewsLetter, fetchCities } from "../api/ApiConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

// Define Zod schema for email validation
const emailSchema = zod.object({
  email: zod.string().email("Please enter a valid email"),
});

// Define the type based on the schema
type EmailFormData = zod.infer<typeof emailSchema>;

export const Footer = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [citiesError, setCitiesError] = useState<string | null>(null);

  // Consolidated state for button text and submission status
  const [buttonState, setButtonState] = useState({ buttonText: "Submit", isSubmitted: false });

  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await fetchCities();
        // Filter out single letter cities and sort alphabetically
        console.log("Cities data", citiesData);
        const filteredCities = citiesData
          .filter((city: string) => city.length > 1)
          .sort((a: string, b: string) => a.localeCompare(b));
        setCities(filteredCities);
      } catch (error) {
        console.error("Error loading cities:", error);
        setCitiesError("Failed to load cities");
      }
    };

    loadCities();
  }, []);

  const onSubmit = async (data: EmailFormData) => {

    setLoading(true); // Start loading state
    setError(null);   // Clear any previous errors
    setButtonState({ ...buttonState, isSubmitted: false }); // Reset submission state


    try {
      const response = await subscribeNewsLetter(data.email);
      console.log("Email submitted successfully:", response);


      // Update button text and color on success
      setButtonState({ buttonText: "Email Submitted Successfully", isSubmitted: true });

      // Reset the form after successful submission
      reset(); // Clears all form fields including rating and comment

      // Reset button text and color after 3 seconds
      setTimeout(() => {
        setButtonState({ buttonText: "Submit", isSubmitted: false });
      }, 3000);

    } catch (error: any) {
      setError(error.message || "Error submitting the email. Please try again.")
    } finally {
      setLoading(false); // End loading state
    }
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  const Year = () => {
    let date = new Date();
    let newYear = date.getFullYear();
    return newYear;
  };
  return (
    <footer>
      <div className="container mx-auto border-t-[1px] border-mindfulGrey px-4">
        {/* Footer Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-[40px]">
          <div>
            <div className="mb-4">
              <img
                src={mindfulBeautyLogoFooter}
                alt="mindfulBeautyLogoFooter"
                className="footer-logo"
              />
            </div>

            <p className="leading-relaxed text-mindfulBlack">
              Mindful Beauty offers a magical journey where Augmented
              Intelligence and skilled artisans create unique bridal looks that
              reflect each bride's desires. Their innovative approach blends
              beauty and technology, ensuring personalized care and artistry for
              an unforgettable experience.
            </p>
          </div>

          <div className="md:mx-auto">
            <h3 className="text-[18px] text-mindfulBlack font-bold mb-4">
              Quick links
            </h3>

            <div>
              <ul className="">
                <Link to="/AboutUs">
                  <li className="text-[16px] text-mindfulBlack mb-2 hover:underline">
                    {/* <a href="#" className="hover:underline"> */}
                    About Us
                    {/* </a> */}
                  </li>
                </Link>

                <li className="text-[16px] text-mindfulBlack mb-2 hover:underline">
                  {/* <a href="#" className="hover:underline"> */}
                  Reviews
                  {/* </a> */}
                </li>

                {/* <li className="text-[16px] text-mindfulBlack mb-2 hover:underline"> */}
                  {/* <a href="#" className="hover:underline"> */}
                  {/* Blog */}
                  {/* </a> */}
                {/* </li> */}

                <Link to="/Contact">
                  <li className="text-[16px] text-mindfulBlack mb-2 hover:underline">
                    {/* <a href="#" className="hover:underline"> */}
                    Contact us
                    {/* </a> */}
                  </li>
                </Link>

                {/* <li className="text-[16px] text-mindfulBlack mb-2 hover:underline">
                  <a href="#" className="hover:underline">
                    Register as a professional
                  </a>
                </li> */}
                <li className="text-[16px] text-mindfulBlack mb-2 hover:underline">
                  <a
                    href="https://calm-sand-0e7a0520f.4.azurestaticapps.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Register as a professional
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-fit md:mx-auto">
            <h3 className="text-[18px] text-mindfulBlack font-bold mb-4">
              Contact Us
            </h3>

            <div>
              <ul>
                <li className="mb-5">
                  <div className="flex items-start space-x-2">
                    <div>
                      <MdOutlineLocationOn className="text-[22px] text-main" />
                    </div>
                    <div>
                      <h3 className="text-mindfulBlack font-semibold">
                        Mindful Beauty
                      </h3>
                      <p className="text-mindfulBlack">
                        Chitteth Building, PC Road, Vytilla, Kochi - 681019
                      </p>
                    </div>
                  </div>
                </li>

                <li className="mb-5">
                  <div className="w-fit flex items-center space-x-2 cursor-pointer">
                    <div>
                      <MdPhone className="text-[22px] text-main" />
                    </div>
                    <div>
                      <p className="text-mindfulBlack">
                        <Link
                          to="tel:+971552761575"
                          className="hover:underline"
                        >
                          +971 552761575
                        </Link>
                      </p>
                    </div>
                  </div>
                </li>

                <li className="mb-5">
                  <div className="w-fit flex items-center space-x-2 cursor-pointer">
                    <div>
                      <MdMailOutline className="text-[22px] text-main" />
                    </div>
                    <div>
                      <p className="text-mindfulBlack">
                        <Link
                          to="mailto:partnership@mindfulbeauty.ai"
                          className="hover:underline"
                        >
                          partnership@mindfulbeauty.ai
                        </Link>
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <h3 className="text-[18px] text-mindfulBlack font-bold mb-2">
                    Follow Us
                  </h3>

                  <div>
                    <ul className="flex items-center space-x-2">
                      <li className="cursor-pointer">
                        <Link
                          to="https://www.instagram.com/mindfulbeautyai"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={instagram} alt="instagram" />
                        </Link>
                      </li>
                      <li className="cursor-pointer">
                        <Link
                          to="https://www.facebook.com/mindfulbeautyin"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={facebook} alt="facebook" />
                        </Link>
                      </li>
                      <li className="cursor-pointer">
                        <Link
                          to="https://www.linkedin.com/in/mindfulbeautyai"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={linkedIn} alt="linkedIn" />
                        </Link>
                      </li>
                      <li className="cursor-pointer">
                        <Link
                          to="https://twitter.com/MindfulBeautyai"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={x} alt="x" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-[18px] text-mindfulBlack font-bold mb-2">
              Signup for Newsletter
            </h3>
            <p className="mb-4">
              Join a community dedicated to transforming beauty and celebrating
              individual journeys to the altar.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter your email"
                  // className="w-full rounded-[6px] border-[1px] border-mindfulLightGrey px-4 py-2 focus-visible:outline-none"
                  className={`w-full rounded-[6px] border-[1px] 
                    ${errors.email ? "border-red-500" : "border-mindfulLightGrey"}
                     px-4 py-2 focus-visible:outline-none`}
                  {...register("email")}
                />

                {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
              </div>

              <button
                type="submit"
                className={`${buttonState.isSubmitted ? "bg-green-500" : "bg-main"}
                 text-mindfulWhite rounded-[20px] px-4 py-2 flex items-center`}
                disabled={loading}
              >
                {/* Submit */}
                {loading ? "Submitting..." : buttonState.buttonText} {/* Use buttonText state */}

                <HiArrowSmRight className="text-[22px] text-mindfulWhite ml-1" />
              </button>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            </form>
          </div>
        </div>

        {/* Location */}
        <div className="text-mindfulBlack text-center border-y border-mindfulGrey py-8 max-sm:py-0 max-md:border-t-0">
          <p className="text-[15px] text-mindfulBlack max-md:hidden ">
            {citiesError ? (
              "Unable to load cities"
            ) : cities.length > 0 ? (
              cities
                .filter((city: string) => city.length > 1)
                .sort((a: string, b: string) => a.localeCompare(b))
                .map((city: string) => city.trim())
                .filter((city: string) => city !== "")
                .join(" | ")
            ) : (
              "Loading cities..."
            )}
          </p>
        </div>

        {/* Copyrights & Terms & Privacy */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-[20px] sm:text-center md:text-center lg:text-left xl:text-left 2xl:text-left text-center">
          <div>
            <p className="text-[14px] text-mindfulBlack">
              &copy; {Year()} Mindful Beauty | All rights reserved.
            </p>
          </div>
          <div>
            <p className="text-[14px] text-mindfulBlack lg:text-right">
              <Link to="/TermsAndConditons" className="hover:underline">
                {" "}
                Terms & Conditions{" "}
              </Link>
              |{" "}
              <Link to="/PrivacyPolicy" className="hover:underline">
                Privacy Policy
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
