"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent" | "red" | "green";
  size?: "sm" | "md" | "lg";
  distance?: number;
  strength?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "red",
  size = "md",
  distance = 0.45,
  strength = 25,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const {
    ref,
    x,
    y,
    isHovered,
    glowPos,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useMagnetic({ distance, strength });

  const variantStyles = {
    red: "bg-[#ED1C24] text-white hover:bg-[#d0141b] shadow-md hover:shadow-red-500/20 border border-red-500/20",
    green: "bg-[#2DBA4E] text-white hover:bg-[#239b3b] shadow-md hover:shadow-green-500/20 border border-green-500/20",
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-xl border border-slate-900/10",
    accent: "bg-[#2DBA4E] text-white hover:bg-[#239b3b] shadow-md hover:shadow-green-600/20 border border-green-500/20",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200/80 shadow-sm",
    outline: "bg-white/90 backdrop-blur-md text-slate-900 border border-slate-300 hover:border-[#ED1C24] hover:text-[#ED1C24] shadow-sm",
    ghost: "bg-transparent text-slate-700 hover:text-[#ED1C24] hover:bg-slate-100/80",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs font-semibold rounded-full gap-1.5",
    md: "px-6 py-3 text-sm font-semibold rounded-full gap-2",
    lg: "px-8 py-4 text-base font-bold rounded-full gap-3",
  };

  const Content = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-flex items-center justify-center cursor-pointer transition-colors duration-200 overflow-hidden select-none group",
        variantStyles[variant],
        sizeStyles[size],
        disabled && "pointer-events-none opacity-60",
        className
      )}
    >
      {/* Dynamic Cursor Radial Glow inside button */}
      <span
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.3), transparent 70%)`,
        }}
      />

      {/* Inner Label Translation */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{ scale: isHovered ? 1.03 : 1 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {Content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-block bg-transparent p-0 border-0 outline-none disabled:cursor-not-allowed"
    >
      {Content}
    </button>
  );
}
