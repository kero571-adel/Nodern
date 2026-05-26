"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ✅ غير رقم الواتساب هنا
const WHATSAPP_NUMBER = "201507174664"; 
const WHATSAPP_MESSAGE = "مرحبا, عاوز اعمل موقع الكترونى للمشروع بتاعى "

const WaIcon = ({ size = 28, color = "white" }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.526 5.847L0 24l6.335-1.502A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 01-5.021-1.38l-.36-.214-3.732.885.935-3.63-.235-.372A9.788 9.788 0 012.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z" />
  </svg>
);

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-wa-widget]")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    setShowPulse(false);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* ===== POPUP — مستقل تماماً عن الزر ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            data-wa-widget
            style={{
              position: "fixed",
              bottom: "88px",   /* فوق الزر مباشرةً */
              right: "16px",
              width: "min(300px, calc(100vw - 32px))", /* لا يطلع برة الشاشة أبداً */
              zIndex: 9999,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.1)",
              direction: "rtl",
              background: "#fff",
            }}
          >
            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              {/* Avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg viewBox="0 0 32 32" fill="none" width="36" height="36">
                  <circle cx="16" cy="16" r="16" fill="#25D366" />
                  <path d="M16 7C11.03 7 7 11.03 7 16c0 1.77.49 3.43 1.35 4.84L7 25l4.27-1.32A8.93 8.93 0 0016 25c4.97 0 9-4.03 9-9s-4.03-9-9-9z" fill="white" />
                  <path d="M20.5 18.5c-.25-.12-1.47-.72-1.7-.8-.22-.08-.38-.12-.54.12-.16.25-.62.8-.76.97-.14.17-.28.19-.52.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41-.14 0-.3-.01-.46-.01-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.54.12.16 1.73 2.64 4.19 3.6.59.2 1.04.32 1.4.41.59.15 1.12.13 1.54.08.47-.06 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.46-.28z" fill="#25D366" />
                </svg>
              </div>

              {/* Text */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>تواصل معنا</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.9)", fontSize: 12 }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#a8ff78", boxShadow: "0 0 6px #a8ff78",
                    animation: "wa-blink 2s infinite",
                    display: "inline-block",
                  }} />
                  متاح الآن
                </span>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="إغلاق"
                style={{
                  background: "rgba(255,255,255,0.2)", border: "none",
                  borderRadius: "50%", width: 28, height: 28,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "white", flexShrink: 0,
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Chat body */}
            <div style={{
              padding: 16,
              background: "#ece5dd",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8b9a8' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}>
              <div style={{
                background: "white",
                borderRadius: "0 12px 12px 12px",
                padding: "11px 14px",
                maxWidth: "85%",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                position: "relative",
              }}>
                {/* Triangle */}
                <span style={{
                  position: "absolute", top: 0, right: "100%",
                  width: 0, height: 0,
                  borderTop: "8px solid white",
                  borderLeft: "8px solid transparent",
                }} />
                <p style={{ margin: 0, color: "#2c3e50", fontSize: 14, lineHeight: 1.5 }}>مرحباً 👋</p>
                <p style={{ margin: "4px 0 0", color: "#555", fontSize: 14, lineHeight: 1.5 }}>
                  كيف يمكننا مساعدتك؟ ابدأ المحادثة معنا على واتساب.
                </p>
              </div>
            </div>

            {/* Footer CTA */}
            <div style={{ padding: "12px 16px", background: "#fff" }}>
              <button
                onClick={handleWhatsApp}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)",
                  color: "white", border: "none", borderRadius: 10,
                  padding: "12px 20px", fontSize: 15, fontWeight: 600,
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8,
                }}
              >
                <WaIcon size={18} />
                ابدأ المحادثة
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== FAB Button ===== */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label="تواصل عبر واتساب"
        data-wa-widget
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 9999,
          width: 60, height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Pulse rings */}
        {showPulse && (
          <>
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "rgba(37,211,102,0.4)",
              animation: "wa-pulse 2s ease-out infinite",
            }} />
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "rgba(37,211,102,0.4)",
              animation: "wa-pulse 2s ease-out 0.7s infinite",
            }} />
          </>
        )}

        {/* Icon — واتساب دايماً، X جوه الـ header بس */}
        <WaIcon size={28} color="white" />
      </motion.button>

      {/* Global keyframes */}
      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes wa-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}