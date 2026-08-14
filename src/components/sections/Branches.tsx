"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  Sprout,
  Landmark,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const branchList = [
  {
    name: "Anchampeedika Main Branch",
    type: "Head Office & Main Branch",
    isHeadOffice: true,
    address: "Anchampeedika P.O., Morazha via, Kannur District - 670301",
    phone: "+91 497 2780220 / 2780520",
    hours: "Mon - Sat: 9:00 AM - 4:00 PM",
    status: "Open Now",
  },
  {
    name: "Mangattuparamba Branch",
    type: "Full-Service Branch",
    address: "Near Kannur University Campus, Mangattuparamba, Kannur - 670567",
    phone: "+91 497 2782100",
    hours: "Mon - Sat: 9:30 AM - 4:30 PM",
    status: "Open Now",
  },
  {
    name: "Mangad Branch",
    type: "Commercial Hub Branch",
    address: "Near Shopping Complex, Mangad P.O., Kannur - 670562",
    phone: "+91 497 2781440",
    hours: "Mon - Sat: 9:30 AM - 4:30 PM",
    status: "Open Now",
  },
  {
    name: "Vellikkeel Branch",
    type: "Full-Service Branch",
    address: "Vellikkeel Junction, Morazha, Kannur - 670301",
    phone: "+91 497 2783050",
    hours: "Mon - Sat: 9:30 AM - 4:30 PM",
    status: "Open Now",
  },
  {
    name: "Kolathuvayal Branch",
    type: "Agricultural & Rural Branch",
    address: "Kolathuvayal Center, Morazha, Kannur - 670301",
    phone: "+91 497 2784110",
    hours: "Mon - Sat: 9:30 AM - 4:30 PM",
    status: "Open Now",
  },
  {
    name: "Parassinikkadavu Branch",
    type: "Temple & Tourism Town Branch",
    address: "Parassinikkadavu P.O., Near Snake Park Road, Kannur - 670563",
    phone: "+91 497 2780890",
    hours: "Mon - Sat: 9:00 AM - 4:30 PM",
    status: "Open Now",
  },
  {
    name: "Dharmasala Evening Branch",
    type: "Extended Hours Branch",
    isEvening: true,
    address: "Dharmasala Junction, Anthoor Municipality, Kannur - 670567",
    phone: "+91 497 2785220",
    hours: "Mon - Sat: 10:00 AM - 6:30 PM (Evening)",
    status: "Open Now",
  },
  {
    name: "Paliyathvavalappu Branch",
    type: "Full-Service Branch",
    address: "Paliyathvavalappu, Kalliasseri Panchayat, Kannur - 670562",
    phone: "+91 497 2786330",
    hours: "Mon - Sat: 9:30 AM - 4:30 PM",
    status: "Open Now",
  },
  {
    name: "Ayyankol Branch",
    type: "Community Branch",
    address: "Ayyankol Center, Morazha, Kannur - 670301",
    phone: "+91 497 2787440",
    hours: "Mon - Sat: 9:30 AM - 4:30 PM",
    status: "Open Now",
  },
];

type Branch = (typeof branchList)[number];

function getBranchIcon(branch: Branch) {
  if (branch.isHeadOffice) return ShieldCheck;
  if (branch.isEvening) return Clock;
  const t = branch.type.toLowerCase();
  if (t.includes("agricultural")) return Sprout;
  if (t.includes("temple") || t.includes("tourism")) return Landmark;
  if (t.includes("community")) return Users;
  return Building2;
}

function getBranchTheme(branch: Branch) {
  if (branch.isHeadOffice) {
    return {
      gradient: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950",
      badge: "bg-white/15 text-white border-white/25 backdrop-blur-md",
    };
  }
  if (branch.isEvening) {
    return {
      gradient: "bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900",
      badge: "bg-white/15 text-white border-white/25 backdrop-blur-md",
    };
  }
  return {
    gradient: "bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900",
    badge: "bg-white/15 text-white border-white/25 backdrop-blur-md",
  };
}

