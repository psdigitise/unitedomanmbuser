import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchServiceProviders } from "../../../api/ApiConfig";

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
  const [error, setError] = useState<string | null>(null);

  console.log(catID, "catID log");

  const navigate = useNavigate();

  const storedServiceId = sessionStorage.getItem("selectedServiceId");
  const storedLocation = sessionStorage.getItem("selectedLocation") || "";

  console.log("Stored Service ID:", storedServiceId);
  console.log("Stored Location:", storedLocation);

  const handleImgClick = async () => {
    if (!catID) {

      setError("Category ID is missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Ensure the service ID is a number if you are passing it as such
      const serviceId = storedServiceId ? parseInt(storedServiceId, 10) : 1;
      sessionStorage.setItem("selectedCategoryID", catID); // Store catID in sessionStorage

      // Perform the API call using catID
      // const data = await fetchServiceProvidersCategory(catID, "Trivandrum", '20');
      const data = await fetchServiceProviders(
        serviceId,
        storedLocation,
        //"Trivandrum",
        "20",
        catID
      );
      console.log("fetchServiceProvidersCategory API response:", data);

      if (data.status === "success") {
        // Clear search term and service name before navigation
        sessionStorage.setItem("previousPath", "/");  // Set as coming from home
        sessionStorage.removeItem("selectedServiceName");
        sessionStorage.setItem("selectedServiceId", "0");
        // Navigate to SearchResults page and pass catID as state
        navigate("/SearchResults", { state: { catID } });
      } else {
        setError("Failed to fetch data. Please try again.");
        // Clear search term and service name even on error
        sessionStorage.setItem("previousPath", "/");
        sessionStorage.removeItem("selectedServiceName");
        navigate("/SearchResults", { state: { catID } });
      }
    } catch (error: any) {
      setError(error.message || "Error fetching category data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
