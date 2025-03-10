import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PackageCard } from "./Packages/PackageCard";
import { fetchServiceProviderDetailsBrachID } from "../../../api/ApiConfig";
import { NotFoundContent } from "../../common/NotFoundContent";
import { ShimmerText, ShimmerTitle } from "shimmer-effects-react";
import { NotifyError } from "../../common/Toast/ToastMessage";

interface PackagesProps {
    service_id: number;
    package_name: string;
    service_image: string;
    service_price?: string;
    package_services?: string | string[]; // Ensure proper type
    status?: string;
}

export const Packages = () => {

    // Getting provider_id from URL
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const providerId = query.get('provider_id'); // Retrieve the provider_id from query parameters
    console.log("Getting provider ID from URL : ", providerId);
    const branchID = query.get("branch_id");
    console.log("Getting branchID ID from URl : ", branchID);
    const storedServiceId = sessionStorage.getItem('selectedServiceId');
    console.log("Stored Service ID for services:", storedServiceId);

    // API handling State Declaration
    const [packagesData, setPackagesData] = useState<PackagesProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [OverviewData, setOverviewData] = useState<number>();
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // API call to fetch data
        const loadFaqData = async (provider_id: number, service_id: number, branchID: number) => {
            try {
                // const data = await fetchFAQs();
                const data = await fetchServiceProviderDetailsBrachID(provider_id, service_id, branchID);
                setOverviewData(data.data[0].branch_id);
                setPackagesData(data.packages); // Directly set the fetched data
                console.log("Packages data log", data.packages);

            } catch (error: any) {
                // setError(error.message || "Failed to fetch Packages.");
                NotifyError(error.message || "Failed to fetch Packages.");
            } finally {
                setLoading(false);
            }
        };

        // loadFaqData();
        // Ensure providerId is available and valid
        if (providerId) {
            const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
            if (!isNaN(numericProviderId)) {
                loadFaqData(numericProviderId, storedServiceId ? parseInt(storedServiceId, 10) : 0, branchID ? parseInt(branchID, 10) : 0);
            } else {
                // setError('Invalid provider ID.');
                NotifyError('Invalid provider ID.');
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

    // if (error) {
    //     return <div>Error: {error}</div>
    // }

    if (packagesData.length <= 0) {
        return (
            <div><NotFoundContent /></div>
        )
    }

    return (
        <div>
            {/* {packagesData.map((packagesDataParams) => (
                <PackageCard
                    key={packagesDataParams.package_id}
                    id={packagesDataParams.package_id}
                    packageName={packagesDataParams.package_name}
                    packageImage={packagesDataParams.package_image}
                    packageAmount={packagesDataParams.package_amount}
                    packageServices={packagesDataParams.package_services}
                // packageStatus={packagesDataParams.status}
                />
            ))} */}
            {packagesData.map((pkg) => (
                <PackageCard
                    key={pkg.service_id}
                    packageID={pkg.service_id}
                    packageName={pkg.package_name}
                    packageImage={pkg.service_image}
                    packageAmount={pkg.service_price}
                    packageServices={pkg.package_services}  // Convert to array if needed
                    branchID={OverviewData || 0}
                />
            ))}
        </div>
    );
};
