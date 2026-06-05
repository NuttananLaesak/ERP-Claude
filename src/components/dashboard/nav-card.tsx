"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export type NavCardProps = {
  href: string;
  label: string;
  description: string;
  stat: string;
  iconColor: string;
  icon: React.ReactNode;
  i: number;
};

export function NavCard({ href, label, description, stat, iconColor, icon, i }: NavCardProps) {
  const [entered, setEntered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onAnimationComplete={() => setEntered(true)}
      transition={
        entered
          ? { duration: 0.2, ease: "easeOut" }
          : { duration: 0.4, delay: 0.18 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
      }
      whileHover={{ scale: 1.03 }}
    >
      <Link
        href={href}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05]"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className={`inline-flex rounded-lg p-2.5 [&>svg]:h-5 [&>svg]:w-5 ${iconColor}`}>{icon}</div>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/50"
          >
            <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-white/75 transition-colors group-hover:text-white/90">{label}</p>
        <p className="mt-0.5 text-xs text-white/35">{description}</p>
        <p className={`mt-3 text-lg font-semibold ${iconColor.replace("bg-", "text-").split(" ")[1]}`}>{stat}</p>
      </Link>
    </motion.div>
  );
}
