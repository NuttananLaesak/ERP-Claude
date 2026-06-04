"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className={`fixed left-4 top-4 z-50 rounded-lg p-2 text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white/80 md:hidden ${mobileOpen ? "hidden" : ""}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`group fixed left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-hidden border-r border-white/[0.06] bg-[#07070f] transition-[transform,width] duration-300 ease-in-out md:relative md:w-20 md:hover:w-64 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-white/[0.06]">
          <div className="flex w-20 shrink-0 justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20">
              <span className="text-sm font-bold text-indigo-400">M</span>
            </div>
          </div>
          <span className="whitespace-nowrap pr-4 text-sm font-semibold text-white/80 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100">
            MyApp
          </span>
        </div>

        {/* Mobile close */}
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className="absolute right-3 top-4 rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70 md:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 overflow-hidden px-2 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center rounded-xl py-3 transition-colors ${
                  active
                    ? "bg-white/[0.08] text-white"
                    : "text-white/45 hover:bg-white/[0.05] hover:text-white/80"
                }`}
              >
                {/* icon container — w-16 = w-20 sidebar minus px-2 each side */}
                <span className="flex w-16 shrink-0 justify-center">{item.icon}</span>
                <span className="whitespace-nowrap text-sm font-medium md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="shrink-0 border-t border-white/[0.06] px-2 py-4">
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center rounded-xl py-3 text-white/45 transition-colors hover:bg-red-400/[0.08] hover:text-red-400"
            >
              <span className="flex w-16 shrink-0 justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </span>
              <span className="whitespace-nowrap text-sm font-medium md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100">
                Sign out
              </span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
