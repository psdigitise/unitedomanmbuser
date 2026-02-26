/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import ladyIcon from "../../assets/icons/ladyIcon.png";
import locationIcon from "../../assets/icons/locationIcon.png";
import SalonIcon from "../../assets/icons/salonIcon.svg";
import specialistIcon from "../../assets/icons/specialistIcon.svg";
// import { PersonalizePopup } from "./PersonalizePopup/PersonalizePopup";
import { fetchServicesListDropdown } from "../../api/ApiConfig";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { NotifyError } from '../common/Toast/ToastMessage';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLocation } from "../../redux/locationSlice";
import homebg from "../../assets/omonimgs/homebg.png";
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { LoginPopup } from "./Popups/LoginPopup";
// import { RegisterPopup } from "./Popups/RegisterPopup";
// import { VerificationCodePopup } from "./Popups/VerificationCodePopup";

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

// Define Zod schema for the search term and location
const serviceSearchSchema = z.string().min(1, "Service search cannot be empty");
const locationSearchSchema = z
  .string()
  .min(1, "Location search cannot be empty");

export const HeroSection = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedReduxLocation = useSelector((state: RootState) => state.location.selectedLocation);
  // Services List function API Call
  const [servicesDropdown, setServicesDropdown] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  // Google Location API
  const [locationSuggestions, setLocationSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const locationInputRef = useRef<HTMLInputElement>(null);
  // const [, setCurrentLocation] = useState<string | null>(null);
  // State to handle location input changes
  const [locationInput, setLocationInput] = useState<string>(storedReduxLocation || "");
  const [searchError, setSearchError] = useState<string | null>(null); // For service search validation
  const [locationError, setLocationError] = useState<string | null>(null); // For location search validation
  const [selected, setSelected] = useState<string>(sessionStorage.getItem("selectedServiceType") || "");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  // ✅ Effect to update the input when geolocation is fetched
  useEffect(() => {
    if (storedReduxLocation) {
      setLocationInput(storedReduxLocation);
    }
  }, [storedReduxLocation]); // Runs when `storedReduxLocation` updates

  // ✅ Fetch user location on page load
  useEffect(() => {
    if (!storedReduxLocation) {
      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                fetchAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
              },
              (error) => console.error("Geolocation error:", error)
            );
          } else {
            console.warn("User denied location access.");
          }
        });
      } else {
        console.error("Geolocation not supported by this browser.");
      }
    }
  }, [dispatch, storedReduxLocation]);

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
        if (permissionStatus.state === "granted" || permissionStatus.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              fetchAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
              console.error("Geolocation error:", error);
              NotifyError("Failed to get current location. Please enable location permissions.");
              setIsFetchingLocation(false);
            }
          );
        } else {
          NotifyError("Location permission denied. Please enable location access in your browser settings.");
          setIsFetchingLocation(false);
        }
      });
    } else {
      NotifyError("Geolocation is not supported by your browser.");
    }
  };

  // ✅ Function to fetch address from lat/lng
  const fetchAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAJMgVfZLEI4QjXqVEQocAmgByXIKgwKwQ`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const fetchedAddress = data.results[0].formatted_address;
        console.log("User Address (Auto-detected):", fetchedAddress);
        dispatch(setLocation(fetchedAddress));
        sessionStorage.setItem("selectedLocation", fetchedAddress);
        // Prefill input field
        if (locationInputRef.current) {
          locationInputRef.current.value = fetchedAddress;
        }
      } else {
        console.error("Error fetching address:", data.status);
      }
    } catch (error) {
      console.error("Geocoding API error:", error);
    }
  };

  // API for services list dropdown
  useEffect(() => {
    // API call to fetch data
    const loadServicesData = async () => {
      try {
        const data = await fetchServicesListDropdown();
        setServicesDropdown(data.results); // Directly set the fetched data
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
    sessionStorage.setItem("selectedServiceId", service.service_id.toString());
    sessionStorage.setItem("selectedServiceName", service.service_name.toString());
    console.log("Selected service ID stored in session:", service.service_id); // Log the service ID
    console.log("Selected service name:", service.service_name); // Log the service name
  };

  // const handleLocationSuggestionClick = (description: string) => {
  //   if (locationInputRef.current) {
  //     locationInputRef.current.value = description; // Set the clicked suggestion in the input
  //     setLocationInput(description); // Update input value
  //     setLocationSuggestions([]); // Clear suggestions after selecting
  //   }
  //   console.log("Selected location : ", description);

  //   // Store location in Redux and session storage
  //   dispatch(setLocation(description));

  //   // Store location in sessionStorage
  //   sessionStorage.setItem("selectedLocation", description);
  //   // console.log("Selected location stored in session:", description);
  // };

  // ✅ Handle location selection from suggestions
  const handleLocationSuggestionClick = (description: string) => {
    setLocationInput(description); // ✅ Updates state
    setLocationSuggestions([]); // ✅ Clears suggestions

    if (locationInputRef.current) {
      locationInputRef.current.value = description; // ✅ Ensure input updates correctly
    }

    dispatch(setLocation(description));
    sessionStorage.setItem("selectedLocation", description);
  };

  // Google Location API
  useEffect(() => {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Clear error when the user starts typing again
    if (searchError && value.trim() !== "") {
      setSearchError(null);
    }
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

  // const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setLocationInput(e.target.value);
  //   // Clear error when the user starts typing again
  //   if (locationError && value.trim() !== "") {
  //     setLocationError(null);
  //   }
  //   // Perform any other actions you need when location changes (like filtering suggestions)
  // };

  // Ensure input field is always synced with state
  useEffect(() => {
    if (locationInputRef.current) {
      locationInputRef.current.value = locationInput;
    }
  }, [locationInput]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationInput(value); // ✅ Updates state

    // Clear suggestions if input is empty
    if (value.trim() === "") {
      setLocationSuggestions([]);
    }
  };

  // Validation before navigating to search results
  const handleSearchValidation = () => {
    let isValid = true;
    try {
      // Validate the search term
      serviceSearchSchema.parse(searchTerm);
      setSearchError(null);
    } catch (error) {
      setSearchError((error as z.ZodError).issues[0]?.message);
      isValid = false; // Set isValid to false
    }
    try {
      // Validate the location input
      const locationValue = locationInputRef.current?.value || "";
      locationSearchSchema.parse(locationValue);
      setLocationError(null);
    } catch (error) {
      setLocationError((error as z.ZodError).issues[0]?.message);
      isValid = false; // Set isValid to false
    }
    return isValid;
  };

  // Handle search submit
  const pushToSearchResults = () => {
    const storedservicetype = sessionStorage.getItem("selectedServiceType")
    if (!storedservicetype) {
      NotifyError("Service Type is missing. Please select a service type.");
      setLoading(false);
      return;
    }
    if (handleSearchValidation()) {
      navigate("/SearchResults");
    }
  };

  const handleServiceTypeChange = (type: string) => {
    setSelected(type);

    // Create a mapping between service type strings and their IDs
    const serviceTypeMapping = {
      "1": { id: 1, name: "Salon Services" },
      "2": { id: 2, name: "Home Services" }
    };

    const selectedType = serviceTypeMapping[type as keyof typeof serviceTypeMapping];

    // Store both the ID and name in sessionStorage
    sessionStorage.setItem("selectedServiceType", type);
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
    <section className=" w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${homebg})` }}
    >
      <div className="flex flex-col justify-center h-screen">
        {/* <img src={bannerImg} alt="banner Image" className="w-full object-cover" /> */}
        <div className="pb-20 max-sm:pb-10">
          <div className="text-center mb-10 px-4">
            <h1 className="text-2xl md:text-4xl font-normal text-gray-800 tracking-tight">
              Discover Businesses Across Oman
            </h1>
            <p className="text-gray-500 mt-4 text-lg md:text-xl">
              Trusted listings. Verified partners. Real opportunities.
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="w-full max-w-4xl mx-auto mt-8 px-4">
            <div className="flex flex-col md:flex-row items-center bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-lg gap-2">

              {/* Service Search Input */}
              <div className="relative flex-1 w-full">
                <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
                  <span className="text-gray-400 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search services"
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Services Dropdown */}
                {filteredServices.length > 0 && (
                  <div className="absolute w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-xl z-50 overflow-hidden">
                    {filteredServices.map((service) => (
                      <div
                        key={service.service_id}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                        onClick={() => handleServicesSuggestionClick(service)}
                      >
                        {service.service_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Location Input */}
              <div className="relative flex-1 w-full">
                <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-200">
                  <span className="text-gray-400 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Muscat" // Updated placeholder to match image style
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                    ref={locationInputRef}
                    defaultValue={locationInput}
                    onChange={handleLocationChange}
                  />
                </div>

                {/* Location Dropdown */}
                {locationSuggestions.length > 0 && (
                  <ul className="absolute w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-xl z-50 overflow-hidden">
                    {locationSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                        onClick={() => handleLocationSuggestionClick(suggestion.description)}
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={pushToSearchResults}
                className="w-full md:w-auto bg-[#4e73df] hover:bg-[#3e5fbc] text-white px-10 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
              >
                Search
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
        {/* 
                {showLoginPopup && <LoginPopup />}
                {showRegisterPopup && <RegisterPopup />}
                {showVerificationCodePopup && <VerificationCodePopup />} */}
      </div>
    </section >
  );
};