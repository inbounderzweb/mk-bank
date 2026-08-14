"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Heart, Sparkles, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

// lucide-react dropped brand/logo icons (Facebook, Instagram, YouTube, etc.) -
// use lightweight inline SVGs instead so the social row actually renders.
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.96.27-1.62 1.65-1.62h1.76V3.5c-.3-.04-1.35-.13-2.56-.13-2.54 0-4.28 1.55-4.28 4.4v2.46H6.9v3.3h3.15V22h3.45z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white relative pt-20 pb-12 overflow-hidden border-t border-slate-800">
      {/* Top Accent Line with Red & Green gradient */}
      {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2DBA4E] via-emerald-500 to-[#2DBA4E]" /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Col (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg shrink-0">
                <div className="relative w-full h-full">
                  <Image src="/logo.png" alt="MKSC Emblem" fill className="object-contain" />
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white tracking-tight">
                  Morazha Kalliasseri
                </h3>
                <span className="text-xs font-medium text-slate-400">
                  Service Co-operative Bank Ltd. No. 4220
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering Kannur since 1961 with trusted banking, personal security loans, Kudumbasree group credit, and local non-banking community welfare centers.
            </p>

            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-[#2DBA4E] text-xs font-bold border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#2DBA4E]" />
              <span>Audited & Authorized Class 1 Super Grade Bank</span>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#hero" className="hover:text-[#2DBA4E] transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#2DBA4E] transition-colors">
                  Our Legacy & Timeline
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#2DBA4E] transition-colors">
                  Deposits & Loan Schemes
                </a>
              </li>
              <li>
                <a href="#branches" className="hover:text-[#2DBA4E] transition-colors">
                  12 Branch Locations
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#2DBA4E] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#2DBA4E] transition-colors">
                  Contact Head Office
                </a>
              </li>
            </ul>
          </div>

          {/* Banking Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Key Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Savings & Fixed Deposits</li>
              <li>Housing & Personal Security Loans</li>
              <li>RTGS / NEFT Money Transfers</li>
              <li>Kudumbasree NHG Credit</li>
              <li>Mangad Shopping Complex</li>
              <li>Neethi Subsidized Pharmacy</li>
            </ul>
          </div>

          {/* Social & Head Office */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Head Office</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Anchampeedika P.O., Morazha, Kannur District, Kerala - 670301
            </p>
            <div className="text-sm text-[#2DBA4E] font-medium">
              Phone: <a href="tel:04972780062" className="hover:underline">0497 2780062</a>
            </div>

            {/* Social Icon */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: InstagramIcon, href: "https://www.instagram.com/mkscbank?igsh=aWRqc254Z280dGw4" },
                { icon: FacebookIcon, href: "https://www.facebook.com/MKBankOfficial" },
                // { icon: YoutubeIcon, href: "https://youtube.com/@astoriaconventioncentre?si=E87KNg3pTB-O2MD9" },
              ].map((soc, i) => (
                <a
                  key={i}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-brand-red/40 bg-white/5 hover:bg-[#2DBA4E] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Morazha Kalliasseri Service Co-operative Bank Ltd. No. 4220. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            {/* <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-[#2DBA4E] fill-[#2DBA4E]" /> for Kannur Community
            </span> */}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-[#2DBA4E] text-white transition-colors outline-none"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
