import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfile, getUserProfile } from "../../api/ApiConfig";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Define the validation schema
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z.string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]+$/, "Must be only digits"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  location: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Add these helper functions after the schema
const formatDateForInput = (dateString: string) => {
  if (!dateString) return '';
  // Convert YYYY-MM-DD to DD-MM-YYYY for display
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

const formatDateForAPI = (dateString: string) => {
  if (!dateString) return '';
  // Convert DD-MM-YYYY to YYYY-MM-DD for API
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

export const MyProfileForm = () => {
  const userID = useSelector((state: RootState) => state.cart.userID);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userID) return;

      try {
        setIsLoading(true);
        const profileData = await getUserProfile(userID);
        console.log("Profile data", profileData);
        setValue('name', profileData.name || '');
        setValue('email', profileData.email || '');
        setValue('mobile', profileData.phone || '');
        setValue('dob', profileData.dob ? formatDateForInput(profileData.dob) : '');
        setValue('gender', profileData.gender || '');
        setValue('location', profileData.location || '');
        setValue('address', profileData.address || '');

      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userID, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    console.log("data  ===> ", data, userID);
    try {
      const profileDataSave = await updateUserProfile({
        user_id: userID,
        name: data.name,
        email: data.email,
        phone: data.mobile,
        dob: data.dob ? formatDateForAPI(data.dob) : '',
        gender: data.gender,
        location: data.location,
        address: data.address
      });
      setSubmitSuccess("Profile updated successfully!");
      console.log("Profile data saved", profileDataSave);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-center py-4">Loading profile...</div>
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">

              <div>
                <label htmlFor="name" className="text-lg text-mindfulBlack max-md:text-xl">
                  Name<span className="text-main">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full rounded-[5px] border-[2px] border-mindfulLightGrey px-2 py-2 focus-within:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="mobile" className="text-lg text-mindfulBlack">
                  Mobile Number<span className="text-main">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  {...register("mobile")}
                  className="w-full rounded-[5px] border-[2px] border-mindfulLightGrey px-2 py-2 focus-within:outline-none"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-lg text-mindfulBlack">
                  Email<span className="text-main">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full rounded-[5px] border-[2px] border-mindfulLightGrey px-2 py-2 focus-within:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="text-lg text-mindfulBlack">Location</label>
                <input
                  type="text"
                  id="location"
                  {...register("location")}
                  className="w-full rounded-[5px] border-[2px] border-mindfulLightGrey px-2 py-2 focus-within:outline-none"
                />
              </div>

              <div>
                <label htmlFor="dob" className="text-lg text-mindfulBlack">Date Of Birth</label>
                <input
                  type="date"
                  id="dob"
                  placeholder="DD-MM-YYYY"
                  {...register("dob")}
                  className="w-full rounded-[5px] border-[2px] border-mindfulLightGrey px-2 py-2 focus-within:outline-none"
                />
              </div>

              <div>
                <label htmlFor="gender" className="text-lg text-mindfulBlack">Gender</label>
                <select
                  id="gender"
                  {...register("gender")}
                  className="w-full rounded-[5px] border-[2px] border-mindfulLightGrey px-2 py-2 focus-within:outline-none">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="address" className="text-lg text-mindfulBlack">Address</label>
                <textarea
                  rows={3}
                  id="address"
                  placeholder="Address"
                  {...register("address")}
                  className="w-full rounded-[5px] border-[2px] border-mindfulLightGrey px-2 py-2 focus-within:outline-none"
                ></textarea>
              </div>

            </div>

            <div className="text-center pt-5">
              {submitError && (
                <p className="text-red-500 mb-2">{submitError}</p>
              )}
              {submitSuccess && (
                <p className="text-green-500 mb-2">{submitSuccess}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-main rounded-[4px] text-lg text-mindfulWhite px-8 py-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
