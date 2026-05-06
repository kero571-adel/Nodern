"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

export default function FeedBack() {
  const locale = useLocale();

 
  const dataEn = [
    {
      text: "Modern completely transformed our online presence. Our conversion rate increased by 140% within the first month of launching the new site.",
      name: "Sarah Jenkins",
      role: "CMO, TechFlow Solutions",
    },
    {
      text: "The team at Modern delivered exceptional work. Our brand visibility improved dramatically across all markets.",
      name: "James Carter",
      role: "CEO, Apex Innovations",
    },
    {
      text: "Working with Modern was a game changer. They understood our vision and brought it to life perfectly.",
      name: "Elena Rodriguez",
      role: "Marketing Director, Velora Beauty",
    },
  ];

  // البيانات بالعربي - نفس العدد، أسماء ووظائف بالعربي
  const dataAr = [
    {
      text: "مودرن غيرت وجودنا على الإنترنت بالكامل. زاد معدل التحويل لدينا بنسبة 140٪ خلال الشهر الأول من إطلاق الموقع الجديد.",
      name: "سارة جنكينز",
      role: "مديرة التسويق، تك فلو سوليوشنز",
    },
    {
      text: "فريق مودرن قدم عملاً استثنائياً. تحسنت رؤية علامتنا التجارية بشكل كبير في جميع الأسواق.",
      name: "جيمس كارتر",
      role: "الرئيس التنفيذي، أبيكس إنوفيشنز",
    },
    {
      text: "العمل مع مودرن كان نقطة تحول. فهموا رؤيتنا وقدموها إلى الحياة بشكل مثالي.",
      name: "إلينا رودريغيز",
      role: "مديرة التسويق، فيلورا بيوتي",
    },
  ];

  const [index, setIndex] = useState(0);

  const data = locale === "ar" ? dataAr : dataEn;
  const currentItem = data[index];

  const prev = () => {
    setIndex(index === 0 ? data.length - 1 : index - 1);
  };

  const next = () => {
    setIndex(index === data.length - 1 ? 0 : index + 1);
  };

  useEffect(() => {
    setIndex(0);
  }, [locale]);

  return (
    <section className="w-full h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* gradient blur - زي الصورة بالضبط */}
      <div className="absolute w-[900px] h-[900px] bg-purple-700 opacity-20 blur-[150px] rounded-full"></div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        {/* title */}
        <h2 className="text-6xl md:text-6xl font-semibold mb-12">
          {locale === "ar" ? "آراء العملاء" : "Client Stories"}
        </h2>

        {/* quote icon */}
        <div className="text-7xl text-purple-500 mb-6">
          {locale === "ar" ? "❝" : "”"}
        </div>

        {/* text */}
        <p className="text-lg md:text-2xl leading-relaxed text-gray-200 mb-8">
          {currentItem.text}
        </p>

        {/* name */}
        <h4 className="text-lg font-semibold">{currentItem.name}</h4>

        {/* role */}
        <p className="text-gray-400 text-sm mb-10">{currentItem.role}</p>

        {/* controls */}
        <div className="flex items-center justify-center gap-6">
          {/* left button */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition"
          >
             {locale === "ar" ? "‹" : "›"}
          </button>

          {/* dots */}
          <div className="flex gap-2">
            {data.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-purple-500" : "w-2 bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* right button */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition"
          >
            {locale === "ar" ? "‹" : "›"}
          </button>
        </div>
      </div>
    </section>
  );
}