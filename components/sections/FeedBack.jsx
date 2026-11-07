"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

const BASE_PATH = "/feedback";
const MAX_ITEMS = 50; // سقف أمان للبحث عن الملفات
const GAP = 16; // المسافة بين العناصر بالبكسل
const SLIDE_RATIO = 0.78; // عرض العنصر من عرض الكاروسيل

const EXTS = [
  ["webp", "image"],
  ["mp4", "video"],
  ["MOV", "video"],
];
const PREFIX = { image: "image/", video: "video/" };

// عناصر وهمية بتظهر لحد ما أول ملف يتلاقى
const PLACEHOLDERS = [{ placeholder: true }, { placeholder: true }, { placeholder: true }];

// بيجرب الامتدادات الثلاثة لنفس الرقم في نفس الوقت (طلب واحد بدل تلاتة ورا بعض)
async function probe(n) {
  const results = await Promise.all(
    EXTS.map(async ([ext, type]) => {
      const src = `${BASE_PATH}/${n}.${ext}`;
      try {
        const res = await fetch(src, { method: "HEAD" });
        const ct = res.headers.get("content-type") || "";
        return res.ok && ct.startsWith(PREFIX[type]) ? { type, src } : null;
      } catch {
        return null;
      }
    })
  );
  return results.find(Boolean) || null;
}

function Spinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/5 animate-pulse">
      <div
        className="h-10 w-10 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin"
        aria-hidden="true"
      />
    </div>
  );
}

