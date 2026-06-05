"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export type DeptBar = {
  name: string;
  count: number;
  pct: number;
};

const deptColors = [
  "from-indigo-500 to-violet-500",
  "from-sky-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
];

function AnimatedBar({ pct, color, i }: { pct: number; color: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
  );
}

export function DeptPanel({ departments, className }: { departments: DeptBar[]; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className={`flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] ${className ?? ""}`}
    >
      <div className="shrink-0 border-b border-white/[0.06] px-6 py-4">
        <h2 className="text-sm font-semibold text-white/80">By Department</h2>
        <p className="mt-0.5 text-xs text-white/30">Employee distribution</p>
      </div>
      {departments.length === 0 ? (
        <div className="px-6 py-12 text-center text-sm text-white/30">No departments yet</div>
      ) : (
        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {departments.map((d, i) => (
            <div key={d.name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white/70">{d.name}</span>
                <span className="text-xs tabular-nums text-white/35">
                  {d.count} {d.count === 1 ? "emp" : "emps"}
                </span>
              </div>
              <AnimatedBar pct={d.pct} color={deptColors[i % deptColors.length]} i={i} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
