import { auth } from "@/auth";

const fu = (ms: number) =>
  ({ animation: `fade-up .45s ease-out ${ms}ms both` }) as React.CSSProperties;

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return null;
  const { user } = session;

  const firstName = user.name?.split(" ")[0] ?? "there";
  const initials = (user.name ?? user.email ?? "U")
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const stats = [
    {
      label: "Projects",
      value: "12",
      sub: "+3 this week",
      up: true,
      color: "124,58,237",
      grad: "from-violet-600 to-purple-700",
      icon: "M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z",
    },
    {
      label: "Tasks done",
      value: "48",
      sub: "+12 this week",
      up: true,
      color: "6,182,212",
      grad: "from-cyan-600 to-teal-600",
      icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    },
    {
      label: "Uptime",
      value: "99.2%",
      sub: "+0.2% this month",
      up: true,
      color: "52,211,153",
      grad: "from-emerald-600 to-green-600",
      icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    },
    {
      label: "Team",
      value: "7",
      sub: "+1 this month",
      up: true,
      color: "217,70,239",
      grad: "from-fuchsia-600 to-pink-600",
      icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    },
  ];

  const activity = [
    { text: "Deployed v2.4.1 to production", time: "2m ago", color: "#34d399", tag: "Deploy", icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" },
    { text: "Merged PR #142 — auth updates", time: "47m ago", color: "#818cf8", tag: "Code", icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" },
    { text: "Database migration completed", time: "2h ago", color: "#06b6d4", tag: "DB", icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" },
    { text: "Resolved 3 critical issues", time: "5h ago", color: "#fb923c", tag: "Fix", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
    { text: "New team member joined", time: "1d ago", color: "#f472b6", tag: "Team", icon: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" },
    { text: "Scheduled maintenance window", time: "2d ago", color: "#a78bfa", tag: "Ops", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  const quickActions = [
    { label: "New Project", grad: "from-violet-600 to-indigo-600", color: "124,58,237", icon: "M12 4.5v15m7.5-7.5h-15" },
    { label: "Invite Member", grad: "from-cyan-600 to-teal-600", color: "6,182,212", icon: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" },
    { label: "Generate Report", grad: "from-fuchsia-600 to-pink-600", color: "217,70,239", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
  ];

  return (
    <div className="relative min-h-screen bg-[#030309] text-white overflow-hidden">
      {/* Background orbs — subtle, no particle spam */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-[20%] -left-[10%] h-[70vh] w-[60vw] rounded-full bg-violet-800/15 blur-[160px]"
          style={{ animation: "orb-a 14s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] h-[65vh] w-[55vw] rounded-full bg-cyan-600/10 blur-[180px]"
          style={{ animation: "orb-b 18s ease-in-out infinite" }}
        />
      </div>

      <main className="relative z-10 px-6 py-8 lg:py-10 max-w-[1400px] mx-auto">
        {/* ── Header ──────────────────────────── */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between" style={fu(60)}>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                style={{ animation: "glow-pulse 2s ease-in-out infinite", boxShadow: "0 0 6px rgba(52,211,153,.9)" }}
              />
              <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Overview</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-white/70">Good day, </span>
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #67e8f9)" }}
              >
                {firstName}
              </span>
            </h1>
            <p className="mt-1.5 text-sm text-white/30">
              Here&apos;s what&apos;s happening with your projects today.
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r ${a.grad} px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.04] hover:-translate-y-px`}
                style={{ boxShadow: `0 0 0 1px rgba(${a.color},.25), 0 4px 16px rgba(${a.color},.3)` }}
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(255,255,255,.07)" }} />
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
                </svg>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stat cards ──────────────────────── */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 transition-all duration-300 hover:border-white/[0.11] hover:bg-white/[0.04] hover:-translate-y-1 cursor-default"
              style={{ animation: `fade-up .45s ease-out ${120 + i * 65}ms both` }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 h-full w-[3px] rounded-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(180deg, rgba(${s.color},0) 0%, rgba(${s.color},.8) 50%, rgba(${s.color},0) 100%)` }}
              />
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.grad} transition-transform duration-300 group-hover:scale-110`}
                style={{ boxShadow: `0 4px 14px rgba(${s.color},.4)` }}
              >
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-white/35 mb-0.5">{s.label}</p>
                <p className="text-2xl font-bold text-white leading-none mb-2">{s.value}</p>
                <div className="flex items-center gap-1">
                  <svg
                    className={`h-3 w-3 ${s.up ? "text-emerald-400" : "text-red-400"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.up ? "M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" : "M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"} />
                  </svg>
                  <span className={`text-[11px] font-medium ${s.up ? "text-emerald-400" : "text-red-400"}`}>{s.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Content grid ────────────────────── */}
        <div className="grid gap-4 lg:grid-cols-3" style={fu(450)}>
          {/* Activity feed — 2 cols */}
          <div
            className="lg:col-span-2 rounded-2xl border border-white/[0.06] overflow-hidden"
            style={{ background: "linear-gradient(160deg, rgba(14,9,30,.85) 0%, rgba(6,4,16,.9) 100%)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.05] px-6 py-4" style={{ background: "rgba(255,255,255,.012)" }}>
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold text-white/80">Recent Activity</h2>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "glow-pulse 1.5s ease-in-out infinite" }} />
                  <span className="text-[10px] font-medium text-emerald-400">Live</span>
                </div>
              </div>
              <button className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 text-[10px] font-medium text-white/25 transition hover:text-white/55 hover:bg-white/[0.05]">
                View all
              </button>
            </div>

            {/* Items */}
            <div className="divide-y divide-white/[0.035]">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 px-6 py-3.5 transition-all duration-150 hover:bg-white/[0.025] cursor-default"
                  style={{ animation: `fade-up .4s ease-out ${550 + i * 50}ms both` }}
                >
                  {/* Tag badge */}
                  <span
                    className="shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}28` }}
                  >
                    {item.tag}
                  </span>
                  {/* Icon */}
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg opacity-55 group-hover:opacity-90 transition-opacity"
                    style={{ background: `${item.color}14`, border: `1px solid ${item.color}20` }}
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke={item.color} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <p className="flex-1 text-sm text-white/45 group-hover:text-white/70 transition-colors">{item.text}</p>
                  <span className="shrink-0 text-[11px] text-white/20">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            {/* Profile card */}
            <div
              className="rounded-2xl border border-white/[0.06] overflow-hidden"
              style={{ background: "linear-gradient(160deg, rgba(14,9,30,.85) 0%, rgba(6,4,16,.9) 100%)" }}
            >
              <div className="border-b border-white/[0.05] px-5 py-4" style={{ background: "rgba(255,255,255,.012)" }}>
                <h2 className="text-sm font-semibold text-white/80">My Profile</h2>
              </div>
              <div className="p-5 flex items-center gap-4">
                <div className="relative shrink-0">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      boxShadow: "0 0 0 1px rgba(124,58,237,.35), 0 4px 20px rgba(124,58,237,.4)",
                    }}
                  >
                    {initials}
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#030309] bg-emerald-500"
                    style={{ boxShadow: "0 0 6px rgba(52,211,153,.7)" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white/90 text-sm">{user.name ?? "User"}</p>
                  <p className="text-[11px] text-white/30 truncate">{user.email}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5">
                    <div className="h-1 w-1 rounded-full bg-violet-400" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-violet-300">Pro</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/[0.05] border-t border-white/[0.05]">
                {[{ label: "Projects", val: "12" }, { label: "Tasks", val: "48" }].map((m) => (
                  <div key={m.label} className="px-5 py-3.5">
                    <p className="text-lg font-bold text-white">{m.val}</p>
                    <p className="text-[10px] text-white/30">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status card */}
            <div
              className="rounded-2xl border border-white/[0.06] p-5 flex flex-col gap-4"
              style={{ background: "linear-gradient(160deg, rgba(14,9,30,.85) 0%, rgba(6,4,16,.9) 100%)" }}
            >
              <h2 className="text-sm font-semibold text-white/80">System Status</h2>
              {[
                { label: "API", status: "Operational", ok: true },
                { label: "Database", status: "Operational", ok: true },
                { label: "CDN", status: "Degraded", ok: false },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: s.ok ? "#34d399" : "#fb923c",
                        boxShadow: `0 0 6px ${s.ok ? "rgba(52,211,153,.7)" : "rgba(251,146,60,.7)"}`,
                      }}
                    />
                    <span className="text-sm text-white/60">{s.label}</span>
                  </div>
                  <span className={`text-xs font-medium ${s.ok ? "text-emerald-400" : "text-orange-400"}`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
