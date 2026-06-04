export default function Loading() {
  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="mb-8 h-12 w-48 rounded-xl bg-white/[0.04]" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-56 rounded-2xl bg-white/[0.03]" />
          <div className="h-56 rounded-2xl bg-white/[0.03]" />
        </div>
      </div>
    </div>
  );
}
