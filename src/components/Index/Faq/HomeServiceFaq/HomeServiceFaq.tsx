import React, { useState, useEffect } from 'react';
import { HomeServiceCard } from './HomeServiceCard';
import { fetchHomePageFAQ } from '../../../../api/ApiConfig';
import { ShimmerText, ShimmerTitle } from 'shimmer-effects-react';

// API Proptypes
interface HomeServiceFaqProps {
    faq_id: number;
    service_type: number;
    question: string;
    answer: string;
    created_at: string;
    updated_at: string;
}

export const HomeServiceFaq: React.FC<HomeServiceFaqProps> = () => {

    // State Declaration for Home Service FAQ's
    const [faqData, setFaqData] = useState<HomeServiceFaqProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // API Call to fetch Home Service FAQ's data
        const loadHomeServiceFaqData = async () => {
            try {
                const data = await fetchHomePageFAQ(2);
                setFaqData(data.data);
                console.log("Fetched home service faq's data log:", data.data);

            } catch (error: any) {
                setError(error.message || "Failed to fetch home service faq's data");
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
            {faqData.map((homeService) => (
                <div>
                    <HomeServiceCard
                        key={homeService.faq_id}
                        cardID={homeService.faq_id}
                        cardQuestion={homeService.question}
                        cardAnswer={homeService.answer} />
                </div>
            ))}


            {/* <HomeServiceCard
                cardQuestion={"Pellentesque sed euismod nibh. Vivamus ornare rhoncus lobortis?"}
                cardAnswer={"Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam. Vivamus hendrerit nibh ut porta malesuada. Nulla facilisi. Pellentesque sed euismod nibh. Vivamus ornare rhoncus lobortis. Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam."} />

            <HomeServiceCard
                cardQuestion={"Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim?"}
                cardAnswer={"Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam. Vivamus hendrerit nibh ut porta malesuada. Nulla facilisi. Pellentesque sed euismod nibh. Vivamus ornare rhoncus lobortis. Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam."} />

            <HomeServiceCard
                cardQuestion={"Eros nisi fermentum ligula, eu porttitor lacus enim id quam.?"}
                cardAnswer={"Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam. Vivamus hendrerit nibh ut porta malesuada. Nulla facilisi. Pellentesque sed euismod nibh. Vivamus ornare rhoncus lobortis. Integer pretium, nunc a vulputate ultrices, eros nisi fermentum ligula, eu porttitor lacus enim id quam."} /> */}
        </div>
    )
}
