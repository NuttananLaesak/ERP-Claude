import Link from "next/link";
import { getDepartments, deleteDepartment } from "@/actions/hr";
import { AnimatedSection } from "@/components/animated/animated-section";
import { DepartmentActions } from "@/components/hr/department-actions";
import { auth } from "@/auth";

export default async function DepartmentsPage() {
  const [departments, session] = await Promise.all([getDepartments(), auth()]);
  const isDemo = session?.user.role === "DEMO";

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl" />
      </div>

      <div className="relative">
        <AnimatedSection delay={0}>
          <div className="mb-8">
            <div className="mb-1 flex items-center gap-2 text-xs text-white/35">
              <Link href="/dashboard/hr" className="hover:text-white/60">HR</Link>
              <span>/</span>
              <span>Departments</span>
            </div>
            <h1 className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-2xl font-semibold text-transparent">
              Departments
            </h1>
            <p className="mt-1 text-sm text-white/35">{departments.length} total</p>
          </div>
        </AnimatedSection>

        <div className={`grid gap-6 ${!isDemo ? "md:grid-cols-2" : ""}`}>
          {!isDemo && (
            <AnimatedSection delay={0.05}>
              <DepartmentActions />
            </AnimatedSection>
          )}

          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03]">
              <div className="border-b border-white/[0.06] px-5 py-4">
                <h2 className="text-sm font-semibold text-white/70">All Departments</h2>
              </div>
              {departments.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-white/30">No departments yet</div>
              ) : (
                <div className="divide-y divide-white/[0.04]">
                  {departments.map((dept) => (
                    <div key={dept.id} className="group flex items-center justify-between px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-white/80">{dept.name}</p>
                        {dept.description && (
                          <p className="text-xs text-white/35">{dept.description}</p>
                        )}
                        <p className="mt-0.5 text-xs text-white/30">
                          {dept._count.employees} {dept._count.employees === 1 ? "employee" : "employees"}
                        </p>
                      </div>
                      {!isDemo && (
                        <form action={deleteDepartment.bind(null, dept.id)}>
                          <button
                            type="submit"
                            className="rounded-lg px-2 py-1 text-xs text-red-400 opacity-0 transition-opacity hover:bg-red-500/10 group-hover:opacity-100"
                          >
                            Delete
                          </button>
                        </form>
                      )}
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
