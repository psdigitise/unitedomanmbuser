import { useState, useEffect, useRef } from "react";
// import mindfulBeauty from "../assets/icons/mindfulBeautyLogo.png";
import mindfulBeautyNew from "../assets/icons/mindfulBeautyLogoNew.png";
import ladyIcon from "../assets/icons/ladyIcon.png";
import locationIcon from "../assets/icons/locationIcon.png";
import { SideBar } from "./SideBar";
import { Link, useNavigate } from "react-router-dom";
import { fetchServicesListDropdown } from "../api/ApiConfig";
// import { AutocompletePrediction } from 'google.maps.places'; // Import the type explicitly
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState, persistor } from "../redux/store";
import SearchIcon from "./SearchIcon";
import { BiSolidUser } from "react-icons/bi";
import { clearCart, logout } from "../redux/cartSlice";
import { NotifyError } from './common/Toast/ToastMessage';
import { Helmet } from "react-helmet-async";
import Specialisticon from "../assets/icons/specialistIcon.svg"
import SalonIcon from "../assets/icons/salonIcon.svg"
import { RiArrowDropDownLine } from "react-icons/ri";
// import { useSelector } from "react-redux";
// import { RootState } from '../redux/store'; // Import RootState (from your store setup)

// API Proptypes datatype
interface Service {
  service_id: number;
  service_name: string;
  price: string;
  description: string;
  status: string;
  image: string;
  sku_value: string;
  category: string;
  subcategory: string;
}

