export function PageGlow({ variant = "simple" }: { variant?: "simple" | "full" }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-3xl" />
      {variant === "full" && (
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-violet-600/[0.06] blur-3xl" />
      )}
    </div>
  );
}
