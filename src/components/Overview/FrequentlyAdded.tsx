import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FrequentlyAddedCard } from './FrequentlyAdded/FrequentlyAddedCard';
import { fetchServiceProviderDetailsBrachID } from '../../api/ApiConfig';

interface FrequentlyAddedProps {
    service_id: number;
    service_name: string;
    image: string;
    price: string;
    category_name: string;
    serviceDesc: string;
    serviceTime: string;
}

export const FrequentlyAdded: React.FC = () => {


    // Getting provider_id from URL
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const providerId = query.get('provider_id'); // Retrieve the provider_id from query parameters
    console.log("Getting provider ID from URL : ", providerId);
    const branchID = query.get("branch_id");
    const storedServiceId = sessionStorage.getItem('selectedServiceId');
    console.log("Stored Service ID for services:", storedServiceId);

    const [frequentlyAdded, setFrequentlyAdded] = useState<FrequentlyAddedProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [OverviewData, setOverviewData] = useState<number>();
    // useEffect(() => {
    //     const fetchFrequentlyAdded = async (provider_id: number, service_id: number) => {
    //         setLoading(true);
    //         try {
    //             // const loadFrequentlyAddedData = await fetchFrequentlyAddedServices();
    //             const loadFrequentlyAddedData = await fetchServiceProviderDetails(provider_id, service_id);

    //             setFrequentlyAdded(loadFrequentlyAddedData.frequently_used_services);
    //             console.log("Frequently used services data log:", loadFrequentlyAddedData.frequently_used_services);

    //         }
    //         catch (error: any) {
    //             setError(error.message || "Failed to fetch Frequently used services")
    //         }
    //         finally {
    //             setLoading(false);
    //         }
    //     }

    //     // fetchFrequentlyAdded();
    //     // Ensure providerId is available and valid
    //     if (providerId) {
    //         const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
    //         if (!isNaN(numericProviderId)) {
    //             fetchFrequentlyAdded(numericProviderId, storedServiceId ? parseInt(storedServiceId, 10) : 0);
    //         } else {
    //             setError('Invalid provider ID.');
    //         }
    //     }
    // }, [providerId, storedServiceId]);

    useEffect(() => {
        const fetchFrequentlyAdded = async (provider_id: number, service_id: number, branchID: number) => {
            setLoading(true);
            try {
                // const loadFrequentlyAddedData = await fetchFrequentlyAddedServices();
                const loadFrequentlyAddedData = await fetchServiceProviderDetailsBrachID(provider_id, service_id, branchID);
                setOverviewData(loadFrequentlyAddedData.data[0].branch_id);
                setFrequentlyAdded(loadFrequentlyAddedData.frequently_used_services);
                console.log("Frequently used services data log:", loadFrequentlyAddedData.frequently_used_services);

            }
            catch (error: any) {
                setError(error.message || "Failed to fetch Frequently used services")
            }
            finally {
                setLoading(false);
            }
        }

        // fetchFrequentlyAdded();
        // Ensure providerId is available and valid
        if (providerId) {
            const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
            if (!isNaN(numericProviderId)) {
                fetchFrequentlyAdded(numericProviderId, storedServiceId ? parseInt(storedServiceId, 10) : 0, branchID ? parseInt(branchID, 10) : 0);
            } else {
                setError('Invalid provider ID.');
            }
        }
    }, [providerId, storedServiceId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="rounded-[8px] border-[1px] border-mindfulLightGrey px-5 py-5">
            <div>
                <h5 className="text-[22px] text-mindfulBlack font-semibold mb-2">Frequently Added</h5>
            </div>

            <div className="space-y-5">
                {frequentlyAdded.length > 0 ? (
                    frequentlyAdded.map((faqItem) => (
                        <FrequentlyAddedCard
                            key={faqItem.service_id}
                            serviceID={faqItem.service_id}
                            serviceName={faqItem.service_name}
                            image={faqItem.image}
                            price={faqItem.price}
                            categoryName={faqItem.category_name}
                            serviceDesc={faqItem.serviceDesc}
                            serviceTime={faqItem.serviceTime}
                            branchID={OverviewData || 0}
                        />
                    ))
                ) : (
                    <div className="text-mindfulGrey text-[16px]">No frequently added services found</div>
                )}

                {/* <FrequentlyAddedCard /> */}
                {/* <FrequentlyAddedCard />
                <FrequentlyAddedCard /> */}
            </div>
        </div >
    )
}
