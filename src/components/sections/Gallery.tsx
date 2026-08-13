"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/TiltCard";
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Category = "all" | "branches" | "community" | "agri" | "events";

interface GalleryItem {
  id: number;
  title: string;
  category: Category;
  categoryName: string;
  image: string;
  caption: string;
  date: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Anchampeedika Main Branch Exterior",
    category: "branches",
    categoryName: "Branch Network",
    image: "/banner_3.png",
    caption: "Modern multi-storey headquarters in Anchampeedika equipped with automated locker vaults and core banking counters.",
    date: "2024",
  },
  {
    id: 2,
    title: "Modern Banking Customer Desk",
    category: "branches",
    categoryName: "Branch Network",
    image: "/banner_1.png",
    caption: "State-of-the-art customer service counter providing seamless RTGS, NEFT, and deposit services to members.",
    date: "2024",
  },
  {
    id: 3,
    title: "Kudumbasree NHG Self-Help Meeting",
    category: "community",
    categoryName: "Community Welfare",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    caption: "Women micro-entrepreneurship group gathering discussing low-interest self-help group loans provided by MKSC Bank.",
    date: "2024",
  },
  {
    id: 4,
    title: "Agrarian Farmer Modernization Camp",
    category: "agri",
    categoryName: "Agri & Farming",
    image: "/banner_2.png",
    caption: "Organic fertilizer distribution and mechanized crop equipment credit workshop organized for Morazha farmers.",
    date: "2024",
  },
  {
    id: 5,
    title: "Neethi Subsidized Pharmacy Opening",
    category: "community",
    categoryName: "Community Welfare",
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1200&q=80",
    caption: "Discounted essential medicines distribution counter serving members and elderly villagers in Kalliasseri.",
    date: "2023",
  },
  {
    id: 6,
    title: "60th Anniversary Foundation Ceremony",
    category: "events",
    categoryName: "Events & Celebrations",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    caption: "General Body members and board directors celebrating Class 1 Super Grade status and 60+ years of community trust.",
    date: "2021",
  },
  {
    id: 7,
    title: "Mangad Commercial Shopping Complex",
    category: "branches",
    categoryName: "Branch Network",
    image: "/banner_3.png",
    caption: "Multi-purpose commercial complex built by the bank to foster local retail and small business enterprises.",
    date: "2023",
  },
  {
    id: 8,
    title: "Organic Fertilizer & Seed Distribution",
    category: "agri",
    categoryName: "Agri & Farming",
    image: "/banner_2.png",
    caption: "Seasonal paddy seed distribution camp aiding local agrarian families ahead of monsoon cultivation.",
    date: "2024",
  },
];

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".gallery-card-item", {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredItems = activeCategory === "all"
    ? galleryData
    : galleryData.filter((item) => item.category === activeCategory);

  const selectedItem = selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 text-[#2DBA4E] text-xs font-bold uppercase tracking-wider border border-gray-200">
            {/* <Camera className="w-3.5 h-3.5 text-[#ED1C24]" /> */}
            <span>Visual Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Photo Gallery & Community Moments
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Explore photos of our modern branch network, agricultural workshops, Kudumbasree self-help groups, and non-banking welfare initiatives across Kannur.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-14">
          {[
            { id: "all", label: "All Photos" },
            { id: "branches", label: "Branch Infrastructure" },
            { id: "community", label: "Community & Welfare" },
            { id: "agri", label: "Agri & Farming" },
            { id: "events", label: "Events & Meetings" },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#2DBA4E] text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Tilt Gallery Grid */}
        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item, idx) => (
            <div key={item.id} className="gallery-card-item">
              <TiltCard
                maxRotation={10}
                onClick={() => setSelectedPhotoIndex(idx)}
                className="p-0 overflow-hidden bg-slate-900 flex flex-col justify-between h-[320px] group border-slate-200"
              >
                {/* Background Image Container */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized={item.image.startsWith("http")}
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Category Badge & Expand Icon */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {item.categoryName}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-900 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                    <span className="text-[10px] font-mono text-[#2DBA4E] font-bold">{item.date}</span>
                    <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-[#2DBA4E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 font-normal leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-md">
            {/* Backdrop click close */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedPhotoIndex(null)}
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl z-10 my-auto"
            >
              {/* Top Bar */}
              <div className="p-4 md:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#2DBA4E] bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/50">
                    {selectedItem.categoryName}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Photo {selectedPhotoIndex! + 1} of {filteredItems.length}</span>
                </div>
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors outline-none"
                  aria-label="Close photo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo View */}
              <div className="relative h-[360px] sm:h-[460px] md:h-[520px] w-full bg-black">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  unoptimized={selectedItem.image.startsWith("http")}
                  className="object-contain"
                />

                {/* Arrow Controls */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Details */}
              <div className="p-6 md:p-8 bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{selectedItem.title}</h3>
                  <span className="text-xs font-mono text-slate-400">{selectedItem.date}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
