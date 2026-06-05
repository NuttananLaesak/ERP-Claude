"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const orders = [
  { id: "#ORD-4821", customer: "Alice Johnson", amount: "$240.00", status: "Completed", date: "Jun 3, 2026" },
  { id: "#ORD-4820", customer: "Marcus Lee", amount: "$89.50", status: "Pending", date: "Jun 3, 2026" },
  { id: "#ORD-4819", customer: "Sara Okonkwo", amount: "$512.00", status: "Completed", date: "Jun 2, 2026" },
  { id: "#ORD-4818", customer: "Tom Rivera", amount: "$34.99", status: "Cancelled", date: "Jun 2, 2026" },
  { id: "#ORD-4817", customer: "Priya Nair", amount: "$175.00", status: "Completed", date: "Jun 1, 2026" },
];

const products = [
  { name: "Pro Plan", sales: 1240, pct: 88, color: "from-indigo-500 to-violet-500" },
  { name: "Starter Plan", sales: 870, pct: 62, color: "from-sky-500 to-blue-500" },
  { name: "Enterprise Plan", sales: 340, pct: 24, color: "from-emerald-500 to-teal-500" },
  { name: "Add-on: Analytics", sales: 210, pct: 15, color: "from-amber-500 to-orange-500" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  Completed: { label: "Completed", className: "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20" },
  Pending:   { label: "Pending",   className: "bg-amber-400/10  text-amber-400  ring-1 ring-amber-400/20"  },
  Cancelled: { label: "Cancelled", className: "bg-red-400/10    text-red-400    ring-1 ring-red-400/20"    },
};

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: 0.25 + i * 0.06, ease: "easeOut" as const },
  }),
};

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

export function DashboardGrid() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {/* Orders table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] xl:col-span-2"
      >
        <div className="border-b border-white/[0.06] px-6 py-4">
          <h2 className="text-sm font-semibold text-white/80">Recent Orders</h2>
          <p className="mt-0.5 text-xs text-white/30">Last 5 transactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {["Order", "Customer", "Amount", "Status", "Date"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-white/25 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody initial="hidden" animate="show">
              {orders.map((o, i) => (
                <motion.tr
                  key={o.id}
                  custom={i}
                  variants={rowVariants}
                  className="group border-b border-white/[0.04] transition-colors hover:bg-white/[0.025]"
                >
                  <td className="px-6 py-4 font-mono text-xs text-white/45 group-hover:text-white/60 transition-colors">{o.id}</td>
                  <td className="px-6 py-4 text-white/70 group-hover:text-white/85 transition-colors">{o.customer}</td>
                  <td className="px-6 py-4 font-medium text-white/75">{o.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[o.status].className}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/30 text-xs">{o.date}</td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>

      {/* Top products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.26, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className="rounded-2xl border border-white/[0.07] bg-white/[0.03]"
      >
        <div className="border-b border-white/[0.06] px-6 py-4">
          <h2 className="text-sm font-semibold text-white/80">Top Products</h2>
          <p className="mt-0.5 text-xs text-white/30">By sales volume</p>
        </div>
        <div className="space-y-6 p-6">
          {products.map((p, i) => (
            <div key={p.name}>
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-sm font-medium text-white/70">{p.name}</span>
                <span className="text-xs tabular-nums text-white/35">{p.sales.toLocaleString()}</span>
              </div>
              <AnimatedBar pct={p.pct} color={p.color} i={i} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
