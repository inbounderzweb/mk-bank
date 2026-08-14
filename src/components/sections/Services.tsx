"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Modal } from "@/components/ui/Modal";
import {
  PiggyBank,
  Landmark,
  Clock,
  Briefcase,
  Home,
  Car,
  Users,
  Sprout,
  Send,
  CreditCard,
  Lock,
  FileCheck,
  ShoppingBag,
  Store,
  Pill,
  Truck,
  Heart,
  Download,
  CheckCircle,
  FileText,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type ServiceCategory = "deposits" | "loans" | "banking" | "non-banking";

interface DownloadForm {
  title: string;
  file: string;
  fileName: string;
  fileSize: string;
}

const downloadForms: Record<string, DownloadForm> = {
  sb: {
    title: "SB Application Form",
    file: "/pdf/SB-Application-Form.pdf",
    fileName: "SB-Application-Form.pdf",
    fileSize: "128 KB",
  },
  rtgs: {
    title: "RTGS / NEFT Voucher",
    file: "/pdf/RTGS-NEFT-Form.pdf",
    fileName: "RTGS-NEFT-Form.pdf",
    fileSize: "6.6 MB",
  },
};

export function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<ServiceCategory>("deposits");
  const [selectedFormModal, setSelectedFormModal] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".service-card-item", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  const depositServices = [
    {
      title: "Savings Bank (SB) Deposit",
      icon: PiggyBank,
      badge: "High Yield",
      desc: "Attractive interest rates with liquidity and passbook facilities for individuals and families.",
    },
    {
      title: "Fixed Deposits (FD)",
      icon: Landmark,
      badge: "Guaranteed Return",
      desc: "Flexible tenure ranging from 15 days to 5+ years with senior citizen bonus interest rates.",
    },
    {
      title: "Recurring Deposits (RD)",
      icon: Clock,
      badge: "Monthly Savings",
      desc: "Build disciplined financial savings with monthly fixed installments and compounding interest.",
    },
    {
      title: "Current Account",
      icon: Briefcase,
      badge: "For Business",
      desc: "Unrestricted daily transactions, cheque book facility, and statement services for traders.",
    },
  ];

  const loanServices = [
    {
      title: "Personal Security Loans",
      icon: CheckCircle,
      badge: "Quick Approval",
      desc: "Hassle-free personal credit backed by member guarantees for emergency and personal needs.",
    },
    {
      title: "Mortgage & Property Loan",
      icon: Landmark,
      badge: "Flexible Rate",
      desc: "Substantial capital loans secured against land or property for business expansion or personal use.",
    },
    {
      title: "Housing Loans",
      icon: Home,
      badge: "Home Ownership",
      desc: "Long-term home construction and renovation credit with easy monthly installment options.",
    },
    {
      title: "Vehicle Purchase Loans",
      icon: Car,
      badge: "Auto Finance",
      desc: "Financing for two-wheelers, commercial transport vehicles, and private automobiles.",
    },
    {
      title: "Kudumbasree Micro Loans",
      icon: Users,
      badge: "Women Empowerment",
      desc: "Low-interest group credit for Neighborhood Groups (NHGs) fostering self-employment initiatives.",
    },
    {
      title: "Agricultural Credit",
      icon: Sprout,
      badge: "Farmer Subsidy",
      desc: "Seasonal crop loans, fertilizer financing, and farm equipment modernization credit.",
    },
  ];

  const bankingServices = [
    {
      title: "RTGS / NEFT Money Transfer",
      icon: Send,
      badge: "Instant Fund Transfer",
      desc: "Nationwide electronic money transfer to any bank account across India with minimal charges.",
    },
    {
      title: "Virtual Account System",
      icon: CreditCard,
      badge: "Digital Collection",
      desc: "Automated direct credit collection mechanism for institutions and commercial clients.",
    },
    {
      title: "On-Site ATM Network",
      icon: CreditCard,
      badge: "24/7 Cash Access",
      desc: "24-hour ATM facilities at main branch locations for instant cash withdrawals.",
    },
    {
      title: "Safe Deposit Lockers",
      icon: Lock,
      badge: "Vault Security",
      desc: "Dual-key security lockers in reinforced bank vaults for gold, documents, and valuables.",
    },
    {
      title: "Demand Draft (DD)",
      icon: FileCheck,
      badge: "Guaranteed Payment",
      desc: "Official bank demand drafts for educational institutions, government fees, and tenders.",
    },
  ];

  const nonBankingServices = [
    {
      title: "Mangad Shopping Complex",
      icon: ShoppingBag,
      badge: "Commercial Hub",
      desc: "Modern multi-storey shopping facility managed by the bank, hosting local retail businesses.",
    },
    {
      title: "Neethi Medical Store",
      icon: Pill,
      badge: "Subsidized Meds",
      desc: "Discounted essential medicines and healthcare supplies provided directly to the community.",
    },
    {
      title: "Consumer Co-op Store",
      icon: Store,
      badge: "Fair Price Grocery",
      desc: "Quality household provisions and groceries sold at controlled prices to curb inflation.",
    },
    {
      title: "Fertilizer & Manure Depot",
      icon: Sprout,
      badge: "Agri Support",
      desc: "High-grade organic fertilizers, seeds, and agricultural inputs distributed to farmers.",
    },
    {
      title: "Community Ambulance Service",
      icon: Truck,
      badge: "24/7 Emergency",
      desc: "Emergency medical transport service available round the clock at subsidized rates.",
    },
    {
      title: "Mobile Freezer Unit",
      icon: Heart,
      badge: "Community Care",
      desc: "Mobile mortuary freezer services provided to families during bereavement.",
    },
  ];

  const getActiveServices = () => {
    switch (activeTab) {
      case "deposits":
        return depositServices;
      case "loans":
        return loanServices;
      case "banking":
        return bankingServices;
      case "non-banking":
        return nonBankingServices;
      default:
        return depositServices;
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/80 text-slate-800 text-xs font-bold uppercase tracking-wider">
            {/* <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> */}
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Tailored Financial & Social Services
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Explore our wide portfolio of deposit accounts, competitive loan schemes, digital banking tools, and community non-banking units.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-14">
          {[
            { id: "deposits", label: "Deposits & Savings", icon: PiggyBank },
            { id: "loans", label: "Loan Schemes", icon: Landmark },
            { id: "banking", label: "E-Banking & Utilities", icon: Send },
            { id: "non-banking", label: "Non-Banking Units", icon: Store },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ServiceCategory)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {getActiveServices().map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="service-card-item">
                <TiltCard maxRotation={12} className="flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  {/* <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>MKSC Bank Verified</span>
                    <span className="text-slate-900 font-bold group-hover:translate-x-1 transition-transform">
                      Learn More →
                    </span>
                  </div> */}
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Downloads & Application Forms Bar */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Downloads</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Download Application Forms
            </h3>
            <p className="text-slate-600 text-sm">
              Get official printable PDF application forms for Savings Bank accounts and RTGS/NEFT money transfers.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              variant="primary"
              size="md"
              onClick={() => setSelectedFormModal("sb")}
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>SB Account Form</span>
            </MagneticButton>

            <MagneticButton
              variant="outline"
              size="md"
              onClick={() => setSelectedFormModal("rtgs")}
            >
              <Download className="w-4 h-4 text-slate-700" />
              <span>RTGS Form</span>
            </MagneticButton>
          </div>
        </div>

      </div>

      {/* Download Form Modal */}
      {(() => {
        const activeForm = selectedFormModal ? downloadForms[selectedFormModal] : null;
        return (
          <Modal
            isOpen={!!activeForm}
            onClose={() => setSelectedFormModal(null)}
            title={activeForm?.title || "Form Preview"}
            category="PDF Document Download"
          >
            {activeForm && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  You are downloading the official <strong>{activeForm.title}</strong>. Please ensure all required KYC documents (Aadhaar card, Ration card/Voter ID, 2 passport size photographs) are submitted alongside the completed form at your nearest branch.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span>{activeForm.fileName}</span>
                  </div>
                  <span className="text-slate-500">{activeForm.fileSize} • Official Format</span>
                </div>

                <a
                  href={activeForm.file}
                  download={activeForm.fileName}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download PDF</span>
                </a>

                <div className="pt-1">
                  <a
                    href="#contact"
                    onClick={() => setSelectedFormModal(null)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Need help filling out the form? Contact our support team →
                  </a>
                </div>
              </div>
            )}
          </Modal>
        );
      })()}
    </section>
  );
}
