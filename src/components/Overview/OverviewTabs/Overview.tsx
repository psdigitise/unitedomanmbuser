import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { fetchServiceProviderDetails } from "../../../api/ApiConfig";
import { useSelector, useDispatch } from "react-redux";
import { resetScroll } from "../../../redux/scrollSlice"; // Adjust import path
import { NotFoundContent } from "../../common/NotFoundContent";
import getDirectionIcon from "../../../assets/icons/getDirectionIcon.svg";
import { ShimmerTitle } from "shimmer-effects-react";


// API Proptypes
interface OverviewProps {

  // Add props here
  business_summary: string;
  gender_type: string;
  timings: string;
  latitude: number;
  longitude: number;

}

export const Overview = () => {

  // Same Overview logic
  const locationMapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const scrollToLocation = useSelector((state: any) => state.scroll.scrollToLocation);

  useEffect(() => {
    if (scrollToLocation && locationMapRef.current) {
      locationMapRef.current.scrollIntoView({ behavior: "smooth" });
      dispatch(resetScroll());
    }
  }, [scrollToLocation, dispatch]);


  // Getting provider_id from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const providerId = query.get('provider_id'); // Retrieve the provider_id from query parameters
  console.log("Getting provider ID from URL : ", providerId);

  const storedServiceId = sessionStorage.getItem('selectedServiceId');
  console.log("Stored Service ID for services:", storedServiceId);

  // State Declaration for API
  const [OverviewData, setOverviewData] = useState<OverviewProps | null>(null); // Adjust to a single object;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API Call to fetch data
    const loadOverviewData = async (provider_id: number, service_id: number) => {
      try {
        const data = await fetchServiceProviderDetails(provider_id, service_id);
        setOverviewData(data.overview);
        console.log(data.overview);
      }
      catch (error: any) {
        setError(error.message || "Failed to fetch overview data.");
      }
      finally {
        setLoading(false);
      }
    }

    // loadOverviewData();
    // Ensure providerId is available and valid
    if (providerId) {
      const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
      if (!isNaN(numericProviderId)) {
        loadOverviewData(numericProviderId, storedServiceId ? parseInt(storedServiceId, 10) : 0);
      } else {
        setError('Invalid provider ID.');
      }
    }
  }, [providerId, storedServiceId]);

  if (loading) {
    return <div>
      {/* Loading... */}
      {/* <ShimmerContentBlock mode="light" rounded={1} items={1} itemsGap={10} thumbnailHeight={200} thumbnailWidth={200} thumbnailRounded={1} contentDetailsPosition="start" contentDetailTextLines={6} /> */}
      <ShimmerTitle mode="light" line={10} gap={10} />
      {/* <ShimmerText mode="light" line={10} gap={6} /> */}
      {/* <ShimmerSectionHeader center={false} mode="light"  /> */}
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // If no data is fetched yet, show a fallback
  if (!OverviewData) {
    return <div><NotFoundContent /></div>;
  }

  // Destructure the fetched data for convenience
  const { business_summary, gender_type, timings, latitude, longitude } = OverviewData;


  const handleGetDirectionClick = () => {
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
    window.open(mapsUrl, "_blank"); // Opens the map URL in a new tab
  };

  return (
    <div>
      {/* Business Summary Title & Desc */}
      <div>
        <h5 className="text-[22px] text-mindfulBlack font-semibold mb-2 max-sm:text-[20px]">
          Business Summary
        </h5>
        <p className="text-lg text-mindfulBlack mb-5">
          {/* Unisex salon offering expert hair styling, coloring, smoothening, and
          straightening services for men and women. */}
          {business_summary}
        </p>
      </div>

      {/* Business Summary List */}
      <div className="pl-10 pb-10 max-sm:pb-5 max-sm:pl-5">
        <ul className="list-disc marker:text-main space-y-3">
          <li>Morbi vitae nibh scelerisque, commodo felis ut, rhoncus elit.</li>
          <li>Vivamus tristique nulla quis sem finibus aliquet.</li>
          <li>
            Integer at nisl ultrices, scelerisque nulla in, placerat odio.
          </li>
          <li>Nunc mattis diam at lectus malesuada porttitor.</li>
        </ul>
      </div>

      {/* Gender & Timings */}
      <div className="flex justify-start gap-10 items-center pb-10 max-sm:flex-col max-sm:items-start max-sm:gap-3 max-sm:pb-5">
        {/* Gender */}
        <div>
          <h5 className="text-[22px] text-mindfulBlack font-semibold mb-2 max-sm:text-[20px] max-sm:mb-1">
            Gender
          </h5>
          <p>
            {/* Women */}
            {gender_type}
          </p>
        </div>

        {/* Timings */}
        <div>
          <h5 className="text-[22px] text-mindfulBlack font-semibold mb-2 max-sm:text-[20px] max-sm:mb-1">
            Timings
          </h5>
          <p>
            {/* Mon - Sun: 8:00 am to 8:00 pm */}
            {timings}
          </p>
        </div>
      </div>

      {/* Lorem ipsum list */}
      <div className="" ref={locationMapRef}>
        <h5 className="text-[22px] text-mindfulBlack font-semibold mb-2 max-sm:text-[20px]">
          Lorem Ipsum
        </h5>
        <ul className="list-disc marker:text-main pl-10 pb-10 space-y-3 max-sm:pb-5 max-sm:pl-5">
          <li>Vivamus tristique nulla quis sem finibus aliquet.</li>
          <li>
            Integer at nisl ultrices, scelerisque nulla in, placerat odio.
          </li>
        </ul>
      </div>

      {/* Location Map & Get Direction */}
      <div>
        <div className="flex justify-between items-center mb-5  max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:mb-5">
          {/* Location */}
          <div>
            <h5 className="text-[22px] text-mindfulBlack font-semibold">
              Location Map
            </h5>
          </div>

          {/* Get Direction Button */}
          <div>
            <div className="w-fit bg-mindfulWhite border-[1px] border-mindfulBlack rounded-md px-3 py-1">
              <div className="flex items-center text-sm text-mindfulBlack font-semibold space-x-2">
                <div>
                  <img
                    // src="/src/assets/icons/getDirectionIcon.png"
                    src={getDirectionIcon}
                    alt=""
                    className="w-[18px]"
                  />
                </div>
                <p onClick={handleGetDirectionClick} className="cursor-pointer">Get Direction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Map */}
        <div>
          <iframe
            // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62944.119133971624!2d76.52059270000001!3d9.5946258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba16c6b435f%3A0xbe2b02f68f8dd06e!2sKottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1724155174137!5m2!1sen!2sin"
            // src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62944.119133971624!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba16c6b435f%3A0xbe2b02f68f8dd06e!2sKottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1724155174137!5m2!1sen!2sin`}
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62944.119133971624!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sin!4v1724155174137!5m2!1sen!2sin`}
            width="100%"
            height="450"
            // style="border:0;"
            // allowfullscreen=""
            loading="lazy"
          // referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};
