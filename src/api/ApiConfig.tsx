
import { apiUrl, apiAxios } from './apiUrl';



// Index page -> fetch Services List Dropdown API
export const fetchServicesListDropdown = async () => {
    try {
        const response = await apiAxios.get('/api/services/');
        console.log("Services List response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Services List");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error fetching Services List:", error.message || error);
        throw new Error("Unable to fetch Services List. Please try again later.");
    }
};


// Index page -> fetch Home Services Faq's API
export const fetchHomeServicesFaq = async () => {
    try {
        const response = await apiAxios.get("/api/faq-home-services/");
        console.log("Home Services Faq's response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Home Services Faq's");
        }

        return response.data;
    }
    catch (error: any) {
        console.error("Error fetching Home Services Faq's:", error.message || error);
        throw new Error("Unable to fetch Home Services Faq's. Please try again later.");
    }
};

// Index page -> fetch Salon Services Faq's API
export const fetchSalonServicesFaq = async () => {
    try {
        const response = await apiAxios.get("/api/faq-salon-services/");
        console.log("Salon Services Faq's response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Salon Services Faq's");
        }

        return response.data;
    }
    catch (error: any) {
        console.error("Error fetching Salon Services Faq's:", error.message || error);
        throw new Error("Unable to fetch Salon Services Faq's. Please try again later.");
    }
};



// Index page -> Footer Cities API
export const fetchCities = async () => {
    try {
        const response = await apiAxios.get('/api/cities/');
        console.log("Cities response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch cities");
        }

        return response.data.cities; // The API returns an object with a cities array

    } catch (error: any) {
        console.error("Error fetching cities:", error.message || error);
        throw new Error("Unable to fetch cities. Please try again later.");
    }
};



// Index Page -> Subscribe Newsletter API
export const subscribeNewsLetter = async (email: string) => {
    try {
        const response = await apiAxios.post("/api/subscribe/", {
            email: email,
        });
        console.log("Subscribe API response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 201) {
            throw new Error("Failed to submit email");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error submitting email ID:", error.message || error);
        throw new Error("Unable to submit email ID. Please try again later.");
    }
};


// Search Results Page -> Request a callback API
export const requestaCallback = async (userName: string, phoneNumber: string, userID: string) => {
    try {
        const response = await apiAxios.post("/api/callback-request/", {
            name: userName,
            phone: phoneNumber,
            user_id: userID,
        });
        console.log("Request a Callback API response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        // if (!response.data || response.status !== 201) {
        //     throw new Error("Failed to submit request a callback data");
        // }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error submitting the request a callback data:", error.message || error);
        throw new Error("Unable to submit the request a callback data. Please try again later.");
    }
};

// Search Results page -> fetch Services Providers API
export const fetchServiceProviders = async (
    service_id: number,
    address: string,
    radius: string,
    catID: string,
    ServiceTypeID: string
) => {
    console.log("Fetching service provider with : ", { service_id, address, radius, catID, ServiceTypeID });
    try {
        const response = await apiAxios.get("/api/serviceprovidertypes/", {
            params: {
                service_id: service_id,
                address: address,
                radius: radius,
                category_id: catID,
                service_type_id: ServiceTypeID
            }, // Use 'params' for query parameters in GET request
        });

        console.log("Service provider response", response.data);
        // Assuming the API returns an object with a `status` field and a `data` field
        // if (!response.data || response.status !== 200) {
        //     throw new Error("Failed to fetch service provider");
        // }
        return response.data;
    } catch (error: any) {
        console.error("Error fetching service provider:", error.message || error);
        //throw new Error("Unable to fetch service provider. Please try again later.");
    }
};


// Search Results page ->  Service Provider Type API
export const fetchServiceProviderType = async () => {
    try {
        const response = await apiAxios.get("/api/service-types/", {
            // params: {
            //     service_type_id: serviceTypeID, // dynamically set service_type_id
            // },
        });
        console.log("Service provider type response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch service provider details");
        }

        // If you want to do something with the response
        return response.data;

    }
    catch (error: any) {
        console.error("Error fetching service provider type:", error.message || error);
        throw new Error("Unable to fetch service provider type. Please try again later.");
    }
}


// Overview page ->  Service Provider Details API
export const fetchServiceProviderDetailsBrachID = async (provider_id: number, service_id: number, branchID: number, category_id?: string, subcategory_id?: string) => {
    try {
        const response = await apiAxios.get("/api/bookservice/", {
            params: {
                provider_id: provider_id, // dynamically set service_id
                service_id: service_id,
                branch_id: branchID,
                category_id,             // Passing if the category ID has value
                subcategory_id           // Passing if the sub category ID has value
            },
        });
        console.log("service provider details response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch service provider details");
        }

        // If you want to do something with the response
        return response.data;

    } catch (error: any) {
        console.error("Error fetching service provider details :", error.message || error);
        throw new Error("Unable to fetch service provider details. Please try again later.");
    }
};

