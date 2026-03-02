import React, { useState, useEffect, useRef, ReactNode } from "react";
import muscatlogo from "../../assets/omonimgs/muscatlogo.png";
import zenithlogo from "../../assets/omonimgs/zenithlogo.png";
import oasislogo from "../../assets/omonimgs/oasislogo.png";
import banklogo from "../../assets/omonimgs/banklogo.png";
import manslogo from "../../assets/omonimgs/manslogo.png";
import oqlogo from "../../assets/omonimgs/oqlogo.png";
import shelllogo from "../../assets/omonimgs/shelllogo.png";
import petrologo from "../../assets/omonimgs/petrologo.png";
import omanlogo from "../../assets/omonimgs/omanlogo.png";
import slogo from "../../assets/omonimgs/slogo.png";

import testimonialbgnew3 from "../../assets/omonvideos/testimonialbgnew3.mp4";

/* INTERFACES */

interface MetricItemProps {
  label: string;
  value: number;
  suffix?: string;
  iconType: "biz" | "visit" | "sat" | "conn";
  isVisible: boolean;
}

interface TestimonialCardProps {
  quote: string | ReactNode;
  author: string;
  role: string;
  logo: string;
  isMain?: boolean;
  animationType: "left" | "right";
}

/* SUB-COMPONENTS */

