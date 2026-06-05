"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPosition } from "@/actions/hr";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-indigo-500/25 py-2.5 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-500/35 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Creating…" : "Create Position"}
    </button>
  );
}

const inputCls = "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white/80 placeholder-white/25 outline-none transition-colors focus:border-indigo-500/50 focus:bg-white/[0.06]";

export function PositionActions() {
  const [state, action, pending] = useActionState(createPosition, null);

  return (
    <form action={action} className="space-y-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <h2 className="text-sm font-semibold text-white/70">New Position</h2>

      {state && "error" in state && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {state && "success" in state && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          Position created
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/50">Name *</label>
        <input name="name" required placeholder="Senior Engineer" className={inputCls} disabled={pending} />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/50">Description</label>
        <input name="description" placeholder="Optional description" className={inputCls} disabled={pending} />
      </div>

      <SubmitButton />
    </form>
  );
}
