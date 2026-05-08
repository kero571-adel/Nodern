"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HiOutlineLightBulb, HiOutlineMagnifyingGlass, HiOutlinePaintBrush, HiOutlineCodeBracket, HiOutlineRocketLaunch } from "react-icons/hi2";

export default function Timeline() {
  const t = useTranslations("timeline");

  const steps = [
    { key: "step1", icon: HiOutlineLightBulb },
    { key: "step2", icon: HiOutlineMagnifyingGlass },
    { key: "step3", icon: HiOutlinePaintBrush },
    { key: "step4", icon: HiOutlineCodeBracket },
    { key: "step5", icon: HiOutlineRocketLaunch },
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container w-11/12 mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-center text-white mb-24"
        >
          {t("title")}
        </motion.h2>

        <div className="relative">
          {/* Vertical line on mobile, Horizontal on desktop */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-blue-600/0 via-blue-600 to-blue-600/0 hidden lg:block h-full" />
          
          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500 relative shadow-[0_0_20px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                    <Icon className="text-3xl text-blue-500 group-hover:text-white transition-colors" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 border border-blue-600/30 flex items-center justify-center text-xs font-bold text-blue-400">
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-blue-400">
                    {t(step.key)}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <p className="inline-block px-8 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xl md:text-2xl text-gray-400 font-medium tracking-wide">
            {t("footer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
