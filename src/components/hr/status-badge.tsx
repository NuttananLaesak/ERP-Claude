type EmployeeStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE";

const plain: Record<EmployeeStatus, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-400",
  INACTIVE: "bg-red-500/10 text-red-400",
  ON_LEAVE: "bg-amber-500/15 text-amber-400",
};

const bordered: Record<EmployeeStatus, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  INACTIVE: "bg-white/10 text-white/40 border-white/10",
  ON_LEAVE: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

const labels: Record<EmployeeStatus, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  ON_LEAVE: "On Leave",
};

export function StatusBadge({
  status,
  border = false,
}: {
  status: EmployeeStatus;
  border?: boolean;
}) {
  const colors = border ? bordered : plain;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${border ? "border " : ""}${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}
