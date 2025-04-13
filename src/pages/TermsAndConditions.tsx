import { Helmet } from "react-helmet-async";
import { BannerContent } from "../components/common/BannerContent";
import { Link } from "react-router-dom";
const TermsAndConditons: React.FC = () => {
  return (
    <>
      <div className="mt-[5rem] xl:mt-[5rem]">
        <BannerContent bannerTitle="Terms and Conditions" />
      </div>
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
      <div className="terms-and-conditions py-[40px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1">
            <div className="p-[20px] rounded-[12px] bg-[#f1f1f1] mb-6">
              <p className="mb-2">
                <strong>Welcome!</strong>
              </p>
              <p>
                By accessing or using our website,{" "}
                <Link to="/" className="hover:underline">
                  www.mindfulbeauty.ai.
                </Link>{" "}
                , or purchasing services from Mindful Beauty Private Limited,
                you agree to these terms. Please read them carefully before
                proceeding.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                1. Electronic Record
              </h2>
              <p>
                This document is an electronic record under the Information
                Technology Act, 2000 and related rules. It doesn’t require a
                physical or digital signature.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                2. Introduction
              </h2>
              <p>
                Thank you for registering with Mindful Beauty (referred to as
                “We,” “Us,” or “Our”). By using our website or app, you agree to
                these Terms and our Privacy Policy. If you disagree, please do
                not use our services. You must accept these Terms to book any
                services through our platform.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">3. Eligibility</h2>
              <p>
                You must be at least 18 years old and legally capable of
                entering into contracts under the Indian Contract Act, 1872 to
                use our services. If you’re under 18, you cannot register or use
                our platform.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                4. User Account Security
              </h2>
              <p>
                When you sign up, you’ll receive a One Time Password (OTP) to
                log in. Keep your OTP and account information confidential. You
                are responsible for all activities under your account.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                5. Our Services
              </h2>
              <p>
                By registering, you can book wellness, grooming, and beauty
                services at home. We act as an aggregator, connecting you with
                skilled technicians. Rates vary based on the technician’s
                experience, and all bookings are subject to availability. If
                there’s a delay, we’ll inform you and reschedule at your
                convenience.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                6. User Responsibilities
              </h2>
              <p className="mb-2">
                Payments: Ensure full payment for services after completion,
                including applicable taxes.
              </p>
              <ul className="list-disc ps-8 space-y-3 mb-2">
                <li>
                  <strong>Respect for Technicians:</strong> Misuse of equipment,
                  inappropriate behavior, or harassment of technicians is not
                  allowed. If you’re unsatisfied, you can ask the technician to
                  leave and contact us for assistance.
                </li>
                <li>
                  <strong>Liability:</strong> In case of any technician-caused
                  damage, our maximum liability is ₹15,000, subject to
                  investigation.
                </li>
              </ul>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                7. Cancellation and Refunds
              </h2>
              <p className="mb-2">
                If you cancel a booking after making a payment, you have two
                options:
              </p>
              <ul className="list-disc ps-8 space-y-3 mb-2">
                <li>Refund to your bank account (may take up to 14 days).</li>
                <li>
                  Refund to your Mindful Beauty Wallet for future purchases.
                </li>
              </ul>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                8. Intellectual Property
              </h2>
              <p>
                All content on our website or app belongs to Mindful Beauty
                unless otherwise mentioned. You cannot use, reproduce, or
                distribute our content without permission.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">9. Indemnity</h2>
              <p>
                You agree to indemnify and hold Mindful Beauty harmless from any
                claims or legal actions resulting from your violation of these
                Terms.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">10. Pricing</h2>
              <p>
                Prices for our services are listed on the website/app in Indian
                Rupees and are subject to change without notice.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                11. Termination
              </h2>
              <p>
                We may terminate your account if you breach these Terms.
                However, these Terms will survive termination and remain
                enforceable.
              </p>
            </div>
            <div className="mb-7">
              <h2 className="text-[18px] font-semibold mb-2">
                12. Governing Law
              </h2>
              <p>
                These Terms are governed by Indian law, and any disputes will be
                subject to the courts of Delhi.
              </p>
            </div>
            <div>
              <h2 className="text-[18px] font-semibold mb-2">13. Amendments</h2>
              <p>
                We may modify these Terms at any time without prior notice. Your
                continued use of our services means you accept the updated
                Terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditons;
