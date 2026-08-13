"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Calculator, DollarSign, TrendingUp, ShieldCheck, ArrowRight, Sparkles, PieChart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function FinancialCalculator() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Calculator State
  const [calcType, setCalcType] = useState<"fd" | "loan">("fd");
  const [amount, setAmount] = useState<number>(100000);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [rate, setRate] = useState<number>(7.85);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".calc-card-container", {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".calc-card-container",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Update default rate when switching mode
  const handleCalcTypeChange = (type: "fd" | "loan") => {
    setCalcType(type);
    if (type === "fd") {
      setRate(7.85);
      setAmount(100000);
      setTenureMonths(36);
    } else {
      setRate(8.25);
      setAmount(500000);
      setTenureMonths(60);
    }
  };

  // Calculations
  const calculateFD = () => {
    // Compound interest: A = P(1 + r/n)^(nt)
    const years = tenureMonths / 12;
    const maturity = amount * Math.pow(1 + rate / 100 / 4, 4 * years);
    const interestEarned = maturity - amount;
    return {
      total: Math.round(maturity),
      emi: 0,
      interest: Math.round(interestEarned),
      principal: amount,
    };
  };

  const calculateLoan = () => {
    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const monthlyRate = rate / 12 / 100;
    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - amount;

    return {
      total: Math.round(totalPayment),
      emi: Math.round(emi),
      interest: Math.round(totalInterest),
      principal: amount,
    };
  };

  const results = calcType === "fd" ? calculateFD() : calculateLoan();
  const interestPercentage = Math.round((results.interest / results.total) * 100);

  return (
    <section id="calculator" ref={sectionRef} className="py-24 md:py-32 bg-slate-50/60 relative overflow-hidden">
      {/* Background Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-red-100/40 via-white to-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#2DBA4E] text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Calculator className="w-3.5 h-3.5 text-[#2DBA4E]" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Returns & Loan EMIs
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Simulate your growth on Fixed Deposits or estimate low-interest monthly installments with MKSC Bank’s transparent financial calculator.
          </p>
        </div>

        {/* Main Interactive Calculator Card */}
        <div className="calc-card-container max-w-5xl mx-auto">
          <TiltCard maxRotation={6} className="p-8 md:p-12 bg-white border border-slate-200/90 shadow-soft-lg">
            
            {/* Mode Switcher Buttons */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <button
                onClick={() => handleCalcTypeChange("fd")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 ${
                  calcType === "fd"
                    ? "bg-[#ED1C24] text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Fixed Deposit Growth (FD)</span>
              </button>

              <button
                onClick={() => handleCalcTypeChange("loan")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 ${
                  calcType === "loan"
                    ? "bg-[#2DBA4E] text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Loan EMI Estimator</span>
              </button>
            </div>

            {/* Two Column Calculator Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Sliders & Controls (Col 1-7) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Amount Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-800">
                      {calcType === "fd" ? "Deposit Principal Amount" : "Required Loan Amount"}
                    </span>
                    <span className="font-mono font-extrabold text-base text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                      ₹{amount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={5000000}
                    step={10000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ED1C24]"
                  />
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>₹10,000</span>
                    <span>₹50,000,000</span>
                  </div>
                </div>

                {/* Tenure Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-800">Tenure Period</span>
                    <span className="font-mono font-extrabold text-base text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                      {tenureMonths} Months ({ (tenureMonths / 12).toFixed(1) } Yrs)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={120}
                    step={6}
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2DBA4E]"
                  />
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>6 Months</span>
                    <span>10 Years (120 Mos)</span>
                  </div>
                </div>

                {/* Interest Rate Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-800">Applicable Interest Rate (p.a.)</span>
                    <span className="font-mono font-extrabold text-base text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      {rate}% p.a.
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {calcType === "fd" ? (
                      <>
                        <button
                          onClick={() => setRate(7.85)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            rate === 7.85 ? "bg-[#ED1C24] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          7.85% (General FD)
                        </button>
                        <button
                          onClick={() => setRate(8.35)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            rate === 8.35 ? "bg-[#ED1C24] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          8.35% (Senior Citizen)
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setRate(8.25)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            rate === 8.25 ? "bg-[#2DBA4E] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          8.25% (Housing Loan)
                        </button>
                        <button
                          onClick={() => setRate(9.5)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            rate === 9.5 ? "bg-[#2DBA4E] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          9.50% (Personal Loan)
                        </button>
                        <button
                          onClick={() => setRate(5.0)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            rate === 5.0 ? "bg-[#2DBA4E] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          5.00% (Kudumbasree NHG)
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Results Card (Col 8-12) */}
              <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl border border-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Estimated Breakdown
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#2DBA4E] uppercase bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-700/50">
                    MKSC Verified
                  </span>
                </div>

                {calcType === "fd" ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold">Total Maturity Amount</div>
                      <div className="text-3xl md:text-4xl font-extrabold text-white font-mono mt-1">
                        ₹{results.total.toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-xs">
                      <div>
                        <div className="text-slate-400">Principal Amount</div>
                        <div className="text-base font-bold text-white font-mono mt-0.5">₹{amount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[#2DBA4E] font-bold">Interest Earned</div>
                        <div className="text-base font-bold text-[#2DBA4E] font-mono mt-0.5">₹{results.interest.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold">Estimated Monthly EMI</div>
                      <div className="text-3xl md:text-4xl font-extrabold text-[#2DBA4E] font-mono mt-1">
                        ₹{results.emi?.toLocaleString()} / mo
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-xs">
                      <div>
                        <div className="text-slate-400">Principal Capital</div>
                        <div className="text-base font-bold text-white font-mono mt-0.5">₹{amount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Total Interest Payable</div>
                        <div className="text-base font-bold text-amber-400 font-mono mt-0.5">₹{results.interest.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Animated Visual Interest Ratio Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Principal Capital</span>
                    <span>Interest Gain ({interestPercentage}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                    <div
                      className="h-full bg-[#ED1C24] transition-all duration-500"
                      style={{ width: `${100 - interestPercentage}%` }}
                    />
                    <div
                      className="h-full bg-[#2DBA4E] transition-all duration-500"
                      style={{ width: `${interestPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <MagneticButton href="#contact" variant="red" size="md" className="w-full justify-center">
                    <span>Apply for this Scheme</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </div>

            </div>

          </TiltCard>
        </div>

      </div>
    </section>
  );
}
