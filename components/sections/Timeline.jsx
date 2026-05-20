"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineLightBulb,
  HiOutlineMagnifyingGlass,
  HiOutlinePaintBrush,
  HiOutlineCodeBracket,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import { useCallback, useMemo } from "react";

export default function Timeline() {
  const t = useTranslations("timeline");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  // Memoize steps array to prevent re-renders
  const steps = useMemo(() => [
    { key: "step1", icon: HiOutlineLightBulb },
    { key: "step2", icon: HiOutlineMagnifyingGlass },
    { key: "step3", icon: HiOutlinePaintBrush },
    { key: "step4", icon: HiOutlineCodeBracket },
    { key: "step5", icon: HiOutlineRocketLaunch },
  ], []);

  // Animation variants with reduced motion support
  const containerVariants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.18,
      },
    },
  }), [prefersReducedMotion]);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: prefersReducedMotion ? 0 : 0.1,
        duration: prefersReducedMotion ? 0.3 : 0.6 
      }
    },
  }), [prefersReducedMotion]);

  // Handle keyboard navigation for step items
  const handleKeyDown = useCallback((e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Optional: Add expand/collapse logic here if needed
    }
  }, []);

  return (
    <section 
      className="py-24 sm:py-28 md:py-32 bg-black/20 relative overflow-hidden px-4 sm:px-6"
      style={{ 
        paddingTop: 'calc(6rem + env(safe-area-inset-top))',
        paddingBottom: 'calc(6rem + env(safe-area-inset-bottom))'
      }}
      aria-labelledby="timeline-heading"
    >
      <div className="container w-full sm:w-11/12 mx-auto relative z-10">
        
        {/* Title */}
        <motion.h2
          id="timeline-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-white mb-6 sm:mb-8 leading-tight"
        >
          {t("title")}
        </motion.h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-400 mb-12 sm:mb-16 text-center max-w-2xl mx-auto px-2">
          {t("description")}
        </p>

        {/* Timeline Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
          role="list"
          aria-label={t("processSteps")}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              const isRtl = locale === "ar";

              return (
                <motion.div
                  key={step.key}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center group relative focus:outline-none"
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-label={t(`${step.key}Aria`)}
                >
                  {/* Icon Box - Enhanced touch target */}
                  <div 
                    className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500 relative shadow-[0_0_20px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] min-h-[44px] min-w-[44px] touch-manipulation"
                    aria-hidden="true"
                  >
                    <Icon className="text-3xl text-blue-500 group-hover:text-white transition-colors flex-shrink-0" />

                    {/* Step Number */}
                    <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-900 border border-blue-600/30 flex items-center justify-center text-xs font-bold text-blue-400">
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 transition-colors group-hover:text-blue-400 px-2">
                    {t(step.key)}
                  </h4>

                  {/* Optional: Step description for screen readers */}
                  <span className="sr-only">
                    {t(`${step.key}Description`)}
                  </span>

                  {/* Arrows between items - Desktop only, RTL aware */}
                  {!isLast && (
                    <div
                      className={`hidden lg:flex absolute top-10 ${
                        isRtl ? "-left-14 sm:-left-16 rotate-180" : "-right-14 sm:-right-16"
                      } items-center`}
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
          className="mt-16 sm:mt-20 md:mt-24 text-center"
        >
          <p className="inline-block px-6 sm:px-8 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-base sm:text-xl md:text-2xl text-gray-400 font-medium tracking-wide min-h-[44px] touch-manipulation">
            {t("footer")}
          </p>
        </motion.div>
      </div>

      {/* CSS for reduced motion & focus styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Focus visible for keyboard navigation */
        [role="listitem"]:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 4px;
          border-radius: 1rem;
        }
        
        /* Screen reader only utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </section>
  );
}