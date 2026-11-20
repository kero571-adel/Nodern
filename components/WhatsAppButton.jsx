"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// ✅ غيّر رقم الواتساب هنا
const WHATSAPP_NUMBER = "201272442140";

// ترتيب الفقاعات (من فوق لتحت). id = id السكشن في الصفحة
const ITEMS = [
  { key: "projects", id: "projects" },
  { key: "why", id: "whyChooseUs" },
  { key: "contact", id: "contact" },
  { key: "whatsapp", id: "whatsapp" },
];
const R = 98; // نصف قطر نص الدايرة
const NAVY = "#0b1530";

const WaIcon = ({ size = 28, color = "white" }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.526 5.847L0 24l6.335-1.502A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 01-5.021-1.38l-.36-.214-3.732.885.935-3.63-.235-.372A9.788 9.788 0 012.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z" />
  </svg>
);

function Robot() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <line x1="32" y1="9" x2="32" y2="15" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="7" r="4" fill="#67e8f9" />
      <rect x="9" y="15" width="46" height="36" rx="14" fill="#2563eb" />
      <rect x="14" y="21" width="36" height="22" rx="9" fill="#0a1128" />
      <g className="rg-eyes">
        <ellipse cx="25" cy="32" rx="3.2" ry="4" fill="#67e8f9" />
        <ellipse cx="39" cy="32" rx="3.2" ry="4" fill="#67e8f9" />
      </g>
      <path d="M27 38.5c2.6 2.4 7.4 2.4 10 0" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="19" cy="38" r="2.4" fill="#1d4ed8" />
      <circle cx="45" cy="38" r="2.4" fill="#1d4ed8" />
      <rect x="3" y="28" width="6" height="12" rx="3" fill="#60a5fa" />
      <rect x="55" y="28" width="6" height="12" rx="3" fill="#60a5fa" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const t = useTranslations("robot");
  const [show, setShow] = useState(false); // الروبوت ظاهر
  const [hidden, setHidden] = useState(false); // الزائر قفله: بيتحوّل لزرار الواتساب
  const [open, setOpen] = useState(false);
  const [hello, setHello] = useState(true);

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("whatsappMessage"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // الرسالة بتختفي لوحدها عشان ما تغطيش المحتوى
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setHello(false), 9000);
    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const key = (e) => e.key === "Escape" && setOpen(false);
    const outside = (e) => {
      if (!e.target.closest("[data-robot]")) setOpen(false);
    };
    window.addEventListener("keydown", key);
    document.addEventListener("mousedown", outside);
    document.addEventListener("touchstart", outside);
    return () => {
      window.removeEventListener("keydown", key);
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("touchstart", outside);
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    if (id === "whatsapp") return openWhatsApp();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 72,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const css = (
    <style>{`
      .rg-root{animation:rg-in .6s cubic-bezier(.2,1.3,.4,1) both}
      .rg-bot{animation:rg-float 3.2s ease-in-out infinite}
      .rg-eyes{transform-origin:32px 32px;animation:rg-blink 4s infinite}
      .rg-pulse{animation:rg-pulse 2s ease-out infinite}
      .wa-pulse{animation:wa-pulse 2s ease-out infinite}
      @keyframes rg-in{from{opacity:0;transform:translateX(80px)}to{opacity:1;transform:none}}
      @keyframes rg-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
      @keyframes rg-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
      @keyframes rg-pulse{0%{box-shadow:0 0 0 0 rgba(96,165,250,.55)}100%{box-shadow:0 0 0 16px rgba(96,165,250,0)}}
      @keyframes wa-pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.9);opacity:0}}
      @media (prefers-reduced-motion:reduce){.rg-root,.rg-bot,.rg-eyes,.rg-pulse,.wa-pulse{animation:none}}
    `}</style>
  );

  // بعد ما الزائر يقفل الروبوت: زرار الواتساب الأخضر في نفس مكانه القديم
  if (hidden) {
    return (
      <>
        {css}
        <button
          type="button"
          onClick={openWhatsApp}
          aria-label={t("whatsapp")}
          className="fixed bottom-4 right-4 z-[9999] grid h-[60px] w-[60px] place-items-center rounded-full border-0 shadow-xl"
          style={{
            background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)",
            boxShadow: "0 4px 20px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <span className="wa-pulse absolute inset-0 rounded-full" style={{ background: "rgba(37,211,102,0.4)" }} />
          <WaIcon size={28} />
        </button>
      </>
    );
  }

  if (!show) return null;

  const step = 160 / (ITEMS.length - 1);

  return (
    <div data-robot className="rg-root fixed bottom-[46dvh] right-3 z-[9999] sm:bottom-32 print:hidden">
      {css}
      <div className="relative h-16 w-16">
        {ITEMS.map(({ key, id }, i) => {
          const a = ((10 + i * step) * Math.PI) / 180; // من فوق لتحت ناحية الشمال
          const x = -Math.sin(a) * R;
          const y = -Math.cos(a) * R;
          const wa = id === "whatsapp";
          const size = wa ? 58 : 52;
          return (
            <button
              key={id}
              type="button"
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              aria-label={t(`items.${key}`)}
              onClick={() => go(id)}
              style={{
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                transform: open ? `translate(${x}px,${y}px) scale(1)` : "translate(0,0) scale(0)",
                transitionDelay: open ? `${i * 45}ms` : "0ms",
                ...(wa
                  ? { background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)", color: "#fff", border: "none" }
                  : { background: NAVY }),
              }}
              className={`absolute left-1/2 top-1/2 grid place-items-center rounded-full text-[10px] font-semibold shadow-lg transition duration-300 ease-out ${
                wa ? "" : "border border-blue-400/40 text-blue-100 hover:bg-blue-600 hover:text-white"
              } ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              {wa ? <WaIcon size={26} /> : t(`items.${key}`)}
            </button>
          );
        })}

        {hello && !open && (
          <div
            className="absolute bottom-full right-0 mb-3 w-48 rounded-2xl rounded-br-sm border border-blue-400/30 p-3 text-[13px] leading-snug text-white shadow-xl"
            style={{ background: NAVY, paddingInlineEnd: 28 }}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(true);
                setHello(false);
              }}
              className="block w-full"
              style={{ textAlign: "start" }}
            >
              {t("greeting")}
              <span className="mt-1 block text-[11px] font-semibold text-cyan-300">{t("tap")}</span>
            </button>
            <button
              type="button"
              aria-label={t("dismiss")}
              onClick={() => setHello(false)}
              className="absolute top-1.5 grid h-5 w-5 place-items-center rounded-full text-blue-200/70 hover:text-white"
              style={{ insetInlineEnd: 6 }}
            >
              ×
            </button>
          </div>
        )}

        <button
          type="button"
          aria-label={open ? t("close") : t("open")}
          aria-expanded={open}
          onClick={() => {
            setOpen((v) => !v);
            setHello(false);
          }}
          className={`rg-bot ${hello && !open ? "rg-pulse" : ""} relative h-16 w-16 rounded-full p-1.5 shadow-xl ring-2 ring-blue-400/50 transition hover:ring-blue-300`}
          style={{ background: NAVY }}
        >
          <Robot />
        </button>
        <button
          type="button"
          aria-label={t("hide")}
          onClick={() => {
            setHidden(true);
            setOpen(false);
          }}
          className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-[11px] leading-none text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}
