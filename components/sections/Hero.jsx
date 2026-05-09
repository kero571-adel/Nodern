"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Hero() {
  const t = useTranslations("hero");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container max-w-5xl mx-auto flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-block px-6 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm md:text-base font-medium tracking-wide">
            {t("line1")}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-7xl font-extrabold leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
        >
          {t("line2")}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-12 font-light"
        >
          {t("line3")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 cursor-pointer group"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * 0.9,
              behavior: "smooth",
            });
          }}
        >
          <span className="text-sm md:text-lg text-gray-500 font-bold group-hover:text-blue-400 transition-colors">
            {t("scrollText")}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
