"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  Snowflake,
  UtensilsCrossed,
  Video,
  PartyPopper,
  Phone,
  CalendarCheck,
  Building2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BOOKING_NUMBERS = ["9495335569", "9446677872"];

const facilityHighlights = [
  { icon: Snowflake, label: "Fully Air-Conditioned" },
  { icon: UtensilsCrossed, label: "Dining Area" },
  { icon: Video, label: "Video Conferencing" },
  { icon: PartyPopper, label: "Event & Celebration Space" },
];

const supportingImages = [
  { label: "The Hall", image: "/cn.jpg" },
  { label: "Stage", image: "/cn2.jpg" },
  { label: "Dining Area", image: "/cn3.jpg" },
  { label: "Events", image: "/cn4.jpg" },
];

export function MiniHall() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const parallaxImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".mh-badge", {
        opacity: 0,
        y: -16,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".mh-hero-image", {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".mh-hero-image",
          start: "top 85%",
        },
      });

      gsap.from(".mh-reveal", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".mh-content",
          start: "top 78%",
        },
      });

      gsap.from(".mh-highlight-item", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".mh-highlights",
          start: "top 85%",
        },
      });

      gsap.from(".mh-gallery-item", {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".mh-gallery",
          start: "top 85%",
        },
      });

      // Subtle parallax on the main hero image
      if (parallaxImageRef.current) {
        gsap.fromTo(
          parallaxImageRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".mh-hero-image",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mini-hall"
      ref={sectionRef}
      className="relative bg-[#121A35] py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient brand-color background accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#39C443]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FF1023]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <div className="mh-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#39C443]/15 text-[#39C443] text-xs font-bold uppercase tracking-wider border border-[#39C443]/25">
            <Building2 className="w-3.5 h-3.5" />
            <span>Our Mini Auditorium</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            The Perfect Venue for Every Celebration
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            From weddings and birthdays to meetings, conferences, and private events — our Mini Hall
            offers a premium, spacious, and fully equipped setting for every occasion in the heart of
            the community.
          </p>
        </div>

        {/* Large Auditorium Image */}
        <div className="mh-hero-image relative aspect-16/9 sm:aspect-21/9 w-full rounded-3xl overflow-hidden shadow-soft-lg border border-white/10 mb-14 md:mb-20">
          <div ref={parallaxImageRef} className="absolute inset-0 -top-[10%] h-[120%]">
            <Image
              src="/cn.jpg"
              alt="Mini Hall Auditorium"
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121A35]/80 via-[#121A35]/10 to-transparent" />
        </div>

        {/* Content: Highlights + CTAs (left), Supporting Gallery (right) */}
        <div className="mh-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Facility Highlights + CTAs */}
          <div className="space-y-10">
            <div className="mh-highlights grid grid-cols-2 gap-4 sm:gap-5">
              {facilityHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="mh-highlight-item flex flex-col items-start gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:border-[#39C443]/40"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#39C443]/15 text-[#39C443] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-white leading-snug">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mh-reveal space-y-5">
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton href="#contact" variant="green" size="lg" className="bg-[#39C443] hover:bg-[#2eab3a]">
                  <CalendarCheck className="w-5 h-5" />
                  <span>Book the Hall</span>
                </MagneticButton>

                <MagneticButton href="#contact" variant="outline" size="lg" className="bg-white/5 text-white border-white/20 hover:border-[#FF1023] hover:text-[#FF1023]">
                  <span>Contact Us</span>
                </MagneticButton>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Phone className="w-4 h-4 text-[#39C443]" />
                  <span>Booking Contact:</span>
                </div>
                {BOOKING_NUMBERS.map((num, idx) => (
                  <React.Fragment key={num}>
                    {idx > 0 && <span className="text-slate-500">/</span>}
                    <a
                      href={`tel:+91${num}`}
                      className="font-bold text-white hover:text-[#39C443] transition-colors"
                    >
                      {num}
                    </a>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Supporting Images Grid */}
          <div className="mh-gallery grid grid-cols-2 gap-4 sm:gap-5">
            {supportingImages.map((item) => (
              <div
                key={item.label}
                className="mh-gallery-item group relative aspect-4/3 rounded-2xl overflow-hidden shadow-soft border border-white/10 transition-shadow duration-500 hover:shadow-soft-lg"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 22vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <span className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-bold text-white drop-shadow-md">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
