"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlineArrowRight,
  HiOutlineUser,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

export default function Contact() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Validate form before submit
  const validateForm = useCallback(() => {
    if (!formState.name.trim()) {
      setFormError("Please enter your name");
      return false;
    }
    if (!formState.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      setFormError("Please enter a valid email");
      return false;
    }
    if (!formState.message.trim()) {
      setFormError("Please enter your message");
      return false;
    }
    setFormError("");
    return true;
  }, [formState]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Announce error to screen readers
      const errorElement = document.getElementById("form-error");
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    setFormError("");

    // Create mailto link as fallback
    const subject = encodeURIComponent(
      `Project Inquiry from ${formState.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    const mailtoLink = `mailto:nodernweb@gmail.com?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
    }, 1000);
  }, [formState, validateForm]);

  const handleInputChange = useCallback((field) => (e) => {
    setFormState(prev => ({ ...prev, [field]: e.target.value }));
    if (formError) setFormError("");
  }, [formError]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contactLines = [t("line1"), t("line2"), t("line3"), t("line4"), t("line5")];

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black/20 text-white py-20 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ 
        paddingTop: 'calc(5rem + env(safe-area-inset-top))',
        paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))'
      }}
    >
      {/* Background Accents - unchanged */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-start">
          
          {/* Left Side: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 leading-tight"
            >
              {t("title")}
            </motion.h2>

            <div className="space-y-3 sm:space-y-4">
              {contactLines.map((line, i) => (
                <motion.p
                  key={i}
                  variants={itemVariants}
                  className={`text-lg sm:text-xl md:text-2xl ${
                    i === 4
                      ? "text-blue-400 font-bold"
                      : "text-gray-400 font-light"
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div variants={itemVariants} className="pt-4 sm:pt-8">
              <a
                href="mailto:nodernweb@gmail.com"
                className="inline-flex items-center gap-3 sm:gap-4 text-xl sm:text-2xl font-medium text-white hover:text-blue-400 transition-colors group min-h-[44px] touch-manipulation"
                aria-label="Send email to nodernweb@gmail.com"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-all min-h-[44px] min-w-[44px]">
                  <HiOutlineEnvelope className="text-2xl sm:text-3xl" />
                </div>
                <span className="break-all">nodernweb@gmail.com</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl -z-10 rounded-3xl" />

            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl space-y-5 sm:space-y-6"
              noValidate
            >
              {/* Error Message for Screen Readers */}
              {formError && (
                <div 
                  id="form-error"
                  tabIndex="-1"
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  {formError}
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="name"
                  className="text-sm font-medium text-gray-400 flex items-center gap-2"
                >
                  <HiOutlineUser className="text-blue-400 flex-shrink-0" />
                  {t("namePlaceholder")}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  type="text"
                  autoComplete="name"
                  value={formState.name}
                  onChange={handleInputChange("name")}
                  className="w-full max-w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all min-h-[48px] touch-manipulation"
                  placeholder={t("namePlaceholder")}
                  aria-required="true"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email"
                  className="text-sm font-medium text-gray-400 flex items-center gap-2"
                >
                  <HiOutlineEnvelope className="text-blue-400 flex-shrink-0" />
                  {t("emailPlaceholder")}
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleInputChange("email")}
                  className="w-full max-w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all min-h-[48px] touch-manipulation"
                  placeholder={t("emailPlaceholder")}
                  aria-required="true"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="message"
                  className="text-sm font-medium text-gray-400 flex items-center gap-2"
                >
                  <HiOutlineChatBubbleLeftRight className="text-blue-400 flex-shrink-0" />
                  {t("messagePlaceholder")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleInputChange("message")}
                  className="w-full max-w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none min-h-[120px] touch-manipulation"
                  placeholder={t("messagePlaceholder")}
                  aria-required="true"
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full group bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 sm:py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] min-h-[48px] touch-manipulation"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("sending")}
                  </span>
                ) : (
                  <>
                    <span>{t("button")}</span>
                    <HiOutlineArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}