import { useState, useEffect, useRef } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import SearchIcon from "../../assets/omonimgs/searchicon-removebg.png";
import verifyicon from "../../assets/omonimgs/verifyicon-removebg.png";
import callicon from "../../assets/omonimgs/callicon-removebg.png";
import listbusinessbgnew3 from "../../assets/omonvideos/listbusinessbgnew3.mp4"

const GoldLineWithDotLeft = ({ width = "w-40", hasDot = true }) => (
  <div className="flex items-center justify-center gap-2">
    {/* Left Side Line */}
    <div
      className={`${width} h-[3px] rounded-full`}
      style={{
        background: `linear-gradient(to right, transparent 0%, #c18d4d 50%, #ffd7a8 100%)`
      }}
    />

    {/* Central Dot */}
    {hasDot && (
      <div className="w-2 h-2 rounded-full bg-[#c18d4d] shadow-[0_0_8px_#ffd7a8]" />
    )}

  </div>
);

const GoldLineWithDotRight = ({ width = "w-40", hasDot = true }) => (
  <div className="flex items-center justify-center gap-2">

    {/* Central Dot */}
    {hasDot && (
      <div className="w-2 h-2 rounded-full bg-[#c18d4d] shadow-[0_0_8px_#ffd7a8]" />
    )}

    {/* Right Side Line */}
    <div
      className={`${width} h-[3px] rounded-full`}
      style={{
        background: `linear-gradient(to left, transparent 0%, #c18d4d 50%, #ffd7a8 100%)`
      }}
    />
  </div>
);

