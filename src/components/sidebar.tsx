"use client";

import { useState } from "react";
import { logout } from "@/actions/auth";

type User = { name?: string | null; email?: string | null };

const NAV = [
  {
    section: "Main",
    items: [
      {
        label: "Dashboard",
        icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
      },
      {
        label: "Projects",
        icon: "M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z",
      },
      {
        label: "Analytics",
        icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        label: "Settings",
        icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z",
      },
    ],
  },
];

const sidebarBg = {
  background:
    "linear-gradient(180deg, rgba(14,9,35,0.99) 0%, rgba(6,4,18,0.99) 100%)",
  borderRight: "1px solid rgba(255,255,255,0.07)",
};

function Icon({ d }: { d: string }) {
  return (
    <svg
      className="h-[18px] w-[18px] shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function SidebarInner({
  user,
  activeItem,
  onClose,
}: {
  user: User;
  activeItem: string;
  onClose?: () => void;
}) {
  const initials = (user.name ?? user.email ?? "U")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-[18px]">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "linear-gradient(145deg, #7c3aed, #0e7490)",
              boxShadow: "0 0 0 1px rgba(124,58,237,.35), 0 4px 14px rgba(124,58,237,.4)",
            }}
          >
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <span
            className="text-sm font-bold tracking-tight text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #e2d9f3, #a5f3fc)" }}
          >
            MyApp
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-white/40 transition hover:bg-white/[0.07] hover:text-white/70"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {NAV.map((group) => (
          <div key={group.section}>
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/20">
              {group.section}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = activeItem === item.label;
                return (
                  <button
                    key={item.label}
                    className={`group relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                      active
                        ? "text-white"
                        : "text-white/40 hover:text-white/75 hover:bg-white/[0.04]"
                    }`}
                    style={
                      active
                        ? {
                            background: "rgba(124,58,237,.14)",
                            border: "1px solid rgba(124,58,237,.22)",
                          }
                        : { border: "1px solid transparent" }
                    }
                  >
                    {active && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-[18px] w-[3px] rounded-r-full bg-violet-400"
                        style={{ boxShadow: "0 0 10px rgba(167,139,250,.9)" }}
                      />
                    )}
                    <span className={active ? "text-violet-300" : "text-white/35 group-hover:text-white/60 transition-colors"}>
                      <Icon d={item.icon} />
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-white/[0.06] p-3">
        {/* User row */}
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 mb-1">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              boxShadow: "0 0 0 1px rgba(124,58,237,.3)",
            }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-semibold text-white/80">{user.name ?? "User"}</p>
            <p className="truncate text-[10px] text-white/35">{user.email}</p>
          </div>
          <div
            className="h-2 w-2 shrink-0 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 6px rgba(52,211,153,.8)" }}
          />
        </div>

        {/* Sign out */}
        <form action={logout}>
          <button
            type="submit"
            className="group w-full flex items-center gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-xs font-medium text-white/35 transition-all hover:border-red-400/25 hover:bg-red-400/8 hover:text-red-400"
          >
            <svg
              className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

export function Sidebar({
  user,
  activeItem = "Dashboard",
}: {
  user: User;
  activeItem?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      {!mobileOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-black/70 backdrop-blur text-white/50 transition hover:text-white hover:bg-white/[0.08]"
          onClick={() => setMobileOpen(true)}
          style={{ boxShadow: "0 0 0 1px rgba(124,58,237,.18)" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      )}

      {/* Desktop — fixed 256px */}
      <aside
        className="hidden lg:block flex-shrink-0 w-64 h-screen sticky top-0"
        style={sidebarBg}
      >
        <SidebarInner user={user} activeItem={activeItem} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64"
            style={sidebarBg}
          >
            <SidebarInner
              user={user}
              activeItem={activeItem}
              onClose={() => setMobileOpen(false)}
            />
          </aside>
        </>
      )}
    </>
  );
}
