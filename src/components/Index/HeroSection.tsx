/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import ladyIcon from "../../assets/icons/ladyIcon.png";
import locationIcon from "../../assets/icons/locationIcon.png";
// import { PersonalizePopup } from "./PersonalizePopup/PersonalizePopup";
import { fetchServicesListDropdown } from "../../api/ApiConfig";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
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
  // Services List function API Call
  const [servicesDropdown, setServicesDropdown] = useState<Service[]>([]);
  // const [filteredServices, setFilteredServices] = useState<HeroSectionProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  // Google Location API
  const [locationSuggestions, setLocationSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const locationInputRef = useRef<HTMLInputElement>(null);

  const [, setCurrentLocation] = useState<string | null>(null);

  const [searchError, setSearchError] = useState<string | null>(null); // For service search validation
  const [locationError, setLocationError] = useState<string | null>(null); // For location search validation

  // // Register Popup from redux
  // const showRegisterPopup = useSelector((state: RootState) => state.registerPopup.showRegisterPopup);

  // // SignIn Popup from redux
  // const showLoginPopup = useSelector((state: RootState) => state.loginPopup.showLoginPopup);

  // // Verification Code Popup from redux
  // const showVerificationCodePopup = useSelector((state: RootState) => state.verificationCodePopup.showVerificationCodePopup);

  // Helper function to get the user's location
  // const getCurrentPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
  //     return new Promise((resolve, reject) => {
  //         navigator.geolocation.getCurrentPosition(resolve, reject, options);
  //     });
  // };

  // const getCurrentPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
  //     return new Promise((resolve, reject) => {
  //         navigator.geolocation.getCurrentPosition(resolve, reject, {
  //             ...options,
  //             enableHighAccuracy: true, // Enable high accuracy
  //             timeout: 10000, // Set timeout to avoid long delays
  //             maximumAge: 0, // Avoid using cached locations
  //         });
  //     });
  // };

  // Request user's location on load
  useEffect(() => {
    if ("geolocation" in navigator) {
      //getCurrentPosition()
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User's Location:", latitude, longitude);

          // Reverse geocode to get human-readable address
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAJMgVfZLEI4QjXqVEQocAmgByXIKgwKwQ`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                const fetchedAddress = data.results[0].formatted_address;
                setCurrentLocation(fetchedAddress);
                sessionStorage.setItem("selectedLocation", fetchedAddress);

                console.log("Current Location Address:", fetchedAddress);

                // Prefill the location input with the fetched address
                if (locationInputRef.current) {
                  locationInputRef.current.value = fetchedAddress;
                }
              }
            })
            .catch((error) =>
              console.error("Error fetching location details:", error)
            );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  }, []);

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
        setError(error.message || "Failed to fetch services list.");
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

    // Store location in sessionStorage
    sessionStorage.setItem("selectedLocation", description);
    // console.log("Selected location stored in session:", description);
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

  // // Filter services when search input changes
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value;
  //     setSearchTerm(value);

  //     // Filter services based on the search term
  //     if (value.trim() === '') {
  //         setFilteredServices([]);
  //     } else {
  //         const filtered = servicesDropdown.filter((service) =>
  //             service.service_name.toLowerCase().includes(value.toLowerCase())
  //         );
  //         setFilteredServices(filtered);
  //     }

  // };

  // // Validation before navigating to search results
  // const handleSearchValidation = () => {
  //     try {
  //         // Validate the search term
  //         serviceSearchSchema.parse(searchTerm);
  //         setSearchError(null);
  //     } catch (error) {
  //         setSearchError((error as z.ZodError).issues[0]?.message);
  //         return false;
  //     }

  //     try {
  //         // Validate the location input
  //         const locationValue = locationInputRef.current?.value || "";
  //         locationSearchSchema.parse(locationValue);
  //         setLocationError(null);
  //     } catch (error) {
  //         setLocationError((error as z.ZodError).issues[0]?.message);
  //         return false;
  //     }

  //     return true; // Valid inputs
  // };

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

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Clear error when the user starts typing again
    if (locationError && value.trim() !== "") {
      setLocationError(null);
    }

    // Perform any other actions you need when location changes (like filtering suggestions)
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
  const navigate = useNavigate();
  const pushToSearchResults = () => {
    if (handleSearchValidation()) {
      navigate("/SearchResults");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="bg-heroSectionBgImg w-full h-screen bg-cover bg-center">
      <div className="flex flex-col justify-end h-screen">
        {/* <img src={bannerImg} alt="banner Image" className="w-full object-cover" /> */}
        <div className="pb-20">
          <div className="relative">
            <div className="xl:h-[100px] lg:h-[100px] md:h-[75px] sm:h-[80px] h-[80px] text-center bg-mindfulBlack mix-blend-overlay">
              {/* <p className="w-full text-[91px]">Transform with Mindful Beauty</p> */}
            </div>

            <div className="absolute top-1 left-0 right-0 text-center max-lg:top-4 max-md:top-5 max-sm:top-2">
              <h1 className="font-Montserrat font-light leading-custom-line-height w-full xl:text-[70px] lg:text-[65px] md:text-[40px] sm:text-[38px] text-[32px] text-mindfulWhite">
                Transform with Mindful Beauty
              </h1>
            </div>
          </div>
          {/* <div className="relative text-center bg-[#777b7c] h-36 z-0">
                        <p className="absolute top-0 z-10 opacity-100 w-full text-[91px] text-mindfulWhite">Transform with Mindful Beauty</p>
                    </div> */}

          {/* Search Bar */}
          <div className="w-fit mx-auto rounded-[12px] md:rounded-[40px] bg-mindfulWhite md:pl-8 px-4 md:pr-2 md:py-2 py-4 mt-[20px]">
            <div className="flex flex-col items-center space-y-0 md:flex-row md:items-center md:space-x-5 md:space-y-0">
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
                    className="w-72 bg-mindfulWhite pl-10 py-3 focus-visible:outline-none md:border-b-0 border-b-2 md:mb-[0] mb-[10px] max-lg:w-[220px] max-md:w-full"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {/* Validation error for service search */}
                  {searchError && <p className="text-red-500">{searchError}</p>}

                  {/* Render the filtered services list */}
                  {filteredServices.length > 0 && (
                    <div className="absolute bg-white border border-gray-300 mt-1 w-72 max-h-48 overflow-y-auto z-10">
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

              <div className="border-mindfulLightGrey md:border-l-2 md:border-t-0 pt-0 md:pt-0 md:pb-0 pb-[25px]">
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
                    className="w-72 bg-mindfulWhite pl-10 py-3 focus-visible:outline-none md:border-b-0 border-b-2 max-lg:w-[220px] max-md:w-full"
                    ref={locationInputRef}
                    onChange={handleLocationChange} // Add this line
                  />

                  {/* Validation error for location */}
                  {locationError && (
                    <p className="text-red-500">{locationError}</p>
                  )}

                  {/* Render the location suggestions list */}
                  {locationSuggestions.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 mt-1 w-72 max-h-48 overflow-y-auto z-10">
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

              <button
                // onClick={handlePersonalizePopup}
                onClick={pushToSearchResults}
                type="submit"
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
        {/* 
                {showLoginPopup && <LoginPopup />}

                {showRegisterPopup && <RegisterPopup />}

                {showVerificationCodePopup && <VerificationCodePopup />} */}
      </div>
    </section>
  );
};
