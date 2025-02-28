import { useEffect, useState } from 'react';
import { BannerContent } from '../components/common/BannerContent'
// import { FiLogOut } from "react-icons/fi";
import { MyBookings } from '../components/MyProfile/MyBookings';
import { MyProfileForm } from '../components/MyProfile/MyProfileForm';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getUserProfile } from '../api/ApiConfig';

export const MyProfile = () => {

    const [activeSection, setActiveSection] = useState("myBookings"); // default to salon

    const [userName, setUserName] = useState<string | null>(null); // Initial state is null, to fetch the name dynamically
    const userID = useSelector((state: RootState) => state.cart.userID); // Assuming userID is coming from Redux
    console.log("userName", userName);
    console.log("userID", userID);

    // Fetch the user's name when the component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Fetch user profile from API (assuming you have a method to get it)
                const profileData = await getUserProfile(userID as number); // Pass the userID to fetch data
                setUserName(profileData.name || ""); // Set the user name to the state
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        if (userID) {
            fetchUserProfile(); // Only fetch if userID exists
        }
    }, [userID]); // Re-run if userID changes

    return (
        <div className="mt-[5rem] xl:mt-[6rem] max-xl:mt-5">
            <section className="mt-[15px]">
                {/* {/ Banner Content /} */}
                <div>
                    <BannerContent bannerTitle="My Profile" />
                </div>

                <div className="container mx-auto px-4 py-20 max-lg:py-16 max-md:py-10">

                    <div>
                        <h2 className="text-4xl text-mindfulBlack font-bold pb-8 max-md:text-xl max-md:pb-4">Hi {userName}</h2>
                        {/* <p>My Profile is a page that displays information about the user.</p> */}
                    </div>

                    <div className="flex justify-between items-center border-b-[1px] border-mindfulGrey mb-3 ">
                        <div className="flex justify-start items-center space-x-10  max-lg:flex-wrap max-lg:gap-4 max-lg:space-x-0">
                            <h5
                                className={`text-lg font-semibold leading-tight cursor-pointer font-Montserrat pb-2 max-md:text-base
                                ${activeSection === "myBookings"
                                        ? "text-main border-main border-b-2"
                                        : "text-mindfulBlack"
                                    }`}
                                onClick={() => setActiveSection("myBookings")}
                            >
                                My Bookings
                            </h5>

                            <h5
                                className={`text-lg font-semibold font-Montserrat cursor-pointer leading-tight pb-2 max-md:text-base    
                                 ${activeSection === "myProfile"
                                        ? "text-main border-main border-b-2"
                                        : "text-mindfulBlack"
                                    }`}
                                onClick={() => setActiveSection("myProfile")}
                            >
                                My Profile
                            </h5>
                        </div>

                        {/* <div>
                            <h5 className="flex items-center text-lg text-mindfulBlack font-bold cursor-pointer">
                                <FiLogOut className="text-mindfulBlack font-semibold mr-1" />
                                Logout
                            </h5>
                        </div> */}
                    </div>

                    <div>
                        {activeSection === "myBookings" && <MyBookings />}
                        {activeSection === "myProfile" && <MyProfileForm />}
                    </div>
                </div>
            </section>
        </div>
    )
}
