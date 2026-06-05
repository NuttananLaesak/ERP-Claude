"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { changePassword } from "@/actions/user";

type State = { error?: string; success?: boolean } | null;

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/80 outline-none placeholder:text-white/20 transition-colors focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<State, FormData>(changePassword, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">
          Current password
        </label>
        <input
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputCls}
          disabled={pending}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">
          New password
        </label>
        <input
          name="newPassword"
          type="password"
          required
          autoComplete="new-password"
          placeholder="••••••••"
          className={inputCls}
          disabled={pending}
        />
        <p className="mt-1.5 text-xs text-white/25">Minimum 6 characters.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">
          Confirm new password
        </label>
        <input
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          placeholder="••••••••"
          className={inputCls}
          disabled={pending}
        />
      </div>

      <AnimatePresence mode="wait">
        {state && "error" in state && (
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
        {state && "success" in state && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] px-3.5 py-2.5 text-sm text-emerald-400"
          >
            Password updated.
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
          {pending ? "Updating…" : "Update password"}
        </motion.button>
      </div>
    </form>
  );
}