// Overview page ->  Service Provider Details API
export const fetchServiceProviderDetails = async (provider_id: number, service_id: number, category_id?: string, subcategory_id?: string) => {
    try {
        const response = await apiAxios.get("/api/bookservice/", {
            params: {
                provider_id: provider_id, // dynamically set service_id
                service_id: service_id,
                // branch_id: branchID,
                category_id,             // Passing if the category ID has value
                subcategory_id           // Passing if the sub category ID has value
            },
        });
        console.log("service provider details response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch service provider details");
        }

        // If you want to do something with the response
        return response.data;

    } catch (error: any) {
        console.error("Error fetching service provider details :", error.message || error);
        throw new Error("Unable to fetch service provider details. Please try again later.");
    }
};


// Overview page -> Service Provider Type filter API
export const fetchServiceProviderTypeFilterOTP = async (service_id: number) => {
    try {
        // const response = await apiAxios.post('/api/filter/', {
        const response = await apiAxios.get('/api/serviceprovidertypes/', {
            params: {
                service_id: service_id,
                address: "trivandrum",
                radius: "50"
            }, // Use 'params' for query parameters in GET request
        });
        console.log("Service provider type response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch service provider type");
        }

        return response.data;

    } catch (error: any) {
        console.error("Error fetching Service provider type:", error.message || error);
        throw new Error("Unable to fetch Service provider type. Please try again later.");
    }
}


