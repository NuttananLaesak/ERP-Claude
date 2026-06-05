import { getHrStats } from "@/actions/hr";
import { AnimatedSection } from "@/components/animated/animated-section";
import { NavCard, type NavCardProps } from "@/components/dashboard/nav-card";
import {
  PeopleIcon,
  OverviewIcon,
  DeptIcon,
  BriefcaseIcon,
  SettingsIcon,
} from "@/components/icons";

export default async function DashboardPage() {
  const stats = await getHrStats();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navCards: Omit<NavCardProps, "i">[] = [
    {
      href: "/dashboard/hr",
      label: "HR Overview",
      description: "Summary of your workforce",
      stat: `${stats.total} employees`,
      iconColor: "bg-indigo-500/10 text-indigo-400",
      icon: <OverviewIcon />,
    },
    {
      href: "/dashboard/hr/employees",
      label: "Employees",
      description: "Manage workforce records",
      stat: `${stats.active} active`,
      iconColor: "bg-violet-500/10 text-violet-400",
      icon: <PeopleIcon />,
    },
    {
      href: "/dashboard/hr/departments",
      label: "Departments",
      description: "Organise your structure",
      stat: `${stats.departments} depts`,
      iconColor: "bg-sky-500/10 text-sky-400",
      icon: <DeptIcon />,
    },
    {
      href: "/dashboard/hr/positions",
      label: "Positions",
      description: "Define roles and titles",
      stat: `${stats.positions} roles`,
      iconColor: "bg-emerald-500/10 text-emerald-400",
      icon: <BriefcaseIcon />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      description: "Preferences & account",
      stat: "Configure",
      iconColor: "bg-slate-500/10 text-slate-400",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <div className="min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <AnimatedSection delay={0} className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white/90">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-white/35">{today}</p>
      </AnimatedSection>

      <AnimatedSection delay={0.12} className="mb-3">
        <p className="text-xs font-medium uppercase tracking-widest text-white/25">
          Quick Access
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {navCards.map((card, i) => (
          <NavCard key={card.href} {...card} i={i} />
        ))}
      </div>
    </div>
  );
}