export function Branches() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const visualsRef = useRef<Array<HTMLDivElement | null>>([]);
  const navigateRef = useRef<(index: number) => void>(() => {});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, isMobile, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        const track = trackRef.current!;
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (!cards.length) return;

        gsap.set(track, { x: 0 });

        if (!reduceMotion) {
          // Entrance reveal for the whole rail
          gsap.from(track, {
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          });
        }

        if (reduceMotion) {
          gsap.set(cards, { scale: 1 });
          return;
        }

        // Desktop: pin the section and drive the rail from scroll position
        if (isDesktop) {
          const getDistance = () => {
            const first = cards[0];
            const styles = getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
            // offsetWidth (not getBoundingClientRect) so an active-card scale
            // transform on cards[0] can't shrink this measurement.
            const cardWidth = first.offsetWidth;
            return (cards.length - 1) * (cardWidth + gap);
          };

          const updateActiveVisuals = () => {
            const viewportCenter = window.innerWidth / 2;
            let closestIndex = 0;
            let closestDist = Infinity;

            cards.forEach((card, i) => {
              const rect = card.getBoundingClientRect();
              const cardCenter = rect.left + rect.width / 2;
              const dist = Math.abs(cardCenter - viewportCenter);
              const norm = gsap.utils.clamp(0, 1, dist / (rect.width * 0.62));
              const scale = gsap.utils.interpolate(1, 0.9, norm);
              gsap.set(card, { scale });

              const visual = visualsRef.current[i];
              if (visual) {
                const offset = gsap.utils.clamp(-14, 14, ((cardCenter - viewportCenter) / rect.width) * 14);
                gsap.set(visual, { xPercent: offset });
              }

              if (dist < closestDist) {
                closestDist = dist;
                closestIndex = i;
              }
            });

            setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
          };

          const horizontalTween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              id: "branches-horizontal",
              trigger: sectionRef.current,
              start: "top top",
              end: () => "+=" + getDistance(),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: {
                snapTo: 1 / (cards.length - 1),
                duration: { min: 0.2, max: 0.6 },
                ease: "power2.inOut",
              },
              onUpdate: updateActiveVisuals,
              onRefresh: updateActiveVisuals,
            },
          });

          navigateRef.current = (index: number) => {
            const st = ScrollTrigger.getById("branches-horizontal");
            if (!st) return;
            const progress = index / (cards.length - 1);
            const target = st.start + progress * (st.end - st.start);
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: target },
              ease: "power2.inOut",
            });
          };

          updateActiveVisuals();

          return () => {
            horizontalTween.kill();
          };
        }

        // Mobile: no scroll-linked animation — auto-advance like a carousel
        if (isMobile) {
          let current = 0;
          let timer: ReturnType<typeof setInterval> | undefined;

          const getStep = () => {
            const first = cards[0];
            const styles = getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
            // offsetWidth (not getBoundingClientRect) so cards[0] being scaled
            // down once inactive can't shrink the measured step distance.
            return first.offsetWidth + gap;
          };

          const stopAutoplay = () => {
            if (timer) clearInterval(timer);
          };

          const goTo = (index: number) => {
            current = (index + cards.length) % cards.length;
            gsap.to(track, { x: -current * getStep(), duration: 0.8, ease: "power2.inOut" });
            cards.forEach((card, i) => {
              gsap.to(card, { scale: i === current ? 1 : 0.92, duration: 0.5, ease: "power2.out" });
            });
            setActiveIndex(current);

            stopAutoplay();
            timer = setInterval(() => goTo(current + 1), 4000);
          };

          navigateRef.current = goTo;
          cards.forEach((card, i) => gsap.set(card, { scale: i === 0 ? 1 : 0.92 }));
          setActiveIndex(0);
          timer = setInterval(() => goTo(current + 1), 4000);

          return () => {
            stopAutoplay();
          };
        }
      }
    );

    return () => mm.revert();
  }, []);

  const goToBranch = (index: number) => {
    navigateRef.current(index);
  };

  return (
    <section
      id="branches"
      ref={sectionRef}
      className="relative bg-slate-50 overflow-hidden md:min-h-screen flex flex-col justify-center py-20 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            {/* <Building2 className="w-3.5 h-3.5 text-emerald-600" /> */}
            <span>Regional Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our 12 Branch Network Across Kannur
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Conveniently located across Morazha, Kalliasseri, and Anthoor municipalities to bring personalized banking directly to your neighborhood.
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Branch Rail */}
      <div className="relative">
        <div
          ref={trackRef}
          className="branches-track flex items-stretch gap-6 md:gap-8 will-change-transform"
          style={{
            paddingLeft: "max(1.25rem, calc((100vw - min(85vw, 620px)) / 2))",
            paddingRight: "max(1.25rem, calc((100vw - min(85vw, 620px)) / 2))",
          }}
        >
          {branchList.map((branch, index) => {
            const Icon = getBranchIcon(branch);
            const theme = getBranchTheme(branch);
            return (
              <div
                key={branch.name}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="branch-scroll-card shrink-0 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[40vw] xl:min-w-[520px] xl:w-[32vw] max-w-[620px] flex flex-col rounded-3xl shadow-soft-lg"
                style={{ transformOrigin: "center center" }}
              >
                {/* Visual / Image Panel with Parallax Icon */}
                <div className={`relative h-44 sm:h-52 rounded-t-3xl overflow-hidden ${theme.gradient}`}>
                  <div
                    ref={(el) => {
                      visualsRef.current[index] = el;
                    }}
                    className="branch-visual-parallax absolute inset-0 flex items-center justify-center"
                  >
                    <Icon className="w-32 h-32 sm:w-40 sm:h-40 text-white/15" strokeWidth={1.1} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${theme.badge}`}
                    >
                      {branch.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600/80 backdrop-blur-md px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      {branch.status}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-md leading-tight">
                      {branch.name}
                    </h3>
                  </div>
                </div>

                {/* Details Panel */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-b-3xl p-6 sm:p-8 border border-slate-200/70 border-t-0">
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-600 shrink-0" />
                      <a
                        href={`tel:${branch.phone.replace(/[^0-9+]/g, "")}`}
                        className="hover:text-emerald-700 font-medium"
                      >
                        {branch.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">IFSC / Core Banking Ready</span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(branch.name + " " + branch.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-emerald-700 transition-colors px-3.5 py-2 rounded-full"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rail Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 md:mt-12">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => goToBranch(Math.max(0, activeIndex - 1))}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-soft flex items-center justify-center text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous branch"
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {branchList.map((branch, idx) => (
              <button
                key={branch.name}
                onClick={() => goToBranch(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-8 bg-emerald-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to ${branch.name}`}
              />
            ))}
          </div>

          <button
            onClick={() => goToBranch(Math.min(branchList.length - 1, activeIndex + 1))}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-soft flex items-center justify-center text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next branch"
            disabled={activeIndex === branchList.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 text-center text-xs font-mono text-slate-500">
          {String(activeIndex + 1).padStart(2, "0")} / {String(branchList.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
