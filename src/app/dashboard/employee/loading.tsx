export default function Loading() {
  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="mx-auto max-w-2xl animate-pulse space-y-6">
        <div className="h-32 rounded-2xl bg-white/[0.03]" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-white/[0.03]" />
          ))}
        </div>
        <div className="h-36 rounded-2xl bg-white/[0.03]" />
      </div>
    </div>
  );
}
