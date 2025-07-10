import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { NotifyError, NotifyInfo } from "../common/Toast/ToastMessage";
import { setLocation } from "../../redux/locationSlice";
import bridalbg from "../../assets/images/home-bridal-bg.png";
import bridalMakeup from "../../assets/images/home-bridal-makeup.png";
import preBridalMakeup from "../../assets/images/home-pre-bridal-makeup.png";
// import { fetchServiceProviders } from "../../api/ApiConfig";

interface FeaturedServicesProps {
  category_id?: string;
  category_name: string;
  status: string;
  image: string;
}

export const ExclusiveBridalPackages: React.FC<FeaturedServicesProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [ setLoading] = React.useState<boolean>(false);
  const [loadingCard, setLoadingCard] = React.useState<string | null>(null);

  const storedReduxLocation = useSelector(
    (state: RootState) => state.location.selectedLocation
  );

  const handleImgClicknew = async (cardCaption: string) => {
    setLoadingCard(cardCaption); // Show loading only on clicked card

    if (storedReduxLocation) {
      console.log("Using Redux location:", storedReduxLocation);
      fetchLocationAndProceed(cardCaption);
      return;
    }

    if (!navigator.geolocation) {
      NotifyError("Geolocation is not supported by this browser.");
      setLoadingCard(null);
      return;
    }

    try {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permissionStatus.state === "granted") {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
          dispatch(setLocation(userLocation));
          fetchLocationAndProceed(cardCaption);
        });
      } else if (permissionStatus.state === "denied") {
        NotifyInfo("Kindly enable location in your browser or choose your preferred location.");
        setLoadingCard(null);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
            dispatch(setLocation(userLocation));
            fetchLocationAndProceed(cardCaption);
          },
          (error) => {
            console.error("Location Error:", error);
            NotifyError("Failed to get location.");
            setLoadingCard(null);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    } catch (error) {
      console.error("Permission Check Error:", error);
      NotifyError("An error occurred while checking location permissions.");
      setLoadingCard(null);
    }
  };

  const fetchLocationAndProceed = async (
    // userLocation: string,
    cardCaption: string
  ) => {
    const catID = "4";
    // const storedLocation = sessionStorage.getItem("selectedLocation") || "Trivandrum";
    const storedServiceTypeId = sessionStorage.getItem("selectedServiceTypeId");
    const storedServiceTypeString = sessionStorage.getItem("selectedServiceType");
    const serviceTypeID = storedServiceTypeId || storedServiceTypeString;

    if (!serviceTypeID) {
      NotifyError("Service Type is missing. Please select a service type.");
      setLoadingCard(null);
      return;
    }

    // setLoading(true);
    try {

      if (cardCaption === "Pre-Bridal Makeup") {
        navigate("/SearchResults", { state: { cardCaption } });
      } else {
        navigate("/SearchResults", { state: { catID } });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        NotifyError(error.message || "Error fetching category data");
      } else {
        NotifyError("An unknown error occurred");
      }
    } finally {
      // setLoading(false);
      setLoadingCard(null); // Reset loading state
    }
  };

  return (
    <section
      className="lg:pb-[60px] md:pb-[40px] pb-[30px]"
      style={{
        backgroundImage: `url(${bridalbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "40vh",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 text-center">
          <h2
            className="font-Montserrat text-[35px] text-mindfulBlack font-bold mb-[20px] max-lg:text-[30px] max-md:text-[25px] max-md:mb-[15px] max-sm:text-[20px]"
            style={{ marginTop: "30px" }}
          >
            Exclusive Bridal Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Bridal Makeup Card */}
          <div
            className="relative rounded-lg overflow-hidden aspect-[3/2] cursor-pointer"
            onClick={() => handleImgClicknew("Bridal Makeup")}
          >
            {loadingCard === "Bridal Makeup" ? (
              <div className="flex items-center justify-center h-[300px] bg-gray-100">
                <p className="text-gray-700">Loading...</p>
              </div>
            ) : (
              <>
                <img
                  src={bridalMakeup}
                  alt="Bridal Makeup"
                  className="w-full h-[300px] object-cover"
                />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                  Bridal Makeup
                </h3>
              </>
            )}
          </div>

          {/* Pre-Bridal Makeup Card */}
          <div
            className="relative rounded-lg overflow-hidden aspect-[3/2] cursor-pointer"
            onClick={() => handleImgClicknew("Pre-Bridal Makeup")}
          >
            {loadingCard === "Pre-Bridal Makeup" ? (
              <div className="flex items-center justify-center h-[300px] bg-gray-100">
                <p className="text-gray-700">Loading...</p>
              </div>
            ) : (
              <>
                <img
                  src={preBridalMakeup}
                  alt="Pre-Bridal Makeup"
                  className="w-full h-[300px] object-cover"
                />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                  Pre-Bridal Makeup
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};