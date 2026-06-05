"use client";

import { motion } from "framer-motion";
import { logout } from "@/actions/auth";

function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function LogoutCard({ i }: { i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      whileHover={{ scale: 1.03 }}
    >
      <form action={logout} className="h-full">
        <button
          type="submit"
          className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-rose-500/10 bg-rose-500/[0.04] p-5 text-left transition-colors hover:border-rose-500/20 hover:bg-rose-500/[0.07]"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="inline-flex rounded-lg p-2 bg-rose-500/10 text-rose-400">
              <LogoutIcon />
            </div>
          </div>
          <p className="text-sm font-semibold text-white/75 transition-colors group-hover:text-white/90">Logout</p>
          <p className="mt-0.5 text-xs text-white/35">Sign out of your account</p>
        </button>
      </form>
    </motion.div>
  );
}
