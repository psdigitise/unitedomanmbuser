import React, { } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { fetchLocationAndProceed } from "../../utils/locationUtils";
import { NotifyError, NotifyInfo } from "../common/Toast/ToastMessage";
import { setLocation } from "../../redux/locationSlice";
import { useDispatch } from "react-redux";   
import { useNavigate } from "react-router-dom";
// import { fetchServiceProviders } from "../../api/ApiConfig";
// import { ShimmerTable } from "shimmer-effects-react";

interface FeaturedServicesProps {
  category_id?: string;
  category_name: string;
  status: string;
  image: string;
}

export const ExclusiveBridalPackages: React.FC<FeaturedServicesProps> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState<boolean>(false);
    const storedReduxLocation = useSelector((state: RootState) => state.location.selectedLocation);

    const handleImgClicknew = async (cardCaption: string) => {
        if (storedReduxLocation) {
          console.log("Using Redux location:", storedReduxLocation);
          fetchLocationAndProceed(storedReduxLocation, cardCaption);
          return;
        }
    
        if (!navigator.geolocation) {
          NotifyError("Geolocation is not supported by this browser.");
          return;
        }
        try {
              const permissionStatus = await navigator.permissions.query({ name: "geolocation" });
        
              if (permissionStatus.state === "granted") {
                navigator.geolocation.getCurrentPosition((position) => {
                  console.log("Location Access Granted", position);
                  const userLocation = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
                  dispatch(setLocation(userLocation)); // Save in Redux
                  fetchLocationAndProceed(userLocation, cardCaption);
                });
              } else if (permissionStatus.state === "denied") {
                NotifyInfo("Kindly enable location in your browser or choose your preferred location.");
              } else {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    console.log("Location Access Granted", position);
                    const userLocation = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
                    dispatch(setLocation(userLocation)); // Save in Redux
                    fetchLocationAndProceed(userLocation, cardCaption);
                  },
                  (error) => {
                    console.error("Location Error:", error);
                  },
                  { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                );
              }
            } catch (error) {
              console.error("Permission Check Error:", error);
              NotifyError("An error occurred while checking location permissions.");
            }
  };

  const fetchLocationAndProceed = async (userLocation: string, cardCaption: string) => {
    const catID = "4"; // Assuming category ID is 0 for bridal packages
    // const cardCaption = "Pre-Bridal Makeup"; // Example caption, can be dynamic based on the image clicked
    // const storedLocation = sessionStorage.getItem("selectedLocation") || "Trivandrum";
    setLoading(true);
    try {
        console.log("User Location:", userLocation);
        if(cardCaption === "Pre-Bridal Makeup"){
          navigate("/SearchResults", { state: { cardCaption } });
        }else{
          navigate("/SearchResults", { state: { catID } } );
        }
    // console.log("User Location:", storedLocation, userLocation);
    //       // Fetch service providers based on the selected category and location
    // const data = await fetchServiceProviders(0, storedLocation, "20", catID, "1");
    //       console.log("API response:", data);
    
    //       if (data.status === "success") {
    //         sessionStorage.setItem("previousPath", "/");
    //         sessionStorage.removeItem("selectedServiceName");
    //         sessionStorage.setItem("selectedServiceId", "0");
    //         navigate("/SearchResults", { state: { catID } });
    //       } else {
    //         console.log("Failed to fetch data. Please try again.");
    //         sessionStorage.setItem("previousPath", "/");
    //         sessionStorage.removeItem("selectedServiceName");
    //         navigate("/SearchResults", { state: { catID } });
    //       }
        } catch (error: unknown) {
          if (error instanceof Error) {
            NotifyError(error.message || "Error fetching category data");
          } else {
            NotifyError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        } 
    // navigate("/bridal-makeup"); 
  }

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <section 
      className="lg:pb-[60px] md:pb-[40px] pb-[30px]" // Reduced padding
      style={{
        backgroundImage: "url('/src/assets/images/home-bridal-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "40vh" // Added to control background height
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 text-center">
          <h2 className="font-Montserrat text-[35px] text-mindfulBlack font-bold mb-[20px] max-lg:text-[30px] max-md:text-[25px] max-md:mb-[15px] max-sm:text-[20px]" 
          style={{ marginTop : "30px" }}>
            Exclusive Bridal Packages
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"> 
          <div className="relative rounded-lg overflow-hidden aspect-[3/2] cursor-pointer" 
          onClick={() => handleImgClicknew("Bridal Makeup")}>
            <img 
              src="/src/assets/images/home-bridal-makeup.webp" 
              alt="Bridal Makeup"
              className="w-full h-[300px] object-cover" // Fixed height
            />
            <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
              Bridal Makeup
            </h3>
          </div>
          
          <div className="relative rounded-lg overflow-hidden aspect-[3/2] cursor-pointer" onClick={() => handleImgClicknew("Pre-Bridal Makeup")}>
            <img 
              src="/src/assets/images/home-pre-bridal-makeup.webp" 
              alt="Pre-Bridal Makeup"
              className="w-full h-[300px] object-cover" // Fixed height
            />
            <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
              Pre-Bridal Makeup
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
