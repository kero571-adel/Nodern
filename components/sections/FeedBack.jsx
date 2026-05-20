"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedBack() {
  const locale = useLocale();
  const t = useTranslations("feedback");
  const carouselRef = useRef(null);
  const isPaused = useRef(false);

  const quotes = [
    { text: t("quote1"), name: locale === "ar" ? "عميل سعيد" : "Happy Client" },
    {
      text: t("quote2"),
      name: locale === "ar" ? "شريك نجاح" : "Success Partner",
    },
    {
      text: t("quote3"),
      name: locale === "ar" ? "رائد أعمال" : "Entrepreneur",
    },
  ];

  const [index, setIndex] = useState(0);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? quotes.length - 1 : i - 1));
  }, [quotes.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === quotes.length - 1 ? 0 : i + 1));
  }, [quotes.length]);

  const goToSlide = useCallback((i) => {
    setIndex(i);
    isPaused.current = false;
  }, []);

  // Auto-rotate with pause on hover/focus
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        next();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [next]);

  // Pause rotation on hover/focus for accessibility
  const handleMouseEnter = useCallback(() => {
    isPaused.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isPaused.current = false;
  }, []);

  // Keyboard navigation support
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft" || (locale === "ar" && e.key === "ArrowRight")) {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight" || (locale === "ar" && e.key === "ArrowLeft")) {
      e.preventDefault();
      next();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToSlide(quotes.length - 1);
    }
  }, [prev, next, goToSlide, locale, quotes.length]);

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  }, []);

  const handleSwipe = useCallback(() => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left → next
        next();
      } else {
        // Swiped right → prev
        prev();
      }
    }
  }, [next, prev]);

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05, 
      y: -20,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  return (
    <section 
      className="w-full min-h-[80vh] flex items-center justify-center bg-black/20 text-white relative overflow-hidden py-20 sm:py-24 px-4"
      style={{ 
        paddingTop: 'calc(5rem + env(safe-area-inset-top))',
        paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))'
      }}
    >
      {/* Background decoration - unchanged */}
      <div className="absolute w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-blue-600/10 blur-[120px] sm:blur-[140px] md:blur-[160px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div 
        ref={carouselRef}
        className="relative z-10 text-center max-w-4xl px-4 sm:px-6 mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="region"
        aria-label={t("title")}
        aria-roledescription="carousel"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-blue-500 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4 block"
        >
          {t("title")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-12 sm:mb-16 text-gray-400"
        >
          {t("subtitle")}
        </motion.h2>

        <div 
          className="relative min-h-[250px] sm:min-h-[300px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              custom={index}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <span className="text-6xl sm:text-7xl md:text-8xl text-blue-600/20 absolute -top-8 sm:-top-10 font-serif select-none" aria-hidden="true">
                "
              </span>
              <blockquote className="text-xl sm:text-2xl md:text-4xl leading-relaxed font-medium mb-6 sm:mb-8">
                {quotes[index].text}
              </blockquote>
              <div className="w-12 h-1 bg-blue-600 mb-4 sm:mb-6 rounded-full" aria-hidden="true" />
              <cite className="text-lg sm:text-xl font-bold text-gray-300 not-italic">
                {quotes[index].name}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12">
          <button
            onClick={prev}
            className="p-3 sm:p-4 rounded-full border border-white/10 hover:bg-white/5 transition-all active:scale-90 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label={locale === "ar" ? "اقتباس سابق" : "Previous quote"}
            aria-controls="testimonial-carousel"
          >
            <span className="text-xl sm:text-2xl" aria-hidden="true">←</span>
          </button>

          <div 
            id="testimonial-carousel"
            className="flex gap-2 sm:gap-3" 
            role="tablist"
            aria-label={t("slideIndicator")}
          >
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                role="tab"
                aria-selected={i === index}
                aria-controls={`slide-${i}`}
                id={`tab-${i}`}
                className={`h-1.5 rounded-full transition-all duration-300 min-w-[8px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                  i === index ? "w-6 sm:w-8 bg-blue-600" : "w-1.5 sm:w-2 bg-white/20"
                }`}
                aria-label={locale === "ar" ? `اذهب إلى الاقتباس ${i + 1}` : `Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 sm:p-4 rounded-full border border-white/10 hover:bg-white/5 transition-all active:scale-90 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label={locale === "ar" ? "اقتباس التالي" : "Next quote"}
            aria-controls="testimonial-carousel"
          >
            <span className="text-xl sm:text-2xl" aria-hidden="true">→</span>
          </button>
        </div>

        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {t("slide")} {index + 1} {t("of")} {quotes.length}: {quotes[index].text}
        </div>
      </div>
    </section>
  );
}