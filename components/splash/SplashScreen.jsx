"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

export default function SplashScreen({ onAnimationComplete }) {
  const [stage, setStage] = useState("idle");
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Generate particles once
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = Math.random() * 100 + 50;

        return {
          id: i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          size: Math.random() * 3 + 2,
          delay: (i * 0.02) % 0.4,
          color: i % 2 === 0 ? "#60A5FA" : "#A78BFA",
          dur: 0.8 + Math.random() * 0.6,
        };
      }),
    []
  );

  useEffect(() => {
    setIsMounted(true);

    const t1 = setTimeout(() => setStage("gather"), 1200);
    const t2 = setTimeout(() => setStage("complete"), 2200);
    const t3 = setTimeout(() => {
      onAnimationComplete?.();
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onAnimationComplete]);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05050A]">
        <div className="w-10 h-10 border-2 border-blue-500/40 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#05050A] transition-opacity duration-500 ${
        stage === "complete" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[50vw] h-[90vh] bg-purple-600/10 rounded-full blur-[120px] -translate-x-1/3" />

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[90vh] bg-blue-600/10 rounded-full blur-[120px] translate-x-1/3" />
      </div>

      <div className="relative w-[380px] h-[380px] flex items-center justify-center">
        {/* CSS Animations */}
        <style>{`
          @keyframes particle-out {
            0% {
              opacity: 0;
              transform: translate(0,0) scale(0);
            }

            30% {
              opacity: 1;
            }

            100% {
              opacity: 0.85;
            }
          }

          @keyframes particle-in {
            0% {
              opacity: 0.85;
            }

            100% {
              opacity: 0;
              transform: translate(0,0) scale(0);
            }
          }

          .particle-idle {
            animation: particle-out 0.8s ease-out forwards;
          }

          .particle-gather {
            animation: particle-in var(--dur) ease-in forwards;
          }

          .particle-complete {
            opacity: 0;
          }
        `}</style>

        {/* Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className={`particle-${
              stage === "idle" ? "idle" : stage
            }`}
            style={{
              position: "absolute",
              transform: `translate(${p.x}px, ${p.y}px)`,
              width: p.size * 2,
              height: p.size * 2,
              borderRadius: "50%",
              background: p.color,
              animationDelay: `${p.delay}s`,
              "--dur": `${p.dur}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}

        {/* Logo */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-5 transition-all duration-700 ${
            stage === "complete"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="relative w-[160px] h-[160px]">
            <Image
              src="/logo.png"
              alt="Brand Logo"
              fill
              priority
              sizes="160px"
              className="object-contain"
            />
          </div>

          <h1
            className={`text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide transition-all duration-700 ${
              stage === "complete"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            NODERN
          </h1>
        </div>
      </div>
    </div>
  );
}