export const LoginHeader = () => {
  // const searchTerm = useSelector((state: RootState) => state.loginHeaderSlice.searchTerm);
  // const location = useSelector((state: RootState) => state.loginHeaderSlice.location);

  // const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();

  const { phoneNumber } = useSelector((state: RootState) => state.cart);

  // Cart Items from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.length;
  console.log("checking cart items in login header", cartItems);
  const [profileHover, setProfileHover] = useState(false);
  const [selectedService, setSelectedService] = useState<string>(sessionStorage.getItem("selectedServiceType") || "");
  console.log("selectedService", selectedService)


  //const storedservicetypes= sessionStorage.getItem("selectedServiceType")
  // Add useEffect to sync with sessionStorage
  const storedServiceType = sessionStorage.getItem("selectedServiceType");
  console.log("storedServiceType", storedServiceType);

  useEffect(() => {
    if (storedServiceType) {
      setSelectedService(storedServiceType);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleMouseEnter = () => {
    setProfileHover(true);
  };

  const handleMouseLeave = () => {
    setProfileHover(false);
  };

  const handleLogout = async () => {
    dispatch(clearCart()); // Cslear the cart
    dispatch(logout()); // Logout and clear token
    navigate("/");
    sessionStorage.clear();

    // Flush pending storage writes before purging
    await persistor.flush();

    // Purge persisted state (this will remove Redux Persist data, i.e., localStorage data)
    await persistor.purge();  // This clears the persisted Redux state from localStorage
  }

  const { token } = useSelector((state: RootState) => state.cart); // Token from Redux
  console.log(token, "Taking token for login status");

  // Getting the stored provider_id from sessionStorage
  const sessionProviderID = sessionStorage.getItem('selectedProviderId');
  const sessionBranchID = sessionStorage.getItem("selectedBranchId");
  console.log("Selected Provider ID and sessionBranch ID from session storage", sessionProviderID, sessionBranchID);
  const localProviderID = localStorage.getItem('selectedLocalProviderId');
  const localBranchID = localStorage.getItem("selectedLocalBranchId");
  console.log("localProviderID and localBranchID from local storage", localProviderID, localBranchID);
  // Handle cart icon navigation on button click
  const handleCartIcon = () => {
    if (!token) {
      navigate("/Login"); // Navigate to Login if no token
    } else {
      // navigate("/DateTime"); // Proceed to DateTime if token exists
      navigate(`/Overview?provider_id=${localProviderID}&branch_id=${localBranchID}`);

    }
  };

  // Handle cart icon navigation on button click
  // const handleCartIcon = () => {
  //   if (!token) {
  //     navigate("/Login"); // Navigate to Login if no token
  //   } else if (cartItems.length > 0 && sessionProviderID) {
  //     // Proceed to DateTime only if cartItems length > 0 and provider ID is present
  //     navigate("/DateTime"); // Proceed to DateTime if token exists
  //   } else {
  //     // navigate("/Login"); // Navigate to Login if no token or cartItems length is 0
  //     alert("Please select a provider and add items to your cart before proceeding.");
  //   }
  // };

  // Cart Items from Redux
  // const cartItems = useSelector((state: RootState) => state.cart.items);
  // const cartItemsCount = cartItems.length;

  // Navbar State Declaration
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sidebar State Declaration
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleHamButton = () => {
    setShowSideBar(!showSideBar);
  };

  // Services List function API Call
  const [servicesDropdown, setServicesDropdown] = useState<Service[]>([]);
  // const [filteredServices, setFilteredServices] = useState<HeroSectionProps[]>([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  // Google Location API
  const [locationSuggestions, setLocationSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [locationSuggestionsRes, setLocationSuggestionsRes] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const locationInputRefRes = useRef<HTMLInputElement>(null);
  // Add these to the top of the component
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // API for services list dropdown
  // useEffect(() => {
  //   // API call to fetch data
  //   const loadServicesData = async () => {
  //     try {
  //       const data = await fetchServicesListDropdown();
  //       setServicesDropdown(data.data); // Directly set the fetched data
  //       // setFilteredServices(data.data); // Initially set filteredServices to all services
  //       console.log("services list data log", data.data);

  //     } catch (error: any) {
  //       setError(error.message || "Failed to fetch services list.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadServicesData();
  // }, []);

  // API for services list dropdown
  useEffect(() => {
    // API call to fetch data
    const loadServicesData = async () => {
      try {
        const data = await fetchServicesListDropdown();
        setServicesDropdown(data.results); // Directly set the fetched data
        // setFilteredServices(data.data); // Initially set filteredServices to all services
        console.log("services list data log", data);
      } catch (error: any) {
        // setError(error.message || "Failed to fetch services list.");
        NotifyError(error.message || "Failed to fetch services list.");
      } finally {
        setLoading(false);
      }
    };

    loadServicesData();
  }, []);

  // On Click Service from suggestions
  const handleServicesSuggestionClick = (service: {
    service_id: number;
    service_name: string;
  }) => {
    setSearchTerm(service.service_name); // Set the selected service name in the input
    setFilteredServices([]); // Hide the dropdown after selection
    console.log("Selected service ID:", service.service_id); // Log the service ID
    console.log("Selected service name:", service.service_name); // Log the service name
    // Do something with the service ID here, such as storing or processing it

    // Store service ID in sessionStorage
    // sessionStorage.setItem('selectedServiceId', service.service_id.toString());
    sessionStorage.setItem("selectedServiceId", service.service_id.toString());
    sessionStorage.setItem(
      "selectedServiceName",
      service.service_name.toString()
    );
    console.log("Selected service ID stored in session:", service.service_id); // Log the service ID
    console.log("Selected service name:", service.service_name); // Log the service name
  };

  const handleLocationSuggestionClick = (description: string) => {
    if (locationInputRef.current) {
      locationInputRef.current.value = description; // Set the clicked suggestion in the input
      setLocationSuggestions([]); // Clear suggestions after selecting
    }
    console.log("Selected location : ", description);
    sessionStorage.setItem("selectedLocation", description);
  };

  // Responsive
  const handleLocationSuggestionClickRes = (description: string) => {
    if (locationInputRefRes.current) {
      locationInputRefRes.current.value = description; // Set the clicked suggestion in the input
      setLocationSuggestionsRes([]); // Clear suggestions after selecting
    }
    console.log("Selected location : ", description);
    sessionStorage.setItem("selectedLocation", description);
  };

  const navigate = useNavigate();

  // The function that handles the search button click
  const handleSearchClick = () => {
    // Do something with the selected service here, such as storing or processing it
    if (!storedServiceType) {
      NotifyError("Service Type is missing. Please select a service type.");
      setLoading(false);
      return;
    }
    navigate("/SearchResults", { replace: true });
    navigate(0); // Refresh the page
  };

  // The function that handles the search button click
  const handleSearchClickRes = () => {
    // Do something with the selected service here, such as storing or processing it
    navigate("/SearchResults", { replace: true });
    navigate(0); // Refresh the page
  };

  // On component mount, retrieve the service name and location from sessionStorage
  // Update the useEffect to clear searchTerm when mounted on SearchResults page
  useEffect(() => {
    const storedServiceName = sessionStorage.getItem("selectedServiceName");
    const currentPath = window.location.pathname;
    const previousPath = sessionStorage.getItem("previousPath");

    // Clear search term only if:
    // We're on SearchResults page AND previousPath is "/" (home) or "" (empty)
    if (currentPath === "/SearchResults" &&
      (previousPath === "/" || previousPath === "")) {
      setSearchTerm("");
      sessionStorage.removeItem("selectedServiceName");
    } else if (storedServiceName) {
      // Set the stored service name for other cases
      setSearchTerm(storedServiceName);
    }

    // Store current path for next navigation
    sessionStorage.setItem("previousPath", currentPath);
  }, [window.location.pathname]); // Add pathname as dependency to react to route changes // Empty dependency array ensures it only runs once on mount

  // Google Location API
  useEffect(() => {
    const storedLocation = sessionStorage.getItem("selectedLocation");

    if (storedLocation && locationInputRef.current) {
      locationInputRef.current.value = storedLocation; // Set the stored location in the input field
    }

    const loadGoogleMapsApi = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAJMgVfZLEI4QjXqVEQocAmgByXIKgwKwQ&libraries=places`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
          initializeAutocomplete();
        };
      } else {
        initializeAutocomplete();
      }
    };

    const initializeAutocomplete = () => {
      // Add a type guard to ensure TypeScript recognizes google object
      if (!("google" in window)) {
        console.error("Google API not loaded.");
        return;
      }

      const google = window.google;

      const autocompleteService = new google.maps.places.AutocompleteService();

      const handleLocationInputChange = () => {
        const input = locationInputRef.current?.value || "";
        if (input.length > 0) {
          autocompleteService.getPlacePredictions(
            { input },
            (
              predictions: google.maps.places.AutocompletePrediction[] | null,
              status: google.maps.places.PlacesServiceStatus
            ) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                predictions
              ) {
                setLocationSuggestions(predictions);
              } else {
                setLocationSuggestions([]);
              }
            }
          );
        } else {
          setLocationSuggestions([]);
        }
      };

      locationInputRef.current?.addEventListener(
        "input",
        handleLocationInputChange
      );
    };

    loadGoogleMapsApi();

    // Cleanup event listener on unmount
    return () => {
      locationInputRef.current?.removeEventListener(
        "input",
        initializeAutocomplete
      );
    };
  }, []);

  // Google Location API Responsive
  useEffect(() => {

    const inputElementRes = locationInputRefRes.current; // Copy the ref value

    const storedLocation = sessionStorage.getItem("selectedLocation");

    if (storedLocation && inputElementRes) {
      inputElementRes.value = storedLocation; // Set the stored location in the input field
    }

    const loadGoogleMapsApi = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAJMgVfZLEI4QjXqVEQocAmgByXIKgwKwQ&libraries=places`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
          initializeAutocomplete();
        };
      } else {
        initializeAutocomplete();
      }
    };

    const initializeAutocomplete = () => {
      // Add a type guard to ensure TypeScript recognizes google object
      if (!("google" in window)) {
        console.error("Google API not loaded.");
        return;
      }

      const google = window.google;

      const autocompleteService = new google.maps.places.AutocompleteService();

      const handleLocationInputChangeRes = () => {
        const input = inputElementRes?.value || "";
        if (input.length > 0) {
          autocompleteService.getPlacePredictions(
            { input },
            (
              predictions: google.maps.places.AutocompletePrediction[] | null,
              status: google.maps.places.PlacesServiceStatus
            ) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                predictions
              ) {
                setLocationSuggestionsRes(predictions);
              } else {
                setLocationSuggestionsRes([]);
              }
            }
          );
        } else {
          setLocationSuggestionsRes([]);
        }
      };

      inputElementRes?.addEventListener("input", handleLocationInputChangeRes);
    };

    loadGoogleMapsApi();

    // Cleanup event listener on unmount
    return () => {
      inputElementRes?.removeEventListener("input", initializeAutocomplete);
    };

  }, []);        // No need to include locationInputRefRes in the dependency array

  // Filter services when search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter services based on the search term
    if (value.trim() === "") {
      setFilteredServices([]);
    } else {
      const filtered = servicesDropdown.filter((service) =>
        service.service_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  // Select the icon based on the selected service
  const getServiceIcon = () => {
    if (selectedService === '1') return SalonIcon;
    if (selectedService === '2') return Specialisticon;
    return Specialisticon; // Default icon
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleServiceOptionClick = (value: string, _name: string) => {
    setSelectedService(value);
    setIsServiceDropdownOpen(false);

    // Update session storage
    const serviceTypeMapping = {
      "1": { id: 1, name: "Salon Services" },
      "2": { id: 2, name: "Home Services" }
    };

    const selectedType = serviceTypeMapping[value as keyof typeof serviceTypeMapping];
    sessionStorage.setItem("selectedServiceType", value);
    sessionStorage.setItem("selectedServiceTypeId", selectedType.id.toString());
    sessionStorage.setItem("selectedServiceTypeName", selectedType.name);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-10
              ${isScrolled
            ? "bg-mindfulWhite backdrop-blur-lg bg-opacity-100 shadow-md"
            : "bg-mindfulWhite"
          }
        }`}
      >
        <Helmet>
          <script>
            {`
                    (function (c, s, q, u, a, r, e) {
                      c.hj = c.hj || function () { (c.hj.q = c.hj.q || []).push(arguments) };
                      c._hjSettings = { hjid: 6369861 };
                      r = s.getElementsByTagName('head')[0];
                      e = s.createElement('script');
                      e.async = true;
                      e.src = q + c._hjSettings.hjid + u;
                      r.appendChild(e);
                    })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 6369861);
                  `}
          </script>
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-J5CB1Y1M5W"></script>
                <script>
                  {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-J5CB1Y1M5W');
                  `}
                </script> */}
        </Helmet>
        <div className="relative">
          <div className="container mx-auto px-4">
            <div className="flex  flex-row md:flex-row justify-between items-center py-3 max-sm:flex-row max-sm:flex-wrap max-md:flex-wrap">
              {/* Mindful Beauty Logo */}
              <div className="mb-4 md:mb-0 max-sm:order-1">
                <Link to="/">
                  <div>
                    <img
                      src={mindfulBeautyNew}
                      alt="mindfulBeauty logo"
                      className="w-fit header-logo max-sm:w-24 max-lg:w-40"
                        // className="w-[160px] xl:w-[220px] 2xl:w-[240px] logo-1440"

                    />
                  </div>
                </Link>
              </div>

              <div className="flex max-xs:flex-wrap justify-center items-center space-x-4 xs:space-x-2 max-xs:space-x-1  mt-4 max-sm:order-3 max-sm:mx-auto">
                {/* Service Dropdown */}
                <div className="rounded-full  bg-mindfulWhite p-3 border-[1px] border-mindfulLightGrey w-full relative  max-sm:p-2 max-sm:rounded-full max-sm:ml-0" ref={dropdownRef}>
                  <div className="relative  max-2xl:w-[200px] w-full  max-sm:w-[150px] max-xs:w-[130px]">
                    <div
                      className={`w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[20px] max-xs:h-[15px] max-xs:w-[15px] rounded-full flex items-center justify-center absolute top-2 left-3 -mt-1 -ml-1
                      ${selectedService === '1' ? 'bg-main' : selectedService === '2' ? 'bg-mindfulBlue' : 'bg-gray-200'}`}
                    >
                      <img
                        src={getServiceIcon()}
                        alt="Service Icon"
                        className="w-[16px] h-[16px] max-sm:w-[14px] max-sm:h-[14px]"
                      />
                    </div>
                    <button
                      className={`w-full bg-mindfulWhite py-2 focus-visible:outline-none pl-10 text-left flex items-center justify-between ${selectedService === '1' ? 'text-main font-semibold' :
                        selectedService === '2' ? 'text-mindfulBlue font-semibold' : 'text-gray-500'
                        } max-sm:text-sm max-sm:py-1 max-sm:pl-8 max-xs:py-2`}
                      onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                    >
                      <span className="max-sm:text-xs">
                        {selectedService === '1' ? 'Salon Services' :
                          selectedService === '2' ? 'Home Services' : 'Select Services'}
                      </span>
                      <RiArrowDropDownLine
                        className={`text-xl transition-transform duration-200 ${isServiceDropdownOpen ? 'transform rotate-180' : ''
                          }`}
                      />
                    </button>
                    {isServiceDropdownOpen && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 left-0">
                        <li
                          className={`p-3 max-sm:text-sm cursor-pointer transition-colors duration-200 
                     ${selectedService === '2' ? 'bg-gray-100' : ''}
                     hover:bg-gray-100`}
                          onClick={() => handleServiceOptionClick('2', 'Home Services')}
                        >
                          Home Services
                        </li>
                        <li
                          className={`p-3 max-sm:text-sm cursor-pointer transition-colors duration-200 
                     ${selectedService === '1' ? 'bg-gray-100' : ''}
                     hover:bg-gray-100`}
                          onClick={() => handleServiceOptionClick('1', 'Salon Services')}
                        >
                          Salon Services
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="flex items-start space-x-4 w-full justify-start">
                  <div className="w-fit mx-auto rounded-[40px] bg-mindfulWhite pl-8 pr-2 py-2 border-[1px] border-mindfulLightGrey xl:block hidden mt-10 sm:mt-0">
                    <div className="flex items-center space-x-5">
                      <div>
                        <div className="relative">
                          <img
                            src={ladyIcon}
                            alt="lady Icon"
                            className="w-[27px] h-[30px] absolute top-2 left-0"
                          />
                          <input
                            type="text"
                            placeholder="What are looking for?"
                            className="w-72 bg-mindfulWhite pl-10 py-3 focus-visible:outline-none lg:w-[15rem] xl:w-72"
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                          {/* Render the filtered services list */}
                          {filteredServices.length > 0 && (
                            <div className="absolute bg-white border border-gray-300 mt-1 w-72 max-h-48 overflow-y-auto z-10 lg:w-[15rem] xl:w-72">
                              {filteredServices.map((service) => (
                                <div
                                  key={service.service_id}
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    setSearchTerm(service.service_name); // Set the clicked service as the search term
                                    setFilteredServices([]); // Hide the dropdown after selection
                                    handleServicesSuggestionClick(service); // Pass the full service object
                                  }}
                                >
                                  {service.service_name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border-l-2 border-mindfulLightGrey">
                        <div className="relative ml-4">
                          <img
                            src={locationIcon}
                            alt="lady Icon"
                            className="w-[19px] h-[24px] absolute top-2.5 left-0"
                          />
                          {/* <input type="text" 
                                    placeholder="Location / Pincode" 
                                    className="w-72 bg-mindfulWhite pl-8 py-3 focus-visible:outline-none" /> */}
                          <input
                            type="text"
                            placeholder="Location / Pincode"
                            className="w-72 bg-mindfulWhite pl-10 py-3 focus-visible:outline-none lg:w-[15rem] xl:w-72"
                            ref={locationInputRefRes}
                          />
                          {/* Render the location suggestions list */}
                          {locationSuggestionsRes.length > 0 && (
                            <ul className="absolute bg-white border border-gray-300 mt-1 w-72 lg:w-[15rem] xl:w-72 max-h-48 overflow-y-auto">
                              {locationSuggestionsRes.map((suggestion) => (
                                <li
                                  key={suggestion.place_id}
                                  className="p-2 hover:bg-gray-200 cursor-pointer"
                                  onClick={() =>
                                    handleLocationSuggestionClickRes(
                                      suggestion.description
                                    )
                                  }
                                >
                                  {suggestion.description}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <button
                        // onClick={handlePersonalizePopup}
                        onClick={handleSearchClickRes}
                        type="button"
                        className="bg-main rounded-[33px] text-mindfulWhite px-8 py-3"
                      >
                        Search
                        {/* {personalizePopup && (
                                        <div ref={popupRef} onClick={(e) => e.stopPropagation()}>
                                            <PersonalizePopup closePopup={closePersonalizePopup} />
                                        </div>
                                    )} */}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cart Item Icon Count */}
                {/* <div className="relative bg-main rounded-full w-10 h-10 flex items-center justify-center mr-5 cursor-pointer">
              <HiOutlineShoppingCart className="text-[20px] text-mindfulWhite" />
              <div className="absolute top-0 right-[-10px] bg-mindfulYellow rounded-full w-5 h-5 flex items-center justify-center">
                <span className="text-xs font-semibold">1</span>
              </div>
            </div> */}

                {cartItemsCount > 0 && (
                  <div
                    onClick={handleCartIcon}
                    className="relative bg-main rounded-full w-10 h-10 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <HiOutlineShoppingCart className="text-[20px] text-mindfulWhite" />
                    <div className="absolute top-0 right-[-10px] bg-mindfulYellow rounded-full w-5 h-5 flex items-center justify-center">
                      <span className="text-xs font-semibold">
                        {cartItemsCount}
                      </span>
                    </div>
                  </div>
                )}


                {/* User Profile */}
                {token && phoneNumber && (<div className="relative cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className="bg-mindfulWhite border-[1px] border-mindfulBlue rounded-full w-10 h-10 flex items-center justify-center ml-3 cursor-pointer">
                    <BiSolidUser className="text-[20px] text-mindfulBlue" />
                  </div>
                  {/* More Options */}
                  <div>
                    {profileHover && (
                      <div className="absolute bottom-[-9.3rem] right-0 mt-2 w-48 bg-mindfulWhite rounded-md shadow-lg py-1 z-20">
                        <div className="px-4 py-3 text-mindfulWhite bg-mindfulBlue cursor-default">
                          {/* Hi Paul */}

                          {/* Welcome Message */}
                          <div>
                            <h5 className="text-sm text-mindfulWhite font-semibold">
                              {token && phoneNumber ? `Hello, ${phoneNumber}` : "Hello, Guest"}
                            </h5>
                          </div>
                        </div>

                        <Link to="/MyProfile">
                          <div className="px-4 py-3 text-mindfulBlack cursor-pointer hover:bg-gray-100">
                            My Profile
                          </div>
                        </Link>

                        {/* <Link to=""> */}
                        <div onClick={handleLogout} className="px-4 py-3 text-mindfulBlack cursor-pointer hover:bg-gray-100">
                          Logout
                        </div>
                        {/* </Link> */}
                      </div>
                    )}
                  </div>
                </div>)}




              </div>
              {/* Hamburger Button */}
              <div className="max-sm:order-2 max-md:ml-36">
                <label className="hamburger">
                  <input
                    type="checkbox"
                    checked={showSideBar}
                    readOnly
                    onClick={() => toggleHamButton()}
                  />
                  <svg viewBox="0 0 32 32">
                    <path
                      className="line line-top-bottom"
                      d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    ></path>
                    <path className="line" d="M7 16 27 16"></path>
                  </svg>
                </label>
              </div>
            </div>

            {/* Overlay */}
            {showSideBar && (
              <div
                className={`fixed inset-0 h-dvh bg-black bg-opacity-50 transition-opacity duration-300 z-10
                         ${showSideBar ? "opacity-100" : "opacity-0"}`}
                onClick={() => setShowSideBar(false)}
              ></div>
            )}

            {/* Side Bar */}
            <div
              className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 z-20 
                    ${showSideBar
                  ? "transform translate-x-0"
                  : "transform translate-x-full"
                }`}
            >
              <SideBar closeSidebar={() => setShowSideBar(false)} />
            </div>
          </div>
        </div>
      </header>

      <div className="mt-[8rem] xl:mt-[6rem] max-md:mt-[7rem] max-sm:mt-[12rem]">
        <div className="container mx-auto px-4">
          <div className="xl:hidden block">
            <div className="w-full rounded-[12px] bg-mindfulWhite p-4 border-[1px] border-mindfulLightGrey">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col flex-1">
                  <div className="relative border-b border-gray-300 sm:pb-3 pb-1">
                    <img
                      src={ladyIcon}
                      alt="lady Icon"
                      className="w-[19px] h-[20px] sm:w-[25px] sm:h-[25px] absolute top-2 left-3"
                    />
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="w-full bg-mindfulWhite pl-10 py-2 focus-visible:outline-none"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    {filteredServices.length > 0 && (
                      <div className="absolute bg-white border border-gray-300 mt-1 w-full max-h-48 overflow-y-auto z-10">
                        {filteredServices.map((service) => (
                          <div
                            key={service.service_id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSearchTerm(service.service_name);
                              setFilteredServices([]);
                              handleServicesSuggestionClick(service);
                            }}
                          >
                            {service.service_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative mt-1">
                    <img
                      src={locationIcon}
                      alt="location Icon"
                      className="w-[19px] h-[24px] absolute top-2 left-3"
                    />
                    <input
                      type="text"
                      placeholder="Location / Pincode"
                      className="w-full bg-mindfulWhite pl-10 py-2 focus-visible:outline-none"
                      ref={locationInputRef}
                    />
                    {locationSuggestions.length > 0 && (
                      <ul className="absolute bg-white border border-gray-300 mt-1 w-full max-h-48 overflow-y-auto">
                        {locationSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.place_id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() =>
                              handleLocationSuggestionClick(
                                suggestion.description
                              )
                            }
                          >
                            {suggestion.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleSearchClick}
                    type="button"
                    className="py-3 login-header-search-icon"
                  >
                    <SearchIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
