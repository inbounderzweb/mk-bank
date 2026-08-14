"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/TiltCard";
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Category = "all" | "branches" | "community" | "events" | "convention";

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
    title: "SSLC & +2 Achievers Felicitation",
    category: "events",
    categoryName: "Events & Celebrations",
    image: "/gallery/gallery1.jpg",
    caption: "Board members honouring the year's top-scoring SSLC and +2 students at the annual achievers' felicitation held at the bank premises.",
    date: "2018",
  },
  {
    id: 2,
    title: "Student Achievers Award Ceremony",
    category: "events",
    categoryName: "Events & Celebrations",
    image: "/gallery/gallery2.jpg",
    caption: "Bank officials addressing members and award recipients during the annual student achievers recognition programme.",
    date: "2018",
  },
  {
    id: 3,
    title: "24-Hour ATM Service Launch",
    category: "branches",
    categoryName: "Branch Network",
    image: "/gallery/gallery6.jpg",
    caption: "Announcing the bank's new round-the-clock ATM service for easier, faster cash withdrawals for members.",
    date: "2018",
  },
  {
    id: 4,
    title: "Haritham Sahakaranam - World Environment Day",
    category: "community",
    categoryName: "Community Welfare",
    image: "/gallery/gallery7.jpg",
    caption: "The bank's 'Green Co-operation' theme-trees campaign marking World Environment Day across Kerala's co-operative network.",
    date: "2018",
  },
  {
    id: 5,
    title: "Sapling Plantation Drive",
    category: "community",
    categoryName: "Community Welfare",
    image: "/gallery/gallery3.jpeg",
    caption: "Board members and local dignitaries planting saplings as part of the bank's Green Co-operation environment initiative.",
    date: "2018",
  },
  {
    id: 6,
    title: "Green Co-operation Tree Planting",
    category: "community",
    categoryName: "Community Welfare",
    image: "/gallery/gallery4.jpeg",
    caption: "Members and officials planting native trees near the branch premises as part of the World Environment Day drive.",
    date: "2018",
  },
  {
    id: 7,
    title: "Staff & Members Planting Saplings",
    category: "community",
    categoryName: "Community Welfare",
    image: "/gallery/gallery5.jpeg",
    caption: "Bank staff and members participating in the sapling plantation drive to support local afforestation efforts.",
    date: "2018",
  },
  {
    id: 8,
    title: "Convention Centre Inauguration",
    category: "convention",
    categoryName: "Convention Centre",
    image: "/gallery/gallery8.jpeg",
    caption: "Inauguration ceremony of the convention centre, marking the beginning of a new space for community events and gatherings.",
    date: "2026",
  },
  {
    id: 9,
    title: "Convention Centre Inauguration",
    category: "convention",
    categoryName: "Convention Centre",
    image: "/gallery/gallery9.jpeg",
    caption: "Inauguration ceremony of the convention centre, marking the beginning of a new space for community events and gatherings.",
    date: "2026",
  },
  {
    id: 10,
    title: "Convention Centre Inauguration",
    category: "convention",
    categoryName: "Convention Centre",
    image: "/gallery/gallery10.jpeg",
    caption: "Inauguration ceremony of the convention centre, marking the beginning of a new space for community events and gatherings.", 
    date: "2026",
  },
  {
    id: 11,
    title: "Convention Centre Inauguration",
    category: "convention",
    categoryName: "Convention Centre",
    image: "/gallery/gallery11.jpeg",
    caption: "Inauguration ceremony of the convention centre, marking the beginning of a new space for community events and gatherings.", 
    date: "2026",
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
            Explore photos of our branch services, annual achiever felicitations, and community green initiatives across Kannur.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-14">
          {[
            { id: "all", label: "All Photos" },
            { id: "branches", label: "Branch Infrastructure" },
            { id: "community", label: "Community & Welfare" },
            { id: "events", label: "Events & Meetings" },
            { id: "convention", label: "Convention Centre" },
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
