"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FeaturedWork() {
  const t = useTranslations("FeaturedWork");
  
  // ✅ Fixed: شيلنا الـ <number | null> عشان الملف JSX
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      id: "eliteeats",
      name: "EliteEats",
      category: "Digital Menu Web App",
      image: "/images/projects/Whisk_af05c77490d4e1c95c04484c5bd9b98edr.png",
      link: "https://smart-menu-rose.vercel.app/",
      gradient: "from-amber-500 to-orange-600",
      features: ["feature1", "feature2", "feature3"],
    },
    {
      id: "pharmacy",
      name: "Pharmacy Egypt",
      category: "Medical Landing Page",
      image: "/images/projects/Screenshot 2026-04-25 235105.png",
      link: "https://ourpharmacies.vercel.app/",
      gradient: "from-emerald-500 to-teal-600",
      features: ["feature1", "feature2", "feature3"],
    },
    {
      id: "portfolio",
      name: "Professional Portfolio",
      category: "Personal Brand Website",
      image: "/images/projects/Whisk_6ad9295eb4deb53b9384355230b84f79dr.png",
      link: "https://kerolesadel.vercel.app/en",
      gradient: "from-purple-500 to-pink-600",
      features: ["feature1", "feature2", "feature3"],
    },
    {
      id: "titan",
      name: "Titan Fitness Club",
      category: "Gym Management Platform",
      image: "/images/projects/Screenshot 2026-04-25 235603.png",
      link: "https://titanfitness-gamma.vercel.app/",
      gradient: "from-red-500 to-orange-600",
      features: ["feature1", "feature2", "feature3"],
    },
    {
      id: "restaurant",
      name: "CrunchyBite",
      category: "Restaurant Web App",
      image: "/images/projects/Screenshot 2026-04-25 235340.png",
      link: "https://crunchybite.vercel.app/",
      gradient: "from-rose-500 to-pink-600",
      features: ["feature1", "feature2", "feature3"],
    },
    {
      id: "coza",
      name: "Coza Store",
      category: "E-Commerce Platform",
      image: "/images/projects/Screenshot 2026-04-26 000042.png",
      link: "https://willowy-llama-affd20.netlify.app/",
      gradient: "from-blue-500 to-indigo-600",
      features: ["feature1", "feature2", "feature3"],
    },
  ];

  return (
    <section className="w-full bg-black text-white relative overflow-hidden py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      {/* === Background Gradients === */}
      <div className="absolute w-[800px] sm:w-[1000px] h-[800px] sm:h-[1000px] bg-purple-700 opacity-20 blur-[180px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-purple-900 opacity-10 blur-[140px] rounded-full bottom-0 right-0"></div>
      <div className="absolute w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-pink-800/10 blur-[120px] rounded-full top-40 left-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* === Header - Fixed Title Cut-off === */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 pt-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent leading-tight tracking-tight">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            {t("description")}
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent mx-auto mt-6 sm:mt-8 rounded-full"></div>
        </div>

        {/* === Projects Grid 2x2 === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={project.link}
              target="_blank"
              className="group block"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* === Image Section === */}
                <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
                          hoveredIndex === i ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>
                    </>
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                    >
                      <span className="text-white/20 text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4">
                        {project.name}
                      </span>
                    </div>
                  )}

                  {/* === View Project Button === */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      hoveredIndex === i
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90"
                    }`}
                  >
                    <div className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold flex items-center gap-2 shadow-2xl transform hover:scale-105 transition-transform">
                      <span>{t("viewProject")}</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* === Content Section === */}
                <div className="p-5 sm:p-6 md:p-8 relative z-10">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/5 absolute bottom-3 right-4 sm:bottom-4 sm:right-6 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2 group-hover:text-purple-400 transition-colors duration-300 leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-purple-400 text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3">
                    {project.category}
                  </p>

                  {/* === Problem / Solution / Features === */}
                  <div className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
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
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3">
                      {project.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        >
                          {t(`${project.id}.features.${feature}`)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* === Hover Line === */}
                  <div
                    className={`h-0.5 bg-purple-500 mt-3 sm:mt-4 transition-all duration-500 ${
                      hoveredIndex === i ? "w-10 sm:w-12" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}