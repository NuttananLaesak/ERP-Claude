import Link from "next/link";
import { getHrStats, getEmployees } from "@/actions/hr";
import { AnimatedSection } from "@/components/animated/animated-section";

export default async function HrPage() {
  const [stats, employees] = await Promise.all([getHrStats(), getEmployees()]);
  const recent = employees.slice(0, 5);

  const cards = [
    { label: "Total Employees", value: stats.total, color: "bg-indigo-500/15 text-indigo-400", glowRgb: "99,102,241" },
    { label: "Active", value: stats.active, color: "bg-emerald-500/15 text-emerald-400", glowRgb: "52,211,153" },
    { label: "On Leave", value: stats.onLeave, color: "bg-amber-500/15 text-amber-400", glowRgb: "251,191,36" },
    { label: "Departments", value: stats.departments, color: "bg-sky-500/15 text-sky-400", glowRgb: "56,189,248" },
  ];

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-violet-600/[0.06] blur-3xl" />
      </div>

      <div className="relative">
        <AnimatedSection delay={0}>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-2xl font-semibold text-transparent">
                Human Resources
              </h1>
              <p className="mt-1 text-sm text-white/35">Manage your team</p>
            </div>
            <Link
              href="/dashboard/hr/employees/new"
              className="rounded-xl bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-500/30"
            >
              + Add Employee
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {cards.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5"
              >
                <div className={`mb-3 inline-flex rounded-lg p-2 ${c.color}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-white/40">{c.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-white/90">{c.value}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
              <h2 className="text-sm font-semibold text-white/70">Recent Employees</h2>
              <Link href="/dashboard/hr/employees" className="text-xs text-indigo-400 hover:text-indigo-300">
                View all →
              </Link>
            </div>
            {recent.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-white/30">No employees yet</div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {recent.map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-300">
                        {emp.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80">{emp.name}</p>
                        <p className="text-xs text-white/35">{emp.position?.name ?? emp.department.name}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      emp.status === "ACTIVE" ? "bg-emerald-500/15 text-emerald-400" :
                      emp.status === "ON_LEAVE" ? "bg-amber-500/15 text-amber-400" :
                      "bg-white/10 text-white/40"
                    }`}>
                      {emp.status === "ON_LEAVE" ? "On Leave" : emp.status.charAt(0) + emp.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
