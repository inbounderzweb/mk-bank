"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Lock, Building2, Sprout } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

const bannerSlides = [
  {
    id: 1,
    title: "Class 1 Super Grade Financial Trust",
    subtitle: "State-of-the-art customer service, digital RTGS/NEFT, and 100% audited deposit security.",
    image: "/banner_1.png",
    badge: "Modern Banking",
    tagColor: "bg-[#ED1C24]",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Empowering Local Agriculture & Farmers",
    subtitle: "Subsidized crop credit, organic fertilizer depots, and farm machinery modernization loans.",
    image: "/banner_2.png",
    badge: "Agri Credit",
    tagColor: "bg-[#2DBA4E]",
    icon: Sprout,
  },
  {
    id: 3,
    title: "Modern Commercial & Community Hubs",
    subtitle: "9 branches, Mangad Shopping Complex, Neethi subsidized pharmacies, and 24/7 ambulance.",
    image: "/banner_3.png",
    badge: "13 Branches",
    tagColor: "bg-slate-900",
    icon: Building2,
  },
];

export function HeroBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const currentSlide = bannerSlides[currentIndex];
  const Icon = currentSlide.icon;

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Image Slide Container */}
      <div className="relative h-[420px] sm:h-[480px] md:h-[540px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient Overlays for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-10">
          
          {/* Top Badge & Slide Counter */}
          <div className="flex items-center justify-between">
            <motion.div
              key={`badge-${currentSlide.id}`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-xs font-bold text-slate-900"
            >
              <span className={`w-2 h-2 rounded-full ${currentSlide.tagColor} animate-ping`} />
              <Icon className="w-3.5 h-3.5 text-slate-900" />
              <span>{currentSlide.badge}</span>
            </motion.div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
              <span>0{currentIndex + 1}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">0{bannerSlides.length}</span>
            </div>
          </div>

          {/* Bottom Title & Description Overlay */}
          <div className="max-w-xl space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide.id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-2"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal drop-shadow">
                  {currentSlide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bullet Progress Indicators */}
        <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
          {bannerSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-[#ED1C24]"
                  : "w-2 bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
