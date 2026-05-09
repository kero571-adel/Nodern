"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FeaturedWork() {
  const locale = useLocale();
  const t = useTranslations("projects");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projectsEn = [
    {
      name: "Nova Analytics",
      category: "Fintech Dashboard",
      image: "/images/dashboard.jpg",
      link: "/work/nova-analytics",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      name: "Aura Maison",
      category: "Luxury eCommerce",
      image: "/images/dashboard2.jpg",
      link: "/work/aura-maison",
      gradient: "from-amber-600 to-orange-600",
    },
    {
      name: "BlockTrade",
      category: "Crypto Exchange",
      image: "/images/Modern_UI_Flow.jpg",
      link: "/work/blocktrade",
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      name: "Nexus Flow",
      category: "SaaS Marketing Site",
      image: "/images/Coffee_website.jpg",
      link: "/work/nexus-flow",
      gradient: "from-pink-600 to-rose-600",
    },
  ];

  const projectsAr = [
    {
      name: "نوفا أناليتيكس",
      category: "لوحة تحكم مالية",
      image: "/images/dashboard.jpg",
      link: "/ar/work/nova-analytics",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      name: "أورا ميزون",
      category: "تجارة إلكترونية فاخرة",
      image: "/images/dashboard2.jpg",
      link: "/ar/work/aura-maison",
      gradient: "from-amber-600 to-orange-600",
    },
    {
      name: "بلوك تريد",
      category: "منصة عملات رقمية",
      image: "/images/Modern_UI_Flow.jpg",
      link: "/ar/work/blocktrade",
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      name: "نيكسوس فلو",
      category: "موقع تسويق SaaS",
      image: "/images/Coffee_website.jpg",
      link: "/ar/work/nexus-flow",
      gradient: "from-pink-600 to-rose-600",
    },
  ];

  const projects = locale === "ar" ? projectsAr : projectsEn;

  return (
    <section id="work" className="w-full min-h-screen bg-black text-white relative overflow-hidden py-24 px-4 md:px-8">
      {/* background gradients */}
      <div className="absolute w-[1000px] h-[1000px] bg-purple-700 opacity-20 blur-[180px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-400 text-sm uppercase tracking-[0.3em] font-medium mb-3 block"
          >
            {t("subtitle")}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent"
          >
            {t("title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {t("description")}
          </motion.p>

          {/* Example from PDF */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-20 text-start"
          >
            <h4 className="text-xl font-bold text-blue-400 mb-4">{t("exampleTitle")}</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="text-xs text-red-400 uppercase font-bold tracking-widest">Problem</span>
                <p className="text-gray-300 text-sm md:text-base">{t("problem")}</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-blue-400 uppercase font-bold tracking-widest">Solution</span>
                <p className="text-gray-300 text-sm md:text-base">{t("solution")}</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-emerald-400 uppercase font-bold tracking-widest">Result</span>
                <p className="text-gray-300 text-sm md:text-base">{t("result")}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <Link
              key={i}
              href={project.link}
              className="group block"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="relative h-72 md:h-80 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}></div>
                  
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                    <div className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center gap-2">
                      <span>{t("viewProject")}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-purple-400 text-sm md:text-base font-medium">
                    {project.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <Link
            href={locale === "ar" ? "/ar/work" : "/work"}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 font-semibold"
          >
            <span>{t("viewAll")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}