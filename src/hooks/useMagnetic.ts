"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

interface UseMagneticOptions {
  distance?: number;
  strength?: number;
}

export function useMagnetic(options: UseMagneticOptions = {}) {
  const { distance = 0.5, strength = 30 } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX: MotionValue<number> = useSpring(x, springConfig);
  const springY: MotionValue<number> = useSpring(y, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    // Skip on touch devices or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * distance);
    y.set(distanceY * distance);

    // Inner glow relative percentage
    const relativeX = ((e.clientX - left) / width) * 100;
    const relativeY = ((e.clientY - top) / height) * 100;
    setGlowPos({ x: relativeX, y: relativeY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    x: springX,
    y: springY,
    isHovered,
    glowPos,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
