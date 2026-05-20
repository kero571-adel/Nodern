"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const carouselRef = useRef(null);
  const isPaused = useRef(false);

  // Testimonials data - English
  const testimonialsEn = useMemo(() => [
    {
      text: t("testimonial1.text"),
      name: t("testimonial1.name"),
      role: t("testimonial1.role"),
    },
    {
      text: t("testimonial2.text"),
      name: t("testimonial2.name"),
      role: t("testimonial2.role"),
    },
    {
      text: t("testimonial3.text"),
      name: t("testimonial3.name"),
      role: t("testimonial3.role"),
    },
  ], [t]);

  // Testimonials data - Arabic (fallback if translations not available)
  const testimonialsAr = useMemo(() => [
    {
      text: t("testimonial1.textAr") || "قامت مودرن بتحويل وجودنا على الإنترنت بالكامل. زاد معدل التحويل لدينا بنسبة 140٪ خلال الشهر الأول من إطلاق الموقع الجديد.",
      name: t("testimonial1.nameAr") || "سارة جنكينز",
      role: t("testimonial1.roleAr") || "مديرة التسويق، TechFlow Solutions",
    },
    {
      text: t("testimonial2.textAr") || "تجربة رائعة مع فريق مودرن!",
      name: t("testimonial2.nameAr") || "أحمد علي",
      role: t("testimonial2.roleAr") || "الرئيس التنفيذي، شركة ناشئة",
    },
    {
      text: t("testimonial3.textAr") || "احترافية عالية وتسليم سريع.",
      name: t("testimonial3.nameAr") || "سارة محمد",
      role: t("testimonial3.roleAr") || "مديرة التسويق",
    },
  ], [t]);

  const [index, setIndex] = useState(0);
  const isRtl = locale === "ar";
  const currentData = isRtl ? testimonialsAr : testimonialsEn;
  const currentItem = currentData[index];

  // Navigation handlers
  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? currentData.length - 1 : i - 1));
  }, [currentData.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === currentData.length - 1 ? 0 : i + 1));
  }, [currentData.length]);

  const goToSlide = useCallback((i) => {
    setIndex(i);
    isPaused.current = false;
  }, []);

  // Auto-rotate with pause on hover/focus
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      if (!isPaused.current) {
        next();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [next, prefersReducedMotion]);

  // Pause rotation on hover/focus for accessibility
  const handleMouseEnter = useCallback(() => { isPaused.current = true; }, []);
  const handleMouseLeave = useCallback(() => { isPaused.current = false; }, []);

  // Keyboard navigation support
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft" || (isRtl && e.key === "ArrowRight")) {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight" || (isRtl && e.key === "ArrowLeft")) {
      e.preventDefault();
      next();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToSlide(currentData.length - 1);
    }
  }, [prev, next, goToSlide, isRtl, currentData.length]);

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
        next(); // Swiped left → next
      } else {
        prev(); // Swiped right → prev
      }
    }
  }, [next, prev]);

  // Animation variants with reduced motion support
  const slideVariants = useMemo(() => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: prefersReducedMotion ? 1 : 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.2 : 0.5, 
        ease: prefersReducedMotion ? "linear" : "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : -20,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.3 }
    }
  }), [prefersReducedMotion]);

  // Directional arrows based on RTL
  const prevArrow = isRtl ? "›" : "‹";
  const nextArrow = isRtl ? "‹" : "›";
  const quoteMark = isRtl ? "❝" : "❞";

  return (
    <section 
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6"
      style={{ 
        paddingTop: 'calc(4rem + env(safe-area-inset-top))',
        paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))'
      }}
      aria-labelledby="testimonials-heading"
    >
      {/* gradient blur background - responsive sizing */}
      <div 
        className="absolute w-[400px] sm:w-[600px] md:w-[900px] h-[400px] sm:h-[600px] md:h-[900px] bg-purple-700 opacity-20 blur-[100px] sm:blur-[120px] md:blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />

      <div 
        ref={carouselRef}
        className="relative z-10 text-center max-w-3xl px-4 sm:px-6 mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="region"
        aria-label={t("carouselLabel")}
        aria-roledescription="carousel"
      >
        {/* Title */}
        <motion.h2 
          id="testimonials-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 sm:mb-10 md:mb-12 leading-tight"
        >
          {isRtl ? t("titleAr") : t("titleEn")}
        </motion.h2>

        {/* Quote Icon */}
        <div 
          className="text-5xl sm:text-6xl md:text-7xl text-purple-500 mb-4 sm:mb-6 select-none"
          aria-hidden="true"
        >
          {quoteMark}
        </div>

        {/* Testimonial Text - Animated with AnimatePresence */}
        <div className="relative min-h-[120px] sm:min-h-[140px] flex items-center justify-center mb-6 sm:mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-base sm:text-lg md:text-2xl leading-relaxed text-gray-200 px-2"
            >
              {currentItem.text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Name */}
        <AnimatePresence mode="wait">
          <motion.h4
            key={`name-${index}`}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-lg sm:text-xl font-semibold tracking-wide mb-1"
          >
            {currentItem.name}
          </motion.h4>
        </AnimatePresence>

        {/* Role */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`role-${index}`}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-gray-400 text-xs sm:text-sm mb-8 sm:mb-10"
          >
            {currentItem.role}
          </motion.p>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          
          {/* Prev Button */}
          <button
            onClick={prev}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-purple-500 transition-all duration-300 min-h-[44px] min-w-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            aria-label={isRtl ? t("nextAria") : t("prevAria")}
            aria-controls="testimonial-carousel"
          >
            <span className="text-xl sm:text-2xl" aria-hidden="true">{prevArrow}</span>
          </button>

          {/* Dots Indicator */}
          <div 
            id="testimonial-carousel"
            className="flex gap-2 sm:gap-3" 
            role="tablist"
            aria-label={t("slideIndicator")}
          >
            {currentData.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                role="tab"
                aria-selected={i === index}
                aria-controls={`slide-${i}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 min-w-[6px] sm:min-w-[8px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  i === index
                    ? "w-6 sm:w-8 bg-purple-500"
                    : "w-1.5 sm:w-2 bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={t("goToSlide", { number: i + 1 })}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={next}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-purple-500 transition-all duration-300 min-h-[44px] min-w-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            aria-label={isRtl ? t("prevAria") : t("nextAria")}
            aria-controls="testimonial-carousel"
          >
            <span className="text-xl sm:text-2xl" aria-hidden="true">{nextArrow}</span>
          </button>
        </div>

        {/* Live Region for Screen Readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {t("slide")} {index + 1} {t("of")} {currentData.length}: {currentItem.text}
        </div>
      </div>

      {/* CSS for reduced motion & focus styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Focus visible for keyboard navigation */
        button:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }
        
        /* Screen reader only utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </section>
  );
}