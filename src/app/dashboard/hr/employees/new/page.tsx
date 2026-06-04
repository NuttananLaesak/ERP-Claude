import Link from "next/link";
import { getDepartments, getPositions } from "@/actions/hr";
import { AnimatedSection } from "@/components/dashboard/animated-section";
import { NewEmployeeForm } from "@/components/hr/new-employee-form";

export default async function NewEmployeePage() {
  const [departments, positions] = await Promise.all([getDepartments(), getPositions()]);

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <AnimatedSection delay={0}>
          <div className="mb-8">
            <div className="mb-1 flex items-center gap-2 text-xs text-white/35">
              <Link href="/dashboard/hr" className="hover:text-white/60">HR</Link>
              <span>/</span>
              <Link href="/dashboard/hr/employees" className="hover:text-white/60">Employees</Link>
              <span>/</span>
              <span>New</span>
            </div>
            <h1 className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-2xl font-semibold text-transparent">
              Add Employee
            </h1>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <NewEmployeeForm departments={departments} positions={positions} />
        </AnimatedSection>
      </div>
    </div>
  );
}
