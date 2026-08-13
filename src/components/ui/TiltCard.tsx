"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
  scaleOnHover?: number;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = "",
  maxRotation = 12,
  scaleOnHover = 1.025,
  onClick,
}: TiltCardProps) {
  const {
    cardRef,
    rotateX,
    rotateY,
    scale,
    glare,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useTilt({ maxRotation, scaleOnHover });

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={cn(
          "relative w-full h-full rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 transition-shadow duration-300 shadow-soft hover:shadow-tilt-hover cursor-pointer group overflow-hidden",
          className
        )}
      >
        {/* Dynamic Light Sweep Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(450px circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.7), transparent 60%)`,
          }}
        />

        {/* Ambient Top Border Gradient Accent with Red & Green Logo Palette */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ED1C24] via-emerald-500 to-[#2DBA4E] transition-opacity duration-300 z-20 rounded-t-2xl",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Card Body */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
