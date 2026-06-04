export default function Loading() {
  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white/[0.05]" />
          <div className="space-y-2">
            <div className="h-6 w-40 rounded-lg bg-white/[0.05]" />
            <div className="h-4 w-24 rounded-lg bg-white/[0.04]" />
          </div>
        </div>
        <div className="mb-6 grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-white/[0.03]" />
          ))}
        </div>
        <div className="h-16 rounded-2xl bg-white/[0.03]" />
      </div>
    </div>
  );
}
