"use client";

import { useState } from "react";
import { logout } from "@/actions/auth";

type User = { name?: string | null; email?: string | null };

const navItems = [
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
  {
    label: "Settings",
    icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z",
  },
];

const sidebarStyle = {
  background:
    "linear-gradient(180deg, rgba(17,10,40,0.98) 0%, rgba(7,5,20,0.98) 100%)",
  borderRight: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 40px rgba(0,0,0,0.45)",
  backdropFilter: "blur(20px)",
};

export function Sidebar({
  user,
  activeItem = "Dashboard",
}: {
  user: User;
  activeItem?: string;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = (user.name ?? user.email ?? "U")
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const renderInner = (isCollapsed: boolean, isMobile = false) => (
    <>
      {/* Brand row */}
      <div
        className={`flex items-center border-b border-white/[0.06] py-4 ${
          isCollapsed ? "justify-center px-3" : "justify-between px-4"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #12093a, #070420)",
              boxShadow:
                "0 0 0 1px rgba(124,58,237,.3), 0 0 12px rgba(124,58,237,.3)",
            }}
          >
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </div>
          {!isCollapsed && (
            <span
              className="text-sm font-bold text-transparent bg-clip-text whitespace-nowrap"
              style={{
                backgroundImage: "linear-gradient(135deg, #e2d9f3, #a5f3fc)",
              }}
            >
              MyApp
            </span>
          )}
        </div>

        {/* Mobile close */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-white transition-all hover:bg-white/[0.07]"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = activeItem === item.label;
          return (
            <button
              key={item.label}
              className={`group relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active ? "text-white" : "text-white hover:bg-white/[0.05]"
              } ${isCollapsed ? "justify-center" : ""}`}
              style={
                active
                  ? {
                      background: "rgba(124,58,237,.18)",
                      border: "1px solid rgba(124,58,237,.28)",
                      boxShadow: "0 0 12px rgba(124,58,237,.12)",
                    }
                  : { border: "1px solid transparent" }
              }
              title={isCollapsed ? item.label : undefined}
            >
              {active && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-violet-400"
                  style={{ boxShadow: "0 0 8px rgba(167,139,250,.8)" }}
                />
              )}
              <svg
                className="h-4 w-4 shrink-0 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                />
              </svg>
              {!isCollapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User + sign out */}
      <div className="border-t border-white/[0.06] p-3 space-y-2">
        <div
          className={`flex items-center gap-3 rounded-xl p-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              boxShadow: "0 0 0 1px rgba(124,58,237,.3)",
            }}
          >
            {initials}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">
                {user.name ?? "User"}
              </p>
              <p className="text-[10px] text-white/60 truncate">{user.email}</p>
            </div>
          )}
        </div>

        <form action={logout}>
          <button
            type="submit"
            className={`group w-full flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs text-white transition-all hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400 ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Sign out" : undefined}
          >
            <svg
              className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            {!isCollapsed && "Sign out"}
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      {!mobileOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-black/70 backdrop-blur text-white/60 transition-all hover:text-white hover:bg-white/[0.1]"
          onClick={() => setMobileOpen(true)}
          style={{ boxShadow: "0 0 0 1px rgba(124,58,237,.2)" }}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}

      {/* Desktop sidebar — hover to expand */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 sticky top-0 h-screen overflow-hidden transition-all duration-300 ease-in-out ${
          collapsed ? "w-[72px]" : "w-64"
        }`}
        style={sidebarStyle}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        {renderInner(collapsed)}
      </aside>

      {/* Mobile overlay + sidebar */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col"
            style={sidebarStyle}
          >
            {renderInner(false, true)}
          </aside>
        </>
      )}
    </>
  );
}
