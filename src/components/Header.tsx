import { useState } from "react";
// import mindfulBeauty from "../assets/icons/mindfulBeautyLogo.png";
import mindfulBeautyNew from "../assets/omonimgs/logo.png";
import { SideBar } from "./SideBar";
import { Link } from "react-router-dom";
//import { HiOutlineShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
//import { clearCart, logout } from "../redux/cartSlice";
//import { BiSolidUser } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

export const Header = () => {
  // Sidebar State Declaration
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleHamButton = () => {
    setShowSideBar(!showSideBar);
  };

  // Taken from Redux
  const { token } = useSelector((state: RootState) => state.cart); // Token from Redux
  console.log(token, "Taking token for login status");

  return (
    <header className="fixed top-0 left-0 right-0 transition-all duration-300 z-[45] bg-white border-b border-gray-100 shadow-sm">
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
      </Helmet>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* 1. Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={mindfulBeautyNew}
                alt="UniteOman"
                className="w-48 max-sm:w-32"
              />
            </Link>
          </div>

          {/* 2. Navigation - Styled like the screenshot */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-mindfulBlack font-semibold hover:text-[#b38b4d] border-b-2 border-[#b38b4d] pb-1 transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-mindfulBlack font-medium hover:text-[#b38b4d] transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-mindfulBlack font-medium hover:text-[#b38b4d] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-mindfulBlack font-medium hover:text-[#b38b4d] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* 3. Actions - Login and List Your Business */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <button className="hidden lg:block text-[#6b7280] font-medium hover:text-[#1a233a]">
              Log in
            </button>
            
            {/* Hidden on mobile, block on lg screens */}
            <button className="hidden lg:block bg-[#1a233a] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#2a3654] transition-all">
              List Your Business
            </button>

            {/* Existing Hamburger Icon with forced black stroke - Only shows on Mobile */}
            <div className="lg:hidden ml-2">
  <label className="hamburger cursor-pointer">
    <input
      type="checkbox"
      checked={showSideBar}
      readOnly
      onClick={toggleHamButton}
      className="hidden"
    />
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <path
        className="line line-top-bottom"
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        fill="none"
        style={{ stroke: "black" }} 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="line"
        d="M7 16 27 16"
        fill="none"
        style={{ stroke: "black" }} 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </label>
</div>
          </div>
        </div>
        
        {/* Sidebar Overlay */}
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
                    ${
                      showSideBar
                        ? "transform translate-x-0"
                        : "transform translate-x-full"
                    }`}
        >
          <SideBar closeSidebar={() => setShowSideBar(false)} />
        </div>
      </div>
    </header>
  );
};