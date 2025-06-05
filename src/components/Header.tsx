import { useState, useEffect } from "react";
// import mindfulBeauty from "../assets/icons/mindfulBeautyLogo.png";
import mindfulBeautyNew from "../assets/icons/mindfulBeautyLogoNew.png";
import { SideBar } from "./SideBar";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "../redux/store";
import { clearCart, logout } from "../redux/cartSlice";
import { BiSolidUser } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

export const Header = () => {
  const navigate = useNavigate();
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

  const dispatch = useDispatch();
  const { phoneNumber } = useSelector((state: RootState) => state.cart);
  const [profileHover, setProfileHover] = useState(false);

  const handleMouseEnter = () => {
    setProfileHover(true);
  };

  const handleMouseLeave = () => {
    setProfileHover(false);
  };

  const handleLogout = async () => {
    dispatch(clearCart()); // Clear the cart
    dispatch(logout()); // Logout and clear token
    navigate("/");
    // sessionStorage.clear();

    // Flush pending storage writes before purging
    await persistor.flush();

    // Purge persisted state (this will remove Redux Persist data, i.e., localStorage data)
    await persistor.purge();  // This clears the persisted Redux state from localStorage
  }

  // Taken from Redux
  const { token } = useSelector((state: RootState) => state.cart); // Token from Redux
  console.log(token, "Taking token for login status");


  // Getting the stored provider_id from sessionStorage
  const sessionProviderID = sessionStorage.getItem('selectedProviderId');
  const sessionBranchID = sessionStorage.getItem("selectedBranchId");
  console.log("Selected Provider ID and sessionBranch ID from session storage", sessionProviderID, sessionBranchID);

  const localProviderID = localStorage.getItem('selectedLocalProviderId');
  const localBranchID = localStorage.getItem("selectedLocalBranchId");
  console.log("localProviderID and localBranchID from local storage", localProviderID, localBranchID);

  const handleCartIcon = () => {
    if (!token) {
      navigate("/Login"); // Navigate to Login if no token
    } else {
      // navigate("/DateTime"); // Proceed to DateTime if token exists

      // Navigate to Overview with provider_id query parameter
      // navigate(`/Overview?provider_id=${sessionProviderID}&branch_id=${sessionBranchID}`);
      navigate(`/Overview?provider_id=${localProviderID}&branch_id=${localBranchID}`);
    }
  };

  // Cart Items from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.length;

  // API Function
  // Services List function API Call


  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-[45]
              ${isScrolled
          ? "bg-mindfulWhite backdrop-blur-lg bg-opacity-100 shadow-md"
          : "bg-transparent"
        }
        }`}
    >
      {/* Hotjar and Google Analytics Tracking Scripts */}
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
          <div className="flex justify-between items-center py-3">
            <div>
              <Link to="/">
                <div>
                  <img
                    src={mindfulBeautyNew}
                    alt="mindfulBeauty logo"
                    className="w-fit header-logo max-sm:w-24"
                  />
                </div>
              </Link>
            </div>

            <div className="flex items-center">

              {/* Cart Item Icon Count */}
              {/* <div
                onClick={handleCartIcon}
                className="relative bg-main rounded-full w-10 h-10 flex items-center justify-center mr-3 cursor-pointer"
              >
                <HiOutlineShoppingCart className="text-[20px] text-mindfulWhite" />
                {cartItemsCount > 0 && (
                  <div className="absolute top-0 right-[-10px] bg-mindfulYellow rounded-full w-5 h-5 flex items-center justify-center">
                    <span className="text-xs font-semibold">
                      {cartItemsCount}
                    </span>
                  </div>
                )}
              </div> */}

              {cartItemsCount > 0 &&
                (<div
                  onClick={handleCartIcon}
                  className="relative bg-main rounded-full w-10 h-10 flex items-center justify-center mr-3 cursor-pointer"
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
                  className="bg-mindfulWhite border-[1px] border-mindfulBlue rounded-full w-10 h-10 flex items-center justify-center ml-3 mr-4 cursor-pointer">
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

              <div>
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
    </header>
  );
};
