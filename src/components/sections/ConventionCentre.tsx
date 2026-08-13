"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowUpRight,
  CalendarCheck,
  PartyPopper,
  Briefcase,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// TODO: swap in the live Convention Centre URL once available
const CONVENTION_CENTRE_URL = "https://astoriaconventioncentre.vercel.app/";

const featuredImage = { icon: PartyPopper, label: "Grand Auditorium", image: "/cn.jpg" };

const galleryImages = [
  { icon: Briefcase, label: "Amphitheatre", image: "/cn2.jpg" },
  { icon: Users, label: "Grand Reception Lobby", image: "/cn4.jpg" },
];

export function ConventionCentre() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Fade-up reveal for the left copy
      gsap.from(".cc-reveal", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Staggered reveal for the 2x2 image grid
      gsap.from(".cc-grid-item", {
        opacity: 0,
        y: 40,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cc-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="convention-centre"
      ref={sectionRef}
      className="relative bg-white py-24 md:py-36 overflow-hidden"
    >
      {/* Ambient navy/gold background accents */}
      {/* <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-amber-50 rounded-full blur-3xl pointer-events-none" /> */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8 lg:pr-6">
            <div className="cc-reveal">
              <Image
                src="/astoria-logo.png"
                alt="Astoria Convention Centre"
                width={2963}
                height={755}
                className="h-9 sm:h-11 w-auto"
              />
            </div>

           

            <h2 className="cc-reveal text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Premium Venue for Every {" "}
              <span className="text-[#8F8173] bg-clip-text">
                Celebration
              </span>
              
            </h2>

            <p className="cc-reveal text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
              A premium convention destination in Kannur for weddings, corporate events, and unforgettable moments.Designed to impress from the first arrival, Astoria brings together striking architecture, elegant spaces and thoughtful hospitality to create unforgettable experiences.
            </p>

            <div className="cc-reveal flex flex-wrap items-center gap-4 pt-2">
              <a
                href={CONVENTION_CENTRE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-[#e1d9d2] font-semibold text-sm overflow-hidden shadow-soft-lg transition-transform duration-300 hover:scale-[1.03] hover:text-amber-200"
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-400/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">Visit Convention Centre</span>
                <ArrowUpRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* <a
                href={CONVENTION_CENTRE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-transparent text-slate-900 font-semibold text-sm border-2 border-slate-900/15 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50/60 hover:scale-[1.03]"
              >
                <CalendarCheck className="w-4 h-4 text-amber-600" />
                <span>Book an Event</span>
              </a> */}
            </div>
          </div>

          {/* Right: Featured image + two smaller images below */}
          <div className="relative">
            <div className="cc-grid flex flex-col gap-4 sm:gap-5 md:gap-6">
              {/* Large featured image */}
              {(() => {
                const Icon = featuredImage.icon;
                return (
                  <div className="cc-grid-item group relative aspect-6/3 sm:aspect-30/14 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft border border-slate-200/70 transition-shadow duration-500 hover:shadow-soft-lg">
                    <Image
                      src={featuredImage.image}
                      alt={featuredImage.label}
                      fill
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      priority
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5 translate-y-1 transition-transform duration-500 group-hover:translate-y-0 sm:bottom-5 sm:left-5 sm:right-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur-md sm:h-10 sm:w-10">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-sm font-bold text-white drop-shadow-md sm:text-base">
                        {featuredImage.label}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Two smaller images side by side */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {galleryImages.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="cc-grid-item group relative aspect-16/13  sm:aspect-11/7 rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft border border-slate-200/70 transition-shadow duration-500 hover:shadow-soft-lg"
                    >
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 22vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 translate-y-1 transition-transform duration-500 group-hover:translate-y-0 sm:bottom-4 sm:left-4 sm:right-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/15 text-white backdrop-blur-md sm:h-9 sm:w-9 sm:rounded-xl">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-white drop-shadow-md sm:text-sm">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
