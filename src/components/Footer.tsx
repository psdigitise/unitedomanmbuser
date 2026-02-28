//import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import footrbg from "../assets/omonimgs/footerbg.png"
import footerbgnew3 from "../assets/omonvideos/bgfooternew3.mp4"

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-slate-300 py-16 font-sans bg-[#0a0f1a] min-h-[400px]">
      {/* --- FULL VIDEO BACKGROUND --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          // "object-cover" + "w-full h-full" makes it cover the entire area
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source src={footerbgnew3} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      </div>
      {/* Background Golden Waves - Mimicking the uploaded image style */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-[110%] h-[40%] bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.15)_0%,_transparent_70%)]" />
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent shadow-[0_0_15px_#c5a059]" />
        <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent shadow-[0_0_15px_#c5a059]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              {/* Replace with your actual Logo SVG or Image */}
              <div className="w-8 h-8 bg-[#c5a059] rounded-tr-xl rounded-bl-xl shadow-[0_0_10px_#c5a059]" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Unite<span className="text-[#c5a059]">Oman</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed mb-6 opacity-80">
              Connecting verified businesses across Oman.
            </p>
            <p className="text-xs font-medium mb-6">Made in Oman 🇴🇲</p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded border border-slate-500 flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-white font-bold mb-6 relative inline-block">
              Explore
              <div className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-[#c5a059]" />
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/categories" className="hover:text-[#c5a059] transition-colors">Categories</Link></li>
              <li><Link to="/featured" className="hover:text-[#c5a059] transition-colors">Featured Businesses</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#c5a059] transition-colors">How It Works</Link></li>
              <li><Link to="/testimonials" className="hover:text-[#c5a059] transition-colors">Testimonials</Link></li>
              <li><Link to="/pricing" className="hover:text-[#c5a059] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-6 relative inline-block">
              Company
              <div className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-[#c5a059]" />
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[#c5a059] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#c5a059] transition-colors">Contact</Link></li>
              <li><Link to="/add-listing" className="hover:text-[#c5a059] transition-colors">Add Listing</Link></li>
              <li><Link to="/login" className="hover:text-[#c5a059] transition-colors">Login</Link></li>
              <li><Link to="/privacy" className="hover:text-[#c5a059] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 relative inline-block">
              Contact
              <div className="absolute -bottom-1 left-0 w-1/2 h-[1px] bg-[#c5a059]" />
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="opacity-80">Muscat, Oman</li>
              <li>
                <span className="block text-xs text-slate-500 uppercase font-bold">Email:</span>
                <a href="mailto:info@uniteoman.com" className="text-white hover:text-[#c5a059]">info@uniteoman.com</a>
              </li>
              <li>
                <span className="block text-xs text-slate-500 uppercase font-bold">Phone:</span>
                <a href="tel:+968XXXXXX" className="text-white">+968 XXXXXX</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        {/* <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center text-[13px] opacity-60">
          <p>© {currentYear} UniteOman. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div> */}
        {/* Bottom Bar - Aligned to match the image */}
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700/40 relative text-[13px] opacity-70">

          {/* Center Copyright */}
          <p className="text-center">
            © {currentYear} UniteOman. All rights reserved.
          </p>

          {/* Right Side Links */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex gap-4 items-center">
            <Link to="/terms" className="hover:text-[#c5a059] transition-colors">
              Terms
            </Link>
            <span className="opacity-30">•</span>
            <Link to="/privacy" className="hover:text-[#c5a059] transition-colors">
              Privacy
            </Link>
            <span className="opacity-30">•</span>
            <Link to="/cookies" className="hover:text-[#c5a059] transition-colors">
              Cookies
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};