"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
export default function Timeline() {
  const t = useTranslations("time_line");
  const locale = useLocale();

  const steps = ["step1", "step2", "step3", "step4", "step5"];
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const liVariants = {
    hidden: {},
    visible: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0.6, opacity: 0, rotate: -8 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const arrowVariants = {
    hidden: (x) => ({ opacity: 0, x }),
    visible: () => ({ opacity: 1, x: 0, transition: { duration: 0.35 } }),
  };

  return (
    <>
      <div className="container mx-auto py-10">
        <motion.h2
          className="text-4xl font-bold mb-5 inline-block"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #5d00ffff, rgba(208, 8, 235, 1), #fff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            backgroundSize: "200% 200%",
          }}
        >
          {t("title")}
        </motion.h2>

        <p className="text-lg text-gray-400 mb-10">{t("description")}</p>

        <motion.ol
          className="flex items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;

            // origin for connector animation: left for LTR, right for RTL
            const originX = locale === "ar" ? 1 : 0;
            const arrowOffset = locale === "ar" ? 6 : -6;

            return (
              <motion.li
                key={idx}
                className="flex items-center"
                variants={liVariants}
              >
                <motion.div
                  className="md:w-32 md:h-32 rounded-full border-3 border-[#322552] bg-black flex items-center justify-center text-1xl md:text-1xl font-semibold text-white text-center leading-none"
                  variants={circleVariants}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t(step)}
                </motion.div>

                {!isLast && (
                  <div className="w-32 md:w-40 mx-3 flex items-center relative">
                    {/* animated line */}
                    <motion.div
                      className="absolute inset-0 flex items-center"
                      variants={lineVariants}
                      style={{ transformOrigin: `${originX} 50%` }}
                    >
                      <div className="h-px bg-gray-400 w-full" />
                    </motion.div>

                    {/* arrow icon */}
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 text-gray-400 z-10 absolute ${locale === "ar" ? "-left-3" : "-right-3"} top-1/2 transform -translate-y-1/2`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                      variants={arrowVariants}
                      custom={arrowOffset}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={locale === "ar" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                      />
                    </motion.svg>
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </>
  );
}
