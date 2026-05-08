"use client";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedBack() {
  const locale = useLocale();
  const t = useTranslations("feedback");

  const quotes = [
    { text: t("quote1"), name: locale === "ar" ? "عميل سعيد" : "Happy Client" },
    { text: t("quote2"), name: locale === "ar" ? "شريك نجاح" : "Success Partner" },
    { text: t("quote3"), name: locale === "ar" ? "رائد أعمال" : "Entrepreneur" },
  ];

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? quotes.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === quotes.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center bg-black text-white relative overflow-hidden py-24">
      {/* Background decoration */}
      <div className="absolute w-[800px] h-[800px] bg-blue-600/10 blur-[160px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl px-6 mx-auto">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block"
        >
          {t("title")}
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-gray-400"
        >
          {t("subtitle")}
        </motion.h2>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <span className="text-8xl text-blue-600/20 absolute -top-10 font-serif">“</span>
              <p className="text-2xl md:text-4xl leading-relaxed font-medium mb-8">
                {quotes[index].text}
              </p>
              <div className="w-12 h-1 bg-blue-600 mb-6 rounded-full" />
              <h4 className="text-xl font-bold text-gray-300">{quotes[index].name}</h4>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <button
            onClick={prev}
            className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-all active:scale-90"
          >
            <span className="text-2xl rtl:rotate-180">←</span>
          </button>

          <div className="flex gap-3">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-8 bg-blue-600" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-all active:scale-90"
          >
            <span className="text-2xl rtl:rotate-180">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}