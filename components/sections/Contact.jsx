"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HiOutlineEnvelope, HiOutlineArrowRight, HiOutlineUser, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function Contact() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link as a fallback/simple "real" sending method
    const subject = encodeURIComponent(`Project Inquiry from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    const mailtoLink = `mailto:nodernweb@gmail.com?subject=${subject}&body=${body}`;
    
    // In a real production app with a backend, we would use fetch('/api/contact', ...)
    // For now, opening the mail client is the most reliable "real" send without a backend.
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="relative min-h-screen bg-black text-white py-24 px-6 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50"
            >
              {t("title")}
            </motion.h2>
            
            <div className="space-y-4">
              {[t("line1"), t("line2"), t("line3"), t("line4"), t("line5")].map((line, i) => (
                <motion.p 
                  key={i}
                  variants={itemVariants}
                  className={`text-xl md:text-2xl ${i === 4 ? 'text-blue-400 font-bold' : 'text-gray-400 font-light'}`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div 
              variants={itemVariants}
              className="pt-8"
            >
              <a 
                href="mailto:nodernweb@gmail.com" 
                className="inline-flex items-center gap-4 text-2xl font-medium text-white hover:text-blue-400 transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-all">
                  <HiOutlineEnvelope className="text-3xl" />
                </div>
                <span>nodernweb@gmail.com</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl -z-10 rounded-3xl" />
            
            <form 
              onSubmit={handleSubmit}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <HiOutlineUser className="text-blue-400" />
                  {t("namePlaceholder")}
                </label>
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  placeholder={t("namePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <HiOutlineEnvelope className="text-blue-400" />
                  {t("emailPlaceholder")}
                </label>
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <HiOutlineChatBubbleLeftRight className="text-blue-400" />
                  {t("messagePlaceholder")}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                  placeholder={t("messagePlaceholder")}
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full group bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white font-bold py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                {isSubmitting ? t("sending") : (
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
