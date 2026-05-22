"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo } from "react";

export default function Hero() {
  const t = useTranslations("hero");
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.2,
          delayChildren: prefersReducedMotion ? 0 : 0.3,
        },
      },
    }),
    [prefersReducedMotion]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0.3 : 0.8,
          ease: prefersReducedMotion ? "linear" : [0.22, 1, 0.36, 1],
        },
      },
    }),
    [prefersReducedMotion]
  );

  const handleStartProject = useCallback(() => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  const handleViewWork = useCallback(() => {
    const workSection = document.querySelector("#work");
    if (workSection) {
      const headerOffset = 80;
      const elementPosition = workSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  const handleScrollDown = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  const handleKeyDown = useCallback((e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  }, []);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden"
      style={{
        backgroundColor: "transparent",
        paddingTop: "calc(3.5rem + env(safe-area-inset-top))",   // ← كان 5rem
        paddingBottom: "calc(5rem + env(safe-area-inset-bottom))",
      }}
      aria-label="Hero section"
    >
      {/* ─── CSS ─── */}
      <style>{`
        @keyframes beamPulse {
          0%, 100% { opacity: 0.75; }
          50%       { opacity: 1; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(8px); opacity: 0.4; }
        }
        @keyframes scrollLine {
          0%   { height: 0; opacity: 1; top: 0; }
          100% { height: 24px; opacity: 0; top: 24px; }
        }
        .beam-l { animation: ${
          prefersReducedMotion ? "none" : "beamPulse 4s ease-in-out infinite"
        }; }
        .beam-r { animation: ${
          prefersReducedMotion
            ? "none"
            : "beamPulse 5s ease-in-out infinite 1.2s"
        }; }
        .scroll-mouse { animation: ${
          prefersReducedMotion
            ? "none"
            : "scrollBounce 1.8s ease-in-out infinite"
        }; }
        .scroll-line  { animation: ${
          prefersReducedMotion ? "none" : "scrollLine 1.8s ease-in-out infinite"
        }; }

        .hero-btn:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ── LEFT BEAM ── */}
      <div
        className="beam-l absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          left: "-8%",
          width: "clamp(180px, 30vw, 380px)",
          height: "90%",
          background:
            "linear-gradient(to top, rgba(140,50,250,0.6) 0%, rgba(160,80,255,0.28) 40%, transparent 78%)",
          transformOrigin: "bottom left",
          transform: "rotate(-30deg)",
          filter: "blur(60px)",
          borderRadius: "40% 40% 0 0",
        }}
      />
      <div
        className="beam-l absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          left: "4%",
          width: "clamp(25px, 4vw, 50px)",
          height: "80%",
          background:
            "linear-gradient(to top, rgba(180,100,255,1) 0%, rgba(200,130,255,0.5) 38%, rgba(210,150,255,0.08) 68%, transparent 88%)",
          transformOrigin: "bottom center",
          transform: "rotate(-30deg)",
          filter: "blur(15px)",
          borderRadius: "9999px",
        }}
      />
      <div
        className="beam-l absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          left: "5.5%",
          width: "8px",
          height: "70%",
          background:
            "linear-gradient(to top, rgba(240,200,255,1) 0%, rgba(220,180,255,0.65) 32%, transparent 72%)",
          transformOrigin: "bottom center",
          transform: "rotate(-30deg)",
          filter: "blur(2px)",
          borderRadius: "9999px",
        }}
      />

      {/* ── RIGHT BEAM ── */}
      <div
        className="beam-r absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          right: "-8%",
          width: "clamp(180px, 30vw, 380px)",
          height: "90%",
          background:
            "linear-gradient(to top, rgba(40,110,250,0.6) 0%, rgba(60,140,255,0.28) 40%, transparent 78%)",
          transformOrigin: "bottom right",
          transform: "rotate(30deg)",
          filter: "blur(60px)",
          borderRadius: "40% 40% 0 0",
        }}
      />
      <div
        className="beam-r absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          right: "4%",
          width: "clamp(25px, 4vw, 50px)",
          height: "80%",
          background:
            "linear-gradient(to top, rgba(70,150,255,1) 0%, rgba(100,170,255,0.5) 38%, rgba(130,190,255,0.08) 68%, transparent 88%)",
          transformOrigin: "bottom center",
          transform: "rotate(30deg)",
          filter: "blur(15px)",
          borderRadius: "9999px",
        }}
      />
      <div
        className="beam-r absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          right: "5.5%",
          width: "8px",
          height: "70%",
          background:
            "linear-gradient(to top, rgba(190,225,255,1) 0%, rgba(170,215,255,0.65) 32%, transparent 72%)",
          transformOrigin: "bottom center",
          transform: "rotate(30deg)",
          filter: "blur(2px)",
          borderRadius: "9999px",
        }}
      />

      {/* ── Vignette + bottom fade ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 3,
          background:
            "radial-gradient(ellipse 78% 55% at 50% 46%, transparent 22%, rgba(5,5,10,0.6) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 3,
          height: "130px",
          background: "linear-gradient(to top, #05050A, transparent)",
        }}
      />

      {/* ── content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container  mx-auto flex flex-col items-center px-2 w-full"
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-3 sm:mb-8"> {/* ← كان mb-5 */}
          <span className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-300 lg:text-[20px] sm:text-[15px] font-medium tracking-wide">
            {t("line1")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(1.3rem,6vw,5rem)] font-extrabold leading-[1.25] mb-2 sm:mb-6 tracking-tight w-full" // ← clamp كان 1.7rem
        >
          <span className="text-white block pb-0.5">{t("line2_first")}</span>
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent block pt-0.5">
            {t("line2_second")}
          </span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-4 sm:mb-12 font-light px-1 sm:px-2" // ← كان mb-6
        >
          {t("line3")}
        </motion.p>

        {/* Buttons — commented out */}
        {/* <motion.div ... /> */}
      </motion.div>

      {/* ── Scroll Down Indicator ── */}
      <motion.button
        onClick={handleScrollDown}
        onKeyDown={(e) => handleKeyDown(e, handleScrollDown)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.5, duration: 0.8 }}
        className="absolute bottom-21 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group focus:outline-none" // ← كان bottom-25
        style={{ zIndex: 10 }}
        aria-label={t("scrollText")}
      >
        {/* النص */}
        <span className="text-gray-500 text-xs tracking-widest uppercase group-hover:text-gray-300 transition-colors">
          {t("scrollText")}
        </span>

        {/* الماوس */}
        <div className="scroll-mouse relative w-5 h-8 sm:w-6 sm:h-9 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors flex justify-center">
          <div
            className="scroll-line absolute w-[2px] bg-gradient-to-b from-purple-400 to-transparent rounded-full"
            style={{ top: "4px" }}
          />
        </div>

        {/* السهم */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}