export const WhyChooseSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          sectionObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
          ctaObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      sectionObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes textSlideUp {
          0% {
            opacity: 0;
            translate: 0 40px;
          }
          100% {
            opacity: 1;
            translate: 0 0;
          }
        }

        .animate-text-revealer {
          opacity: 0;
          animation: textSlideUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideInLeft {
          0% { opacity: 0; translate: -60px 0; }
          100% { opacity: 1; translate: 0 0; }
        }
        @keyframes slideInRight {
          0% { opacity: 0; translate: 60px 0; }
          100% { opacity: 1; translate: 0 0; }
        }
        @keyframes slideInUp {
          0% { opacity: 0; translate: 0 60px; }
          100% { opacity: 1; translate: 0 0; }
        }

        .animate-slide-left { opacity: 0; animation: slideInLeft 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-right { opacity: 0; animation: slideInRight 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up-card { opacity: 0; animation: slideInUp 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .animate-slide-up-cta {
          opacity: 0;
          animation: slideInUp 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      ` }} />
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={listbusinessbgnew3} type="video/mp4" />
          {/* Your browser does not support the video tag. */}
        </video>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/*MAIN HEADER */}
        <div className="text-center mb-10">
          <div className="text-center mb-6">
            <h1 className={`text-4xl font-bold text-[#1c2b4d] mb-2 transform-gpu ${isVisible ? 'animate-text-revealer' : 'opacity-0'}`}>
              Oman's <span className="text-[#c18d4d]">Trusted</span> <br /> Business Marketplace
            </h1>
            <div className={`flex justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div
                className="w-24 h-[4px] rounded-full"
                style={{
                  background: `linear-gradient(to right, transparent 0%, #c18d4d 30%, #ffd7a8 50%, #c18d4d 70%, transparent 100%)`
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className={`text-[#64748b] text-[17px] md:text-[19px] font-medium max-w-2xl transform-gpu ${isVisible ? 'animate-text-revealer' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              Connecting <span className="font-bold text-[#0f172a]">Verified Businesses</span> with Real Customers Across the Sultanate.
            </p>
            <div className={`w-16 h-[2.5px] bg-[#c5a059] rounded-full mt-2 transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
        </div>

        {/*  STATS ROW */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 mb-12">
          <StatBox value={10000} suffix="+" label="Businesses Listed" isVisible={isVisible} />
          <GoldDot />
          <StatBox value={12} label="Cities Covered" isVisible={isVisible} />
          <GoldDot />
          <StatBox value={25} suffix="+" label="Categories" isVisible={isVisible} />
          <GoldDot />
          <StatBox value={100} suffix="%" label="Verified Listings" isVisible={isVisible} />
        </div>

        {/*WHY CHOOSE HEADER WITH DOT-LINES*/}
        <div className="flex items-center justify-center gap-4 mb-10">
          <GoldLineWithDotLeft width="w-16 md:w-32" hasDot={true} />
          <h2 className="text-2xl md:text-3xl font-bold text-[#1c2b4d] whitespace-nowrap">
            Why Choose UniteOman?
          </h2>
          <GoldLineWithDotRight width="w-16 md:w-32" hasDot={true} />
        </div>

        {/*FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <FeatureCard
            title="Smart Search"
            desc="Advanced filters and city-based discovery"
            iconType="search"
            animationType="left"
          />
          <FeatureCard
            title="Verified Profiles"
            desc="Trust signals and review credibility"
            iconType="verify"
            animationType="center"
          />
          <FeatureCard
            title="Direct Contact"
            desc="Call, chat, or message businesses instantly"
            iconType="contact"
            animationType="right"
          />
        </div>

        {/* --- CTA BUTTON --- */}
        <div ref={ctaRef} className={`flex flex-col items-center transform-gpu ${ctaVisible ? 'animate-slide-up-cta' : 'opacity-0'}`}>
          <button className="group relative bg-[#1e293b] hover:bg-[#0f172a] text-white text-[17px] font-bold py-4 px-14 rounded-full shadow-2xl transition-all flex items-center gap-4 active:scale-95 mb-10 overflow-hidden">
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700"></div>
            List Your Business
            <HiArrowNarrowRight className="text-2xl text-[#c5a059] group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-wrap justify-center gap-10">
            <CheckBadge text="Free Registration" />
            <CheckBadge text="Instant Approval" />
            <CheckBadge text="Get More Customers" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* SUB-COMPONENTS */

const AnimatedCounter = ({ target, isVisible, suffix = "" }: { target: number; isVisible: boolean; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2500; // Slightly longer for smoother feel

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatBox = ({ value, label, suffix = "", isVisible }: { value: number; label: string; suffix?: string, isVisible: boolean }) => (
  <div className="text-center">
    <div className="text-[38px] md:text-[44px] font-bold text-[#1e293b] leading-tight mb-1">
      <AnimatedCounter target={value} isVisible={isVisible} suffix={suffix} />
    </div>
    <div className="text-[#64748b] text-[15px] md:text-[16px] font-semibold">{label}</div>
  </div>
);

const GoldDot = () => <div className="hidden md:block w-2 h-2 bg-[#c5a059] rounded-full shadow-[0_0_8px_rgba(197,160,89,0.5)]"></div>;

const FeatureCard = ({ title, desc, iconType, animationType }: { title: string; desc: string; iconType: string; animationType: 'left' | 'center' | 'right' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getIcon = () => {
    let iconSrc;
    switch (iconType) {
      case 'search': iconSrc = SearchIcon; break;
      case 'verify': iconSrc = verifyicon; break;
      case 'contact': iconSrc = callicon; break;
      default: iconSrc = SearchIcon;
    }

    return (
      <div className="relative flex items-center justify-center w-25 h-24">
        {/* Background Glow  */}
        <div className="absolute inset-0 bg-[#c5a059]/20 blur-3xl rounded-full"></div>
        <img
          src={iconSrc}
          alt={title}
          className="relative z-10 w-25 h-24 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    );
  };

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    switch (animationType) {
      case 'left': return 'animate-slide-left';
      case 'right': return 'animate-slide-right';
      case 'center': return 'animate-slide-up-card';
      default: return '';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group bg-white p-1 rounded-[32px] text-center shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col items-center hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 h-full transform-gpu ${getAnimationClass()}`}
    >
      <div className="mb-3">{getIcon()}</div>
      <h4 className="text-[20px] font-extrabold text-[#1e293b] mb-1 leading-tight">{title}</h4>
      {/* Top small divider */}
      <div className="w-10 h-[2.5px] bg-[#c5a059] mb-4"></div>

      <p className="text-[#64748b] font-medium leading-relaxed text-[15px] md:text-[16px] flex-grow">
        {desc}
      </p>

      {/*ADDED BOTTOM GRADIENT LINE */}
      <div className="flex justify-center w-full mt-6">
        <div
          className="w-24 h-[4px] rounded-full"
          style={{
            background: `linear-gradient(to right, transparent 0%, #c18d4d 30%, #ffd7a8 50%, #c18d4d 70%, transparent 100%)`
          }}
        />
      </div>
    </div>
  );
};

const CheckBadge = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#fdfaf1]">
      <svg className="w-4 h-4 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-[#475569] font-bold text-[14px] uppercase tracking-wide">{text}</span>
  </div>
);