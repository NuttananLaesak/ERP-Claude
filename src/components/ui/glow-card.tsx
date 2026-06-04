"use client";

import { useRef, useState } from "react";

export function GlowCard({
  children,
  className = "",
  glowRgb = "99,102,241",
}: {
  children: React.ReactNode;
  className?: string;
  glowRgb?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, show: false });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top, show: true });
      }}
      onMouseLeave={() => setPos((p) => ({ ...p, show: false }))}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-[border-color,box-shadow] duration-300 ${className}`}
      style={
        pos.show
          ? {
              borderColor: `rgba(${glowRgb}, 0.22)`,
              boxShadow: `0 0 0 1px rgba(${glowRgb}, 0.08) inset`,
            }
          : undefined
      }
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: pos.show ? 1 : 0,
          background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, rgba(${glowRgb}, 0.07), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
