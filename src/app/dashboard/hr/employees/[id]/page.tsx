import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getEmployee,
  getDepartments,
  getPositions,
  deleteEmployee,
  updateEmployeeStatus,
} from "@/actions/hr";
import { AnimatedSection } from "@/components/animated/animated-section";
import { EditEmployeeForm } from "@/components/hr/edit-employee-form";
import { CreateLoginButton } from "@/components/hr/create-login-button";

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

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [employee, departments, positions] = await Promise.all([
    getEmployee(id),
    getDepartments(),
    getPositions(),
  ]);
  if (!employee) notFound();

  const hireDate = new Date(employee.hireDate);
  const tenureMs = Date.now() - hireDate.getTime();
  const tenureYears = Math.floor(tenureMs / (1000 * 60 * 60 * 24 * 365));
  const tenureMonths = Math.floor(
    (tenureMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
  );

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <AnimatedSection delay={0}>
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-xs text-white/35">
              <Link href="/dashboard/hr" className="hover:text-white/60">
                HR
              </Link>
              <span>/</span>
              <Link
                href="/dashboard/hr/employees"
                className="hover:text-white/60"
              >
                Employees
              </Link>
              <span>/</span>
              <span>{employee.name}</span>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-xl font-semibold text-indigo-300">
                  {employee.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-2xl font-semibold text-transparent">
                    {employee.name}
                  </h1>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-xs text-white/35">
                      {employee.employeeId}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[employee.status]}`}
                    >
                      {statusLabels[employee.status]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick status actions */}
              <div className="flex items-center gap-2">
                {employee.status !== "ACTIVE" && (
                  <form
                    action={updateEmployeeStatus.bind(
                      null,
                      employee.id,
                      "ACTIVE",
                    )}
                  >
                    <button
                      type="submit"
                      className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
                    >
                      Set Active
                    </button>
                  </form>
                )}
                {employee.status !== "ON_LEAVE" && (
                  <form
                    action={updateEmployeeStatus.bind(
                      null,
                      employee.id,
                      "ON_LEAVE",
                    )}
                  >
                    <button
                      type="submit"
                      className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/20"
                    >
                      Set Leave
                    </button>
                  </form>
                )}
                {employee.status !== "INACTIVE" && (
                  <form
                    action={updateEmployeeStatus.bind(
                      null,
                      employee.id,
                      "INACTIVE",
                    )}
                  >
                    <button
                      type="submit"
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/40 hover:bg-white/[0.07]"
                    >
                      Deactivate
                    </button>
                  </form>
                )}
                <form action={deleteEmployee.bind(null, employee.id)}>
                  <button
                    type="submit"
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Info cards */}
        <AnimatedSection delay={0.04}>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Department", value: employee.department.name },
              { label: "Position", value: employee.position?.name ?? "—" },
              {
                label: "Tenure",
                value:
                  tenureYears > 0
                    ? `${tenureYears}y ${tenureMonths}m`
                    : `${tenureMonths}m`,
              },
              {
                label: "Salary",
                value: employee.salary
                  ? `$${employee.salary.toLocaleString()}`
                  : "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
              >
                <p className="mb-1 text-xs text-white/35">{label}</p>
                <p className="text-sm font-medium text-white/70">{value}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Contact row */}
        <AnimatedSection delay={0.07}>
          <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="mb-0.5 text-xs text-white/35">Email</p>
                <p className="text-white/65">{employee.email}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-white/35">Phone</p>
                <p className="text-white/65">{employee.phone ?? "—"}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-white/35">Hire Date</p>
                <p className="text-white/65">
                  {hireDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Login status */}
        <AnimatedSection delay={0.09}>
          <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/25">
              Portal Access
            </p>
            {employee.userId ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Login active
                </span>
                <span className="text-xs text-white/30">
                  Employee can log in with their email
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-white/40">
                  No login account yet. Default password will be the employee
                  ID.
                </p>
                <CreateLoginButton employeeId={employee.id} />
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Edit form */}
        <AnimatedSection delay={0.12}>
          <p className="mb-3 text-xs font-medium text-white/35">Edit Details</p>
          <EditEmployeeForm
            employee={employee}
            departments={departments}
            positions={positions}
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
