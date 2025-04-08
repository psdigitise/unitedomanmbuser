// import { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { BannerContent } from "../components/common/BannerContent";
// import { AddtoCart } from "../components/Overview/AddtoCart";
// import { FrequentlyAdded } from "../components/Overview/FrequentlyAdded";
// import { OverviewDetailsCard } from "../components/Overview/OverviewDetailsCard";
// import { OverviewSlick } from "../components/Overview/OverviewSlick";
// import { OverviewTabs } from "../components/Overview/OverviewTabs";
// import serviceProviderAd from "../assets/images/serviceProviderAd.png";
// import { fetchServiceProviderDetailsBrachID } from "../api/ApiConfig";
// import { ShimmerContentBlock } from "shimmer-effects-react";
// import { RootState } from "../redux/store"; // Adjust this path as needed
// import { resetCartItemArea } from "../redux/scrollSlice"; // Adjust import path
// import { useDispatch, useSelector } from "react-redux";
// import { ClearItemsPopup } from "../components/Overview/ClearItemsPopup";
// import { NotifyError } from '../components/common/Toast/ToastMessage';

// // API Proptypes datatype
// interface ProviderDetails {
//   branch_city: string;
//   branch_id?: number;
//   branch_latitude: number;
//   branch_longitude: number;
//   branch_name: string;
//   branch_state: string;
//   provider_city: string;
//   provider_id?: number;
//   provider_latitude: number;
//   provider_name: string;
//   provider_state: string;
//   rating: number;
//   verified: boolean;
//   image_url: string;
//   review_count: string;
//   average_rating: number;
//   service_type: string;
// }

// export const Overview = () => {
//   const dispatch = useDispatch();

//   // Scroll Functionality from redux
//   const scrollToCartArea = useSelector(
//     (state: RootState) => state.scroll.scrollToCartArea
//   );
//   console.log(scrollToCartArea, "function");

//   // Ref for cart item area
//   const cartItemAreaRef = useRef<HTMLDivElement>(null);
//   console.log(cartItemAreaRef, "Hello");
//   const [serviceType, setServiceType] = useState<string | null>("");

//   // Scroll to the cart area when the state indicates so
//   useEffect(() => {
//     if (scrollToCartArea && cartItemAreaRef.current) {
//       cartItemAreaRef.current.scrollIntoView({ behavior: "smooth" });
//       dispatch(resetCartItemArea()); // Reset the scroll state after scrolling
//     }
//   }, [scrollToCartArea, dispatch]);

//   // Getting provider_id from URL
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const providerId = query.get("provider_id");
//   const branchID = query.get("branch_id");

//   const localproviderId = query.get("provider_id");
//   const localbranchID = query.get("branch_id");

//   const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items from Redux

//   const [providerDetails, setProviderDetails] = useState<ProviderDetails[]>([]);
//   const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState<string | null>(null);

//   const [showClearItemsPopup, setShowClearItemsPopup] = useState<boolean>(false);
//   // const [currentProviderId, setCurrentProviderId] = useState<string | null>(null); // Track the current provider ID
//   // const [previousProviderId, setPreviousProviderId] = useState<string | null>(null); // Track the last shown provider ID
//   // const [currentProviderId, setCurrentProviderId] = useState<string | null>(null); // Track the current provider ID

//   const storedServiceId = sessionStorage.getItem("selectedServiceId");
//   console.log("Stored Service ID for services:", storedServiceId);

//   useEffect(() => {
//     if (providerId && branchID && localproviderId && localbranchID) {
//       // Store the provider_id in sessionStorage
//       sessionStorage.setItem("selectedProviderId", providerId || '');
//       sessionStorage.setItem("selectedBranchId", branchID || '');
//       localStorage.setItem("selectedLocalProviderId", localproviderId || '');
//       localStorage.setItem("selectedLocalBranchId", localbranchID || '');
//     }
//   }, [providerId, branchID]);

