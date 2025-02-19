import React, { useState } from 'react';
import { TiPower } from "react-icons/ti";
import { FiLock } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { persistor, RootState } from '../redux/store';  // Import RootState to type state access
import { clearCart, logout } from '../redux/cartSlice'; // Import logout action
import { NavLink, useNavigate } from "react-router-dom";
import { toggleLoginPopup } from '../redux/loginSlice';
import { toggleRegisterPopup } from '../redux/registerSlice';

interface SideBarProps {
    closeSidebar: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ closeSidebar }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, phoneNumber } = useSelector((state: RootState) => state.cart);

    const handleLogout = async () => {
        dispatch(clearCart()); // Clear the cart
        dispatch(logout()); // Logout and clear token
        closeSidebar();
        navigate("/");
        // sessionStorage.clear();

        // Flush pending storage writes before purging
        await persistor.flush();

        // Purge persisted state (this will remove Redux Persist data, i.e., localStorage data)
        await persistor.purge();  // This clears the persisted Redux state from localStorage
    }

    // Handle SignIn popup
    const handleLoginClick = () => {
        dispatch(toggleLoginPopup()); // Dispatch the action to toggle the popup
        closeSidebar(); // Optionally close the sidebar
    };

    // Handle Register popup
    const handleRegisterClick = () => {
        dispatch(toggleRegisterPopup()); // Dispatch the action to toggle the popup
        closeSidebar(); // Optionally close the sidebar
    };

    // State to track the visibility of the dropdown
    const [isHighThinkingDropdownOpen, setHighThinkingIsDropdownOpen] = useState(false);
    const [isTalentDropdownOpen, setIsTalentDropdownOpen] = useState(false);

    // Handlers for "High Thinking" dropdown
    const handleHighThinkingMouseEnter = () => setHighThinkingIsDropdownOpen(true);
    const handleHighThinkingMouseLeave = () => setHighThinkingIsDropdownOpen(false);

    // Handlers for "Talent" dropdown
    const handleTalentMouseEnter = () => setIsTalentDropdownOpen(true);
    const handleTalentMouseLeave = () => setIsTalentDropdownOpen(false);

    return (
        <div className="">
            <div className="relative w-80 h-screen bg-mindfulWhite px-10 py-10">

                {/* Close Button */}
                <div className="absolute top-5 right-5 transition-transform duration-300 hover:rotate-90">
                    <IoClose onClick={closeSidebar} className="text-[35px] text-mindfulGrey cursor-pointer hover:text-main " />
                </div>

                {/* Welcome Message */}
                <div>
                    <h5 className="text-sm text-mindfulBlack font-semibold">
                        {token && phoneNumber ? `Hello, User ${phoneNumber}` : "Hello, Guest"}
                    </h5>
                </div>

                {/* Login & Register */}
                {/* Conditional Login & Logout Display */}
                {!token ? (
                    <div className="flex items-center py-3 space-x-2">
                        <div className="flex items-center">
                            <FiLock className="text-sm text-main mr-2" />
                            <h5 onClick={handleLoginClick} className="text-sm text-mindfulBlack font-semibold cursor-pointer hover:text-main">Login</h5>
                        </div>

                        <div>
                            <h5 className="text-2xl font-semibold">&#183;</h5>
                        </div>

                        <div className="flex items-center">
                            <FaRegUser className="text-sm text-main mr-2" />
                            <h5 onClick={handleRegisterClick} className="text-sm text-mindfulBlack font-semibold cursor-pointer hover:text-main">Register</h5>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center py-3">
                        <TiPower className="text-2xl text-main mr-2" />
                        <h5 onClick={handleLogout} className="text-sm text-mindfulBlack font-semibold cursor-pointer hover:text-main">Logout</h5>
                    </div>
                )}


                {/* // <div className="flex items-center py-3 space-x-2">
                //     <div className="flex items-center">
                //         <FiLock className="text-sm text-main mr-2" />
                //         <h5 className="text-sm text-mindfulBlack font-semibold cursor-pointer hover:text-main">Login</h5>
                //     </div>

                //     <div>
                //         <h5 className="font-semibold">&#183;</h5>
                //     </div>

                //     <div className="flex items-center">
                //         <FaRegUser className="text-sm text-main mr-2" />
                //         <h5 className="text-sm text-mindfulBlack font-semibold cursor-pointer hover:text-main">Register</h5>
                //     </div>
                // </div> */}

                {/* Menus */}
                <div>
                    <ul>
                        <NavLink
                            to="/"
                            className="active-nav"
                            aria-current="page"
                        >
                            <li onClick={closeSidebar} className="border-y border-mindfulLightGrey text-[20px] font-semibold py-3">Home</li>
                        </NavLink>

                        {/* High Thinking Dropdown */}
                        <li
                            onMouseEnter={handleHighThinkingMouseEnter}
                            onMouseLeave={handleHighThinkingMouseLeave}
                            className="border-y border-mindfulLightGrey text-[20px] text-mindfulBlack font-semibold py-3 cursor-pointer hover:text-main">
                            <div className="flex items-center">
                                High Thinking

                                {/* Chevron icon with rotation on hover */}
                                <IoChevronDownOutline
                                    className={`ml-2 text-[18px] text-mindfulBlack transition-transform duration-300 ${isHighThinkingDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </div>

                            {/* Dropdown - Only visible when isDropdownOpen is true */}
                            {isHighThinkingDropdownOpen && (
                                <div className={`ml-3 mt-2 w-60 bg-mindfulWhite shadow-md rounded-lg transition-all duration-300 ease-out 
                                    ${isHighThinkingDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                                    }`}>
                                    <ul className="list-none p-0">
                                        <NavLink
                                            to="/Mindset"
                                            className="active-nav"
                                            aria-current="page"
                                        >
                                            <li
                                                onClick={closeSidebar}
                                                className="border-y border-mindfulLightGrey text-[18px] text-mindfulBlack font-semibold px-2 py-2 cursor-pointer hover:text-main">
                                                Mindset
                                            </li>
                                        </NavLink>

                                        <NavLink
                                            to="/OurBrand"
                                            className="active-nav"
                                            aria-current="page"
                                        >
                                            <li
                                                onClick={closeSidebar}
                                                className="border-y border-mindfulLightGrey text-[18px] text-mindfulBlack font-semibold px-2 py-2 cursor-pointer hover:text-main">
                                                Our Brand
                                            </li>
                                        </NavLink>

                                        <NavLink
                                            to="/OurCommitment"
                                            className="active-nav"
                                            aria-current="page"
                                        >
                                            <li
                                                onClick={closeSidebar}
                                                className="border-y border-mindfulLightGrey text-[18px] text-mindfulBlack font-semibold px-2 py-2 cursor-pointer hover:text-main">
                                                Our Commitment
                                            </li>
                                        </NavLink>

                                        <NavLink
                                            to="/OurImpact"
                                            className="active-nav"
                                            aria-current="page"
                                        >
                                            <li
                                                onClick={closeSidebar}
                                                className="border-y border-mindfulLightGrey text-[18px] text-mindfulBlack font-semibold px-2 py-2 cursor-pointer hover:text-main">
                                                Our Impact
                                            </li>
                                        </NavLink>

                                    </ul>
                                </div>
                            )}
                        </li>

                        {/* <div>
                            <li className="border-y border-mindfulLightGrey text-[20px] text-mindfulBlack font-semibold py-3 cursor-pointer hover:text-main">Our Team </li>
                            <li className="border-y border-mindfulLightGrey text-[20px] text-mindfulBlack font-semibold py-3 cursor-pointer hover:text-main">Our Services</li>
                        </div> */}

                        <li
                            onMouseEnter={handleTalentMouseEnter}
                            onMouseLeave={handleTalentMouseLeave}
                            className="border-y border-mindfulLightGrey text-[20px] text-mindfulBlack font-semibold py-3 cursor-pointer hover:text-main">
                            <div className="flex items-center">
                                High Talent

                                {/* Chevron icon with rotation on hover */}
                                <IoChevronDownOutline
                                    className={`ml-2 text-[18px] text-mindfulBlack transition-transform duration-300 ${isTalentDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </div>

                            {isTalentDropdownOpen && (
                                <div className={`ml-3 mt-2 w-60 bg-mindfulWhite shadow-md rounded-lg transition-all duration-300 ease-out 
                                    ${isTalentDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                                    }`}>
                                    <ul className="list-none p-0">

                                        <NavLink
                                            to="/OurTeam"
                                            className="active-nav"
                                            aria-current="page"
                                        >
                                            <li
                                                onClick={closeSidebar}
                                                className="border-y border-mindfulLightGrey text-[18px] text-mindfulBlack font-semibold px-2 py-2 cursor-pointer hover:text-main">
                                                Our Team
                                            </li>
                                        </NavLink>

                                        <NavLink
                                            to="/OurServices"
                                            className="active-nav"
                                            aria-current="page"
                                        >
                                            <li
                                                onClick={closeSidebar}
                                                className="border-y border-mindfulLightGrey text-[18px] text-mindfulBlack font-semibold px-2 py-2 cursor-pointer hover:text-main">
                                                Our Services
                                            </li>
                                        </NavLink>

                                    </ul>

                                </div>
                            )}
                        </li>

                        <NavLink
                            to="/OurTechnology"
                            className="active-nav"
                            aria-current="page"
                        >
                            <li onClick={closeSidebar} className="border-y border-mindfulLightGrey text-[20px] font-semibold py-3">High Technology</li>
                        </NavLink>

                        <NavLink
                            to="/AiAvatar"
                            className="active-nav"
                            aria-current="page"
                        >
                            <li onClick={closeSidebar} className="border-y border-mindfulLightGrey text-[20px] font-semibold py-3">AI Avatar</li>
                        </NavLink>

                        <NavLink
                            to="/AboutUs"
                            className="active-nav"
                            aria-current="page"
                        >
                            <li onClick={closeSidebar} className="border-y border-mindfulLightGrey text-[20px] font-semibold py-3">About Us</li>
                        </NavLink>

                        <NavLink
                            to="/Contact"
                            className="active-nav"
                            aria-current="page"
                        >
                            <li onClick={closeSidebar} className="border-t border-mindfulLightGrey text-[20px] font-semibold py-3">Contact</li>
                        </NavLink>

                    </ul>
                </div>
            </div>
        </div>
    )
}