export const fetchServiceProviderTypeFilter = async (service_id: number, address: string, radius: string, serviceTypeId: number, CategoryID:number) => {

    console.log(service_id, address, radius, serviceTypeId, "log");

    try {
        // const response = await apiAxios.post("/api/filter/",
        const response = await apiAxios.get("/api/serviceprovidertypes/",
            {
                params: {
                    service_id: service_id,
                    address: address,           // Send address as a query param
                    radius: radius,              // Send radius as a query param
                    service_type_id: serviceTypeId,  // Send service_type_id as a query param
                    category_id: CategoryID,
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("service provider type filter response:", response.data);
        return response.data.data || [];

    } catch (error) {
        console.error("Error fetching service provider type filter:", error);
    }
};

export const fetchServiceProviders1 = async (latitude: number, longitude: number, service_type_id: number) => {
    try {
        const response = await apiAxios.get("/api/recommended-providers/", {
            params: {
                //  service_id: 1,
                // address: currentLocation,
                // radius: "10",
                latitude: latitude,
                longitude: longitude,
                service_type_id,
            }
        });

        if (response.status === 200) {
            return response.data; // Return the data directly
        } else {
            throw new Error("Failed to fetch service providers");
        }
    } catch (error) {
        console.error("Error fetching service providers:", error);
        throw error;
    }
};




// Overview page ->  Service Tab --> Sub Categories API
export const fetchSubcategories = async (categoryId?: string) => {
    try {
        const response = await apiAxios.get('/provider-api/subcategories/', {
            params: categoryId ? { category_id: categoryId } : {}
        });
        console.log("Subcategories response", response.data);

        if (!response.data || !response.data.data) {
            throw new Error("Failed to fetch subcategories");
        }

        return response.data;

    } catch (error: any) {
        console.error("Error fetching subcategories:", error.message || error);
        throw new Error("Unable to fetch subcategories. Please try again later.");
    }
};




// Overview page -> Beauticians Card API
export const fetchBeauticians = async () => {
    try {
        // Making the GET request to the API
        const response = await fetch(`${apiUrl.apiUrlConfig}/api/stylists/`);
        console.log("Beauticians response", response);


        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch beauticians');
        }

        // Parse the JSON data from the response
        const beauticians = await response.json();

        // Return the beauticians data
        return beauticians;

    } catch (error) {
        console.error("Error fetching beauticians:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};


// Overview page -> Photos API
export const fetchPhotos = async () => {
    try {
        const response = await apiAxios.get("/api/photos/", {
            // params: {
            //     provider_id: provider_id, // dynamically set service_id
            // },
        });
        console.log("photos response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch photos");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error fetching photos:", error.message || error);
        throw new Error("Unable to fetch photos. Please try again later.");
    }
};


// Overview Page -> Frequently Asked Questions (FAQ)
export const fetchFAQs = async () => {
    try {
        const response = await apiAxios.get('/api/faqs/');
        console.log("FAQs response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch FAQs");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error fetching FAQs:", error.message || error);
        throw new Error("Unable to fetch FAQs. Please try again later.");
    }
};


// Overview Page -> Reviews
export const fetchReviews = async () => {

    // Getting the stored provider_id from sessionStorage
    const sessionProviderID = sessionStorage.getItem('selectedProviderId');
    console.log("Selected Provider ID from session storage", sessionProviderID);

    try {
        const response = await apiAxios.get(`/api/providers-reviews/${sessionProviderID}/`);
        console.log("Reviews response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch reviews");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error fetching reviews:", error.message || error);
        throw new Error("Unable to fetch reviews. Please try again later.");
    }
};


// Overview Page -> Review API
export const postReview = async (rating: number, comment: string, providerID: number | null, userID: number | null) => {
    try {
        const response = await apiAxios.post('/api/reviews/', {
            rating: rating,
            comment: comment,
            provider: providerID,
            user: userID,
        }
        );
        console.log("Review API response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error('Failed to submit review');
        }

        return response.data;

    } catch (error: any) {
        console.error('Error posting review:', error.message || error);
        throw new Error('Unable to submit review. Please try again later.');
    }
};


// Overview page -> Frequently Used Services API
// export const fetchFrequentlyAddedServices = async () => {
//     try {
//         const response = await apiAxios.get("/api/frequently-used-services/");
//         console.log("Frequently used services response", response.data);

//         // Assuming the API returns an object with a `status` field and a `data` field
//         if (!response.data || response.status !== 200) {
//             throw new Error("Failed to fetch Frequently used services");
//         }

//         return response.data; // Adjust based on the actual response structure

//     } catch (error: any) {
//         console.error("Error fetching Frequently used services:", error.message || error);
//         throw new Error("Unable to fetch Frequently used services. Please try again later.");
//     }
// };


// Login page -> Login API
export const fetchLogin = async (phoneNumber: number) => {
    try {
        const response = await apiAxios.post("/api/login/",
            {
                phone: phoneNumber,
            },
        );
        console.log("Login API response", response.data);
        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch Login API");
        }

        return response.data;
    }
    catch (error: any) {
        console.error("Error fetching Login API:", error.message || error);
        throw new Error(error.response.data.message || "Unable to fetch Login API. Please try again later.");
    }
}

// Login page -> OTP API
export const validateOTP = async (phoneNumber: string, otp: string) => {
    try {
        const response = await apiAxios.post("/api/login/verify-otp/",
            {
                phone: phoneNumber,
                otp: otp, // Convert the OTP array to a string
            },
        );
        console.log("OTP response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Invalid OTP response");
        }

        return response.data;
    }
    catch (error: any) {
        console.error("Error validating OTP:", error.message || error);
        throw new Error("Unable to validate OTP. Please try again later.");
    }
}

// Date & Time Page -> Time Slot API
export const fetchTimeSlot = async (provider_id: number) => {
    try {
        const response = await apiAxios.get("/api/available-slots/", {
            params: {
                provider_id: provider_id,
            }
        });
        console.log("Time slots response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch time slots");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error fetching time slots:", error.message || error);
        throw new Error("Unable to fetch time slots. Please try again later.");
    }
};

// Cart Checkout Page -> Coupon API
export const fetchCouponCode = async (coupon_code: string) => {
    try {
        const response = await apiAxios.post("/api/verify_coupon/", {
            // params: {
            coupon_code: coupon_code,
            // }
        });
        console.log("Coupon code response", response.data.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch coupon code");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error fetching coupon code:", error.message || error);
        throw new Error("Unable to fetch coupon code. Please try again later.");
    }
};


// Login Page -> Register API
export const loginRegister = async (userName: string, userEmail: string, userPhone: number) => {
    try {
        const response = await apiAxios.post("/api/user/", {
            name: userName,
            email: userEmail,
            phone: userPhone,
        });
        console.log("Login Register response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to register");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error during registration:", error.message || error);
        throw new Error("Unable to register. Please try again later.");
    }
};


// Date & Time Page -> Time Slot API
export const fetchHomePageFAQ = async (serviceTypeID: number) => {
    try {
        const response = await apiAxios.get("/api/servicefaq/", {
            params: {
                service_type: serviceTypeID,
            }
        });
        console.log("FAQ's response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch FAQ's");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error fetching FAQ's:", error.message || error);
        throw new Error("Unable to fetch FAQ's. Please try again later.");
    }
};




// Login Page -> Register API
// export const bookNow = async (
//     userID: string,
//     providerID: string,
//     branchID: string,
//     serviceIDS: string,
//     appointmentDate: any,
//     appointmentTime: string,
//     quantityCount: string,
//     virtualImage: File | null, // Ensure virtualImage is of type File or null,
// ) => {
//     try {
//         const response = await apiAxios.post("/api/book_now/", {
//             user_id: userID,
//             provider_id: providerID,
//             service_ids: serviceIDS,
//             appointment_date: appointmentDate,
//             appointment_time: appointmentTime,
//             branch_id: branchID,
//             quantity: quantityCount,
//             reference_image: virtualImage
//         });

//         console.log("Book Now API response", response.data);

//         // Assuming the API returns an object with a `status` field and a `data` field
//         if (!response.data || response.status !== 201) {
//             throw new Error("Error during booking:");
//         }

//         return response.data; // Adjust based on the actual response structure

//     } catch (error: any) {
//         console.error("Error during booking:", error.message || error);
//         throw new Error("Unable to complete booking. Please try again later.");
//     }
// };


export const bookNow = async (
    userID: string,
    providerID: string,
    branchID: string,
    serviceIDS: string,
    appointmentDate: string,
    appointmentTime: string,
    quantityCount: string,
    virtualImage: File | null, // Ensure virtualImage is of type File or null
) => {
    try {
        // Create FormData object to send files
        const formData = new FormData();
        formData.append("user_id", userID);
        formData.append("provider_id", providerID);
        formData.append("service_ids", serviceIDS);
        formData.append("appointment_date", appointmentDate);
        formData.append("appointment_time", appointmentTime);
        formData.append("branch_id", branchID);
        formData.append("quantity", quantityCount);

        // Append image file only if it exists
        if (virtualImage) {
            formData.append("reference_image", virtualImage);
        }

        const response = await apiAxios.post("/api/book_now/", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Required for file uploads
            },
        });

        console.log("Book Now API response:", response.data);

        if (!response.data || response.status !== 201) {
            throw new Error("Error during booking.");
        }

        return response.data;

    } catch (error: any) {
        console.error("Error during booking:", error.message || error);
        throw new Error("Unable to complete booking. Please try again later.");
    }
};




// Login Page -> Register API
export const verifyOTP = async (appointmentID: string, otp: number) => {
    try {
        const response = await apiAxios.post("/api/verify_otp/", {
            appointment_id: appointmentID,
            otp: otp,
        });
        console.log("Verify OTP response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Invalid OTP response");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error verifying OTP:", error.message || error);
        throw new Error("Unable to verify OTP. Please try again later.");
    }
};


// Index Page -> Featured Services
export const featuredServices = async () => {
    try {
        const response = await apiAxios.get('/api/categories/');
        console.log("Featured Services response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch featured Services");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error fetching  featured Services:", error.message || error);
        throw new Error("Unable to fetch featured Services. Please try again later.");
    }
};



// Overview page ->  Service Provider Details API
export const appointmentStatus = async (appointmentID: string) => {
    try {
        const response = await apiAxios.get("/api/appointment/status/", {
            params: {
                appointment_id: appointmentID, // dynamically set service_id
            },
        });
        console.log("Appointment status API response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch appointment status");
        }

        // If you want to do something with the response
        return response.data;

    } catch (error: any) {
        console.error("Error fetching appointment status :", error.message || error);
        throw new Error("Unable to fetch appointment status. Please try again later.");
    }
};



