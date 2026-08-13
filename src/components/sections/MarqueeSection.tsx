"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Building2, Landmark, Sprout, Heart, Send } from "lucide-react";

const marqueeItemsRow1 = [
  { text: "ESTABLISHED 1961", icon: Award, color: "text-[text-slate-900]" },
  { text: "CLASS 1 SUPER GRADE BANK", icon: ShieldCheck, color: "text-[#2DBA4E]" },
  { text: "9 BRANCH NETWORK ACROSS KANNUR", icon: Building2, color: "text-slate-900" },
  { text: "HIGH RETURN SAVINGS & FIXED DEPOSITS", icon: Landmark, color: "text-[text-slate-900]" },
  { text: "INSTANT RTGS / NEFT MONEY TRANSFER", icon: Send, color: "text-[#2DBA4E]" },
  { text: "60+ YEARS OF COMMUNITY TRUST", icon: ShieldCheck, color: "text-slate-900" },
  { text: "KUDUMBASREE WOMEN GROUP CREDIT", icon: Heart, color: "text-[text-slate-900]" },
];

const marqueeItemsRow2 = [
  { text: "GOVT. AUDITED & RBI COMPLIANT", icon: ShieldCheck, color: "text-[#2DBA4E]" },
  { text: "HOUSING, VEHICLE & PERSONAL LOANS", icon: Landmark, color: "text-[text-slate-900]" },
  { text: "MANGAD SHOPPING COMPLEX", icon: Building2, color: "text-slate-900" },
  { text: "NEETHI SUBSIDIZED PHARMACY", icon: Heart, color: "text-[#2DBA4E]" },
  { text: "24/7 EMERGENCY AMBULANCE SERVICE", icon: ShieldCheck, color: "text-[text-slate-900]" },
  { text: "ORGANIC FERTILIZER & SEED DEPOT", icon: Sprout, color: "text-[#2DBA4E]" },
  { text: "SAFE DEPOSIT VAULT LOCKERS", icon: Landmark, color: "text-slate-900" },
];

export function MarqueeSection() {
  return (
    <section className="py-8 bg-slate-50/80 border-y border-slate-200/80 overflow-hidden select-none relative">
      {/* Subtle Gradient Fade Edges */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="space-y-4">
        {/* Row 1: Left Scroll */}
        <div className="flex overflow-hidden group">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 whitespace-nowrap shrink-0 group-hover:[animation-play-state:paused]"
          >
            {[...marqueeItemsRow1, ...marqueeItemsRow1].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-sm">
                  <div className="relative w-5 h-5 shrink-0">
                    <Image src="/logo.png" alt="MK Logo" fill className="object-contain" />
                  </div>
                  <span className={`text-xs md:text-sm font-extrabold tracking-wider ${item.color}`}>
                    {item.text}
                  </span>
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Row 2: Right Scroll */}
        <div className="flex overflow-hidden group">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 whitespace-nowrap shrink-0 group-hover:[animation-play-state:paused]"
          >
            {[...marqueeItemsRow2, ...marqueeItemsRow2].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-sm">
                  <div className="relative w-5 h-5 shrink-0">
                    <Image src="/logo.png" alt="MK Logo" fill className="object-contain" />
                  </div>
                  <span className={`text-xs md:text-sm font-extrabold tracking-wider ${item.color}`}>
                    {item.text}
                  </span>
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
