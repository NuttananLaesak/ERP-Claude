"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: string;
  up: boolean;
  color: string;
  glowRgb: string;
  sparkline: number[];
  icon: React.ReactNode;
};

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1200, bounce: 0 });

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (!ref.current) return;
      const formatted = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
      ref.current.textContent = prefix + formatted + suffix;
    });
  }, [spring, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const W = 72, H = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 4) - 2}`)
    .join(" ");
  return (
    <svg width={W} height={H} className="opacity-70">
      <polyline
        points={pts}
        fill="none"
        stroke={up ? "#34d399" : "#f87171"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatCard({ s, i }: { s: Stat; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, show: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top, show: true });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={() => setGlow((p) => ({ ...p, show: false }))}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative cursor-default overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5"
      style={{
        boxShadow: glow.show ? `0 8px 32px rgba(${s.glowRgb}, 0.18)` : undefined,
        borderColor: glow.show ? `rgba(${s.glowRgb}, 0.3)` : undefined,
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
    >
      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: glow.show ? 1 : 0,
          background: `radial-gradient(180px circle at ${glow.x}px ${glow.y}px, rgba(${s.glowRgb}, 0.08), transparent 70%)`,
        }}
      />

      {/* Top gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${s.glowRgb}, 0.6), transparent)` }}
      />
      <div
        className="absolute inset-x-0 top-0 h-6"
        style={{ background: `linear-gradient(180deg, rgba(${s.glowRgb}, 0.06), transparent)` }}
      />

      {/* Header row */}
      <div className="mb-3 flex items-start justify-between">
        <div className={`rounded-lg p-2 ${s.color}`}>{s.icon}</div>
        <Sparkline data={s.sparkline} up={s.up} />
      </div>

      <p className="text-xs font-medium text-white/40">{s.label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-white/90">
        <AnimatedNumber
          value={s.value}
          prefix={s.prefix}
          suffix={s.suffix}
          decimals={s.decimals}
        />
      </p>
      <p className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${s.up ? "text-emerald-400" : "text-red-400"}`}>
        <span>{s.up ? "↑" : "↓"}</span>
        {s.change}
        <span className="text-white/30 font-normal">vs last month</span>
      </p>
    </motion.div>
  );
}

const STATS: Stat[] = [
  {
    label: "Total Revenue",
    prefix: "$",
    value: 48295,
    suffix: "",
    change: "12.5%",
    up: true,
    color: "bg-indigo-500/15 text-indigo-400",
    glowRgb: "99,102,241",
    sparkline: [28, 35, 30, 42, 38, 50, 48],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Active Users",
    prefix: "",
    value: 2847,
    suffix: "",
    change: "8.2%",
    up: true,
    color: "bg-emerald-500/15 text-emerald-400",
    glowRgb: "52,211,153",
    sparkline: [2100, 2300, 2200, 2500, 2600, 2750, 2847],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "New Orders",
    prefix: "",
    value: 384,
    suffix: "",
    change: "3.1%",
    up: true,
    color: "bg-sky-500/15 text-sky-400",
    glowRgb: "56,189,248",
    sparkline: [310, 340, 295, 360, 370, 355, 384],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "Conversion Rate",
    prefix: "",
    value: 3.24,
    suffix: "%",
    decimals: 2,
    change: "0.4%",
    up: false,
    color: "bg-rose-500/15 text-rose-400",
    glowRgb: "251,113,133",
    sparkline: [3.8, 3.6, 3.9, 3.5, 3.4, 3.3, 3.24],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

export function AnimatedStats() {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <StatCard key={s.label} s={s} i={i} />
      ))}
    </div>
  );
}
