import { auth } from "@/auth";
import { db } from "@/lib/db";
import { AnimatedSection } from "@/components/dashboard/animated-section";
import { ProfileForm } from "@/components/settings/profile-form";
import { GlowCard } from "@/components/ui/glow-card";

function Divider() {
  return <div className="border-t border-white/[0.05]" />;
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div>
        <h2 className="text-sm font-semibold text-white/75">{title}</h2>
        {description && (
          <p className="mt-1 text-xs leading-relaxed text-white/30">
            {description}
          </p>
        )}
      </div>
      <div className="md:col-span-2">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  description,
  defaultChecked,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-white/[0.05]">
      <div>
        <p className="text-sm text-white/70">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-white/30">{description}</p>
        )}
      </div>
      <div
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          defaultChecked ? "bg-indigo-500/70" : "bg-white/[0.08]"
        }`}
      >
        <div
          className={`absolute top-0.5 h-4 w-4 rounded-full shadow transition-transform ${
            defaultChecked
              ? "translate-x-4 bg-white"
              : "translate-x-0.5 bg-white/60"
          }`}
        />
      </div>
    </div>
  );
}

export default async function SettingsPage() {
  const session = await auth();
  const user = await db.user.findUniqueOrThrow({
    where: { id: session!.user.id },
    select: { name: true, email: true, image: true, createdAt: true },
  });

  return (
    <div className="relative min-h-screen p-6 pt-16 md:p-8 md:pt-8">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-20 h-96 w-96 rounded-full bg-violet-600/[0.06] blur-3xl" />
        <div className="absolute bottom-20 right-0 h-72 w-72 rounded-full bg-indigo-600/[0.06] blur-3xl" />
      </div>

      <div className="relative max-w-3xl">
        {/* Header */}
        <AnimatedSection delay={0}>
          <div className="mb-8">
            <h1 className="bg-gradient-to-br from-white/90 to-white/50 bg-clip-text text-2xl font-semibold text-transparent">
              Settings
            </h1>
            <p className="mt-1 text-sm text-white/35">
              Manage your account and preferences.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-10">
          <Divider />

          {/* Profile — real DB data */}
          <AnimatedSection delay={0.08}>
            <Section
              title="Profile"
              description="Your public identity on the platform."
            >
              <GlowCard>
                <ProfileForm user={user} />
              </GlowCard>
            </Section>
          </AnimatedSection>

          <Divider />

          {/* Danger zone */}
          <AnimatedSection delay={0.26}>
            <Section
              title="Danger Zone"
              description="Irreversible actions. Proceed carefully."
            >
              <div className="relative overflow-hidden rounded-2xl border border-red-400/20 bg-red-400/[0.03] p-6 transition-[border-color] duration-300 hover:border-red-400/30">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-red-400/90">
                      Delete account
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/30">
                      Permanently delete your account and all data. This cannot
                      be undone.
                    </p>
                  </div>
                  <button className="shrink-0 rounded-xl border border-red-400/25 px-4 py-2 text-sm font-medium text-red-400/70 transition-colors hover:border-red-400/50 hover:bg-red-400/10 hover:text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            </Section>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
