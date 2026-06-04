export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const meteors = [
    { top: "8%",  left: "72%", delay: "0s",   dur: "3s"   },
    { top: "18%", left: "55%", delay: "1.4s", dur: "2.5s" },
    { top: "4%",  left: "88%", delay: "2.8s", dur: "3.5s" },
    { top: "30%", left: "95%", delay: "0.6s", dur: "2.8s" },
    { top: "50%", left: "80%", delay: "3.5s", dur: "3.2s" },
    { top: "65%", left: "92%", delay: "1.9s", dur: "2.6s" },
  ];

  const dust = [
    { top: "8%",  left: "6%",  s: 2.5, d: "0s",   t: "6s",  a: "float-y", c: 0 },
    { top: "15%", left: "22%", s: 2,   d: "1.2s", t: "8s",  a: "orb-c",   c: 1 },
    { top: "24%", left: "88%", s: 3,   d: "0.7s", t: "9s",  a: "orb-b",   c: 2 },
    { top: "38%", left: "4%",  s: 2.5, d: "2.2s", t: "6s",  a: "float-y", c: 3 },
    { top: "52%", left: "92%", s: 2,   d: "1.9s", t: "10s", a: "float-y", c: 4 },
    { top: "68%", left: "78%", s: 3.5, d: "0.4s", t: "7s",  a: "orb-b",   c: 5 },
    { top: "80%", left: "14%", s: 2,   d: "3.1s", t: "6s",  a: "float-y", c: 6 },
    { top: "92%", left: "55%", s: 2.5, d: "0.9s", t: "9s",  a: "orb-c",   c: 7 },
    { top: "6%",  left: "42%", s: 3,   d: "2.6s", t: "7s",  a: "orb-c",   c: 0 },
    { top: "33%", left: "65%", s: 2,   d: "3.8s", t: "8s",  a: "float-y", c: 1 },
    { top: "47%", left: "32%", s: 2.5, d: "1.1s", t: "6s",  a: "orb-a",   c: 2 },
    { top: "72%", left: "48%", s: 2,   d: "4.2s", t: "10s", a: "orb-a",   c: 3 },
    { top: "18%", left: "76%", s: 3,   d: "0.3s", t: "6s",  a: "float-y", c: 4 },
    { top: "58%", left: "18%", s: 2,   d: "2.9s", t: "7s",  a: "orb-c",   c: 5 },
    { top: "85%", left: "88%", s: 2.5, d: "1.7s", t: "8s",  a: "orb-b",   c: 6 },
    { top: "42%", left: "96%", s: 2,   d: "3.3s", t: "6s",  a: "float-y", c: 7 },
    { top: "10%", left: "52%", s: 3.5, d: "0.8s", t: "9s",  a: "float-y", c: 0 },
    { top: "63%", left: "36%", s: 2,   d: "4.5s", t: "6s",  a: "orb-c",   c: 1 },
    { top: "78%", left: "62%", s: 2.5, d: "1.6s", t: "7s",  a: "orb-b",   c: 2 },
    { top: "28%", left: "12%", s: 2,   d: "2.4s", t: "8s",  a: "float-y", c: 3 },
    { top: "55%", left: "74%", s: 3,   d: "0.5s", t: "6s",  a: "orb-a",   c: 4 },
    { top: "88%", left: "30%", s: 2,   d: "3.7s", t: "10s", a: "orb-a",   c: 5 },
    { top: "20%", left: "38%", s: 2.5, d: "1.3s", t: "7s",  a: "float-y", c: 6 },
    { top: "44%", left: "84%", s: 2,   d: "4.8s", t: "6s",  a: "orb-c",   c: 7 },
    { top: "96%", left: "8%",  s: 3,   d: "2.1s", t: "9s",  a: "orb-b",   c: 0 },
    { top: "35%", left: "46%", s: 2,   d: "0.2s", t: "7s",  a: "orb-c",   c: 1 },
    { top: "70%", left: "92%", s: 2.5, d: "3.4s", t: "6s",  a: "float-y", c: 2 },
    { top: "13%", left: "68%", s: 2,   d: "1.8s", t: "10s", a: "orb-a",   c: 3 },
    { top: "50%", left: "50%", s: 3,   d: "4.1s", t: "6s",  a: "orb-b",   c: 4 },
    { top: "82%", left: "42%", s: 2,   d: "2.7s", t: "7s",  a: "float-y", c: 5 },
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030309]">

      {/* ── Orbs ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[15%] h-[85vh] w-[70vw] rounded-full bg-violet-700/20 blur-[150px]"
          style={{ animation: "orb-a 12s ease-in-out infinite" }} />
        <div className="absolute -bottom-[25%] -right-[15%] h-[75vh] w-[65vw] rounded-full bg-cyan-500/14 blur-[160px]"
          style={{ animation: "orb-b 15s ease-in-out infinite" }} />
        <div className="absolute top-[30%] right-[-8%] h-[50vh] w-[42vw] rounded-full bg-fuchsia-600/11 blur-[120px]"
          style={{ animation: "orb-c 18s ease-in-out infinite" }} />
        <div className="absolute bottom-[10%] left-[-5%] h-[40vh] w-[38vw] rounded-full bg-indigo-500/10 blur-[110px]"
          style={{ animation: "orb-d 10s ease-in-out infinite" }} />
      </div>

      {/* ── Radial vignette ──────────────────── */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 72% 72% at 50% 50%, transparent 25%, #030309 100%)" }} />

      {/* ── Meteors ──────────────────────────── */}
      {meteors.map((m, i) => (
        <div key={i} className="pointer-events-none absolute overflow-hidden"
          style={{ top: m.top, left: m.left, width: "180px", height: "1px" }}>
          <div style={{
            width: "100%", height: "1px",
            background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(167,139,250,.8) 50%, rgba(6,182,212,.6) 80%, rgba(255,255,255,0) 100%)",
            animation: `meteor ${m.dur} ease-in ${m.delay} infinite`,
            animationFillMode: "both",
            boxShadow: "0 0 4px rgba(167,139,250,.5)",
          }} />
        </div>
      ))}

      {/* ── Dust ─────────────────────────────── */}
      {dust.map((p, i) => (
        <div key={i} className="pointer-events-none absolute rounded-full"
          style={{
            top: p.top, left: p.left,
            width: `${p.s * 2.5}px`, height: `${p.s * 2.5}px`,
            background: dustColors[p.c],
            animation: `${p.a} ${p.t} ease-in-out ${p.d} infinite`,
            boxShadow: `0 0 ${p.s * 7}px ${dustGlow[p.c]}`,
            opacity: 0.85,
          }} />
      ))}

      <div className="relative z-10 w-full px-4">{children}</div>
    </div>
  );
}
