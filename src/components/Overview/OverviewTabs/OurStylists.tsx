import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StylistCard } from "./OurStylists/StylistCard";
import { fetchServiceProviderDetails } from "../../../api/ApiConfig";
import { NotFoundContent } from "../../common/NotFoundContent";
import { ShimmerTable } from "shimmer-effects-react";

// Define the type for StylistCardProps if it's not imported
interface OurStylistsProps {
  beautician_id: string;
  beautician_name: string;
  role: string;
  years_of_experience: string;
  rating: string;
  profile_image: string;
}

export const OurStylists: React.FC = () => {

  // Getting provider_id from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const providerId = query.get('provider_id'); // Retrieve the provider_id from query parameters
  console.log("Getting provider ID from URL : ", providerId);


  const storedServiceId = sessionStorage.getItem('selectedServiceId');
  console.log("Stored Service ID for services:", storedServiceId);

  // Beautician List function API Call
  const [beauticians, setBeauticians] = useState<OurStylistsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBeauticians = async (provider_id: number, service_id: number) => {
      try {
        const data = await fetchServiceProviderDetails(provider_id, service_id);
        setBeauticians(data.stylist);
        console.log("Fetched Beauticians data log:", data.stylist);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // loadBeauticians();
    // Ensure providerId is available and valid
    if (providerId) {
      const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
      if (!isNaN(numericProviderId)) {
        loadBeauticians(numericProviderId, storedServiceId ? parseInt(storedServiceId, 10) : 0);
      } else {
        setError('Invalid provider ID.');
      }
    }
  }, [providerId, storedServiceId]);

  if (loading) {
    return <div>
      <div>
        <ShimmerTable
          mode="light"
          row={5}
          col={4}
          border={1}
          borderColor={"#cbd5e1"}
          rounded={0.25}
          rowGap={16}
          colPadding={[15, 5, 15, 5]}
        />
      </div>
    </div>
  }

  if (error) return <div>Error: {error}</div>;


  if (beauticians.length <= 0) {
    return <div><NotFoundContent /></div>
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {beauticians.map((beautician) => (
        <StylistCard
          key={beautician.beautician_id}
          id={beautician.beautician_id}
          name={beautician.beautician_name}
          role={beautician.role}
          years_of_experience={beautician.years_of_experience}
          rating={parseInt(beautician.rating, 10)}
          profile_image={beautician.profile_image}
        />
      ))}
    </div>
  );
};
