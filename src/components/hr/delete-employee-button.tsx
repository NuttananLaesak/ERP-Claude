"use client";

import { useState, useTransition } from "react";
import { deleteEmployee } from "@/actions/hr";

function DeleteConfirmModal({
  onConfirm,
  onCancel,
  pending,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  pending: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fade-up .2s ease-out both" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-sm"
        style={{ animation: "fade-up .25s ease-out .05s both" }}
      >
        {/* Gradient border */}
        <div className="relative rounded-2xl overflow-hidden" style={{ padding: "1px" }}>
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(239,68,68,.5) 0%, rgba(124,58,237,.4) 50%, rgba(6,182,212,.3) 100%)",
            }}
          />

          <div
            className="relative rounded-[calc(16px-1px)] p-6 backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(160deg, rgba(18,8,32,.97) 0%, rgba(8,4,20,.98) 100%)",
              boxShadow:
                "0 24px 64px rgba(0,0,0,.7), 0 0 0 1px rgba(239,68,68,.08) inset",
            }}
          >
            {/* Top line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[15px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(239,68,68,.35), rgba(124,58,237,.25), transparent)",
              }}
            />

            {/* Icon */}
            <div className="mb-4 flex justify-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background: "rgba(239,68,68,.1)",
                  boxShadow: "0 0 0 1px rgba(239,68,68,.2), 0 0 24px rgba(239,68,68,.15)",
                }}
              >
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
            </div>

            <h2 className="mb-1.5 text-center text-base font-semibold text-white/90">
              Delete Employee
            </h2>
            <p className="mb-6 text-center text-sm text-white/40">
              This will permanently delete the employee and their login account. This cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={pending}
                className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={pending}
                className="relative flex-1 overflow-hidden rounded-xl py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #b91c1c 100%)",
                  boxShadow: "0 0 0 1px rgba(239,68,68,.3), 0 8px 24px rgba(220,38,38,.35)",
                }}
              >
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent)",
                    animation: "shimmer 2s ease-in-out infinite",
                    transform: "translateX(-150%) skewX(-12deg)",
                  }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  {pending ? (
                    <>
                      <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Deleting…
                    </>
                  ) : (
                    "Delete"
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeleteEmployeeButton({
  id,
  className,
  children = "Delete",
}: {
  id: string;
  className: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(() => deleteEmployee(id));
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <DeleteConfirmModal
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
          pending={pending}
        />
      )}
    </>
  );
}
