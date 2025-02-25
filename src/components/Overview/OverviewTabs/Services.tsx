import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppointmentCard } from './Services/AppointmentCard'
import { featuredServices, fetchServiceProviderDetails, fetchSubcategories } from "../../../api/ApiConfig";
import { NotFoundContent } from "../../common/NotFoundContent";
import { ShimmerContentBlock } from "shimmer-effects-react";


interface FeaturedServicesProps {
  category_id?: string;
  category_name: string;
  status: string;
  image: string;
}


// API Proptypes
interface ServiceDetails {
  service_id: number;
  service_name: string;
  price?: number | string; // Allow price to be either number or string;
  description: string;
  status: string;
  image: string;
  sku_value: string;
  category: string;
  subcategory: string;
  service_time: string;
}

interface Subcategory {
  subcategory_id: number;
  subcategory_name: string;
  status: string;
  category: number;
}

export const Services = () => {

  // Getting provider_id from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const providerId = query.get('provider_id'); // Retrieve the provider_id from query parameters
  console.log("Getting provider ID from URL : ", providerId);

  const storedServiceId = sessionStorage.getItem('selectedServiceId');
  console.log("Stored Service ID for services:", storedServiceId);


  const [servicesDetails, setServicesDetails] = useState<ServiceDetails[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<FeaturedServicesProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [OverviewData, setOverviewData] = useState<number>();
  // API for services list dropdown details
  useEffect(() => {

    // API call to fetch data
    const loadServicesDetailsData = async (providerId: number, storedServiceId: number) => {
      console.log("providerId, storedServiceId ===>", providerId, storedServiceId);
      try {
        const data = await fetchServiceProviderDetails(providerId, storedServiceId);
        setOverviewData(data.data[0].branch_id);
        setServicesDetails(data.services); // Directly set the fetched data
        // setFilteredServices(data.data); // Initially set filteredServices to all services
        console.log("services list details data log", data.services);
        // console.log("branch id check on service page ==>", data.data[0].branch_id);
        const loadCategorySelectData = await featuredServices();
        setCategoryDetails(loadCategorySelectData.data)
        console.log("Category ID on select data log:", loadCategorySelectData);



      } catch (error: any) {
        setError(error.message || "Failed to fetch services list details.");
      } finally {
        setLoading(false);
      }
    };

    // Ensure providerId is available and valid
    if (providerId) {
      const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
      if (!isNaN(numericProviderId)) {
        loadServicesDetailsData(numericProviderId, storedServiceId ? parseInt(storedServiceId, 10) : 0);
      } else {
        setError('Invalid provider ID.');
      }
    }

    return () => {
      // Cleanup
      setServicesDetails([]);
      setLoading(true);
      setError(null);
    };
  }, [providerId, storedServiceId]);

  useEffect(() => {
    // Remove the loadSubcategories call here since we'll load them when category changes
  }, []);

  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory(""); // Reset subcategory selection

    // Reset subcategories first
    setFilteredSubcategories([]);

    try {
      // Fetch subcategories with the selected category ID
      const response = await fetchSubcategories(categoryId);
      // setSubcategories(response.data);
      setFilteredSubcategories(response.data);
    } catch (error) {
      console.error("Error loading subcategories:", error);
      setError("Failed to load subcategories");
    }
  };

  const handleSubcategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategoryId = event.target.value;
    setSelectedSubcategory(subcategoryId);

    // Only fetch if we have all required parameters
    if (providerId && selectedCategory && subcategoryId) {
      console.log("providerId, selectedCategory, subcategoryId ===>", providerId, selectedCategory, subcategoryId);
      try {
        setLoading(true);
        const data = await fetchServiceProviderDetails(
          parseInt(providerId),
          storedServiceId ? parseInt(storedServiceId) : 0,
          selectedCategory,
          subcategoryId
        );
        setServicesDetails(data.services);
      } catch (error: any) {
        setError(error.message || "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>
      <div>
        <ShimmerContentBlock
          mode="light"
          rounded={1}
          items={1}
          itemsGap={5}
          thumbnailHeight={200}
          thumbnailWidth={200}
          thumbnailRounded={1}
          contentDetailsPosition="start"
          contentDetailTextLines={3}
        />
      </div>

    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  console.log("log", servicesDetails);

  // if (servicesDetails.length <= 0) {
  //   return <div><NotFoundContent /></div>;
  // }

  return (
    <div>

      <div className="flex items-center space-x-5 max-sm:flex-wrap max-sm:items-start max-sm:gap-2 max-sm:space-x-0">
        {/* Category */}
        <div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-64 bg-mindfulMildGrey text-sm text-mindfulBlack font-semibold border-[1px] border-mindfulGreySecondary px-3 py-2 mb-5 cursor-pointer"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categoryDetails.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            className="w-64 bg-mindfulMildGrey text-sm text-mindfulBlack font-semibold border-[1px] border-mindfulGreySecondary px-3 py-2 mb-5 cursor-pointer"
          >
            <option value="">
              {selectedCategory ? 'Select Subcategory' : 'Please select a category first'}
            </option>

            {filteredSubcategories.map((subcategory) => (
              <option
                key={subcategory.subcategory_id}
                value={subcategory.subcategory_id}
              >
                {subcategory.subcategory_name}
              </option>
            ))}

          </select>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 gap-8">
        {servicesDetails.map((service) => (
          <AppointmentCard
            key={service.service_id}
            serviceID={service.service_id}
            serviceName={service.service_name}
            serviceDesc={service.description}
            price={service.price}
            image={service.image}
            serviceTime={service.service_time}
            branchID={OverviewData || 0}
          />
        ))}
      </div> */}
      {servicesDetails.length > 0 ? (
        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
          {servicesDetails.map((service) => (
            <AppointmentCard
              key={service.service_id}
              serviceID={service.service_id}
              serviceName={service.service_name}
              serviceDesc={service.description}
              price={service.price}
              image={service.image}
              serviceTime={service.service_time}
              branchID={OverviewData || 0}
            />
          ))}
        </div>
      ) : (
        <NotFoundContent />
      )}
    </div>
  )
}
