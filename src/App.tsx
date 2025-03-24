// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop"; // When the page route changes, scroll to the top of the page

import { MainLayout } from "./layout/MainLayout";
import { LoginLayout } from "./layout/LoginLayout";
import { Index } from "./pages/Index";
import { SearchResults } from "./pages/SearchResults";
import { Overview } from "./pages/Overview";
import { Login } from "./pages/Login";
import { DateTime } from "./pages/DateTime";
import { Cart } from "./pages/Cart";
import { AiAvatar } from "./pages/AiAvatar";
import { Contact } from "./pages/Contact";
import { AboutUs } from "./pages/AboutUs";
import { ThankYou } from "./pages/ThankYou";
import { OurTechnology } from "./pages/OurTechnology";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { LoginPopup } from "./components/Index/Popups/LoginPopup";
import { RegisterPopup } from "./components/Index/Popups/RegisterPopup";
import { VerificationCodePopup } from "./components/Index/Popups/VerificationCodePopup";
import { Mindset } from "./pages/Mindset";
import { OurBrand } from "./pages/OurBrand";
import { OurCommitment } from "./pages/OurCommitment";
import { OurImpact } from "./pages/OurImpact";
import { OurTeam } from "./pages/OurTeam";
import { OurServices } from "./pages/OurServices";
import { MyProfile } from "./pages/MyProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditons from "./pages/TermsAndConditions";
import { ToastMessage } from "./components/common/Toast/ToastMessage";

import ProtectedRoute from "./components/ProtectedRoute";


// import AuthWatcher from "./components/common/AuthWatcher";

function App() {
  // const [count, setCount] = useState(0);

  // Register Popup from redux
  const showRegisterPopup = useSelector(
    (state: RootState) => state.registerPopup.showRegisterPopup
  );

  // SignIn Popup from redux
  const showLoginPopup = useSelector(
    (state: RootState) => state.loginPopup.showLoginPopup
  );

  // Verification Code Popup from redux
  const showVerificationCodePopup = useSelector(
    (state: RootState) => state.verificationCodePopup.showVerificationCodePopup
  );

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <BrowserRouter>

        {/* AuthWatcher component */}
        {/* <AuthWatcher /> */}

        {/* ScrollToTop component */}
        <ScrollToTop />

        {/* Toast Message */}
        <ToastMessage />      {/* Keep this in the root of your app */}

        <Routes>
          {/* Main Layout Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Index />} /> {/* 👈 Renders at /app/ */}
          </Route>

          {/* Login Layout Routes */}
          <Route path="/" element={<LoginLayout />}>
            {/* Protected Route */}
            {/* <Route path='/' element={<ProtectedRoute><LoginLayout /></ProtectedRoute>}> */}
            <Route path="/SearchResults" element={<SearchResults />} />{" "}
            {/* 👈 Renders at /app/ */}
            <Route path="/Overview" element={<Overview />} />{" "}
            {/* 👈 Renders at /app/ */}
            <Route
              path="/Login"
              element={
                <Login
                  onGetOTP={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  editNumber={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onLogin={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />{" "}
            {/* 👈 Renders at /app/ */}
            <Route
              path="/DateTime"
              element={
                <DateTime
                  closePopup={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />{" "}
            <Route path="/Cart" element={<Cart />} />{" "}
            <Route path="/MyProfile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />

          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route path="/AboutUS" element={<AboutUs />} />
            <Route path="/Mindset" element={<Mindset />} />
            <Route path="/OurBrand" element={<OurBrand />} />
            <Route path="/OurCommitment" element={<OurCommitment />} />
            <Route path="/OurImpact" element={<OurImpact />} />
            <Route path="/OurTeam" element={<OurTeam />} />
            <Route path="/OurServices" element={<OurServices />} />
            <Route path="/OurTechnology" element={<OurTechnology />} />
            <Route path="/AiAvatar" element={<AiAvatar />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/ThankYou" element={<ThankYou />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/TermsAndConditons" element={<TermsAndConditons />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {showLoginPopup && <LoginPopup />}

      {showRegisterPopup && <RegisterPopup />}

      {showVerificationCodePopup && <VerificationCodePopup />}
    </>
  );
}

export default App;
