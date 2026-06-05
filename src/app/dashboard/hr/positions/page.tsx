import Link from "next/link";
import { getPositions, deletePosition } from "@/actions/hr";
import { AnimatedSection } from "@/components/animated/animated-section";
import { PositionActions } from "@/components/hr/position-actions";

export default async function PositionsPage() {
  const positions = await getPositions();

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <AnimatedSection delay={0}>
          <div className="mb-8">
            <div className="mb-1 flex items-center gap-2 text-xs text-white/35">
              <Link href="/dashboard/hr" className="hover:text-white/60">HR</Link>
              <span>/</span>
              <span>Positions</span>
            </div>
            <h1 className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-2xl font-semibold text-transparent">
              Positions
            </h1>
            <p className="mt-1 text-sm text-white/35">{positions.length} total</p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedSection delay={0.05}>
            <PositionActions />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03]">
              <div className="border-b border-white/[0.06] px-5 py-4">
                <h2 className="text-sm font-semibold text-white/70">All Positions</h2>
              </div>
              {positions.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-white/30">No positions yet</div>
              ) : (
                <div className="divide-y divide-white/[0.04]">
                  {positions.map((pos) => (
                    <div key={pos.id} className="group flex items-center justify-between px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-white/80">{pos.name}</p>
                        {pos.description && (
                          <p className="text-xs text-white/35">{pos.description}</p>
                        )}
                        <p className="mt-0.5 text-xs text-white/30">
                          {pos._count.employees} {pos._count.employees === 1 ? "employee" : "employees"}
                        </p>
                      </div>
                      <form action={deletePosition.bind(null, pos.id)}>
                        <button
                          type="submit"
                          className="rounded-lg px-2 py-1 text-xs text-red-400 opacity-0 transition-opacity hover:bg-red-500/10 group-hover:opacity-100"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
