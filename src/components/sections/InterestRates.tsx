"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Timer,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  Calendar,
  TrendingUp,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface RateTier {
  tenure: string;
  rate: string;
  icon: React.ElementType;
  highlight?: boolean;
}

// Rates as per the client-provided chart (updated/"പുതുക്കിയത്" column).
const rateTiers: RateTier[] = [
  { tenure: "15 days – 45 days", rate: "6.25%", icon: Timer },
  { tenure: "46 days – 90 days", rate: "6.75%", icon: CalendarDays },
  { tenure: "91 days – 179 days", rate: "7.00%", icon: CalendarRange },
  { tenure: "180 days – 364 days", rate: "7.75%", icon: CalendarClock },
  { tenure: "1 year – up to 2 years", rate: "8.00%", icon: Calendar },
  { tenure: "Above 2 years", rate: "8.10%", icon: TrendingUp, highlight: true },
];

export function InterestRates() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".rate-fade-in", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".rate-card-item", {
        opacity: 0,
        y: 36,
        scale: 0.96,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".rate-cards-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="interest-rates"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#39C443]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF1023]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="rate-fade-in text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#39C443]/10 text-[#1a8a2a] text-xs font-bold uppercase tracking-wider border border-[#39C443]/20">
            {/* <Sparkles className="w-3.5 h-3.5" /> */}
            <span>Interest Rates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#121A35] tracking-tight">
            Deposit Interest Rates
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Competitive, transparent interest rates on fixed deposits across every tenure, designed to help your savings grow with confidence.
          </p>
        </div>

        {/* Rate Cards Grid */}
        <div className="rate-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {rateTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.tenure}
                className={`rate-card-item group relative overflow-hidden rounded-3xl border p-7 md:p-8 transition-shadow duration-300 hover:shadow-soft-lg ${
                  tier.highlight
                    ? "bg-[#121A35] border-[#121A35] shadow-soft-lg"
                    : "bg-white border-slate-200/90 shadow-soft"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute top-5 right-5 text-[10px] font-extrabold uppercase tracking-wider text-[#121A35] bg-[#39C443] px-2.5 py-1 rounded-full">
                    Best Rate
                  </span>
                )}

                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                    tier.highlight
                      ? "bg-white/10 text-[#39C443]"
                      : "bg-slate-100 text-[#121A35] group-hover:bg-[#39C443] group-hover:text-white"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div
                  className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                    tier.highlight ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  Tenure
                </div>
                <div
                  className={`text-base font-bold mb-6 ${
                    tier.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {tier.tenure}
                </div>

                <div
                  className={`flex items-end gap-1.5 pt-5 border-t ${
                    tier.highlight ? "border-white/10" : "border-slate-100"
                  }`}
                >
                  <span
                    className={`text-4xl md:text-5xl font-extrabold tracking-tight ${
                      tier.highlight ? "text-[#39C443]" : "text-[#121A35]"
                    }`}
                  >
                    {tier.rate}
                  </span>
                  <span
                    className={`text-sm font-semibold mb-1.5 ${
                      tier.highlight ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    p.a.
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Senior Citizen Benefit Note */}
        <div className="rate-fade-in mt-10 md:mt-12 rounded-3xl border border-[#39C443]/25 bg-[#39C443]/5 p-7 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#39C443] text-white flex items-center justify-center shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base md:text-lg font-extrabold text-[#121A35]">
              Extra 0.50% for Senior Citizens
            </h3>
            <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
              In addition to the rates above, eligible senior citizen members are entitled to a maximum additional interest rate of <strong className="text-[#121A35]">0.50%</strong> on fixed deposits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
