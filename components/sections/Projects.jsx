"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FeaturedWork() {
  const locale = useLocale();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // المشاريع - ضيف الرابط بتاع كل مشروع هنا
  const projectsEn = [
    {
      name: "Nova Analytics",
      category: "Fintech Dashboard",
      image: "/images/dashboard.jpg",
      link: "/work/nova-analytics", // 👈 حط الرابط هنا
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
    <section className="w-full min-h-screen bg-black text-white relative overflow-hidden py-24 px-4 md:px-8">
      {/* gradient blur background - اكبر واحلى */}
      <div className="absolute w-[1000px] h-[1000px] bg-purple-700 opacity-20 blur-[180px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute w-[700px] h-[700px] bg-purple-900 opacity-10 blur-[140px] rounded-full bottom-0 right-0"></div>
      <div className="absolute w-[500px] h-[500px] bg-pink-800/10 blur-[120px] rounded-full top-40 left-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* header - اكبر واشيك */}
        <div className="text-center mb-20">
          <span className="text-purple-400 text-sm uppercase tracking-[0.3em] font-medium mb-3 block">
            {locale === "ar" ? "أعمالنا" : "PORTFOLIO"}
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent">
            {locale === "ar" ? "أعمالنا المميزة" : "Featured Work"}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {locale === "ar"
              ? "مجموعة مختارة من أحدث منتجاتنا الرقمية. صُممت للأداء، صُممت لتحويل الزوار إلى عملاء."
              : "A selection of our recent digital products. Built for performance, designed to convert."}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent mx-auto mt-8 rounded-full"></div>
        </div>

        {/* جريد 2x2 - اكبر واشيك */}
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
                
                {/* حتة الصورة مع hover effect */}
                <div className="relative h-72 md:h-80 w-full overflow-hidden">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      {/* dark overlay على الصورة عند hover */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}></div>
                    </>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                      <span className="text-white/20 text-5xl font-bold">{project.name}</span>
                    </div>
                  )}
                  
                  {/* زر View Project - بيظهر عند hover */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoveredIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                    <div className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center gap-2 shadow-2xl transform hover:scale-105 transition-transform">
                      <span>{locale === "ar" ? "عرض المشروع" : "View Project"}</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* النص - اشيك واحلى */}
                <div className="p-6 md:p-8 relative z-10">
                  {/* رقم المشروع */}
                  <div className="text-6xl font-bold text-white/5 absolute bottom-4 right-6 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-purple-400 text-sm md:text-base font-medium">
                    {project.category}
                  </p>
                  
                  {/* خط صغير تحت النص بيظهر عند hover */}
                  <div className={`h-0.5 bg-purple-500 mt-4 transition-all duration-500 ${hoveredIndex === i ? 'w-12' : 'w-0'}`}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Projects button - اشيك */}
        <div className="text-center mt-16">
          <Link
            href={locale === "ar" ? "/ar/work" : "/work"}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 font-semibold"
          >
            <span>{locale === "ar" ? "عرض كل المشاريع" : "View All Projects"}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}