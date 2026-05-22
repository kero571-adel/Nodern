"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");
  const prefersReducedMotion = useReducedMotion();

  const cards = useMemo(() => ["card1", "card2", "card3", "card4"], []);
  const headingVariant = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReducedMotion ? 0.3 : 0.6 },
      },
    }),
    [prefersReducedMotion]
  );
  const itemVariant = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReducedMotion ? 0.3 : 0.5 },
      },
    }),
    [prefersReducedMotion]
  );

  const gradientAnimation = useMemo(
    () => ({
      backgroundPosition: prefersReducedMotion
        ? "0% 50%"
        : ["0% 50%", "100% 50%", "0% 50%"],
    }),
    [prefersReducedMotion]
  );

  const gradientTransition = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0 : 6,
      repeat: prefersReducedMotion ? 0 : Infinity,
      ease: "linear",
    }),
    [prefersReducedMotion]
  );

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

            <p className="text-base sm:text-xl md:text-2xl text-blue-400 font-semibold leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="space-y-2 pt-2">
              <p className="text-gray-300 text-lg sm:text-xl">{t("intro1")}</p>

              <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed">
                {t("intro2")}
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-3 sm:gap-5 pt-2 sm:pt-6" role="list">
              {cards.map((card) => (
                <motion.div
                  key={card}
                  variants={itemVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-all duration-500"
                >
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {t(`cards.${card}.title`)}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {t(`cards.${card}.text`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right Animated Description ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.8 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
              <p className="text-gray-400 text-lg leading-relaxed">
                {t("ending1")}
              </p>

              <h3 className="text-2xl sm:text-4xl font-bold text-white mt-4 leading-tight">
                {t("ending2")}
              </h3>
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
