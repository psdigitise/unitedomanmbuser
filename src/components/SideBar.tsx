import React from "react";
import { TiPower } from "react-icons/ti";
import { FiLock } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "../redux/store";
import { clearCart, logout } from "../redux/cartSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleLoginPopup } from "../redux/loginSlice";
import { toggleRegisterPopup } from "../redux/registerSlice";

interface SideBarProps {
  closeSidebar: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, phoneNumber } = useSelector((state: RootState) => state.cart);

  const handleLogout = async () => {
    dispatch(clearCart());
    dispatch(logout());
    closeSidebar();
    navigate("/");
    await persistor.flush();
    await persistor.purge();
  };

  const handleLoginClick = () => {
    dispatch(toggleLoginPopup());
    closeSidebar();
  };

  const handleRegisterClick = () => {
    dispatch(toggleRegisterPopup());
    closeSidebar();
  };

  // Reusable style for menu items
  const menuLiStyle =
    "border-b border-gray-100 text-[18px] text-[#1a233a] font-medium py-4 cursor-pointer hover:text-[#b38b4d] transition-colors flex items-center justify-between";

  return (
    <div className="h-full bg-white shadow-2xl border-l border-gray-100">
      <div className="relative w-80 h-screen flex flex-col px-8 py-10">
        {/* Close Button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={closeSidebar}
            className="p-2 rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-[#1a233a]"
          >
            <IoClose className="text-[28px]" />
          </button>
        </div>

        {/* Welcome & Auth Section */}
        <div className="mb-8 pt-4">
          <h5 className="text-[22px] text-[#1a233a] font-bold mb-2">
            {token && phoneNumber ? `Welcome back!` : "Welcome, Guest"}
          </h5>
          <p className="text-sm text-gray-500 mb-6">
            {token && phoneNumber
              ? `User: ${phoneNumber}`
              : "Log in to manage your listings"}
          </p>

          {!token ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLoginClick}
                className="w-full py-3 border border-[#1a233a] text-[#1a233a] rounded-lg font-semibold flex items-center justify-center hover:bg-gray-50 transition-all"
              >
                <FiLock className="mr-2" /> Login
              </button>
              <button
                onClick={handleRegisterClick}
                className="w-full py-3 bg-[#1a233a] text-white rounded-lg font-semibold flex items-center justify-center hover:bg-[#2a3654] transition-all shadow-md"
              >
                <FaRegUser className="mr-2" /> Register
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center text-red-500 font-semibold hover:text-red-600 transition-colors"
            >
              <TiPower className="text-xl mr-2" /> Logout
            </button>
          )}
        </div>

        {/* Navigation Menus - Header Links Only */}
        <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
          <ul className="flex flex-col">
            <NavLink to="/" onClick={closeSidebar}>
              <li className={menuLiStyle}>Home</li>
            </NavLink>

            {/* <NavLink to="/categories" onClick={closeSidebar}>
              <li className={menuLiStyle}>Categories</li>
            </NavLink>

            <NavLink to="/pricing" onClick={closeSidebar}>
              <li className={menuLiStyle}>Pricing</li>
            </NavLink>

            <NavLink to="/contact" onClick={closeSidebar}>
              <li className={menuLiStyle}>
                Contact
              </li>
            </NavLink> */}
            <NavLink to="/" onClick={closeSidebar}>
              <li className={menuLiStyle}>Categories</li>
            </NavLink>

            <NavLink to="/" onClick={closeSidebar}>
              <li className={menuLiStyle}>Pricing</li>
            </NavLink>

            <NavLink to="/" onClick={closeSidebar}>
              <li className={menuLiStyle}>
                Contact
              </li>
            </NavLink>
          </ul>

          {/* List Your Business Button (Mobile only logic handled by sidebar context) */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              className="w-full py-3 bg-[#1a233a] text-white rounded-lg font-semibold hover:bg-[#9a7640] transition-all shadow-md"
              onClick={() => {
                closeSidebar();
                // Add your navigate logic here, e.g., navigate('/list-business')
              }}
            >
              List Your Business
            </button>
          </div>
        </div>

        {/* Branding Footer */}
        {/* <div className="mt-auto pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
            Unite Oman Marketplace
          </p>
        </div> */}
      </div>
    </div>
  );
};