export default function FeedBack() {
  const locale = useLocale();
  const t = useTranslations("feedback");

  const [items, setItems] = useState([]);
  const [discovering, setDiscovering] = useState(true);
  const [loaded, setLoaded] = useState({});
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);

  const viewportRef = useRef(null);
  const videoRefs = useRef([]);
  const isPaused = useRef(false);
  const isVideoPlaying = useRef(false);
  const touchStartX = useRef(0);

  const total = items.length;

  const markLoaded = useCallback((src) => {
    setLoaded((p) => (p[src] ? p : { ...p, [src]: true }));
  }, []);

  // اكتشاف الملفات بالترتيب: كل عنصر بيظهر أول ما يتلاقى من غير ما يستنى الباقي
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let n = 1; n <= MAX_ITEMS; n++) {
        const item = await probe(n);
        if (cancelled) return;
        if (!item) break;
        setItems((prev) => [...prev, item]);
      }
      if (!cancelled) setDiscovering(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // قياس عرض الكاروسيل
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const next = useCallback(() => {
    setIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  const goToSlide = useCallback((i) => setIndex(i), []);

  // إيقاف أي فيديو مش هو الحالي
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) v.pause();
    });
    isVideoPlaying.current = false;
  }, [index]);

  // تدوير تلقائي (بيقف مع الهوفر أو أثناء تشغيل فيديو أو لحد ما الاكتشاف يخلص)
  useEffect(() => {
    if (total < 2 || discovering) return;
    const interval = setInterval(() => {
      if (!isPaused.current && !isVideoPlaying.current) next();
    }, 5000);
    return () => clearInterval(interval);
  }, [next, total, discovering]);

  const handleMouseEnter = useCallback(() => {
    isPaused.current = true;
  }, []);
  const handleMouseLeave = useCallback(() => {
    isPaused.current = false;
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (total === 0) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(total - 1);
      }
    },
    [prev, next, goToSlide, total]
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (total === 0) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
    },
    [next, prev, total]
  );

  // العنصر الحالي في النص وجزء من اللي قبله واللي بعده باينين (كل العناصر 9:16)
  const slideWidth = Math.min(width * SLIDE_RATIO, 320);
  const x = (width - slideWidth) / 2 - index * (slideWidth + GAP);

  const blockContext = (e) => e.preventDefault();

  const slides = total > 0 ? items : discovering ? PLACEHOLDERS : [];

  return (
    <section
      className="w-full min-h-[80vh] flex items-center justify-center bg-black/20 text-white relative overflow-hidden py-20 sm:py-24 px-4"
      style={{
        paddingTop: "calc(5rem + env(safe-area-inset-top))",
        paddingBottom: "calc(5rem + env(safe-area-inset-bottom))",
      }}
    >
      <div className="absolute w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-blue-600/10 blur-[120px] sm:blur-[140px] md:blur-[160px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div
        className="relative z-10 text-center w-full max-w-5xl mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="region"
        aria-label={t("title")}
        aria-roledescription="carousel"
        aria-busy={discovering && total === 0}
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
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-10 sm:mb-14 text-gray-400"
        >
          {t("subtitle")}
        </motion.h2>

        {/* الكاروسيل دايماً LTR عشان حساب الحركة يبقى ثابت حتى في العربي */}
        <div
          dir="ltr"
          ref={viewportRef}
          className="relative w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.length > 0 && width > 0 && (
            <motion.div
              className="flex"
              style={{ gap: GAP }}
              initial={false}
              animate={{ x }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
            >
              {slides.map((item, i) => {
                const isActive = i === index;
                const baseClass = `relative shrink-0 aspect-[9/16] rounded-2xl overflow-hidden bg-black/40 border border-white/10 transition-all duration-500 ${
                  isActive
                    ? "opacity-100 scale-100"
                    : "opacity-40 scale-[0.94] cursor-pointer hover:opacity-60"
                }`;

                // عنصر تحميل وهمي لحد ما الملفات تتلاقى
                if (item.placeholder) {
                  return (
                    <div
                      key={`ph-${i}`}
                      className={baseClass}
                      style={{ width: slideWidth }}
                      aria-hidden="true"
                    >
                      <Spinner />
                    </div>
                  );
                }

                const isLoaded = !!loaded[item.src];

                return (
                  <div
                    key={item.src}
                    id={`slide-${i}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} / ${total}`}
                    onClick={() => !isActive && goToSlide(i)}
                    className={baseClass}
                    style={{ width: slideWidth }}
                  >
                    {!isLoaded && <Spinner />}

                    {item.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        ref={(el) => {
                          if (el && el.complete && el.naturalWidth) markLoaded(item.src);
                        }}
                        src={item.src}
                        alt={`${t("title")} ${i + 1}`}
                        className={`w-full h-full object-cover select-none transition-opacity duration-500 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        draggable={false}
                        loading={i <= 1 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        onLoad={() => markLoaded(item.src)}
                        onError={() => markLoaded(item.src)}
                        onContextMenu={blockContext}
                      />
                    ) : (
                      <video
                        ref={(el) => {
                          videoRefs.current[i] = el;
                          if (el && el.readyState >= 2) markLoaded(item.src);
                        }}
                        src={`${item.src}#t=0.1`}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        controls={isActive}
                        controlsList="nodownload noplaybackrate"
                        disablePictureInPicture
                        disableRemotePlayback
                        playsInline
                        preload={i <= 1 ? "auto" : "metadata"}
                        onLoadedData={() => markLoaded(item.src)}
                        onError={() => markLoaded(item.src)}
                        onContextMenu={blockContext}
                        onPlay={() => {
                          isVideoPlaying.current = true;
                        }}
                        onPause={() => {
                          isVideoPlaying.current = false;
                        }}
                        onEnded={() => {
                          isVideoPlaying.current = false;
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Controls */}
        {total > 0 && (
          <div className="flex items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12">
            <button
              onClick={prev}
              className="p-3 sm:p-4 rounded-full border border-white/10 hover:bg-white/5 transition-all active:scale-90 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label={locale === "ar" ? "السابق" : "Previous"}
              aria-controls="testimonial-carousel"
            >
              <span className="text-xl sm:text-2xl" aria-hidden="true">
                ←
              </span>
            </button>

            <div
              id="testimonial-carousel"
              className="flex gap-2 sm:gap-3"
              role="tablist"
              aria-label={t("slideIndicator")}
            >
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  role="tab"
                  aria-selected={i === index}
                  aria-controls={`slide-${i}`}
                  id={`tab-${i}`}
                  className={`relative h-1.5 rounded-full transition-all duration-300 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    before:absolute before:inset-[-12px] before:content-['']
                    ${
                      i === index
                        ? "w-6 sm:w-8 bg-blue-600"
                        : "w-1.5 sm:w-2 bg-white/20"
                    }`}
                  aria-label={
                    locale === "ar"
                      ? `اذهب إلى العنصر ${i + 1}`
                      : `Go to slide ${i + 1}`
                  }
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 sm:p-4 rounded-full border border-white/10 hover:bg-white/5 transition-all active:scale-90 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label={locale === "ar" ? "التالي" : "Next"}
              aria-controls="testimonial-carousel"
            >
              <span className="text-xl sm:text-2xl" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        )}

        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {total > 0 && `${t("slide")} ${index + 1} ${t("of")} ${total}`}
        </div>
      </div>
    </section>
  );
}