// Cart Page -> Checkout API
export const checkOut = async (appointmentID: string, totalAmount: number, couponCode: string, couponAmount: number) => {
    try {
        const response = await apiAxios.post("/api/checkout/", {
            appointment_id: appointmentID,
            amount: totalAmount,
            coupon_code: couponCode, // default value
            coupon_amount: couponAmount, // default value
        });
        console.log("Checkout response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 201) {
            throw new Error(response.data.message || "Checkout failed. Please try again.");
        }


        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        // Log the error for debugging
        console.error("Error during checkout:", error.message || error);

        // Throw a user-friendly error message
        throw new Error(error.response?.data?.message || "Unable to process the checkout. Please try again later.");
    }
};




// My Profile page -> My Profile Tab --> My Profile API
export const fetchUserBookings = async (userId: string | number | null) => {
    if (!userId) throw new Error("User ID is required");

    try {
        const response = await apiAxios.get("/api/user-bookings/", {
            params: {
                user_id: userId,
            }
        });
        console.log("User bookings response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch user bookings");
        }

        return response;

    } catch (error: any) {
        console.error("Error fetching user bookings:", error.message || error);
        throw new Error("Unable to fetch user bookings. Please try again later.");
    }
};


// My Profile page -> Update Profile API
export const updateUserProfile = async (profileData: {
    name: string;
    email: string;
    phone: string;
    dob?: string;
    gender?: string;
    location?: string;
    address?: string;
    user_id?: string | number | null;
}) => {
    try {
        console.log("profileData  ===> ", profileData);
        const response = await apiAxios.put("/api/my-profile/", {
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            dob: profileData.dob,
            gender: profileData.gender,
            location: profileData.location,
            address: profileData.address,
            user_id: profileData.user_id
        });

        console.log("Update profile response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to update profile");
        }

        return response.data;

    } catch (error: any) {
        console.error("Error updating profile:", error.message || error);
        throw new Error(error.response?.data?.message || "Unable to update profile. Please try again later.");
    }
};


