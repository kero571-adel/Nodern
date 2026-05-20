"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

export default function SplashScreen({ onAnimationComplete }) {
  const [stage, setStage] = useState("idle");
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Generate particles once, memoized
  const particles = useMemo(() =>
    Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * Math.PI * 2;
      const radius = Math.random() * 100 + 50;
      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        size: Math.random() * 3 + 2,
        delay: (i * 0.02) % 0.4,
        color: i % 2 === 0 ? "#60A5FA" : "#A78BFA",
        // ✅ Duration randomness for natural feel
        dur: 0.8 + Math.random() * 0.6,
      };
    }), []
  );

  useEffect(() => {
    setIsMounted(true);
    const t1 = setTimeout(() => setStage("gather"), 1600);
    const t2 = setTimeout(() => setStage("complete"), 2800);
    const t3 = setTimeout(() => onAnimationComplete(), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onAnimationComplete]);

  if (!isMounted) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05050A]">
      <div className="w-10 h-10 border-2 border-blue-500/40 border-t-blue-400 rounded-full animate-spin" />
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#05050A]"
      >
        {/* Background — static divs, zero animation cost */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[50vw] h-[90vh] bg-purple-600/10 rounded-full blur-[120px] -translate-x-1/3" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[90vh] bg-blue-600/10 rounded-full blur-[120px] translate-x-1/3" />
        </div>

        <div className="relative w-[380px] h-[380px] flex items-center justify-center">

          {/*
           * ✅ CSS-driven particles — zero Framer overhead
           * كل particle بيتحرك بـ CSS animation، Framer مش بيعمل diff عليهم
           */}
          <style>{`
            @keyframes particle-out {
              0%   { opacity: 0; transform: translate(0, 0) scale(0); }
              30%  { opacity: 1; }
              100% { opacity: 0.85; }
            }
            @keyframes particle-in {
              0%   { opacity: 0.85; }
              100% { opacity: 0; transform: translate(0, 0) scale(0); }
            }
            .particle-idle  { animation: particle-out 0.8s ease-out forwards; }
            .particle-gather { animation: particle-in  var(--dur) ease-in  forwards; }
            .particle-complete { opacity: 0; }
          `}</style>

          {particles.map((p) => (
            <div
              key={p.id}
              className={`particle-${stage === "idle" ? "idle" : stage}`}
              style={{
                position: "absolute",
                // ✅ translateX/Y — GPU composited, no layout thrashing
                transform: `translate(${p.x}px, ${p.y}px)`,
                width: p.size * 2,
                height: p.size * 2,
                borderRadius: "50%",
                background: p.color,
                // ✅ لا boxShadow هنا
                animationDelay: `${p.delay}s`,
                "--dur": `${p.dur}s`,
                willChange: "transform, opacity",
              }}
            />
          ))}

          {/* ✅ Logo: opacity + scale بدل blur */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={
              stage === "complete"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.92 }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
          >
            <div className="relative w-[160px] h-[160px]">
              <Image
                src="/logo.png"
                alt="Brand Logo"
                fill
                className="object-contain"
                priority
                sizes="160px"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={stage === "complete" ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide"
            >
              NODERN
            </motion.h1>
          </motion.div>
        </div>

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === "complete" ? 0 : 1 }}
          className="absolute bottom-14 flex gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400/70"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}