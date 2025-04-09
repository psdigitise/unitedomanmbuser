/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { BannerContent } from "../components/common/BannerContent";
import virtualTryOn from "../assets/icons/virtualTryOn.png";
import { ServiceBookingCard } from "../components/SearchResults/ServiceBookingCard";
import serviceProviderAd from "../assets/images/serviceProviderAd.png";
import {
  fetchServiceProviders,
  fetchServiceProviderType,
  fetchServiceProviderTypeFilter,
  requestaCallback,
} from "../api/ApiConfig";
import { ShimmerContentBlock } from "shimmer-effects-react";
import { NotFoundContent } from "../components/common/NotFoundContent";
import { MdPhone } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Define Zod schema for email validation
const requestaCallbackSchema = zod.object({
  fullName: zod.string().nonempty("Full name is required"),
  phoneNumber: zod.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
});

// Define the type based on the schema
type RequestaCallbackFormData = zod.infer<typeof requestaCallbackSchema>;

// fetchServiceProviders API Proptypes
interface SearchResultsProps {
  provider_id: number;
  provider_name: string;
  rating: string;
  provider_latitude?: number;
  provider_longitude?: number;
  provider_city: string;
  provider_state: string;
  service_name: string;
  service_id: string;
  price?: number;
  branch_id?: number;
  branch_name: string;
  branch_latitude?: number;
  branch_longitude?: number;
  branch_city: string;
  branch_state: string;
  distance_km: string;
  verified?: boolean;
  all_services: string;
  service_type_id: number;
  image_url: string;
  review_count: string;
  average_rating: number;
  working_hours:string

  // reviews_count: string,
  // services_offered: string,
  // address: string,
  // distance: string,
  // image_url: string,
}

interface ServiceProviderType {
  service_type_id?: number;
  type_name: string;
}

