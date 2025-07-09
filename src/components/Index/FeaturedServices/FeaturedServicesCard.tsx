import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchServiceProviders } from "../../../api/ApiConfig";
import { NotifyError, NotifyInfo } from "../../common/Toast/ToastMessage";
import { RootState } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../../../redux/locationSlice";

interface FeaturedServicesCardProps {
  cardImage: string;
  cardImageAlt: string;
  cardCaption: string;
  catID?: string;
}

export const FeaturedServicesCard: React.FC<FeaturedServicesCardProps> = ({
  cardImage,
  cardImageAlt,
  cardCaption,
  catID,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Get stored location from Redux
  const storedReduxLocation = useSelector((state: RootState) => state.location.selectedLocation);

  // ✅ Handle Image Click: Check Redux for location before requesting geolocation
  const handleImgClick = async () => {
    if (!catID) {
      NotifyError("Category ID is missing");
      return;
    }

    // ✅ If Redux has a location, use it without prompting for geolocation
    if (storedReduxLocation) {
      console.log("Using Redux location:", storedReduxLocation);
      fetchLocationAndProceed(storedReduxLocation);
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
          fetchLocationAndProceed(userLocation);
        });
      } else if (permissionStatus.state === "denied") {
        NotifyInfo("Kindly enable location in your browser or choose your preferred location.");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location Access Granted", position);
            const userLocation = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
            dispatch(setLocation(userLocation)); // Save in Redux
            fetchLocationAndProceed(userLocation);
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

  // ✅ Fetch service providers using the available location
  const fetchLocationAndProceed = async (location: string) => {
    try {
      setLoading(true);

      const storedServiceId = sessionStorage.getItem("selectedServiceId") || "1";
      const serviceId = parseInt(storedServiceId, 10);
      sessionStorage.setItem("selectedCategoryID", catID!);
      
      // Get service type ID from sessionStorage, with fallback to string value
      const storedServiceTypeId = sessionStorage.getItem("selectedServiceTypeId");
      const storedServiceTypeString = sessionStorage.getItem("selectedServiceType");
      const serviceTypeID = storedServiceTypeId || storedServiceTypeString;
      if (!serviceTypeID) {
      NotifyError("Service Type is missing. Please select a service type.");
      setLoading(false);
      return;
    }
      const data = await fetchServiceProviders(serviceId, location, "20", catID!, serviceTypeID);
      console.log("API response:", data);

      if (data.status === "success") {
        sessionStorage.setItem("previousPath", "/");
        sessionStorage.removeItem("selectedServiceName");
        sessionStorage.setItem("selectedServiceId", "0");
        navigate("/SearchResults", { state: { catID } });
      } else {
        console.log("Failed to fetch data. Please try again.");
        sessionStorage.setItem("previousPath", "/");
        sessionStorage.removeItem("selectedServiceName");
        navigate("/SearchResults", { state: { catID } });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        NotifyError(error.message || "Error fetching category data");
      } else {
        NotifyError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="w-fit mx-auto cursor-pointer">
      <div className="relative">
        <div onClick={handleImgClick}>
          <img src={cardImage} alt={cardImageAlt} className="rounded-[5px]" />
        </div>

        <div className="absolute featured-services-card">
          <h3 className="sm:text-[26px] text-[21px] text-mindfulWhite font-Montserrat font-semibold">
            {cardCaption}
          </h3>
        </div>
      </div>
    </div>
  );
};