//   // API Call to get provider details
//   useEffect(() => {
//     console.log("Getting branchID ID from URl useEffect ===> ", branchID);
//     const loadProviderDetailsData = async (
//       providerId: number,
//       service_id: number,
//       branchID: number
//     ) => {
//       try {
//         setLoading(true); // Start loading before fetching data
//         // API call to fetch service providers
//         const data = await fetchServiceProviderDetailsBrachID(providerId, service_id, branchID);
//         setProviderDetails(data.data);
//         console.log("Provider Details and branch id ====>", data.data);

//         if (data.data && data.data.length > 0) {
//           //setServiceType(data.data[0].service_type); // Assuming service_type is present in the first item
//           const serviceType = data.data[0].service_type; // Assuming service_type is present in the first item
//           setServiceType(serviceType);
//           // Store service_type in sessionStorage
//           sessionStorage.setItem("selectedServiceType", serviceType);
//         }

//       } catch (error: any) {
//         // setError(error.message || "Failed to fetch service provider details.");
//         NotifyError(error.message || "Failed to fetch service provider details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Ensure providerId is available and valid
//     if (providerId) {
//       const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
//       if (!isNaN(numericProviderId)) {
//         loadProviderDetailsData(
//           numericProviderId,
//           storedServiceId ? parseInt(storedServiceId, 10) : 0,
//           branchID ? parseInt(branchID, 10) : 0
//         );
//       } else {
//         // setError("Invalid provider ID.");
//         NotifyError("Invalid provider ID.");
//       }
//     }
//   }, [providerId, storedServiceId]);

//   const openClearItemsPopup = () => {
//     setShowClearItemsPopup(true);
//   };

//   const closeClearItemsPopup = () => {
//     setShowClearItemsPopup(false);
//   };

//   useEffect(() => {
//     if (providerId && branchID) {
//       const lastProviderId = sessionStorage.getItem('lastProviderId') || '';
//       const lastBranchId = sessionStorage.getItem('lastBranchId') || '';
//       if (cartItems.length > 0 && lastProviderId && lastProviderId !== providerId && lastBranchId !== branchID) {
//         // setShowClearItemsPopup(true);
//       } else if (cartItems.length === 0) {
//         // Update lastProviderId if cart is empty
//         sessionStorage.setItem('lastProviderId', providerId || '');
//         sessionStorage.setItem('lastBranchId', branchID || '');
//       }
//     }
//   }, [providerId, cartItems.length, branchID]); // Add cartItems.length as dependency

//   // Add this function to handle cart changes
//   // const handleCartChange = () => {
//   //   if (cartItems.length === 1) { // First item being added
//   //     const storedProviderId = sessionStorage.getItem('lastProviderId');
//   //     if (storedProviderId && storedProviderId !== providerId) {
//   //       openClearItemsPopup();
//   //     }
//   //   }
//   // };

