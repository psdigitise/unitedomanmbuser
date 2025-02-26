import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import photosTypeOne from "../../../assets/images/photosTypeOne.png"
// import photosTypeTwo from "../../../assets/images/photosTypeTwo.png"
// import photosTypeThree from "../../../assets/images/photosTypeThree.png"
// import photosTypeFour from "../../../assets/images/photosTypeFour.png"
// import photosTypeFive from "../../../assets/images/photosTypeFive.png"
// import photosTypeSix from "../../../assets/images/photosTypeSix.png"
// import photosTypeseven from "../../../assets/images/photosTypeSeven.png"
import { fetchServiceProviderDetails } from "../../../api/ApiConfig"
import { NotFoundContent } from "../../common/NotFoundContent";
import { ShimmerDiv } from "shimmer-effects-react";

interface Photos {
  photo_id: number,
  image?: string,
  created_at: string,
  service_name: string,
}

export const Photos = () => {

  // Getting provider_id from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const providerId = query.get('provider_id'); // Retrieve the provider_id from query parameters
  console.log("Getting provider ID from URL : ", providerId);

  const storedServiceId = sessionStorage.getItem('selectedServiceId');
  console.log("Stored Service ID for services:", storedServiceId);

  const [photos, setPhotos] = useState<Photos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API call to fetch data
    const loadPhotosData = async (provider_id: number, service_id: number) => {
      // setLoading(true);
      try {
        const data = await fetchServiceProviderDetails(provider_id, service_id);
        setPhotos(data.photos); // Directly set the fetched data
        // setFilteredServices(data.data); // Initially set filteredServices to all services
        console.log("Photos data log", data.photos);

      } catch (error: any) {
        setError(error.message || "Failed to fetch photos.");
      } finally {
        setLoading(false);
      }
    };
    // loadPhotosData();
    // Ensure providerId is available and valid
    if (providerId) {
      const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
      if (!isNaN(numericProviderId)) {
        loadPhotosData(numericProviderId, storedServiceId ? parseInt(storedServiceId, 10) : 0);
      } else {
        setError('Invalid provider ID.');
      }
    }
  }, [providerId, storedServiceId]);

  if (loading) {
    return <div>
      {/* Loading... */}
      <div className="grid grid-cols-4">
        <ShimmerDiv mode="light" height={200} width={200} />
        <ShimmerDiv mode="light" height={200} width={200} />
        <ShimmerDiv mode="light" height={200} width={200} />
        <ShimmerDiv mode="light" height={200} width={200} />
      </div>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (photos.length <= 0) {
    return (<div><NotFoundContent /></div>)
  }

  return (
    <div className="grid grid-cols-4 gap-4 max-xl:mb-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
      {photos.map((photo) => (
        <div key={photo.photo_id}>
          <img src={photo.image} alt={photo.service_name} className="w-72 h-52 mx-auto" />
        </div>
      ))}
      {/* <div>
        <img src={photosTypeTwo} alt="photosTypeTwo" className="w-full" />
      </div>
      <div>
        <img src={photosTypeThree} alt="photosTypeThree" className="w-full" />
      </div>
      <div>
        <img src={photosTypeFour} alt="photosTypeFour" className="w-full" />
      </div>
      <div>
        <img src={photosTypeFive} alt="photosTypeFive" className="w-full" />
      </div>
      <div>
        <img src={photosTypeSix} alt="photosTypeSix" className="w-full" />
      </div>
      <div>
        <img src={photosTypeseven} alt="photosTypeseven" className="w-full" />
      </div> */}
    </div>
  )
}
