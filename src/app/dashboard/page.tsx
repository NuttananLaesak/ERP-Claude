import { logout } from "@/actions/auth";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030309]">
      <form action={logout}>
        <button
          type="submit"
          className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/60 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
