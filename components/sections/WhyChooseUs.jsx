"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { useCallback, useMemo } from "react";

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");
  const prefersReducedMotion = useReducedMotion();

  const items = useMemo(() => [
    { key: "item1" },
    { key: "item2" },
    { key: "item3" },
    { key: "item4" },
  ], []);

  const lines = useMemo(() => [
    "description.line 1",
    "description.line 2",
    "description.line 3",
    "description.line 4",
    "description.line 5",
    "description.line 6",
    "description.line 7",
    "description.line 8",
  ], []);

  const headingVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.3 : 0.6 },
    },
  }), [prefersReducedMotion]);

  const listContainer = useMemo(() => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  }), [prefersReducedMotion]);

  const lineVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: "easeOut",
      },
    },
  }), [prefersReducedMotion]);

  const itemVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.3 : 0.5 },
    },
  }), [prefersReducedMotion]);

  const gradientAnimation = useMemo(() => ({
    backgroundPosition: prefersReducedMotion
      ? "0% 50%"
      : ["0% 50%", "100% 50%", "0% 50%"],
  }), [prefersReducedMotion]);

  const gradientTransition = useMemo(() => ({
    duration: prefersReducedMotion ? 0 : 6,
    repeat: prefersReducedMotion ? 0 : Infinity,
    ease: "linear",
  }), [prefersReducedMotion]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    }
  }, []);

  const getPulseAnimation = useCallback((idx) => ({
    backgroundColor: prefersReducedMotion
      ? "#7c3aed"
      : ["#7c3aed", "#a78bfa", "#7c3aed"],
  }), [prefersReducedMotion]);

  const getPulseTransition = useCallback((idx) => ({
    duration: prefersReducedMotion ? 0 : 4 + idx * 0.2,
    repeat: prefersReducedMotion ? 0 : Infinity,
    ease: "linear",
  }), [prefersReducedMotion]);

  return (
    <section
      id="about"
      className="relative bg-black/20 px-4 sm:px-6"
      style={{
        paddingTop: "calc(5rem + env(safe-area-inset-top))",
        paddingBottom: "calc(5rem + env(safe-area-inset-bottom))",
      }}
      aria-labelledby="why-choose-us-heading"
    >
      <div className="container w-full sm:w-11/12 mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start lg:items-center">

          {/* ── Left Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.8 }}
            className="space-y-5 sm:space-y-6"
          >
            {/* Title */}
            <motion.h2
              id="why-choose-us-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              variants={headingVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.span
                style={{
                  display: "inline-block",
                  backgroundImage:
                    "linear-gradient(90deg, #5d00ffff, rgba(208, 8, 235, 1), #fff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "200% 200%",
                  backgroundPosition: "0% 50%",
                }}
                animate={gradientAnimation}
                transition={gradientTransition}
              >
                {t("title")}
              </motion.span>
            </motion.h2>

            <p className="text-base sm:text-xl md:text-2xl text-blue-500 font-semibold italic">
              {t("line1")}
            </p>

            <p className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              {t("line2")}
            </p>

            <div className="pt-4 sm:pt-8 space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-lg md:text-xl text-gray-300 font-medium border-l-4 border-blue-600 pl-3 sm:pl-4">
                {t("impression")}
              </p>
              <p className="text-sm sm:text-lg md:text-xl text-blue-400 font-bold">
                {t("guarantee")}
              </p>
            </div>

            {/* Features */}
            <div
              className="grid gap-3 sm:gap-5 pt-2 sm:pt-6"
              role="list"
              aria-label={t("featuresList")}
            >
              {items.map((item) => (
                <motion.div
                  key={item.key}
                  variants={itemVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group flex items-start gap-3 sm:gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black touch-manipulation"
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  aria-label={t(`${item.key}Aria`)}
                >
                  <div className="mt-0.5 flex-shrink-0" aria-hidden="true">
                    <HiOutlineCheckBadge className="text-lg sm:text-2xl text-blue-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-sm sm:text-lg md:text-xl text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                    {t(item.key)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right Animated Description ── */}
          <motion.div
            className="mt-2 sm:mt-8 md:mt-0"
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            aria-label={t("processDescription")}
          >
            <div className="space-y-2 sm:space-y-3">
              {lines.map((key, idx) => (
                <motion.div
                  key={key}
                  className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
                  variants={lineVariant}
                  role="listitem"
                >
                  <motion.span
                    className="mt-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#7c3aed" }}
                    animate={getPulseAnimation(idx)}
                    transition={getPulseTransition(idx)}
                    aria-hidden="true"
                  />
                  {/* ✅ شيلنا whiteSpace:nowrap وبقى النص بيلف طبيعي */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {t(key)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        [role="listitem"]:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 1rem;
        }
      `}</style>
    </section>
  );
}