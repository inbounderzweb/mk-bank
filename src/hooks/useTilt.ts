"use client";

import { useRef, useState, MouseEvent } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

interface UseTiltOptions {
  maxRotation?: number; // max rotation angle in degrees
  scaleOnHover?: number;
}

export function useTilt(options: UseTiltOptions = {}) {
  const { maxRotation = 12, scaleOnHover = 1.03 } = options;
  const cardRef = useRef<HTMLDivElement | null>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX: MotionValue<number> = useSpring(rawRotateX, springConfig);
  const rotateY: MotionValue<number> = useSpring(rawRotateY, springConfig);
  const scale: MotionValue<number> = useSpring(rawScale, springConfig);

  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    // Check touch or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouse pos to -1 to +1 relative offset from center
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    // Tilt X rotates around horizontal axis (triggered by vertical Y movement)
    // Tilt Y rotates around vertical axis (triggered by horizontal X movement)
    rawRotateX.set(-yPct * maxRotation);
    rawRotateY.set(xPct * maxRotation);

    // Glare position moves opposite the tilt for physical realism
    const glareX = ((1 - mouseX / width) * 100).toFixed(1);
    const glareY = ((1 - mouseY / height) * 100).toFixed(1);

    setGlare({
      x: Number(glareX),
      y: Number(glareY),
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setIsHovered(true);
    rawScale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawScale.set(1);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return {
    cardRef,
    rotateX,
    rotateY,
    scale,
    glare,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
