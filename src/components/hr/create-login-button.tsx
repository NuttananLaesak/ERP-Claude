"use client";

import { useState, useTransition } from "react";
import { createEmployeeLogin } from "@/actions/hr";

export function CreateLoginButton({ employeeId }: { employeeId: string }) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; defaultPassword?: string; error?: string } | null>(null);

  function handleClick() {
    startTransition(async () => {
      const res = await createEmployeeLogin(employeeId);
      setResult(res);
    });
  }

  if (result?.success) {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm">
        <p className="font-medium text-emerald-400">Login created</p>
        <p className="mt-0.5 text-xs text-emerald-400/70">
          Default password: <span className="font-mono font-semibold">{result.defaultPassword}</span>
        </p>
        <p className="mt-0.5 text-xs text-emerald-400/50">Employee should change it after first login.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleClick}
        disabled={pending}
        className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400 transition-colors hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Creating…" : "Create Login"}
      </button>
      {result?.error && (
        <p className="text-xs text-red-400">{result.error}</p>
      )}
    </div>
  );
}