// My Profile -> Get Profile API
export const getUserProfile = async (userId: string | number) => {
    try {
        const response = await apiAxios.get("/api/my-profile/", {
            params: { user_id: userId }
        });

        console.log("Get profile response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch profile");
        }

        return response.data;

    } catch (error: any) {
        console.error("Error fetching profile:", error.message || error);
        throw new Error(error.response?.data?.message || "Unable to fetch profile. Please try again later.");
    }
};



// Contact page -> Contact Form API
export const submitContactForm = async (data: { name: string; email: string; message: string; }) => {
    try {
        const response = await apiAxios.post("/api/contact/", data);
        console.log("Contact form submission response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to submit contact form");
        }

        return response.data;

    } catch (error: any) {
        console.error("Error submitting contact form:", error.message || error);
        throw new Error(error.response?.data?.message || "Unable to submit form. Please try again later.");
    }
};




// Add this new function to handle cancelling appointments
export const cancelAppointment = async (appointmentID: string) => {
    try {
        const response = await apiAxios.post("/provider-api/cancel-appointment/", {
            appointment_id: appointmentID,
        });
        console.log("Cancel appointment response", response.data);

        // Assuming the API returns an object with a `status` field and a `data` field
        if (!response.data || response.status !== 200) {
            throw new Error("Failed to cancel appointment");
        }

        return response.data; // Adjust based on the actual response structure

    } catch (error: any) {
        console.error("Error cancelling appointment:", error.message || error);
        throw new Error("Unable to cancel appointment. Please try again later.");
    }
};




