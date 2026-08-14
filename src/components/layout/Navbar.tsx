"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Menu, X, ShieldCheck, PhoneCall, ArrowRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About Us", href: "#about" },
    { name: "Banking Services", href: "#services" },
    // { name: "Calculator", href: "#calculator" },
    { name: "Branch Network", href: "#branches" },
    { name: "Gallery", href: "#gallery" },
    // { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-soft border-b border-slate-200/80"
          : "bg-transparent py-5 border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Official Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div
            className={`relative w-11 h-11 group-hover:scale-105 transition-transform duration-300 shrink-0 ${
              scrolled ? "" : "drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            }`}
          >
            <Image
              src="/logo.png"
              alt="Morazha Kalliasseri Service Co-op Bank Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className={`font-extrabold text-base md:text-lg tracking-tight leading-none transition-colors duration-300 group-hover:text-[#ED1C24] ${
                  scrolled ? "text-slate-900" : "text-white drop-shadow-md"
                }`}
              >
                Morazhakalliasseri Bank
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-300 relative group py-1 hover:text-[#ED1C24] ${
                scrolled ? "text-slate-700" : "text-white/90 drop-shadow-md"
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ED1C24] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <MagneticButton href="#contact" variant="primary" size="sm">
              <ShieldCheck className="w-4 h-4" />
              <span>E-Banking & Contact</span>
            </MagneticButton>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors outline-none ${
              scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-slate-800 hover:text-[#ED1C24] transition-colors py-2 border-b border-slate-100 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
              <div className="pt-2">
                <MagneticButton
                  href="#contact"
                  variant="red"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Contact Head Office</span>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
