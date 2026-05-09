"use client";
import { useState } from "react";
import { useTranslations } from "next-intl"; // لو بتستعملوا next-intl
// أو لو بتستعملوا i18next:
// import { useTranslation } from "react-i18next";

export default function Testimonials() {
  // الطريقة الأولى: لو بتستعملوا next-intl (الأشهر مع Next.js App Router)
  const t = useTranslations("testimonials");
  const locale = "ar"; // هاتها من الـ params أو useParams

  // البيانات بتاعة testimonials
  const testimonials = [
    {
      text: "Modern completely transformed our online presence. Our conversion rate increased by 140% within the first month of launching the new site.",
      name: "Sarah Jenkins",
      role: "CMO, TechFlow Solutions",
    },
    {
      text: "Amazing experience working with Modern team!",
      name: "Ahmed Ali",
      role: "CEO, Startup",
    },
    {
      text: "Highly professional and fast delivery.",
      name: "Sara Mohamed",
      role: "Marketing Manager",
    },
  ];

  // نسخة عربية
  const testimonialsAr = [
    {
      text: "قامت مودرن بتحويل وجودنا على الإنترنت بالكامل. زاد معدل التحويل لدينا بنسبة 140٪ خلال الشهر الأول من إطلاق الموقع الجديد.",
      name: "سارة جنكينز",
      role: "مديرة التسويق، TechFlow Solutions",
    },
    {
      text: "تجربة رائعة مع فريق مودرن!",
      name: "أحمد علي",
      role: "الرئيس التنفيذي، شركة ناشئة",
    },
    {
      text: "احترافية عالية وتسليم سريع.",
      name: "سارة محمد",
      role: "مديرة التسويق",
    },
  ];

  const [index, setIndex] = useState(0);
  
  // اختار البيانات حسب اللغة (localStorage, context, or props)
  // هنفترض إن اللغة مخزنة في localStorage أو context
  const [lang, setLang] = useState("en");
  
  // جيب اللغة من الـ URL أو الـ context بتاعكم
  // لو عندكم LanguageSwitcher، خلي الـ language تجي من props
  const currentData = lang === "ar" ? testimonialsAr : testimonials;
  const currentItem = currentData[index];

  const prev = () => {
    setIndex(index === 0 ? currentData.length - 1 : index - 1);
  };

  const next = () => {
    setIndex(index === currentData.length - 1 ? 0 : index + 1);
  };

  // استمع لتغيير اللغة (لو عندكم context)
  // useEffect(() => {
  //   const savedLang = localStorage.getItem("language") || "en";
  //   setLang(savedLang);
  // }, []);

  return (
    <section 
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="w-full min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden py-20"
    >
      {/* gradient blur background */}
      <div className="absolute w-[900px] h-[900px] bg-purple-700 opacity-20 blur-[150px] rounded-full"></div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        {/* title */}
        <h2 className="text-6xl md:text-6xl font-semibold mb-12">
          {lang === "ar" ? "قصص العملاء" : "Client Stories"}
        </h2>

        {/* quote icon */}
        <div className="text-7xl text-purple-500 mb-6">
          {lang === "ar" ? "❝" : "”"}
        </div>

        {/* testimonial text */}
        <p className="text-lg md:text-2xl leading-relaxed text-gray-200 mb-8">
          {currentItem.text}
        </p>

        {/* name */}
        <h4 className="text-xl font-semibold tracking-wide">
          {currentItem.name}
        </h4>

        {/* role */}
        <p className="text-gray-400 text-sm mb-10">
          {currentItem.role}
        </p>

        {/* navigation controls */}
        <div className="flex items-center justify-center gap-6">
          {/* prev button */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-purple-500 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <span className="text-2xl">
              {lang === "ar" ? "›" : "‹"}
            </span>
          </button>

          {/* dots */}
          <div className="flex gap-3">
            {currentData.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-purple-500"
                    : "w-2 bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* next button */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-purple-500 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <span className="text-2xl">
              {lang === "ar" ? "‹" : "›"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}