"use client";

import { motion } from "framer-motion";

const ORBITERS = [
  { size: 3,   color: "#818cf8", glow: "rgba(129,140,248,0.9)", duration: 2.4, topOffset: 5  },
  { size: 2.5, color: "#a78bfa", glow: "rgba(167,139,250,0.8)", duration: 1.6, topOffset: 12 },
  { size: 2,   color: "#c4b5fd", glow: "rgba(196,181,253,0.7)", duration: 3.2, topOffset: 8  },
];

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen w-full flex-col items-center justify-center gap-7"
    >
      {/* Spinner */}
      <div className="relative flex h-24 w-24 items-center justify-center">

        {/* Breathing ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.05, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-24 w-24 rounded-full bg-indigo-500/30 blur-2xl"
        />

        {/* Static track */}
        <div className="absolute h-[68px] w-[68px] rounded-full border border-white/[0.05]" />

        {/* Conic comet ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
          className="absolute h-[68px] w-[68px] rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 30%, rgba(99,102,241,0.15) 55%, rgba(99,102,241,0.6) 78%, #818cf8 90%, #a78bfa 100%)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2.5px), black calc(100% - 2.5px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), black calc(100% - 2.5px))",
          }}
        />

        {/* Comet head glow — dot at leading edge */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
          className="absolute h-[68px] w-[68px]"
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#c4b5fd",
              boxShadow: "0 0 8px 2px rgba(167,139,250,0.8), 0 0 16px 4px rgba(99,102,241,0.5)",
              marginTop: -1,
            }}
          />
        </motion.div>

        {/* Orbiting dots */}
        {ORBITERS.map((o, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: o.duration, repeat: Infinity, ease: "linear", delay: i * 0.6 }}
          >
            <div
              style={{
                position: "absolute",
                top: o.topOffset,
                left: "50%",
                transform: "translateX(-50%)",
                width: o.size,
                height: o.size,
                borderRadius: "50%",
                background: o.color,
                boxShadow: `0 0 ${o.size * 3}px ${o.glow}`,
              }}
            />
          </motion.div>
        ))}

        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          className="absolute h-9 w-9 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(139,92,246,0.3) 80%, rgba(139,92,246,0.7) 100%)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 1.5px), black calc(100% - 1.5px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), black calc(100% - 1.5px))",
          }}
        />

        {/* Center pulse */}
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: "0 0 10px 2px rgba(129,140,248,0.7)" }}
          className="h-2 w-2 rounded-full bg-indigo-400"
        />
      </div>

      {/* Loading label */}
      <div className="flex items-center gap-1.5">
        {["L", "O", "A", "D", "I", "N", "G"].map((ch, i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
            className="text-[10px] font-semibold tracking-widest text-white/40"
          >
            {ch}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
