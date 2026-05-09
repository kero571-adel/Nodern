"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  const lines = [
    "description.line 1",
    "description.line 2",
    "description.line 3",
    "description.line 4",
    "description.line 5",
    "description.line 6",
    "description.line 7",
    "description.line 8",
  ];

  const headingVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const listContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
  };

  const lineVariant = {
    hidden: { opacity: 0, width: 0 },
    show: (i = 1) => ({
      opacity: 1,
      width: "100%",
      transition: { duration: 0.8, ease: "easeInOut", delay: i * 0.03 },
    }),
  };

  return (
    <>
      <div className="container w-11/12 mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between py-5">
        <motion.h1
          className="text-3xl md:text-6xl font-extrabold bg-clip-text text-transparent"
          variants={headingVariant}
          initial="hidden"
          animate="show"
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
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            {t("title")}
          </motion.span>
        </motion.h1>

        <motion.div
          className="mt-6 md:mt-0 max-w-md"
          variants={listContainer}
          initial="hidden"
          animate="show"
        >
          <div className="space-y-2">
            {lines.map((key, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
                custom={idx}
                variants={lineVariant}
              >
                <motion.span
                  className="mt-1 w-3 h-3 rounded-full flex-shrink-0"
                  // animate the dot colour through a subtle loop
                  style={{ backgroundColor: "#7c3aed" }}
                  animate={{
                    backgroundColor: ["#7c3aed", "#a78bfa", "#7c3aed"],
                  }}
                  transition={{
                    duration: 4 + idx * 0.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div
                  style={{
                    overflow: "hidden",
                    display: "block",
                    whiteSpace: "nowrap",
                  }}
                  className="text-sm text-gray-300"
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      ease: "easeInOut",
                      delay: 0.2 + idx * 0.06,
                    }}
                  >
                    {t(key)}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
