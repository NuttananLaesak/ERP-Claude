"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfile } from "@/actions/user";

type User = {
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
};

type State = { error?: string; success?: boolean } | null;

const fadeSlide = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
});

export function ProfileForm({ user }: { user: User }) {
  const [state, action, pending] = useActionState<State, FormData>(updateProfile, null);

  const initials = (user.name ?? user.email)
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberSince = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(user.createdAt));

  return (
    <motion.div {...fadeSlide(0)} className="space-y-6">
      {/* Avatar row */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 text-xl font-bold text-indigo-400 select-none"
        >
          {initials}
        </motion.div>
        <div>
          <p className="text-sm font-medium text-white/75">{user.name ?? "—"}</p>
          <p className="mt-0.5 text-xs text-white/35">Member since {memberSince}</p>
        </div>
      </div>

      {/* Form */}
      <form action={action} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/45">Display name</label>
          <input
            name="name"
            type="text"
            defaultValue={user.name ?? ""}
            placeholder="Your name"
            required
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/80 outline-none placeholder:text-white/20 transition-colors focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/45">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5 text-sm text-white/35 outline-none"
          />
          <p className="mt-1.5 text-xs text-white/25">Email cannot be changed.</p>
        </div>

        {/* Feedback */}
        <AnimatePresence mode="wait">
          {state?.error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-red-400/20 bg-red-400/[0.08] px-3.5 py-2.5 text-sm text-red-400"
            >
              {state.error}
            </motion.p>
          )}
          {state?.success && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] px-3.5 py-2.5 text-sm text-emerald-400"
            >
              Profile updated.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={pending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="rounded-xl bg-indigo-500/80 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save changes"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