// My Booking Page
// GET Method from the API
export const salesTransactionsInvoice = async (appointmentID: number) => {

    try {
        const response = await apiAxios.get(`/provider-api/generate-invoice-pdf/`, {
            params: { appointment_id: appointmentID }, // Ensure appointmentID is passed correctly
            responseType: 'blob', // Important for file downloads (PDF, CSV, etc.)
        });

        console.log("My Booking Invoice GET Method response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to download My Booking Invoice");
        }

        return response.data;

    }
    catch (error: any) {
        console.error("Error fetching My Booking invoice:", error.response?.data?.message || error);
        throw new Error(error.response?.data?.message || "Unable to fetch My Booking invoice. Please try again later.");
    }
}




// New API Call for category in Services Tab -- --> Overview Page
export const ServicesCategory = async (providerId: number, branchID: number) => {
    try {
        const response = await apiAxios.get(`/provider-api/provider_category/`, {
            params: {
                provider_id: providerId,
                branch_id: branchID
            } // Pass provider_id as query param
        });
        console.log("Featured Services response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch featured Services");
        }

        return response.data; // Adjust based on actual response structure

    } catch (error: any) {
        console.error("Error fetching featured Services:", error.message || error);
        throw new Error("Unable to fetch featured Services. Please try again later.");
    }
};

export const cancelBooking = async (userId: number, appointmentId: number, reason: string) => {
    try {
        const response = await apiAxios.post(
            "/api/cancel-booking/",
            {
                user_id: userId,
                appointment_id: appointmentId,
                reason: reason,
            }
        );

        console.log("Cancel Booking Response:", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to cancel booking");
        }

        return response.data; // Expected { "message": "Appointment cancelled successfully." }

    } catch (error: any) {
        if (error.response && error.response.status === 400 && error.response.data.error) {
            throw new Error(error.response.data.error); // Show the error message from the API
        }
        console.error("Error cancelling booking:", error.message || error);
        throw new Error("Unable to cancel booking. Please try again later.");
    }
};

// My Profile -> Get Appointment Details API
export const fetchAppointmentDetails = async (appointmentId: string) => {
    try {
        const response = await apiAxios.get(`/api/appointment_details/${appointmentId}/`);
        console.log("Appointment details response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch appointment details");
        }

        return response.data;

    } catch (error: any) {
        console.error("Error fetching appointment details:", error.message || error);
        throw new Error(error.response?.data?.message || "Unable to fetch appointment details. Please try again later.");
    }
};

// Service Providers Pre Bridal API
export const fetchServiceProvidersPreBridal = async (location: string) => {
    try {
        const response = await apiAxios.get(`/api/nearby-prebridal-packages/?address=${location}`);
        console.log("Service providers pre bridal response", response.data);

        if (!response.data || response.status !== 200) {
            throw new Error("Failed to fetch service providers pre bridal");
        }

        return response.data;
    } catch (error: any) {
        console.error("Error fetching service providers pre bridal:", error.message || error);
        throw new Error("Unable to fetch service providers pre bridal. Please try again later.");
    }
}