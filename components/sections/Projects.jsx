"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function FeaturedWork() {
  const t = useTranslations("FeaturedWork");
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = useMemo(
    () => [
      {
        id: "devwear",
        name: "DevWear",
        result: t("devwear.result"),
        category: t("devwear.category"),
        image: "/images/projects/devwear.webp",
        link: "https://my-prand.vercel.app/",
        gradient: "from-green-500 to-lime-600",
        features: ["feature1", "feature2", "feature3"],
      },

      {
        id: "visionoptics",
        name: "Vision Optics",
        result: t("visionoptics.result"),
        category: t("visionoptics.category"),
        image: "/images/projects/visionoptics.webp",
        link: "https://opt-eyes.vercel.app/",
        gradient: "from-cyan-500 to-teal-600",
        features: ["feature1", "feature2", "feature3"],
      },
      {
        id: "eduplatform",
        name: "EduConnect Platform",
        result: t("eduplatform.result"),
        category: t("eduplatform.category"),
        image: "/images/projects/eduplatform.webp",
        link: "https://edu-platform-nine-eta.vercel.app/login",
        gradient: "from-blue-500 to-indigo-600",
        features: ["feature1", "feature2", "feature3"],
      },
      {
        id: "eliteeats",
        name: "EliteEats",
        result: t("eliteeats.result"),
        category: t("eliteeats.category"),
        image: "/images/projects/eliteeats.webp",
        link: "https://smart-menu-rose.vercel.app/",
        gradient: "from-amber-500 to-orange-600",
        features: ["feature1", "feature2", "feature3"],
      },
      {
        id: "pharmacy",
        name: "Pharmacy Egypt",
        result: t("pharmacy.result"),
        category: t("pharmacy.category"),
        image: "/images/projects/pharmacy.webp",
        link: "https://ourpharmacies.vercel.app/",
        gradient: "from-emerald-500 to-teal-600",
        features: ["feature1", "feature2", "feature3"],
      },
      {
        id: "portfolio",
        name: "Professional Portfolio",
        result: t("portfolio.result"),
        category: t("portfolio.category"),
        image: "/images/projects/portfolio.webp",
        link: "https://kerolesadel.vercel.app/en",
        gradient: "from-purple-500 to-pink-600",
        features: ["feature1", "feature2", "feature3"],
      },
      {
        id: "titan",
        name: "Titan Fitness Club",
        result: t("titan.result"),
        category: t("titan.category"),
        image: "/images/projects/titan.webp",
        link: "https://titanfitness-gamma.vercel.app/",
        gradient: "from-red-500 to-orange-600",
        features: ["feature1", "feature2", "feature3"],
      },

      {
        id: "restaurant",
        name: "CrunchyBite",
        result: t("restaurant.result"),
        category: t("restaurant.category"),
        image: "/images/projects/restaurant.webp",
        link: "https://crunchybite.vercel.app/",
        gradient: "from-rose-500 to-pink-600",
        features: ["feature1", "feature2", "feature3"],
      },

      {
        id: "coza",
        name: "Coza Store",
        result: t("coza.result"),
        category: t("coza.category"),
        image: "/images/projects/coza.webp",
        link: "https://willowy-llama-affd20.netlify.app/",
        gradient: "from-blue-500 to-indigo-600",
        features: ["feature1", "feature2", "feature3"],
      },
    ],
    [t]
  );

  // Handle hover with keyboard fallback
  const handleMouseEnter = useCallback((i) => setHoveredIndex(i), []);
  const handleMouseLeave = useCallback(() => setHoveredIndex(null), []);

  // Handle keyboard focus for accessibility
  const handleFocus = useCallback((i) => setHoveredIndex(i), []);
  const handleBlur = useCallback(() => setHoveredIndex(null), []);

  // Animation variants with reduced motion support
  const cardVariants = useMemo(
    () => ({
      hover: {
        y: prefersReducedMotion ? 0 : -8,
        transition: {
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: "easeOut",
        },
      },
    }),
    [prefersReducedMotion]
  );

  const imageVariants = useMemo(
    () => ({
      hover: {
        scale: prefersReducedMotion ? 1 : 1.1,
        transition: {
          duration: prefersReducedMotion ? 0 : 0.7,
          ease: "easeOut",
        },
      },
    }),
    [prefersReducedMotion]
  );

  const overlayVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: "easeOut",
        },
      },
    }),
    [prefersReducedMotion]
  );

  return (
    <section
      id="projects"
      className="w-full bg-black/20 text-white relative overflow-hidden py-16 sm:py-20 md:py-24 px-4 sm:px-6"
      style={{
        paddingTop: "calc(4rem + env(safe-area-inset-top))",
        paddingBottom: "calc(4rem + env(safe-area-inset-bottom))",
      }}
      aria-labelledby="featured-work-heading"
    >
      {/* === Background Gradients - unchanged === */}
      <div
        className="absolute w-[400px] sm:w-[600px] md:w-[800px] lg:w-[1000px] h-[400px] sm:h-[600px] md:h-[800px] lg:h-[1000px] bg-purple-700 opacity-20 blur-[120px] sm:blur-[140px] md:blur-[160px] lg:blur-[180px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div
        className="absolute w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[500px] md:h-[700px] bg-purple-900 opacity-10 blur-[100px] sm:blur-[120px] md:blur-[140px] rounded-full bottom-0 right-0 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div
        className="absolute w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-pink-800/10 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full top-40 left-20 pointer-events-none hidden sm:block"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* === Header === */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 pt-4">
          <h2
            id="featured-work-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent leading-tight tracking-tight"
          >
            {t("title")}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            {t("description")}
          </p>
          <div
            className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent mx-auto mt-6 sm:mt-8 rounded-full"
            aria-hidden="true"
          ></div>
        </div>

        {/* === Projects Grid === */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
          role="list"
          aria-label={t("projectsList")}
        >
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black rounded-2xl"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleFocus(i)}
              onBlur={handleBlur}
              role="listitem"
              aria-label={`${project.name}: ${project.category} - ${t(
                "openInNewTab"
              )}`}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* === Image Section === */}
                <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden">
                  {project.image ? (
                    <>
                      <motion.div
                        variants={imageVariants}
                        whileHover="hover"
                        className="relative w-full h-full"
                      >
                        <Image
                          src={project.image}
                          alt={t("projectAlt", { name: project.name })}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading={i < 2 ? "eager" : "lazy"}
                          priority={i < 2}
                        />
                      </motion.div>

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                        initial="hidden"
                        animate={hoveredIndex === i ? "visible" : "hidden"}
                        variants={overlayVariants}
                      ></motion.div>
                    </>
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                      aria-hidden="true"
                    >
                      <span className="text-white/20 text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4 select-none">
                        {project.name}
                      </span>
                    </div>
                  )}

                  {/* === View Project Button === */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial="hidden"
                    animate={hoveredIndex === i ? "visible" : "hidden"}
                    variants={overlayVariants}
                  >
                    <div className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold flex items-center gap-2 shadow-2xl transform hover:scale-105 transition-transform pointer-events-auto min-h-[44px] touch-manipulation">
                      <span>{t("viewProject")}</span>

                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* === Content Section === */}
                <div className="p-5 sm:p-6 md:p-8 relative z-10">
                  <div
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/5 absolute bottom-3 right-4 sm:bottom-4 sm:right-6 select-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300 leading-tight">
                    {project.name}
                  </h3>

                  {/* RESULT */}
                  <div className="mb-3">
                    <span className="text-green-400 text-xs sm:text-sm font-semibold">
                      {project.result}
                    </span>
                  </div>

                  {/* CATEGORY */}
                  <p className="text-purple-400 text-xs sm:text-sm md:text-base font-medium mb-3 sm:mb-4 leading-relaxed">
                    {project.category}
                  </p>

                  {/* === Problem / Solution / Features === */}
                  <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
                    <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">
                      <span className="text-purple-400 font-medium">
                        {t(`${project.id}.problemLabel`)}
                      </span>{" "}
                      {t(`${project.id}.problem`)}
                    </p>

                    <p className="text-gray-300 text-[10px] sm:text-xs leading-relaxed">
                      <span className="text-purple-400 font-medium">
                        {t(`${project.id}.solutionLabel`)}
                      </span>{" "}
                      {t(`${project.id}.solution`)}
                    </p>

                    {/* Features Tags */}
                    <div
                      className="flex flex-wrap gap-1.5 mt-3"
                      role="list"
                      aria-label={t("featuresList")}
                    >
                      {project.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          role="listitem"
                        >
                          {t(`${project.id}.features.${feature}`)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* === Hover Line === */}
                  <div
                    className={`h-0.5 bg-purple-500 mt-4 transition-all duration-500 ${
                      hoveredIndex === i ? "w-10 sm:w-12" : "w-0"
                    }`}
                    aria-hidden="true"
                  ></div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
