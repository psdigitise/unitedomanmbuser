import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SpecialistCard } from "./SpecialistCard";
// import rinsiyaNoora from "../../../../assets/images/rinsiyaNoora.png";
// import joyceMridula from "../../../../assets/images/joyceMridula.png";
// import sharuSavio from "../../../../assets/images/sharuSavio.png";
// import liya from "../../../../assets/images/liya.png";
// import nezeeraAnsu from "../../../../assets/images/nezeeraAnsu.png";
import { fetchServiceProviders1 } from "../../../../api/ApiConfig";
import { useEffect, useState } from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { NotFoundContent } from "../../../common/NotFoundContent";
import { ShimmerText, ShimmerTitle } from "shimmer-effects-react";
import { NotifyError } from '../../../common/Toast/ToastMessage';

interface Salon {
  // provider_id: number;
  // provider_name: string;
  // rating: number;
  // image_url: string;
  // provider_latitude: number;
  // provider_longitude: number;
  // provider_city: string;
  // provider_state: string;
  // service_name: string;
  // service_id: number;
  // price: number | null;
  // branch_id: number;
  // branch_name: string;
  // branch_latitude: number;
  // branch_longitude: number;
  // branch_city: string;
  // branch_state: string;
  // service_type_id: number;
  // distance_km: number;
  // verified: boolean;
  // review_count: string;
  // otp: string;
  // all_services: string;

  available_slots: any;
  business_summary: string;
  city: string;
  created_at: string;
  email: string;
  gender_type: string;
  image_url: string;
  name: string;
  phone: string;
  provider_id: number;
  branch_id: number;
  rating: number;
  review_count: string;
  skills: string;
  specializations: string;
  state: string;
  status: string;
  timings: string;
  updated_at: string;
  working_hours: string;
  years_of_experience: number;
}

export const SpecialistSlick = () => {
  const [salons, setSalons] = useState<Salon[]>([]); // Use the interface here
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    // Capture user location using Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          try {
            // Reverse geocode to get human-readable address
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAJMgVfZLEI4QjXqVEQocAmgByXIKgwKwQ`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const fetchedAddress = data.results[0].formatted_address;
              // setCurrentLocation(fetchedAddress);
              console.log("Current Location Address:", fetchedAddress);
            }
          } catch (error) {
            console.error("Error fetching location details:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const loadServicesData = async () => {
      // if (!currentLocation) return; // Wait for the location to be set
      if (latitude && longitude) {

        try {
          setLoading(true);
          const data = await fetchServiceProviders1(latitude, longitude, 2);
          // const data = await fetchServiceProviders1(8.521837, 76.961996, 2);
          setSalons(data.data); // Use the data


        } catch (error: any) {
          // setError(error.message || "Failed to fetch services list.");
          NotifyError(error.message || "Failed to fetch services list.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadServicesData();
  }, [latitude, longitude]); // Re-fetch when currentLocation changes

  // useEffect(() => {
  //     // API call to fetch data
  //     const loadServicesData = async () => {
  //       try {
  //         // const data = await fetchServiceProviders();
  //         const data = await fetchServiceProviders1(2);
  //         setSalons(data); // Directly set the fetched data
  //         // setFilteredServices(data.data); // Initially set filteredServices to all services
  //         console.log("services list data log", data);

  //       } catch (error: any) {
  //         setError(error.message || "Failed to fetch services list.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     loadServicesData();
  //   }, []);

  if (loading) {
    return <div>
      <ShimmerTitle mode="light" line={1} gap={8} />
      <ShimmerText mode="light" line={10} gap={6} />
    </div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    // autoplaySpeed: 5000,
    // cssEase: "linear",
    pauseOnHover: true,
    // rtl: true,
    // nextArrow: <SlickNextArrow onClick={function (): void {
    //     throw new Error("Function not implemented.");
    // }} />,
    // prevArrow: <SlickPrevArrow onClick={function (): void {
    //     throw new Error("Function not implemented.");
    // }} />,

    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      {salons.length > 0 ? (
        <div>
          <div className="xl:flex justify-end items-center mb-5 hidden">
            <button className="bg-main text-sm text-mindfulWhite rounded-[17px] px-4 py-1 flex items-center">
              View all
              <HiArrowSmRight className="text-mindfulWhite ml-1" />
            </button>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {salons.map((salon) => (
                <SpecialistCard
                  key={salon.provider_id}
                  providerID={salon.provider_id}
                  branchID={salon.branch_id}
                  cardImage={salon.image_url}
                  cardTitle={salon.name}
                  cardLocation={`${salon.city}, ${salon.state}`}
                  starRating={salon.rating}
                  cardreviews={salon.review_count}
                />
              ))}
            </Slider>
          </div>
          <div className="xl:hidden justify-center items-center mt-5 flex">
            <button className="bg-main text-sm text-mindfulWhite rounded-[17px] px-4 py-1 flex items-center">
              View all
              <HiArrowSmRight className="text-mindfulWhite ml-1" />
            </button>
          </div>
        </div>
      ) : (
        // <div>No service providers found in your current location.</div>
        <div>
          <NotFoundContent />
        </div>
      )}
    </div>
  );
};
