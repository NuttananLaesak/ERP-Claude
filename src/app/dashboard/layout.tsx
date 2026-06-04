import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-[#030309]">
      <Sidebar user={session.user} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
