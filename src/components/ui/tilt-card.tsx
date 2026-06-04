"use client";

import React, { useRef, MouseEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
}

export function TiltCard({ children, className = "", style, intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`;
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: "transform 0.15s ease-out", willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
