import Link from "next/link";
import {
  getEmployees,
  updateEmployeeStatus,
} from "@/actions/hr";
import { DeleteEmployeeButton } from "@/components/hr/delete-employee-button";
import { AnimatedSection } from "@/components/animated/animated-section";
import { StatusBadge } from "@/components/hr/status-badge";
import { EmployeeAvatar } from "@/components/hr/employee-avatar";
import { PageGlow } from "@/components/ui/page-glow";

export default async function EmployeesPage() {
  const employees = await getEmployees();

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <PageGlow />

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
                            className="group/row flex items-center gap-3"
                          >
                            <EmployeeAvatar name={emp.name} />
                            <div>
                              <p className="text-sm font-medium text-white/80 transition-colors group-hover/row:text-white/95">
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
                          <StatusBadge status={emp.status as "ACTIVE" | "INACTIVE" | "ON_LEAVE"} />
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
                            <DeleteEmployeeButton
                              id={emp.id}
                              className="rounded-lg px-2 py-1 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                            />
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
