"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatsCounter } from "@/components/ui/StatsCounter";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  { id: 1, image: "/banner_5.jpg", mobileImage: "/banner_5_mobile.png" },
  { id: 2, image: "/banner_6.jpg", mobileImage: "/banner_6_mobile.png" },
  { id: 3, image: "/banner_7.jpg", mobileImage: "/banner_7_mobile.png" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // Auto-advance the background banner slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-title-line", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-subtext", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(".hero-ctas", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.65,
      });

      gsap.from(".hero-stats", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex items-center overflow-hidden bg-slate-950"
    >
      {/* Full-Width Background Banner Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              idx === slideIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.mobileImage}
              alt="Morazha Kalliasseri Service Co-op Bank"
              fill
              priority={idx === 0}
              className="object-cover object-center md:hidden"
            />
            <Image
              src={slide.image}
              alt="Morazha Kalliasseri Service Co-op Bank"
              fill
              priority={idx === 0}
              className="hidden md:block object-cover object-center"
            />
          </div>
        ))}

        {/* Gradient overlays for text legibility over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-slate-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 md:pt-32 md:pb-20">
        {/* Left-Aligned Hero Copy */}
        <div className="max-w-2xl space-y-6 md:space-y-8">
          {/* Top Badge */}
          <div className="hero-badge inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-semibold text-white">
            {/* <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24] animate-pulse" /> */}
            <span>Class 1 Super Grade Bank</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-md">
            <span className="hero-title-line block">Morazha Kalliasseri</span>
            <span className="hero-title-line block bg-gradient-to-r from-red-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              Service Co-op Bank
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtext text-lg text-slate-200 font-normal max-w-xl leading-relaxed drop-shadow">
            Empowering Kannur&rsquo;s local community since 1961 with trusted financial security, competitive interest rates, digital RTGS/NEFT banking, and comprehensive cooperative welfare services.
          </p>

          {/* Primary CTA */}
          <div className="hero-ctas flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton href="#services" variant="green" size="lg">
              <span>Explore Banking Services</span>
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>

            <MagneticButton href="#branches" variant="outline" size="lg">
              <Building2 className="w-5 h-5" />
              <span>Locate Your Branch</span>
            </MagneticButton>
          </div>

          {/* Trust Bullets */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs md:text-sm text-slate-200 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2DBA4E]" />
              <span>Govt. Audited</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2DBA4E]" />
              <span>Fast Loan Approvals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2DBA4E]" />
              <span>12 Branch Offices</span>
            </div>
          </div>
        </div>

        {/* Hero Trust Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-16 max-w-5xl">
          <div className="hero-stats min-w-0">
            <StatsCounter
              value={1961}
              prefix="Est. "
              label="Year Founded"
              sublabel="Registered 21 March 1961"
            />
          </div>
          <div className="hero-stats min-w-0">
            <StatsCounter
              value={12}
              suffix=" Branches"
              label="Branch Network"
              sublabel="Morazha, Kalliasseri"
            />
          </div>
          <div className="hero-stats min-w-0">
            <StatsCounter
              value={75}
              suffix="+ Years"
              label="Community Trust"
              sublabel="Class 1 Super Grade Bank"
            />
          </div>
          <div className="hero-stats min-w-0">
            <StatsCounter
              value={100}
              suffix="%"
              label="Co-op Audit Score"
              sublabel="Govt. Authorized Society"
            />
          </div>
        </div>
      </div>

      {/* Slideshow Progress Indicators */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 flex items-center gap-2 z-10">
        {heroSlides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setSlideIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              slideIndex === idx ? "w-8 bg-[#ED1C24]" : "w-2 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to banner ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
