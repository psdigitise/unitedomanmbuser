import React, { ReactNode } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import testimonialbg from "../../assets/omonimgs/testimonialbg.png"

interface MetricItemProps {
  label: string;
  value: string;
  iconType: 'biz' | 'visit' | 'sat' | 'conn';
}

interface TestimonialCardProps {
  quote: string | ReactNode;
  author: string;
  role: string;
  brandName: string;
  isMain?: boolean;
}

const MetricItem: React.FC<MetricItemProps> = ({ label, value, iconType }) => (
    <div className="flex items-center gap-3 px-8 border-r last:border-r-0 border-slate-100">
    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#c5a059] text-xl">
      {iconType === 'biz' && '📊'} {iconType === 'visit' && '👥'}
      {iconType === 'sat' && '⭐'} {iconType === 'conn' && '🔗'}
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-extrabold text-[#1c2b4d] leading-tight">{value}</span>
      <span className="text-[12px] text-slate-400 font-medium">{label}</span>
    </div>
  </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, brandName, isMain }) => (
    <div className={`bg-white rounded-[20px] p-5 shadow-sm border border-slate-50 flex flex-col justify-between relative transition-all ${isMain ? 'h-full' : 'h-[140px]'}`}>
    {/* Decorative Gold Bar for Main Card */}
    {isMain && <div className="absolute top-0 left-8 w-16 h-[3px] bg-[#c5a059]" />}

    <div className="relative">
      <span className="text-4xl text-amber-100 font-serif absolute -top-1 -left-1 opacity-50">“</span>
      <p className={`text-[#1c2b4d] relative z-10 leading-tight font-medium ${isMain ? 'text-[20px] mt-4' : 'text-[15px]'}`}>
        {quote}
      </p>
    </div>

    <div className={`flex items-center justify-between mt-3 ${isMain ? 'pt-4 border-t border-slate-50' : ''}`}>
      <div className="flex-1">
        <h4 className="font-bold text-[#1c2b4d] text-[15px] leading-tight">{author}</h4>
        <p className="text-[11px] text-slate-400">{role}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-black text-[#1c2b4d] text-[9px] uppercase tracking-tighter">{brandName}</span>
        <div className="w-6 h-6 rounded bg-slate-50 border border-slate-100" />
      </div>
    </div>
  </div>
);

export const SuccessStoriesSection = () => {
  return (
    <section className="relative py-16  font-sans text-[#1c2b4d]"
    style={{ backgroundImage: `url(${testimonialbg})` }}>
      {/* Background Decorative Waves */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[50%] h-[40%] bg-[radial-gradient(circle_at_center,_#c5a05920_0%,_transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* --- Header --- */}
        <div className="text-center mb-10">
          <div className="w-10 h-[2px] bg-[#c5a059] mx-auto mb-3" />
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Trusted by Businesses Across Oman</h2>
          <p className="text-slate-500 text-base">Empowering Companies to Connect, Grow, and Succeed</p>
        </div>

        {/* --- Metrics Bar --- */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 p-6 mb-12 flex flex-wrap justify-between items-center max-w-5xl mx-auto">
          <MetricItem iconType="biz" value="10,000+" label="Active Businesses" />
          <MetricItem iconType="visit" value="25,000+" label="Monthly Visitors" />
          <MetricItem iconType="sat" value="98%" label="Customer Satisfaction" />
          <MetricItem iconType="conn" value="3x" label="Faster Connections" />
        </div>

        {/* --- Success Stories Grid --- */}
        <div className="mb-12">
          <h3 className="text-center text-xl font-extrabold mb-8 relative">
            Success Stories
            <div className="w-12 h-[2px] bg-[#c5a059] absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-30" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Main Featured Card (Left) */}
            <div className="md:col-span-2">
              <TestimonialCard
                isMain
                quote={<>UniteOman transformed our <span className="text-black font-bold">business growth</span> — we <span className="underline decoration-[#c5a059] decoration-2 underline-offset-4 font-bold">found trusted partners within days.</span></>}
                author="Ahmed Al Harthy"
                role="Managing Director, Muscat Clinic"
                brandName="Muscat Clinic"
              />
            </div>

            {/* Stacked Cards (Right) */}
            <div className="flex flex-col gap-6">
              <TestimonialCard
                quote={<>“A reliable platform to connect with <span className="underline decoration-[#c5a059] decoration-2 font-bold">serious buyers.</span>”</>}
                author="Khalid Al Habsi"
                role="CEO, Zenith Tech"
                brandName="Zenith Tech"
              />
              <TestimonialCard
                quote={<>“Best <span className="underline decoration-[#c5a059] decoration-2 font-bold">business</span> decision we made this year.”</>}
                author="Fahad Al Rashidi"
                role="Founder, Oasis Solutions"
                brandName="Oasis Solutions"
              />
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />
            <div className="w-2 h-2 rounded-full bg-slate-200" />
            <div className="w-2 h-2 rounded-full bg-slate-200" />
          </div>
        </div>

        {/* --- Logo Cloud --- */}
        <div className="pt-10 border-t border-slate-100 text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Trusted by Leading Companies</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 opacity-50 grayscale contrast-125">
            {['Bank Nizwa', 'Omantel', 'OQ', 'Muscat Clinic', 'Shell Oman', 'PetroGas', 'Oman Air', 'Salalah Motors'].map((brand) => (
              <span key={brand} className="text-[#1c2b4d] font-black text-xs tracking-tight">{brand}</span>
            ))}
          </div>
        </div>

        {/* View More Link */}
        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-[#1c2b4d] font-bold text-lg border-b-2 border-transparent hover:border-[#c5a059] transition-all pb-1 group">
            View More Success Stories
            <HiArrowNarrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};