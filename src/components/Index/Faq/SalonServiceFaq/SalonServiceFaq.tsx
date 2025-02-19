import { useState, useEffect } from 'react';
import { SalonServiceCard } from './SalonServiceCard';
import { fetchHomePageFAQ } from '../../../../api/ApiConfig';
import { ShimmerText, ShimmerTitle } from 'shimmer-effects-react';

// API Proptypes
interface SalonServiceFaqProps {
  faq_id: number;
  service_type: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

export const SalonServiceFaq: React.FC<SalonServiceFaqProps> = () => {


  // State Declaration for Home Service FAQ's
  const [salonFaqData, setSalonFaqData] = useState<SalonServiceFaqProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API Call to fetch Home Service FAQ's data
    const loadHomeServiceFaqData = async () => {
      try {
        const data = await fetchHomePageFAQ(1);
        setSalonFaqData(data.data);
        console.log("Fetched salon service faq's data log", data.data);

      } catch (error: any) {
        setError(error.message || "Failed to fetch salon service faq's data");
      }
      finally {
        setLoading(false)
      }
    };

    loadHomeServiceFaqData();
  }, []);

  if (loading) return <div>
    {/* Loading... */}
    <ShimmerTitle mode="light" line={1} gap={8} />
    <ShimmerText mode="light" line={10} gap={6} />
  </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {salonFaqData.map((salonService) => (
        <div>
          <SalonServiceCard
            key={salonService.faq_id}
            cardID={salonService.faq_id}
            cardQuestion={salonService.question}
            cardAnswer={salonService.answer} />
        </div>
      ))}

      {/* <SalonServiceCard
        cardQuestion={"How can I book a service with Mindful Beauty?"}
        cardAnswer={"Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam. Vivamus hendrerit nibh ut porta malesuada. Nulla facilisi. Pellentesque sed euismod nibh. Vivamus ornare rhoncus lobortis. Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam."} />

      <SalonServiceCard
        cardQuestion={"Are the beauty professionals at Mindful Beauty trained and certified?"}
        cardAnswer={"Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam. Vivamus hendrerit nibh ut porta malesuada. Nulla facilisi. Pellentesque sed euismod nibh. Vivamus ornare rhoncus lobortis. Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam."} />

      <SalonServiceCard
        cardQuestion={"Can I customize my beauty treatments?"}
        cardAnswer={"Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam. Vivamus hendrerit nibh ut porta malesuada. Nulla facilisi. Pellentesque sed euismod nibh. Vivamus ornare rhoncus lobortis. Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam."} />

      <SalonServiceCard
        cardQuestion={"What services does Mindful Beauty offer?"}
        cardAnswer={"Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam. Vivamus hendrerit nibh ut porta malesuada. Nulla facilisi. Pellentesque sed euismod nibh. Vivamus ornare rhoncus lobortis. Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam."} /> */}
    </div>
  )
}