const AnimatedCounter = ({ target, isVisible, suffix = "" }: { target: number; isVisible: boolean; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 3500; // Premium slow duration

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

const MetricItem: React.FC<MetricItemProps> = ({ label, value, suffix = "", iconType, isVisible }) => (
  <div className="flex items-center gap-3 flex-1 justify-center px-4 border-r last:border-r-0 border-slate-100">
    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-xl">
      {iconType === "biz" && "📊"}
      {iconType === "visit" && "☁️"}
      {iconType === "sat" && "⭐"}
      {iconType === "conn" && "🔗"}
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-extrabold text-[#1c2b4d] leading-tight">
        <AnimatedCounter target={value} isVisible={isVisible} suffix={suffix} />
      </span>
      <span className="text-[12px] text-slate-400 font-medium">{label}</span>
    </div>
  </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  logo,
  isMain,
  animationType,
}) => {
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

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between w-full h-full transform-gpu ${isMain ? "p-7" : "p-5"} ${isVisible ? (animationType === 'left' ? 'animate-slide-left' : 'animate-slide-right') : 'opacity-0'}`}
      style={{ animationDuration: '3.5s' }}
    >
      {isMain && (
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 52,
            color: "#c5a059",
            lineHeight: 1,
            marginBottom: 4,
            opacity: 0.7,
          }}
        >
          "
        </div>
      )}

      <div className="flex-1">
        <p
          className={`text-[#1c2b4d] font-semibold leading-snug ${isMain ? "text-[20px]" : "text-[14px]"
            }`}
        >
          {quote}
          {isMain && (
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 36,
                color: "#c5a059",
                opacity: 0.7,
                marginLeft: 2,
              }}
            >
              "
            </span>
          )}
        </p>
      </div>

      <div
        className={`flex items-center justify-between ${isMain ? "mt-6 pt-4 border-t border-slate-100" : "mt-4"
          }`}
      >
        <div>
          <h4
            className={`font-bold text-[#1c2b4d] ${isMain ? "text-[15px]" : "text-[13px]"
              }`}
          >
            {author}
          </h4>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
        <img
          src={logo}
          alt="brand"
          className={` ${isMain ? "h-14" : "h-12"}`}
        />
      </div>
    </div>
  );
};

/* MAIN COMPONENT */

export const SuccessStoriesSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const companies = [
    banklogo,
    manslogo,
    oqlogo,
    muscatlogo,
    shelllogo,
    petrologo,
    omanlogo,
    slogo,
  ];

  return (
    <section className="relative py-12 font-sans text-[#1c2b4d] overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes textSlideUp {
          0% { opacity: 0; translate: 0 40px; }
          100% { opacity: 1; translate: 0 0; }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; translate: -100px 0; }
          100% { opacity: 1; translate: 0 0; }
        }
        @keyframes slideInRight {
          0% { opacity: 0; translate: 100px 0; }
          100% { opacity: 1; translate: 0 0; }
        }

        @keyframes scrollX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-text-revealer {
          opacity: 0;
          animation: textSlideUp 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-left {
          opacity: 0;
          animation: slideInLeft 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-right {
          opacity: 0;
          animation: slideInRight 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: scrollX 30s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      ` }} />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      >
        <source src={testimonialbgnew3} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-0 bg-white/20 backdrop-blur-[2px]" />

      {/* Container */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div ref={headerRef} className={`text-center mb-8 transform-gpu ${headerVisible ? 'animate-text-revealer' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b49] mb-3">
            Trusted by Business <span className="text-[#c18d4d]">Across Oman</span>
          </h2>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="h-[1px] w-12 bg-gray-300"></div>
              <p className="text-gray-500 text-lg">Empowering Companies to Connect, Grow, and Succeed</p>
              <div className="h-[1px] w-12 bg-gray-300"></div>
            </div>
            <div className="h-[2px] w-24 bg-[#c18d4d]"></div>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className={`bg-white rounded-2xl shadow-md border border-slate-100 py-5 mb-8 flex items-center w-full transition-all duration-1000 ${headerVisible ? 'opacity-100' : 'opacity-0'}`}>
          <MetricItem iconType="biz" value={10000} suffix="+" label="Active Businesses" isVisible={headerVisible} />
          <MetricItem iconType="visit" value={25000} suffix="+" label="Monthly Visitors" isVisible={headerVisible} />
          <MetricItem iconType="sat" value={98} suffix="%" label="Customer Satisfaction" isVisible={headerVisible} />
          <MetricItem iconType="conn" value={3} suffix="x" label="Faster Connections" isVisible={headerVisible} />
        </div>

        {/* Success Stories Title */}
        <div className={`text-center mb-5 transform-gpu ${headerVisible ? 'animate-text-revealer' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#1c2b4d]">Success Stories</h3>
        </div>

        {/* Testimonials Grid*/}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 w-full mb-6">
          {/* LEFT big card */}
          <div className="md:col-span-3" style={{ minHeight: 240 }}>
            <TestimonialCard
              isMain
              animationType="left"
              quote={
                <>
                  UniteOman transformed our{" "}
                  <span className="font-bold">business growth</span>{" "}<br />
                  — we found trusted partners within days.
                </>
              }
              author="Ahmed Al Harthy"
              role="Managing Director, Muscat Clinic"
              logo={muscatlogo}
            />
          </div>

          {/* RIGHT stacked */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex-1">
              <TestimonialCard
                animationType="right"
                quote={
                  <>
                    "A reliable platform to connect with{" "}
                    <span className="font-bold">serious buyers</span>."
                  </>
                }
                author="Khalid Al Habsi"
                role="CEO, Zenith Tech"
                logo={zenithlogo}
              />
            </div>
            <div className="flex-1">
              <TestimonialCard
                animationType="right"
                quote={
                  <>
                    "Best <span className="font-bold">business</span> decision
                    we made this year."
                  </>
                }
                author="Fahad Al Rashidi"
                role="Founder, Oasis Solutions"
                logo={oasislogo}
              />
            </div>
          </div>
        </div>

        {/* Dots*/}
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-[#c5a059]" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>

        {/* Trusted Companies - Infinite Carousel */}
        <div className="border-t border-slate-200/70 pt-8 text-center w-full overflow-hidden">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Trusted by Leading Companies
          </p>

          <div className="relative w-full">
            {/* Mask for fading edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/30 to-transparent z-10 pointer-events-none" />

            <div className="animate-infinite-scroll flex gap-6 px-6">
              {[...companies, ...companies].map((logo, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 h-[70px] min-w-[140px] flex items-center justify-center hover:shadow-md transition-shadow flex-shrink-0"
                >
                  <img
                    src={logo}
                    alt="company"
                    className="max-h-10 w-full object-contain px-3"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View More  */}
        <div className="mt-8 flex flex-col items-center">
          <a
            href="#"
            className="flex items-center gap-4 bg-white text-[#1a2b49] font-bold px-12 py-4 rounded-xl border border-gray-100 transition-all group relative z-10"
          >
            View More Success Stories
            <span className="text-[#c18d4d] text-xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <div
            className="w-40 h-[4px] -mt-[1px] rounded-full"
            style={{
              background: `linear-gradient(to right, transparent 0%, #c18d4d 30%, #ffd7a8 50%, #c18d4d 70%, transparent 100%)`
            }}
          />
        </div>
      </div>
    </section>
  );
};