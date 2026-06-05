import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getEmployeeByUserId } from "@/actions/hr";
import { AnimatedSection } from "@/components/animated/animated-section";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  INACTIVE: "bg-white/10 text-white/40 border-white/10",
  ON_LEAVE: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  ON_LEAVE: "On Leave",
};

export default async function EmployeePortalPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const employee = await getEmployeeByUserId(session.user.id);

  if (!employee) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <p className="text-sm text-white/40">No employee record linked to your account.</p>
          <p className="mt-1 text-xs text-white/25">Contact HR to set up your profile.</p>
        </div>
      </div>
    );
  }

  const hireDate = new Date(employee.hireDate);
  const tenureMs = Date.now() - hireDate.getTime();
  const tenureYears = Math.floor(tenureMs / (1000 * 60 * 60 * 24 * 365));
  const tenureMonths = Math.floor((tenureMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        {/* Profile header */}
        <AnimatedSection delay={0}>
          <div className="mb-8 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-2xl font-semibold text-indigo-300">
                {employee.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-2xl font-semibold text-transparent">
                  {employee.name}
                </h1>
                <p className="mt-0.5 text-sm text-white/45">{employee.position?.name ?? "—"}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-xs text-white/30">{employee.employeeId}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[employee.status]}`}>
                    {statusLabels[employee.status]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.04}>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Department", value: employee.department.name },
              {
                label: "Tenure",
                value: tenureYears > 0 ? `${tenureYears}y ${tenureMonths}m` : `${tenureMonths}m`,
              },
              {
                label: "Since",
                value: hireDate.toLocaleDateString("en-US", { year: "numeric", month: "short" }),
              },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                <p className="mb-1 text-xs text-white/35">{label}</p>
                <p className="text-sm font-medium text-white/70">{value}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection delay={0.07}>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/25">Contact</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/35">Email</span>
                <span className="text-sm text-white/65">{employee.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/35">Phone</span>
                <span className="text-sm text-white/65">{employee.phone ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/35">Hire Date</span>
                <span className="text-sm text-white/65">
                  {hireDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
