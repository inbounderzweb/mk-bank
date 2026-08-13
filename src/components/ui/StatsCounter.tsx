"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatsCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  duration?: number;
}

export function StatsCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  sublabel,
  duration = 2000,
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="min-w-0 overflow-hidden flex flex-col items-start justify-center p-4 md:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all duration-300">
      <div className="w-full text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 flex flex-wrap items-baseline leading-tight gap-x-0.5">
        <span className="text-emerald-600 font-semibold">{prefix}</span>
        <span>{count.toLocaleString()}</span>
        <span className="text-emerald-600 font-semibold">{suffix}</span>
      </div>
      <div className="mt-2 text-sm md:text-base font-bold text-slate-800 tracking-wide">{label}</div>
      {sublabel && <div className="mt-0.5 text-xs text-slate-500 font-medium">{sublabel}</div>}
    </div>
  );
}
