export function EmployeeAvatar({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "lg";
}) {
  const initial = name.charAt(0).toUpperCase();
  if (size === "lg") {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-xl font-semibold text-indigo-300">
        {initial}
      </div>
    );
  }
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-300">
      {initial}
    </div>
  );
}
