"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HiOutlineCheckBadge } from "react-icons/hi2";

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  const items = [
    { key: "item1" },
    { key: "item2" },
    { key: "item3" },
    { key: "item4" },
  ];

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
    <section id="about" className="py-24 relative bg-black">
      <div className="container w-11/12 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
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
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {t("title")}
              </motion.span>
            </motion.h2>

            <p className="text-2xl text-blue-500 font-semibold italic">
              {t("line1")}
            </p>

            <p className="text-3xl md:text-4xl font-bold text-white">
              {t("line2")}
            </p>

            <div className="pt-8 space-y-4">
              <p className="text-xl text-gray-300 font-medium border-l-4 border-blue-600 pl-4">
                {t("impression")}
              </p>

              <p className="text-xl text-blue-400 font-bold">
                {t("guarantee")}
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-6 pt-6">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group flex items-start gap-4"
                >
                  <div className="mt-1">
                    <HiOutlineCheckBadge className="text-2xl text-blue-500 group-hover:scale-110 transition-transform" />
                  </div>

                  <p className="text-lg md:text-xl text-gray-300 group-hover:text-white transition-colors">
                    {t(item.key)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Animated Description */}
          <motion.div
            className="mt-6 md:mt-0"
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
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
      </div>
    </section>
  );
}