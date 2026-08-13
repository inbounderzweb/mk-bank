"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/TiltCard";
import { Modal } from "@/components/ui/Modal";
import { Target, Compass, HeartHandshake, History, Award, ChevronRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeModal, setActiveModal] = useState<"mission" | "strategy" | "principles" | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Timeline reveal
      gsap.from(".about-timeline-item", {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-timeline",
          start: "top 80%",
        },
      });

      // Cards stagger scale in
      gsap.from(".about-tilt-card", {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-cards-grid",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const historyEvents = [
    {
      year: "1951",
      title: "Multi-Purpose Credit Society",
      desc: "Founded as a grassroots multi-purpose credit society to support farmers and micro-vendors in Morazha and Kalliasseri.",
    },
    {
      year: "21 Mar 1961",
      title: "Official Registration (No. 4220)",
      desc: "Formally registered under Kerala Cooperative Societies Act as Morazha Kalliasseri Service Co-operative Bank Ltd.",
    },
    {
      year: "1 July 1961",
      title: "Commenced Operations",
      desc: "Commenced full-fledged banking operations, offering low-interest agrarian credit and safe savings options.",
    },
    {
      year: "Present Day",
      title: "Class 1 Super Grade Bank",
      desc: "Elevated to Class 1 Super Grade status with 9 modern branches, RTGS/NEFT, ATMs, and extensive community welfare units.",
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl -z-10 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200/80">
            {/* <History className="w-3.5 h-3.5 text-emerald-600" /> */}
            <span>Our Legacy & Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Six Decades of Dedicated Community Service
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            From modest beginnings in 1951 to a Class 1 Super Grade cooperative bank today, Morazha Kalliasseri Service Co-op Bank remains committed to financial empowerment across Kannur district.
          </p>
        </div>

        {/* History Timeline Cards */}
        {/* <div className="about-timeline grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {historyEvents.map((item, index) => (
            <div
              key={index}
              className="about-timeline-item relative p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-soft transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                  {item.year}
                </span>
                <Award className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div> */}

        {/* 3D Tilt Cards Grid: Mission, Strategy, Principles */}
        <div className="about-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: Our Mission */}
          <div className="about-tilt-card">
            <TiltCard maxRotation={10} className="flex flex-col justify-between h-full bg-slate-50/50">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To deliver secure, accessible, and transparent banking services to every household in Morazha, Kalliasseri, and Andoor while nurturing local agrarian and micro-enterprises.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Core Blueprint</span>
                <button
                  onClick={() => setActiveModal("mission")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <span>Read Full Mission</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </TiltCard>
          </div>

          {/* Card 2: Strategic Vision */}
          <div className="about-tilt-card">
            <TiltCard maxRotation={10} className="flex flex-col justify-between h-full bg-slate-50/50">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Strategic Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Seamlessly blending modern digital banking infrastructure (RTGS, Virtual Accounts, Mobile Banking) with human-centric cooperative welfare and non-banking commercial complexes.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Future Roadmap</span>
                <button
                  onClick={() => setActiveModal("strategy")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>Explore Strategy</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </TiltCard>
          </div>

          {/* Card 3: Cooperative Principles */}
          <div className="about-tilt-card">
            <TiltCard maxRotation={10} className="flex flex-col justify-between h-full bg-slate-50/50">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Co-op Principles</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Guided by international cooperative values: Voluntary membership, democratic member control, equitable economic participation, and active concern for community welfare.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Values & Audit</span>
                <button
                  onClick={() => setActiveModal("principles")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors"
                >
                  <span>View Principles</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </TiltCard>
          </div>

        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === "mission"}
        onClose={() => setActiveModal(null)}
        title="Our Mission Statement"
        category="Foundational Purpose"
      >
        <p className="text-base text-slate-700 leading-relaxed">
          Morazha Kalliasseri Service Co-operative Bank Ltd. No. 4220 was established with the primary directive of providing affordable financial credit to farmers, small tradesmen, and local families.
        </p>
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-slate-900 text-sm">Key Objectives:</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Promote thrift and self-reliance among members through rewarding deposit products.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Provide timely credit for agricultural operations, housing, and micro-entrepreneurship.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Operate essential non-banking social assets including medical stores, fertilizer depots, and ambulance services.</span>
            </li>
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "strategy"}
        onClose={() => setActiveModal(null)}
        title="Strategic Growth & Digital Roadmap"
        category="Modernization Strategy"
      >
        <p className="text-base text-slate-700 leading-relaxed">
          As a Class 1 Super Grade Cooperative Institution, our strategy focuses on maintaining fiscal resilience while expanding digital accessibility to our member base.
        </p>
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-slate-900 text-sm">Strategic Pillars:</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Direct integration with national payment gateways for instant RTGS/NEFT transactions.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Expansion of branch ATM networks and Virtual Account settlement systems.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Continuous empowerment of Kudumbasree self-help groups through dedicated micro-finance schemes.</span>
            </li>
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "principles"}
        onClose={() => setActiveModal(null)}
        title="Cooperative Values & Principles"
        category="Governance & Integrity"
      >
        <p className="text-base text-slate-700 leading-relaxed">
          Our bank adheres strictly to the universally recognized cooperative principles formulated by the International Co-operative Alliance (ICA):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700 font-medium">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">1. Open & Voluntary Membership</div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">2. Democratic Member Governance</div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">3. Member Economic Participation</div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">4. Autonomy & Independence</div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">5. Education & Training</div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">6. Active Concern for Community</div>
        </div>
      </Modal>
    </section>
  );
}