//   // // Add useEffect to watch cart changes
//   // useEffect(() => {
//   //   handleCartChange();
//   // }, [cartItems.length]);

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (error) {
//   //   return <div>Error: {error}</div>;
//   // }

//   return (
//     <section ref={cartItemAreaRef} className="mt-[15px]">
//       {/* {/ Banner Content /} */}
//       <div>
//         {/* <BannerContent bannerTitle="Salon Service" /> */}
//         <BannerContent bannerTitle={serviceType || "Service"} />
//       </div>

//       <div className="container mx-auto px-4">
//         <div className="grid xl:grid-cols-[70%_30%] grid-cols-[100%] xl:space-x-5 py-5 max-xl:flex max-xl:flex-col-reverse ">
//           {/* {/ Grid Column first grid /} */}
//           <div>
//             {/* {/ OverSlick  /} */}
//             <div className="max-md:hidden">
//               <OverviewSlick />
//             </div>

//             {/* {/ Overview Details Card /} */}
//             {loading ? (
//               // Show shimmer effect while loading
//               <div className="py-5">
//                 {/* {/ <ShimmerCategoryItems mode="light" / > /} */}
//                 <ShimmerContentBlock
//                   mode="light"
//                   rounded={1}
//                   items={1}
//                   itemsGap={10}
//                   thumbnailHeight={200}
//                   thumbnailWidth={200}
//                   thumbnailRounded={1}
//                   contentDetailsPosition="start"
//                   contentDetailTextLines={6}
//                 />
//               </div>
//             ) : (
//               // Show the provider details once loading is done
//               <div>
//                 {providerDetails.map((provider) => (
//                   <OverviewDetailsCard
//                     key={provider.provider_id}
//                     serviceProviderID={provider.provider_id}
//                     serviceProviderName={provider.provider_name}
//                     serviceProviderRating={provider.rating}
//                     verifiedCheckmark={provider.verified}
//                     serviceProviderCity={provider.provider_city}
//                     serviceProviderState={provider.provider_state}
//                     branchID={provider.branch_id ?? 0}
//                     branchCity={provider.branch_city}
//                     branchName={provider.branch_name}
//                     branchState={provider.branch_state}
//                     serviceProviderImage={provider.image_url}
//                     branch_latitude={provider.branch_latitude}
//                     branch_longitude={provider.branch_longitude}
//                     reviewCount={provider.review_count}
//                     starRating={provider.average_rating}
//                     ServiceType={provider.service_type}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* <div>
//               {providerDetails.map((provider) => (
//                 <OverviewDetailsCard
//                   key={provider.provider_id}
//                   serviceProviderID={provider.provider_id}
//                   serviceProviderName={provider.provider_name}
//                   serviceProviderRating={provider.rating}
//                   verifiedCheckmark={provider.verified}
//                   serviceProviderCity={provider.provider_city}
//                   serviceProviderState={provider.provider_state}
//                 />
//               ))}
//             </div> */}

//             {/* {/ Overview Tabs /} */}
//             <div>
//               <OverviewTabs />
//             </div>
//           </div>

//           {/* {/ Grid Column second grid /} */}
//           <div className="space-y-10 max-xl:mb-5 max-md:hidden">
//             <div>
//               <AddtoCart />
//             </div>

//             <div className="max-md:hidden">
//               <FrequentlyAdded />
//             </div>

//             {/* {/ Service Provider Ad /} */}
//             <div onClick={openClearItemsPopup}>
//               <img
//                 src={serviceProviderAd}
//                 alt="service provider ad"
//                 className="w-full"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Show Clear Items Popup */}
//       {showClearItemsPopup && (
//         <ClearItemsPopup closePopup={closeClearItemsPopup} />
//       )}
//     </section>
//   );
// };



import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { BannerContent } from "../components/common/BannerContent";
import { AddtoCart } from "../components/Overview/AddtoCart";
import { FrequentlyAdded } from "../components/Overview/FrequentlyAdded";
import { OverviewDetailsCard } from "../components/Overview/OverviewDetailsCard";
import { OverviewSlick } from "../components/Overview/OverviewSlick";
import { OverviewTabs } from "../components/Overview/OverviewTabs";
import serviceProviderAd from "../assets/images/serviceProviderAd.png";
import { fetchServiceProviderDetailsBrachID } from "../api/ApiConfig";
import { ShimmerContentBlock } from "shimmer-effects-react";
import { RootState } from "../redux/store"; // Adjust this path as needed
import { resetCartItemArea } from "../redux/scrollSlice"; // Adjust import path
import { useDispatch, useSelector } from "react-redux";
import { ClearItemsPopup } from "../components/Overview/ClearItemsPopup";
import { NotifyError } from '../components/common/Toast/ToastMessage';

// API Proptypes datatype
interface ProviderDetails {
  branch_city: string;
  branch_id?: number;
  branch_latitude: number;
  branch_longitude: number;
  branch_name: string;
  branch_state: string;
  provider_city: string;
  provider_id?: number;
  provider_latitude: number;
  provider_name: string;
  provider_state: string;
  rating: number;
  verified: boolean;
  image_url: string;
  review_count: string;
  average_rating: number;
  service_type: string;
}

export const Overview = () => {
  const dispatch = useDispatch();

  // Scroll Functionality from redux
  const scrollToCartArea = useSelector(
    (state: RootState) => state.scroll.scrollToCartArea
  );
  console.log(scrollToCartArea, "function");

  // Ref for cart item area
  const cartItemAreaRef = useRef<HTMLDivElement>(null);
  console.log(cartItemAreaRef, "Hello");
  const [serviceType, setServiceType] = useState<string | null>("");

  // Scroll to the cart area when the state indicates so
  useEffect(() => {
    if (scrollToCartArea && cartItemAreaRef.current) {
      cartItemAreaRef.current.scrollIntoView({ behavior: "smooth" });
      dispatch(resetCartItemArea()); // Reset the scroll state after scrolling
    }
  }, [scrollToCartArea, dispatch]);

  // Getting provider_id from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const providerId = query.get("provider_id");
  const branchID = query.get("branch_id");

  const localproviderId = query.get("provider_id");
  const localbranchID = query.get("branch_id");

  const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items from Redux

  const [providerDetails, setProviderDetails] = useState<ProviderDetails[]>([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const [showClearItemsPopup, setShowClearItemsPopup] = useState<boolean>(false);
  // const [currentProviderId, setCurrentProviderId] = useState<string | null>(null); // Track the current provider ID
  // const [previousProviderId, setPreviousProviderId] = useState<string | null>(null); // Track the last shown provider ID
  // const [currentProviderId, setCurrentProviderId] = useState<string | null>(null); // Track the current provider ID

  const storedServiceId = sessionStorage.getItem("selectedServiceId");
  console.log("Stored Service ID for services:", storedServiceId);

  useEffect(() => {
    if (providerId && branchID && localproviderId && localbranchID) {
      // Store the provider_id in sessionStorage
      sessionStorage.setItem("selectedProviderId", providerId || '');
      sessionStorage.setItem("selectedBranchId", branchID || '');
      localStorage.setItem("selectedLocalProviderId", localproviderId || '');
      localStorage.setItem("selectedLocalBranchId", localbranchID || '');
    }
  }, [providerId, branchID]);

  // API Call to get provider details
  useEffect(() => {
    console.log("Getting branchID ID from URl useEffect ===> ", branchID);
    const loadProviderDetailsData = async (
      providerId: number,
      service_id: number,
      branchID: number
    ) => {
      try {
        setLoading(true); // Start loading before fetching data
        // API call to fetch service providers
        const data = await fetchServiceProviderDetailsBrachID(providerId, service_id, branchID);
        setProviderDetails(data.data);
        console.log("Provider Details and branch id ====>", data.data);

        if (data.data && data.data.length > 0) {
          //setServiceType(data.data[0].service_type); // Assuming service_type is present in the first item
          const serviceType = data.data[0].service_type; // Assuming service_type is present in the first item
          setServiceType(serviceType);
          // Store service_type in sessionStorage
          sessionStorage.setItem("selectedServiceType", serviceType);
        }

      } catch (error: any) {
        // setError(error.message || "Failed to fetch service provider details.");
        NotifyError(error.message || "Failed to fetch service provider details.");
      } finally {
        setLoading(false);
      }
    };

    // Ensure providerId is available and valid
    if (providerId) {
      const numericProviderId = parseInt(providerId, 10); // Convert providerId to number
      if (!isNaN(numericProviderId)) {
        loadProviderDetailsData(
          numericProviderId,
          storedServiceId ? parseInt(storedServiceId, 10) : 0,
          branchID ? parseInt(branchID, 10) : 0
        );
      } else {
        // setError("Invalid provider ID.");
        NotifyError("Invalid provider ID.");
      }
    }
  }, [providerId, storedServiceId]);

  const openClearItemsPopup = () => {
    setShowClearItemsPopup(true);
  };

  const closeClearItemsPopup = () => {
    setShowClearItemsPopup(false);
  };

  useEffect(() => {
    if (providerId && branchID) {
      const lastProviderId = sessionStorage.getItem('lastProviderId') || '';
      const lastBranchId = sessionStorage.getItem('lastBranchId') || '';
      if (cartItems.length > 0 && lastProviderId && lastProviderId !== providerId && lastBranchId !== branchID) {
        // setShowClearItemsPopup(true);
      } else if (cartItems.length === 0) {
        // Update lastProviderId if cart is empty
        sessionStorage.setItem('lastProviderId', providerId || '');
        sessionStorage.setItem('lastBranchId', branchID || '');
      }
    }
  }, [providerId, cartItems.length, branchID]); // Add cartItems.length as dependency

  // Add this function to handle cart changes
  // const handleCartChange = () => {
  //   if (cartItems.length === 1) { // First item being added
  //     const storedProviderId = sessionStorage.getItem('lastProviderId');
  //     if (storedProviderId && storedProviderId !== providerId) {
  //       openClearItemsPopup();
  //     }
  //   }
  // };

  // // Add useEffect to watch cart changes
  // useEffect(() => {
  //   handleCartChange();
  // }, [cartItems.length]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <section ref={cartItemAreaRef} className="mt-[15px]">
      {/* {/ Banner Content /} */}
      <div>
        {/* <BannerContent bannerTitle="Salon Service" /> */}
        <BannerContent bannerTitle={serviceType || "Service"} />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid xl:grid-cols-[70%_30%] grid-cols-[100%] xl:space-x-5 py-5 max-xl:flex max-xl:flex-col-reverse ">
          {/* {/ Grid Column first grid /} */}
          <div>
            {/* {/ OverSlick  /} */}
            <div className="max-md:hidden">
              <OverviewSlick />
            </div>

            {/* {/ Overview Details Card /} */}
            {loading ? (
              // Show shimmer effect while loading
              <div className="py-5">
                {/* {/ <ShimmerCategoryItems mode="light" / > /} */}
                <ShimmerContentBlock
                  mode="light"
                  rounded={1}
                  items={1}
                  itemsGap={10}
                  thumbnailHeight={200}
                  thumbnailWidth={200}
                  thumbnailRounded={1}
                  contentDetailsPosition="start"
                  contentDetailTextLines={6}
                />
              </div>
            ) : (
              // Show the provider details once loading is done
              <div>
                {providerDetails.map((provider) => (
                  <OverviewDetailsCard
                    key={provider.provider_id}
                    serviceProviderID={provider.provider_id}
                    serviceProviderName={provider.provider_name}
                    serviceProviderRating={provider.rating}
                    verifiedCheckmark={provider.verified}
                    serviceProviderCity={provider.provider_city}
                    serviceProviderState={provider.provider_state}
                    branchID={provider.branch_id ?? 0}
                    branchCity={provider.branch_city}
                    branchName={provider.branch_name}
                    branchState={provider.branch_state}
                    serviceProviderImage={provider.image_url}
                    branch_latitude={provider.branch_latitude}
                    branch_longitude={provider.branch_longitude}
                    reviewCount={provider.review_count}
                    starRating={provider.average_rating}
                    ServiceType={provider.service_type}
                  />
                ))}
              </div>
            )}

            {/* <div>
              {providerDetails.map((provider) => (
                <OverviewDetailsCard
                  key={provider.provider_id}
                  serviceProviderID={provider.provider_id}
                  serviceProviderName={provider.provider_name}
                  serviceProviderRating={provider.rating}
                  verifiedCheckmark={provider.verified}
                  serviceProviderCity={provider.provider_city}
                  serviceProviderState={provider.provider_state}
                />
              ))}
            </div> */}

            {/* {/ Overview Tabs /} */}
            <div>
              <OverviewTabs />
            </div>
          </div>

          {/* {/ Grid Column second grid /} */}
          <div className="space-y-10 max-xl:mb-5 ">
            <div>
              <AddtoCart />
            </div>

            <div className="max-md:hidden">
              <FrequentlyAdded />
            </div>

            {/* {/ Service Provider Ad /} */}
            <div onClick={openClearItemsPopup}>
              <img
                src={serviceProviderAd}
                alt="service provider ad"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Show Clear Items Popup */}
      {showClearItemsPopup && (
        <ClearItemsPopup closePopup={closeClearItemsPopup} />
      )}
    </section>
  );
};
