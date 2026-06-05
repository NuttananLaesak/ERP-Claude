import Link from "next/link";
import {
  getEmployees,
  deleteEmployee,
  updateEmployeeStatus,
} from "@/actions/hr";
import { AnimatedSection } from "@/components/animated/animated-section";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-400",
  INACTIVE: "bg-red-500/10 text-red-400",
  ON_LEAVE: "bg-amber-500/15 text-amber-400",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  ON_LEAVE: "On Leave",
};

export default async function EmployeesPage() {
  const employees = await getEmployees();

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl" />
      </div>

      <div className="relative">
        <AnimatedSection delay={0}>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs text-white/35">
                <Link href="/dashboard/hr" className="hover:text-white/60">
                  HR
                </Link>
                <span>/</span>
                <span>Employees</span>
              </div>
              <h1 className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-2xl font-semibold text-transparent">
                Employees
              </h1>
              <p className="mt-1 text-sm text-white/35">
                {employees.length} total
              </p>
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
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03]">
            {employees.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="text-sm text-white/30">No employees yet.</p>
                <Link
                  href="/dashboard/hr/employees/new"
                  className="mt-4 inline-block text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Add the first employee →
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {[
                        "Employee",
                        "Department",
                        "Position",
                        "Status",
                        "Hire Date",
                        "",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-medium text-white/35"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {employees.map((emp) => (
                      <tr
                        key={emp.id}
                        className="group transition-colors hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-4">
                          <Link
                            href={`/dashboard/hr/employees/${emp.id}`}
                            className="flex items-center gap-3 group/row"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-300">
                              {emp.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white/80 group-hover/row:text-white/95 transition-colors">
                                {emp.name}
                              </p>
                              <p className="text-xs text-white/35">
                                {emp.email}
                              </p>
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/55">
                          {emp.department.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-white/55">
                          {emp.position?.name ?? "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[emp.status]}`}
                          >
                            {statusLabels[emp.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/40">
                          {new Date(emp.hireDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                            {emp.status !== "ACTIVE" && (
                              <form
                                action={updateEmployeeStatus.bind(
                                  null,
                                  emp.id,
                                  "ACTIVE",
                                )}
                              >
                                <button
                                  type="submit"
                                  className="rounded-lg px-2 py-1 text-xs text-emerald-400 hover:bg-emerald-500/10"
                                >
                                  Activate
                                </button>
                              </form>
                            )}
                            {emp.status !== "ON_LEAVE" && (
                              <form
                                action={updateEmployeeStatus.bind(
                                  null,
                                  emp.id,
                                  "ON_LEAVE",
                                )}
                              >
                                <button
                                  type="submit"
                                  className="rounded-lg px-2 py-1 text-xs text-amber-400 hover:bg-amber-500/10"
                                >
                                  Leave
                                </button>
                              </form>
                            )}
                            <form action={deleteEmployee.bind(null, emp.id)}>
                              <button
                                type="submit"
                                className="rounded-lg px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
                              >
                                Delete
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
