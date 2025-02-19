import { IoLocationSharp } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import { HiBuildingOffice } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import { submitContactForm } from "../../api/ApiConfig";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const GetInTouch = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string; } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("formData", formData);
      const validatedData = contactSchema.parse(formData);

      // Submit to API
      const response = await submitContactForm(validatedData);
      console.log("response", response);
      if (response.status === "success") {
        // Clear form on success
        setFormData({ name: "", email: "", message: "" });
        setSubmitStatus({
          type: "success",
          // message: "Thank you for your message. We'll get back to you soon!",
          message: response.message,
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: "Failed to send message. Please try again later.",
        });
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Partial<ContactFormData> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // Handle API errors
        setSubmitStatus({
          type: "error",
          message: "Failed to send message. Please try again later.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:py-[60px] py-[40px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* get in touch content */}
          <div className="lg:w-6/12 w-full lg:px-[15px] lg:mb-[0] mb-[40px]">
            <div className="pb-8">
              <p className="text-sm font-semibold  text-gray-400 italic">
                From The Beauty
              </p>
              <h5 className="subpage-section-title">Get in Touch</h5>
              <p className="sub-heading lg:ps-20 italic">with Mindful Beauty</p>
              <div className="mb-6">
                <div className="border-b-[3px] border-mindfulYellow w-36"></div>
              </div>
              <p>
                We're here to answer any questions you may have about our
                services and products. Reach out to us and we'll respond as soon
                as we can. Your beauty journey is important to us, and we're
                dedicated to assisting you every step of the way.
              </p>
            </div>
            <div>
              <h5 className="text-[24px] font-bold text-black">
                Contact Information
              </h5>
              <div className="mb-6">
                <div className="border-b-[3px] border-mindfulYellow w-36"></div>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <div>
                  <IoLocationSharp className="text-lg text-main" />
                </div>
                <p>
                  <b>Address : </b>Chitteth Building, PC Road, Vytilla, Kochi -
                  681019
                </p>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <div>
                  <FaEnvelope className="text-lg text-main" />
                </div>
                <p>
                  <b>Contact:</b>
                  <Link
                    to="mailto:drpreeth@mindfulbeauty.ai"
                    className="hover:underline"
                  >
                    {" "}
                    DrPreeth@mindfulbeauty.ai
                  </Link>
                </p>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <div>
                  <FaHandshake className="text-lg text-main" />
                </div>
                <p>
                  <b>Partnership:</b>
                  <Link
                    to="mailto:partnership@mindfulbeauty.ai"
                    className="hover:underline"
                  >
                    {" "}
                    partnership@mindfulbeauty.ai
                  </Link>
                </p>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <div>
                  <HiBuildingOffice className="text-lg text-main" />
                </div>
                <p>
                  <b>Professional Roles:</b>{" "}
                  <Link
                    to="mailto:employment@mindfulbeauty.ai"
                    className="hover:underline"
                  >
                    employment@mindfulbeauty.ai
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* get in touch form  */}
          <div className="lg:w-6/12 w-full lg:pl-[25px]">
            <p className="font-normal text-black mb-6">
              Fill out the form below with your name, email, and message.
              Whether it’s feedback, a question, or just a hello, we look
              forward to hearing from you!
            </p>
            <form
              className="my-5 space-y-8"
              onSubmit={handleSubmit}
              method="post"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={`w-full p-4 rounded-[6px] border-[1px] ${errors.name ? "border-red-500" : "border-x-gray-100"
                    } placeholder:italic outline-none`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full p-4 rounded-[6px] border-[1px] ${errors.email ? "border-red-500" : "border-x-gray-100"
                    } placeholder:italic outline-none`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className={`w-full p-4 rounded-[6px] border-[1px] ${errors.message ? "border-red-500" : "border-x-gray-100"
                    } placeholder:italic outline-none resize-none`}
                  rows={6}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {submitStatus && (
                <div
                  className={`p-4 rounded ${submitStatus.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-black py-4 px-10 text-[18px] text-white font-normal italic outline-none ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