export const SearchResults = () => {
  // Service Provider List function API Call
  const [serviceProvider, setServiceProvider] = useState<SearchResultsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNoFound] = useState<string | null>(null);

  const [serviceProviderType, setServiceProviderType] = useState<ServiceProviderType[]>([]);
  // const [selectedServiceProviderType, setSelectedServiceProviderType] = useState<ServiceProviderType | null>(null);

  // State to track if the button is clicked
  const [openNow, setOpenNow] = useState(false);


  const userID = useSelector((state: RootState) => state.cart.userID);
  console.log("User ID taken from Redux Store: ", userID);


  // const [buttonState, setButtonState] = useState({ buttonText: "Submit", isSubmitted: false });
  const [buttonState, setButtonState] = useState<{ buttonText: string; isSubmitted: boolean }>({
    buttonText: "Call Me",
    isSubmitted: false,
  });
  const location = useLocation();
  const [catID, setCatID] = useState<string | undefined>(location.state?.catID);

  // Function to handle the click event
  const handleOpenNowClick = () => {
    setOpenNow((prev) => !prev); // Toggle the highlighted state
  };

  const storedServiceId = sessionStorage.getItem("selectedServiceId") || "0";
  const storedLocation =
    sessionStorage.getItem("selectedLocation") || "Trivandrum";

  console.log("Stored Service ID:", storedServiceId);
  console.log("Stored Location:", storedLocation);

  // const location = useLocation();

  // const catID = location.state?.catID;

  console.log("Category ID:", catID); // Use catID as needed

  useEffect(() => {
    // Getting Service Provider
    const loadServiceProvider = async () => {
      try {
        // Ensure the service ID is a number if you are passing it as such
        const serviceId = storedServiceId ? parseInt(storedServiceId, 10) : 0;
        if (!catID) {
          const storedCatID = sessionStorage.getItem("selectedCategoryID");
          console.log("storedCatID", storedCatID)
          setCatID(storedCatID || ""); // Set to undefined if it's null
        }

        // API call to fetch service providers
        const data = await fetchServiceProviders(
          serviceId,
          storedLocation,
          "20",
          catID || "",
        );
        // const data = await fetchServiceProviders(serviceId, storedLocation, "20");

        if (data.status === "failure") {
          setNoFound(data.message);
        } else {
          setServiceProvider(data.data); // Assuming the API returns the data in data.data
          console.log("Fetched service provider data log:", data.data);
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch service providers.");
      } finally {
        setLoading(false);
      }
    };

    loadServiceProvider();
  }, [storedServiceId, storedLocation, catID]); // Add dependencies so the useEffect runs if these values change

  // API call for service provider type (Salon or Freelancer)
  useEffect(() => {
    // Getting Service Provider Type
    const loadServiceProviderType = async () => {
      try {
        // API call to fetch service provider type
        const data = await fetchServiceProviderType();

        setServiceProviderType(data.results);
        console.log("Fetched service provider type data log:", data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch service provider type.");
      } finally {
        setLoading(false);
      }
    };
    loadServiceProviderType();
  }, []);

  // Load service provider based on select field Salon or Freelancer
  const loadServiceProviderTypeFilter = async (serviceTypeId: number) => {
    try {
      // Ensure the service ID is a number if you are passing it as such
      const serviceId = storedServiceId ? parseInt(storedServiceId, 10) : 0;
      setLoading(true); // Set loading to true before API call
      const data = await fetchServiceProviderTypeFilter(
        serviceId,
        storedLocation,
        "20",
        serviceTypeId
      );

      setServiceProvider(data);
      console.log("Service provider data log:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  const handleServiceProviderTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedIndex = event.target.selectedIndex;

    // Ensure the selectedIndex is valid and not the placeholder option
    if (selectedIndex > 0) {
      const selectedService = serviceProviderType[selectedIndex - 1]; // -1 to account for the "Type" placeholder option

      // Only call the function if selectedService is valid
      if (selectedService && selectedService.service_type_id) {
        loadServiceProviderTypeFilter(selectedService.service_type_id);
      }
    }
  };

  console.log("Not Found", notFound);

  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RequestaCallbackFormData>({
    resolver: zodResolver(requestaCallbackSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: ""
    },
  });

  const onSubmit = async (data: RequestaCallbackFormData) => {

    setLoading(true); // Start loading state
    setError(null);   // Clear any previous errors
    setButtonState({ ...buttonState, isSubmitted: false }); // Reset submission state


    try {
      const response = await requestaCallback(data.fullName, data.phoneNumber, String(userID));
      console.log("Callback request submitted successfully:", response);


      // Update button text and color on success
      setButtonState({ buttonText: "Request Submitted Successfully", isSubmitted: true });

      // Reset the form after successful submission
      reset(); // Clears all form fields including rating and comment

      // Reset button text and color after 3 seconds
      setTimeout(() => {
        setButtonState({ buttonText: "Call Me", isSubmitted: false });
      }, 3000);

    } catch (error: any) {
      setError(error.message || "Error submitting the email. Please try again.")
    } finally {
      setLoading(false); // End loading state
    }
  };


  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  if (notFound)
    return (
      // <div className="flex justify-center items-center h-screen text-lg">
      //   {notFound}
      // </div>
      <div className="flex justify-center items-center h-screen">
        <NotFoundContent />
      </div>
    );

  return (
    <section className="mt-[15px]">
      {/* {/ Banner Content /} */}
      <div>
        <BannerContent bannerTitle="Home & Salon Service" />
      </div>

      {/* {/ Select Options /} */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-8 border-b-2 max-sm:flex-wrap max-sm:gap-3 max-sm:items-start max-md:py-4">
          <div className="flex items-center space-x-5 max-sm:flex-wrap max-sm:gap-4 max-sm:space-x-0 max-sm:items-start ">
            {/* {/ Sort By /} */}
            {/* <div>
              <select
                name=""
                id=""
                className="w-32 bg-mindfulMildGrey text-sm text-mindfulBlack font-semibold border-[1px] border-mindfulGreySecondary px-3 py-2 cursor-pointer"
              >
                <option value="" selected disabled>
                  Sort By
                </option>
                <option value="">Option 1</option>
                <option value="">Option 2</option>
              </select>
            </div> */}

            {/* {/ Type /} */}
            <div>
              <select
                onChange={handleServiceProviderTypeChange}
                className="w-32 bg-mindfulMildGrey text-sm text-mindfulBlack font-semibold border-[1px] border-mindfulGreySecondary px-3 py-2 cursor-pointer"
              >
                <option value="" selected disabled>
                  Type
                </option>

                {serviceProviderType.map((service) => (
                  <option
                    key={service.service_type_id}
                    value={service.type_name}
                  >
                    {service.type_name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div>
              <p className="bg-mindfulMildGrey text-sm text-mindfulBlack font-semibold border-[1px] border-mindfulGreySecondary px-3 py-2">
                Open Now
              </p>
            </div> */}

            <div>
              <p
                className={`text-sm font-semibold border-[1px] px-3 py-2 cursor-pointer
                    ${openNow
                    ? "bg-mindfulYellow border-mindfulYellow text-white"
                    : "bg-mindfulMildGrey text-mindfulBlack border-mindfulGreySecondary"
                  }
                    `}
                onClick={handleOpenNowClick}
              >
                Open Now
              </p>
            </div>
          </div>

          {/* {/ Virtual Try-On /} */}
          <div>
            <a
              href="https://try.mindfulbeauty.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center">
                <div className="w-[45px] h-[45px] bg-mindfulYellow px-2 py-2 rounded-full flex items-center sm:translate-x-7">
                  <img
                    src={virtualTryOn}
                    alt="virtual try-on image"
                    className="p-0.5"
                  />
                </div>
                <button className="bg-main text-mindfulWhite rounded-[20px] pl-10 pr-4 py-2 sm:flex items-center hidden">
                  Virtual Try-on
                </button>
              </div>
            </a>
          </div>
        </div>

        {/* {/ Service Booking Card /} */}
        <div className="grid xl:grid-cols-[70%_30%] grid-cols-[100%] py-5">
          <div className="">
            {loading ? (
              // Show shimmer effect while loading
              <div>
                {/* {/ <ShimmerCategoryItems mode="light" / > /} */}
                <ShimmerContentBlock
                  mode="light"
                  rounded={1}
                  items={1}
                  itemsGap={10}
                  thumbnailHeight={200}
                  thumbnailWidth={200}
                  thumbnailRounded={1}
                  contentDetailsPosition="start"
                  contentDetailTextLines={6}
                />
              </div>
            ) : (
              // Show the service provider cards once loading is done
              <div>
                {serviceProvider.map((provider) => (
                  <ServiceBookingCard
                    key={provider.provider_id}
                    serviceProviderID={provider.provider_id}
                    serviceProviderName={provider.provider_name}
                    serviceProviderRating={parseFloat(provider.rating)}
                    city={provider.provider_city}
                    state={provider.provider_state}
                    branchID={provider.branch_id ?? 0}
                    branchCity={provider.branch_city}
                    branchName={provider.branch_name}
                    branchState={provider.branch_state}
                    distance={parseFloat(provider.distance_km)}
                    verifiedCheckmark={provider.verified}
                    serviceName={provider.service_name}
                    allServices={provider.all_services}
                    serviceTypeID={provider.service_type_id}
                    image_url={provider.image_url}
                    reviewCount={provider.review_count}
                    starRating={provider.average_rating}
                    OpeningTime={provider.working_hours}
                  />
                ))}
              </div>
            )}

            {/* {serviceProvider.map((provider) => (
              <ServiceBookingCard
                key={provider.provider_id} // You can use a better unique identifier if available (like provider ID)
                serviceProviderID={provider.provider_id}
                serviceProviderName={provider.provider_name}
                serviceProviderRating={parseFloat(provider.rating)}
                city={provider.provider_city}
                state={provider.provider_state}
                distance={parseFloat(provider.distance_km)}
                verifiedCheckmark={provider.verified}
                serviceName={provider.service_name}
                allServices={provider.all_services}
                reviewCount={provider.review_count}
                serviceType={provider.service_type}
              />
            ))} */}

            {/* 
            <ServiceBookingCard
              serviceProviderName="Nezeera Ansu"
              serviceProviderRating={4.82}
              location="Edapally, Ernakulam"
              distance={1.5}
            />

            <ServiceBookingCard
              serviceProviderName="Head And Face Unisex"
              serviceProviderRating={4.82}
              location="Edapally, Ernakulam"
              distance={1.5}
            />

            <ServiceBookingCard
              serviceProviderName="Neha Beauty Saloon"
              serviceProviderRating={4.82}
              location="Edapally, Ernakulam"
              distance={1.5}
            /> */}

            {/* Request a CallBack */}
            <div className="bg-RequestaCallBack bg-no-repeat bg-cover bg-center rounded-[8px] mb-8 hidden lg:block">
              <div className="w-full flex items-center justify-between px-5 py-5">
                {/* Request a callback */}
                <div>
                  <p className="text-[25px] text-mindfulWhite font-semibold leading-7">
                    Request <br /> a callback
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="flex items-start justify-between space-x-5"
                >

                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      // name=""
                      id=""
                      placeholder="Full Name"
                      // className="w-72 bg-mindfulWhite rounded-[6px] px-3 py-3 focus-within:outline-none"
                      className={`w-72 bg-mindfulWhite rounded-[6px] px-3 py-3 focus-within:outline-none max-2xl:w-56 max-xl:w-[300px]
                        ${errors.fullName ? "border-red-500" : "border-mindfulLightGrey"}`}
                      {...register("fullName")}

                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1 bg-mindfulWhite px-2 py-0.5 rounded-md">{errors.fullName.message}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <input
                      type="tel"
                      // name=""
                      id=""
                      placeholder="Phone Number"
                      // className="w-72 bg-mindfulWhite rounded-[6px] px-3 py-3 focus-within:outline-none"
                      className={`w-72 bg-mindfulWhite rounded-[6px] px-3 py-3 focus-within:outline-none max-2xl:w-56 max-xl:w-[300px] ${errors.phoneNumber ? "border-red-500" : "border-mindfulLightGrey"
                        }`}
                      {...register("phoneNumber")}

                    />

                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1 bg-mindfulWhite px-2 py-0.5 rounded-md">{errors.phoneNumber.message}</p>
                    )}

                  </div>

                  {/* Call Me button */}
                  <div>
                    <div className="flex items-center bg-mindfulBlue rounded-[4px] px-3 py-2 cursor-pointer">
                      <div>
                        <MdPhone className="text-[22px] text-mindfulWhite mr-1" />
                      </div>
                      <button
                        type="submit"
                        className="text-lg text-mindfulWhite font-semibold"
                        disabled={loading || buttonState.isSubmitted}
                      >
                        {/* Call Me */}
                        {loading ? "Submitting..." : buttonState.buttonText}
                      </button>
                    </div>


                    {error && <p className="text-red-500 text-sm mt-1 bg-mindfulWhite px-2 py-0.5 rounded-md">{error}</p>}

                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* {/ Service Provider Ad /} */}
          <div>
            <div className="xl:flex xl:justify-end hidden">
              <div className="relative">
                <img src={serviceProviderAd} alt="service provider ad" />

                <div className="absolute top-3 left-3">
                  <h5 className="text-lg font-bold">Ashtamudi</h5>
                  <p className="text-md font-semibold">Beauty Parlour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
