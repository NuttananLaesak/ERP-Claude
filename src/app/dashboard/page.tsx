import { auth } from "@/auth";
const fu = (ms: number) =>
  ({ animation: `fade-up .5s ease-out ${ms}ms both` }) as React.CSSProperties;

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return null;
  const { user } = session;

  const initials = (user.name ?? user.email ?? "U")
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const firstName = user.name?.split(" ")[0] ?? "there";

  const stats = [
    {
      label: "Projects",
      value: "12",
      change: "+3",
      up: true,
      grad: "from-violet-600 via-purple-600 to-indigo-600",
      glow: "124,58,237",
      pct: 75,
    },
    {
      label: "Tasks done",
      value: "48",
      change: "+12",
      up: true,
      grad: "from-cyan-500 via-teal-500 to-emerald-500",
      glow: "6,182,212",
      pct: 88,
    },
    {
      label: "Uptime",
      value: "99%",
      change: "+0.2%",
      up: true,
      grad: "from-amber-500 via-orange-500 to-rose-500",
      glow: "249,115,22",
      pct: 99,
    },
    {
      label: "Team",
      value: "7",
      change: "+1",
      up: true,
      grad: "from-fuchsia-600 via-pink-600 to-rose-600",
      glow: "217,70,239",
      pct: 58,
    },
  ];

  const statIcons = [
    "M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z",
    "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
    "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
  ];

  const activity = [
    {
      text: "Deployed v2.4.1 to production",
      time: "2m ago",
      dot: "#34d399",
      tag: "deploy",
      icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z",
    },
    {
      text: "Merged PR #142 — auth updates",
      time: "47m ago",
      dot: "#818cf8",
      tag: "code",
      icon: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
    },
    {
      text: "Database migration completed",
      time: "2h ago",
      dot: "#06b6d4",
      tag: "db",
      icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
    },
    {
      text: "Resolved 3 critical issues",
      time: "5h ago",
      dot: "#fb923c",
      tag: "fix",
      icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    },
    {
      text: "New team member joined",
      time: "1d ago",
      dot: "#f472b6",
      tag: "team",
      icon: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z",
    },
  ];

  const quickActions = [
    {
      label: "New Project",
      grad: "from-violet-600 to-indigo-600",
      glow: "124,58,237",
      icon: "M12 4.5v15m7.5-7.5h-15",
    },
    {
      label: "Invite",
      grad: "from-cyan-600 to-teal-600",
      glow: "6,182,212",
      icon: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z",
    },
    {
      label: "Report",
      grad: "from-fuchsia-600 to-pink-600",
      glow: "217,70,239",
      icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
    },
  ];

  const meteors = [
    { top: "6%", left: "68%", delay: "0s", dur: "3s" },
    { top: "20%", left: "82%", delay: "1.6s", dur: "2.5s" },
    { top: "3%", left: "91%", delay: "3.1s", dur: "3.5s" },
    { top: "35%", left: "97%", delay: "0.8s", dur: "2.8s" },
    { top: "55%", left: "76%", delay: "4s", dur: "3.2s" },
    { top: "70%", left: "88%", delay: "2.2s", dur: "2.6s" },
  ];

  const dust = [
    { top: "10%", left: "8%", s: 2.5, d: "0s", t: "6s", a: "float-y", c: 0 },
    { top: "18%", left: "25%", s: 2, d: "1.3s", t: "8s", a: "orb-c", c: 1 },
    { top: "28%", left: "85%", s: 3, d: "0.6s", t: "9s", a: "orb-b", c: 2 },
    { top: "42%", left: "5%", s: 2.5, d: "2.4s", t: "6s", a: "float-y", c: 3 },
    { top: "55%", left: "93%", s: 2, d: "1.8s", t: "10s", a: "float-y", c: 4 },
    { top: "65%", left: "72%", s: 3.5, d: "0.3s", t: "7s", a: "orb-b", c: 5 },
    { top: "78%", left: "18%", s: 2, d: "3.2s", t: "6s", a: "float-y", c: 6 },
    { top: "90%", left: "52%", s: 2.5, d: "1s", t: "9s", a: "orb-c", c: 7 },
    { top: "8%", left: "44%", s: 3, d: "2.7s", t: "7s", a: "orb-c", c: 0 },
    { top: "33%", left: "62%", s: 2, d: "3.9s", t: "8s", a: "float-y", c: 1 },
    { top: "48%", left: "35%", s: 2.5, d: "1.2s", t: "6s", a: "orb-a", c: 2 },
    { top: "72%", left: "46%", s: 2, d: "4.3s", t: "10s", a: "orb-a", c: 3 },
    { top: "22%", left: "78%", s: 3, d: "0.4s", t: "6s", a: "float-y", c: 4 },
    { top: "60%", left: "15%", s: 2, d: "3s", t: "7s", a: "orb-c", c: 5 },
    { top: "86%", left: "90%", s: 2.5, d: "1.8s", t: "8s", a: "orb-b", c: 6 },
  ] as const;

  const dustColors: Record<number, string> = {
    0: "rgba(167,139,250,.65)",
    1: "rgba(103,232,249,.65)",
    2: "rgba(232,121,249,.6)",
    3: "rgba(52,211,153,.6)",
    4: "rgba(251,191,36,.55)",
    5: "rgba(251,113,133,.6)",
    6: "rgba(56,189,248,.6)",
    7: "rgba(129,140,248,.6)",
  };
  const dustGlow: Record<number, string> = {
    0: "rgba(167,139,250,.5)",
    1: "rgba(103,232,249,.5)",
    2: "rgba(232,121,249,.45)",
    3: "rgba(52,211,153,.45)",
    4: "rgba(251,191,36,.4)",
    5: "rgba(251,113,133,.45)",
    6: "rgba(56,189,248,.45)",
    7: "rgba(129,140,248,.5)",
  };

  return (
    <div className="relative min-h-screen bg-[#030309] text-white overflow-hidden">
      {/* ── Background orbs ───────────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-[30%] -left-[15%] h-[85vh] w-[70vw] rounded-full bg-violet-700/20 blur-[150px]"
          style={{ animation: "orb-a 12s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-[25%] -right-[15%] h-[75vh] w-[65vw] rounded-full bg-cyan-500/14 blur-[160px]"
          style={{ animation: "orb-b 15s ease-in-out infinite" }}
        />
        <div
          className="absolute top-[30%] right-[-8%] h-[50vh] w-[42vw] rounded-full bg-fuchsia-600/11 blur-[120px]"
          style={{ animation: "orb-c 18s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[10%] left-[-5%] h-[40vh] w-[38vw] rounded-full bg-indigo-500/10 blur-[110px]"
          style={{ animation: "orb-d 10s ease-in-out infinite" }}
        />
      </div>

      {/* ── Radial vignette ───────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 30%, #030309 100%)",
        }}
      />

      {/* ── Meteors ───────────────────────────────── */}
      {meteors.map((m, i) => (
        <div
          key={i}
          className="pointer-events-none fixed overflow-hidden"
          style={{ top: m.top, left: m.left, width: "180px", height: "1px" }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(167,139,250,.8) 50%, rgba(6,182,212,.6) 80%, rgba(255,255,255,0) 100%)",
              animation: `meteor ${m.dur} ease-in ${m.delay} infinite`,
              animationFillMode: "both",
              boxShadow: "0 0 4px rgba(167,139,250,.5)",
            }}
          />
        </div>
      ))}

      {/* ── Dust ──────────────────────────────────── */}
      {dust.map((p, i) => (
        <div
          key={i}
          className="pointer-events-none fixed rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.s * 2.5}px`,
            height: `${p.s * 2.5}px`,
            background: dustColors[p.c],
            animation: `${p.a} ${p.t} ease-in-out ${p.d} infinite`,
            boxShadow: `0 0 ${p.s * 7}px ${dustGlow[p.c]}`,
            opacity: 0.85,
          }}
        />
      ))}

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-10 lg:py-10">
        {/* ── Hero ────────────────────────────────── */}
        <div
          className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
          style={fu(80)}
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 mb-3">
              <span
                className="h-1.5 w-1.5 rounded-full bg-violet-400"
                style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
              />
              Dashboard overview
            </span>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-white">Good day, </span>
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #a78bfa, #67e8f9, #f0abfc)",
                }}
              >
                {firstName} ✦
              </span>
            </h1>
            <p className="mt-2 text-sm text-white/35">
              Here&apos;s what&apos;s happening with your projects today.
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r ${a.grad} px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.05] hover:-translate-y-0.5`}
                style={{
                  boxShadow: `0 0 0 1px rgba(${a.glow},.3), 0 6px 20px rgba(${a.glow},.35)`,
                }}
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(255,255,255,.08)" }}
                />
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: "rgba(255,255,255,.2)" }}
                />
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={a.icon}
                  />
                </svg>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stats ───────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 transition-all duration-300 hover:border-white/[0.13] hover:bg-white/[0.045] hover:-translate-y-1.5 hover:shadow-2xl cursor-default"
              style={{
                animation: `fade-up .5s ease-out ${160 + i * 70}ms both`,
              }}
            >
              {/* Hover corner bloom */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-25"
                style={{ background: `rgb(${s.glow})` }}
              />
              {/* Bottom bar progress */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.04]" />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-700 group-hover:opacity-100 opacity-60"
                style={{
                  width: `${s.pct}%`,
                  background: `linear-gradient(90deg, rgba(${s.glow},.6), rgba(${s.glow},1))`,
                  boxShadow: `0 0 8px rgba(${s.glow},.6)`,
                }}
              />

              {/* Icon */}
              <div
                className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.grad} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                style={{ boxShadow: `0 6px 20px rgba(${s.glow},.45)` }}
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={statIcons[i]}
                  />
                </svg>
              </div>

              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="mt-0.5 text-xs font-medium text-white/45">
                {s.label}
              </p>

              <div className="mt-3 flex items-center gap-1">
                <svg
                  className={`h-3 w-3 ${s.up ? "text-emerald-400" : "text-red-400"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      s.up
                        ? "M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                        : "M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    }
                  />
                </svg>
                <span
                  className={`text-xs font-semibold ${s.up ? "text-emerald-400" : "text-red-400"}`}
                >
                  {s.change}
                </span>
                <span className="text-xs text-white/20">this week</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom grid ─────────────────────────── */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3" style={fu(500)}>
          {/* Activity feed */}
          <div
            className="lg:col-span-2 rounded-2xl border border-white/[0.06] overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(14,10,28,.8) 0%, rgba(6,4,18,.9) 100%)",
            }}
          >
            {/* Feed header */}
            <div
              className="flex items-center justify-between border-b border-white/[0.05] px-6 py-4"
              style={{ background: "rgba(255,255,255,.015)" }}
            >
              <h2 className="text-sm font-semibold text-white/80">
                Recent Activity
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                    style={{
                      animation: "glow-pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  <span className="text-xs text-emerald-400">Live</span>
                </div>
                <button className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/30 transition hover:text-white/60 hover:bg-white/[0.06]">
                  View all
                </button>
              </div>
            </div>

            <div className="p-4 space-y-1.5">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 transition-all duration-200 hover:border-white/[0.07] hover:bg-white/[0.035] hover:translate-x-1 cursor-default"
                  style={{
                    animation: `slide-in-right .4s ease-out ${600 + i * 60}ms both`,
                  }}
                >
                  {/* Color dot */}
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-[1.8]"
                    style={{
                      background: item.dot,
                      boxShadow: `0 0 7px ${item.dot}`,
                    }}
                  />
                  {/* Tag icon */}
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `${item.dot}1a`,
                      border: `1px solid ${item.dot}22`,
                    }}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={item.dot}
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <span className="flex-1 text-sm text-white/50 group-hover:text-white/75 transition-colors">
                    {item.text}
                  </span>
                  <span className="shrink-0 text-xs text-white/20">
                    {item.time}
                  </span>
                  <svg
                    className="h-3.5 w-3.5 text-white/10 opacity-0 transition-opacity group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Profile card */}
          <div
            className="rounded-2xl border border-white/[0.06] overflow-hidden"
            style={{
              ...fu(560),
              background:
                "linear-gradient(160deg, rgba(14,10,28,.8) 0%, rgba(6,4,18,.9) 100%)",
            }}
          >
            <div
              className="border-b border-white/[0.05] px-6 py-4"
              style={{ background: "rgba(255,255,255,.015)" }}
            >
              <h2 className="text-sm font-semibold text-white/80">
                My Profile
              </h2>
            </div>

            <div className="p-6 flex flex-col items-center gap-4 text-center">
              {/* Avatar */}
              <div className="relative">
                {/* Outer ring */}
                <div
                  className="absolute inset-[-6px] rounded-[26px] border border-violet-500/20"
                  style={{ animation: "pulse-ring 4s ease-out infinite" }}
                />
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    boxShadow:
                      "0 0 0 1px rgba(124,58,237,.35), 0 0 30px rgba(124,58,237,.45), 0 0 60px rgba(6,182,212,.15)",
                    animation: "glow-pulse 3s ease-in-out infinite",
                  }}
                >
                  {initials}
                </div>
                {/* Online badge */}
                <div
                  className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#030309] bg-emerald-500"
                  style={{ boxShadow: "0 0 8px rgba(52,211,153,.7)" }}
                >
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>

              <div>
                <p className="font-semibold text-white">
                  {user.name ?? "User"}
                </p>
                <p className="mt-0.5 text-xs text-white/30 break-all">
                  {user.email}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5">
                  <div
                    className="h-1.5 w-1.5 rounded-full bg-violet-400"
                    style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
                  />
                  <span className="text-[10px] font-medium text-violet-300">
                    Pro member
                  </span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="w-full grid grid-cols-2 gap-2">
                {[
                  {
                    label: "Projects",
                    val: "12",
                    glow: "124,58,237",
                    grad: "from-violet-600 to-purple-600",
                  },
                  {
                    label: "Tasks",
                    val: "48",
                    glow: "6,182,212",
                    grad: "from-cyan-600 to-teal-600",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="group rounded-xl border border-white/[0.05] bg-white/[0.025] py-3 px-4 transition-all hover:border-white/[0.1] hover:bg-white/[0.045]"
                  >
                    <p
                      className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br ${m.grad}`}
                    >
                      {m.val}
                    </p>
                    <p className="text-xs text-white/30">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="w-full space-y-2">
                <button
                  className="group relative w-full overflow-hidden rounded-xl py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    boxShadow:
                      "0 0 0 1px rgba(124,58,237,.3), 0 6px 20px rgba(124,58,237,.35)",
                  }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(255,255,255,.08)" }}
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{ background: "rgba(255,255,255,.2)" }}
                  />
                  <span className="relative">Edit Profile</span>
                </button>
                <button className="w-full rounded-xl py-2.5 text-xs font-medium text-white/35 border border-white/[0.06] bg-white/[0.02] transition-all hover:bg-white/[0.05] hover:text-white/60 hover:border-white/[0.1]">
                  View Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
