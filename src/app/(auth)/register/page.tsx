"use client";

import {
  useActionState,
  useState,
  useRef,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { register } from "@/actions/auth";
import { TiltCard } from "@/components/ui/tilt-card";
import Link from "next/link";

const S: Record<string, CSSProperties> = {
  card: { animation: "fade-up .55s ease-out 100ms both" },
  name: { animation: "fade-up .55s ease-out 170ms both" },
  email: { animation: "fade-up .55s ease-out 230ms both" },
  password: { animation: "fade-up .55s ease-out 290ms both" },
  button: { animation: "fade-up .55s ease-out 360ms both" },
  footer: { animation: "fade-up .55s ease-out 420ms both" },
};

function GlowButton({ pending }: { pending: boolean }) {
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    span.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;border-radius:50%;background:rgba(255,255,255,.18);pointer-events:none;animation:ripple .7s ease-out forwards;`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 720);
  }

  return (
    <button
      ref={btnRef}
      type="submit"
      disabled={pending}
      onClick={handleClick}
      className="group relative w-full overflow-hidden rounded-2xl py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:scale-[1.025] hover:-translate-y-0.5 active:scale-[.98] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      style={{
        background:
          "linear-gradient(135deg, #0e7490 0%, #0891b2 30%, #7c3aed 100%)",
        boxShadow:
          "0 0 0 1px rgba(6,182,212,.35), 0 8px 32px rgba(6,182,212,.4), 0 2px 8px rgba(124,58,237,.25), inset 0 1px 0 rgba(255,255,255,.12)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, #06b6d4 0%, #3b82f6 40%, #7c3aed 100%)",
        }}
      />
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          animation: "shimmer 2.2s ease-in-out infinite",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)",
          transform: "translateX(-150%) skewX(-12deg)",
        }}
      />
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent)",
        }}
      />
      <span className="relative flex items-center justify-center gap-2">
        {pending ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Creating account…
          </>
        ) : (
          <>Create account</>
        )}
      </span>
    </button>
  );
}

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, undefined);
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <TiltCard intensity={5} style={S.card}>
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ padding: "1.5px" }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2"
            style={{
              width: "300%",
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
              background:
                "conic-gradient(from 0deg, #06b6d4, #3b82f6, #7c3aed, #a855f7, #ec4899, #06b6d4)",
              animation: "rgb-spin 6s linear infinite",
            }}
          />
          <div
            className="relative rounded-[calc(24px-1.5px)] p-8 backdrop-blur-3xl"
            style={{
              background:
                "linear-gradient(160deg, rgba(4,14,24,.97) 0%, rgba(4,4,20,.98) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(6,182,212,.12), inset 0 -1px 0 rgba(139,92,246,.07)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[22px] opacity-80"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(6,182,212,.4), rgba(124,58,237,.3), transparent)",
              }}
            />

            <div
              className="mb-7 text-center"
              style={{ animation: "fade-up .55s ease-out 0ms both" }}
            >
              <h1 className="text-[2rem] font-bold tracking-tight leading-tight">
                <span className="text-white">Create </span>
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #67e8f9 0%, #a78bfa 55%, #34d399 100%)",
                  }}
                >
                  account
                </span>
              </h1>
              <p className="mt-1.5 text-sm text-white/35 tracking-wide">
                Join us — it&apos;s completely free
              </p>
            </div>

            <form action={action} className="space-y-5">
              <div className="input-group" style={S.name}>
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 z-10 text-violet-400/50">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  id="reg-name"
                  placeholder="name"
                  className="w-full rounded-xl pl-10 pr-4 text-sm text-white"
                />
                <label htmlFor="reg-name" style={{ left: "2.5rem" }}>
                  Full name
                </label>
              </div>

              <div className="input-group" style={S.email}>
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 z-10 text-violet-400/50">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  id="reg-email"
                  placeholder="email"
                  className="w-full rounded-xl pl-10 pr-4 text-sm text-white"
                />
                <label htmlFor="reg-email" style={{ left: "2.5rem" }}>
                  Email address
                </label>
              </div>

              <div className="input-group" style={S.password}>
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 z-10 text-violet-400/50">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </span>
                <input
                  name="password"
                  type={showPw ? "text" : "password"}
                  required
                  minLength={6}
                  id="reg-password"
                  placeholder="password"
                  className="w-full rounded-xl pl-10 pr-11 text-sm text-white"
                />
                <label htmlFor="reg-password" style={{ left: "2.5rem" }}>
                  Password (min. 6 chars)
                </label>
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 transition-colors hover:text-cyan-400"
                >
                  {showPw ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {state?.error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-400/20">
                    <svg
                      className="h-3 w-3 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5zm0 6a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
                    </svg>
                  </span>
                  <p className="text-xs text-red-400">{state.error}</p>
                </div>
              )}

              <div style={S.button}>
                <GlowButton pending={pending} />
              </div>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,.08))",
                }}
              />
              <span className="text-xs text-white/20">or</span>
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,.08), transparent)",
                }}
              />
            </div>

            <p
              className="mt-4 text-center text-sm text-white/30"
              style={S.footer}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-transparent bg-clip-text hover:opacity-80 transition-opacity"
                style={{
                  backgroundImage: "linear-gradient(135deg, #a78bfa, #67e8f9)",
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
