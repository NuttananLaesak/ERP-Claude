import { AnimatedStats } from "@/components/dashboard/animated-stats";
import { AnimatedSection } from "@/components/dashboard/animated-section";
import { DashboardGrid } from "@/components/dashboard/dashboard-grid";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-violet-600/[0.06] blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-sky-600/[0.05] blur-3xl" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <AnimatedSection delay={0}>
          <div className="mb-8">
            <h1 className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-2xl font-semibold text-transparent">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-white/35">Wednesday, June 4, 2026</p>
          </div>
        </AnimatedSection>

        {/* Stat cards */}
        <AnimatedStats />

        {/* Table + products */}
        <DashboardGrid />
      </div>
    </div>
  );
}
