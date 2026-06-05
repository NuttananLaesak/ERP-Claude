import Link from "next/link";
import { getHrStats, getEmployees } from "@/actions/hr";
import { AnimatedSection } from "@/components/animated/animated-section";
import { StatusBadge } from "@/components/hr/status-badge";
import { EmployeeAvatar } from "@/components/hr/employee-avatar";
import { PageGlow } from "@/components/ui/page-glow";
import { ArrowRightIcon, PeopleIcon } from "@/components/icons";

export default async function HrPage() {
  const [stats, employees] = await Promise.all([getHrStats(), getEmployees()]);
  const recent = employees.slice(0, 5);

  const cards = [
    {
      label: "Total Employees",
      value: stats.total,
      color: "bg-indigo-500/15 text-indigo-400",
    },
    {
      label: "Active",
      value: stats.active,
      color: "bg-emerald-500/15 text-emerald-400",
    },
    {
      label: "On Leave",
      value: stats.onLeave,
      color: "bg-amber-500/15 text-amber-400",
    },
    {
      label: "Inactive",
      value: stats.inactive,
      color: "bg-rose-500/15 text-rose-400",
    },
  ];

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <PageGlow variant="full" />

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
                <div className={`mb-3 inline-flex rounded-lg p-2.5 ${c.color}`}>
                  <PeopleIcon size={20} />
                </div>
                <p className="text-xs font-medium text-white/40">{c.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-white/90">
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
              <h2 className="text-sm font-semibold text-white/70">
                Recent Employees
              </h2>
              <Link
                href="/dashboard/hr/employees"
                className="group flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/50 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/[0.08] hover:text-indigo-300"
              >
                View all
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRightIcon size={12} />
                </span>
              </Link>
            </div>
            {recent.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-white/30">
                No employees yet
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {recent.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <EmployeeAvatar name={emp.name} />
                      <div>
                        <p className="text-sm font-medium text-white/80">
                          {emp.name}
                        </p>
                        <p className="text-xs text-white/35">
                          {emp.position?.name ?? emp.department.name}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={emp.status as "ACTIVE" | "INACTIVE" | "ON_LEAVE"} />
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
