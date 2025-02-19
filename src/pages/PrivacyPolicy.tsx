import { Link } from "react-router-dom";
import { BannerContent } from "../components/common/BannerContent";
const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <div className="mt-[5rem] xl:mt-[5rem]">
        <BannerContent bannerTitle="Privacy Policy" />
      </div>
      <div className="privacy-policy py-[40px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1">
            <p className="mb-3 text-[14px] font-bold italic">
              Last updated on October 1st, 2024
            </p>
            <div className="p-[20px] rounded-[12px] bg-[#f1f1f1] mb-6">
              <p>
                At Mindful Beauty Private Limited, your privacy is a priority.
                This Privacy Policy explains how we collect, use, and protect
                your personal information when you use our website,{" "}
                <Link to="/" className="hover:underline">
                  www.mindfulbeauty.ai.
                </Link>{" "}
                By using our services, you agree to the terms outlined below.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                1. Personal Information We Collect
              </h2>
              <p className="mb-2">
                We collect the following types of personal information when you
                register or use our services:
              </p>
              <ul className="list-disc ps-8 space-y-3">
                <li>
                  <strong>Profile Information:</strong> Name, age, gender,
                  contact details, preferences, and, in some cases, publicly
                  available information from social media (if you link your
                  account).
                </li>
                <li>
                  <strong>Payment Information:</strong> Billing details and
                  transaction history, stored securely and encrypted.
                </li>
                <li>
                  <strong>Service Usage:</strong> Information about how you
                  navigate and use our services.
                </li>
                <li>
                  <strong>Log Information:</strong> Data such as your IP
                  address, browser type, and time of access.
                </li>
                <li>
                  <strong>Correspondence:</strong> Emails, messages, and other
                  communications sent through our platform.
                </li>
              </ul>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                2. How We Use Your Information
              </h2>
              <p className="mb-2">We use your personal information to:</p>
              <ul className="list-disc ps-8 space-y-3 mb-2">
                <li>Manage your account and deliver services.</li>
                <li>Suggest products and services you may like.</li>
                <li>Ensure compliance with legal requirements.</li>
                <li>Personalize your experience and improve our services.</li>
              </ul>
              <p>
                We will never sell your personal information. Any information
                shared with third parties will be done with your consent or as
                required by law.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                3. Cookies and Tracking
              </h2>
              <p>
                We use cookies to enhance your experience on our website.
                Cookies help us track user preferences and trends. You can
                disable cookies through your browser settings if you prefer.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                4. Third-Party Services
              </h2>
              <p>
                Our platform may include links to third-party websites or
                services. We are not responsible for the privacy practices of
                these services, so we recommend reviewing their privacy policies
                before sharing any personal information.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">5. Security</h2>
              <p>
                We take the security of your data seriously. We use encryption
                and other safeguards to protect your information from
                unauthorized access. However, we cannot guarantee complete
                security, particularly when third-party services are involved.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                6. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as you use our
                services or as required by law. If you stop using our services,
                we may continue to store your data to meet legal obligations.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">7. Your Rights</h2>
              <p>
                You can update your profile information at any time through your
                account. If you wish to delete your account or data, email us at{" "}
                <Link
                  to="mailto:drpreeth@mindfulbeauty.ai"
                  className="hover:underline"
                >
                  DrPreeth@mindfulbeauty.ai.
                </Link>{" "}
                Please note that it may take up to 10 working days to process
                your request.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                8. Changes to the Privacy Policy
              </h2>
              <p>
                We may update this policy from time to time. Any changes will be
                posted on our website, so please review it periodically for the
                latest information.
              </p>
            </div>
            <div>
              <h2 className="text-[18px] font-semibold mb-2">9. Contact Us</h2>
              <p className="mb-2">
                We may update this policy from time to time. Any changes will be
                posted on our website, so please review it periodically for the
                latest information.
              </p>
              <ul className="list-disc ps-8 space-y-2">
                <li>
                  <strong>Name:</strong> Anjali Purushothamman
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <Link
                    to="mailto:drpreeth@mindfulbeauty.ai"
                    className="hover:underline"
                  >
                    DrPreeth@mindfulbeauty.ai
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
