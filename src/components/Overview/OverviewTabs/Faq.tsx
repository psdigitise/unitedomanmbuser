import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaqCard } from "./Faq/FaqCard";
import { fetchServiceProviderDetails } from "../../../api/ApiConfig";
import { NotFoundContent } from "../../common/NotFoundContent";
import { ShimmerText, ShimmerTitle } from "shimmer-effects-react";

interface FaqProps {
  faq_id?: string;
  question?: string;
  answer?: string;
  created_at?: string;
  updated_at?: string;
}

export const Faq = () => {

  // Getting provider_id from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const providerId = query.get('provider_id'); // Retrieve the provider_id from query parameters
  console.log("Getting provider ID from URL : ", providerId);

  const storedServiceId = sessionStorage.getItem('selectedServiceId');
  console.log("Stored Service ID for services:", storedServiceId);

  // API handling State Declaration
  const [faqData, setFaqData] = useState<FaqProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API call to fetch data
    const loadFaqData = async (provider_id: number, service_id: number) => {
      try {
        // const data = await fetchFAQs();
        const data = await fetchServiceProviderDetails(provider_id, service_id);
        setFaqData(data.faq); // Directly set the fetched data
        console.log("FAQs data log", data.faq);

      } catch (error: any) {
        setError(error.message || "Failed to fetch FAQs.");
      } finally {
        setLoading(false);
      }
    };

    // loadFaqData();
    // Ensure providerId is available and valid
    if (providerId) {
      const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
      if (!isNaN(numericProviderId)) {
        loadFaqData(numericProviderId, storedServiceId ? parseInt(storedServiceId, 10) : 0);
      } else {
        setError('Invalid provider ID.');
      }
    }
  }, [providerId, storedServiceId]);

  if (loading) {
    return <div>
      {/* Loading... */}
      <div>
        <ShimmerTitle mode="light" line={1} gap={8} />
        <ShimmerText mode="light" line={10} gap={6} />
      </div>
    </div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (faqData.length <= 0) {
    return (
      <div><NotFoundContent /></div>
    )
  }

  return (
    <div>
      {faqData.map((faqDataParams) => (
        <FaqCard
          key={faqDataParams.faq_id}
          id={faqDataParams.faq_id}
          faqQuestion={faqDataParams.question}
          faqAnswer={faqDataParams.answer}
          createdTime={faqDataParams.created_at}
          updatedTime={faqDataParams.updated_at}
        />
      ))}
    </div>
  );
};
