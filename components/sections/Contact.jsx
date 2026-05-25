"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, ValidationError } from "@formspree/react";
import {
  HiOutlineEnvelope,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChatBubbleLeftEllipsis,
} from "react-icons/hi2";

export default function Contact() {
  const t = useTranslations("contact");

  const whatsappNumber = "201507174664";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const [state, handleSubmit] = useForm("mredkbbb");
  const [formError, setFormError] = useState("");

  const validateClientSide = (e) => {
    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name) {
      e.preventDefault();
      return setFormError("Please enter your name");
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault();
      return setFormError("Please enter a valid email");
    }

    if (!phone) {
      e.preventDefault();
      return setFormError("Please enter your phone number");
    }

    if (!message) {
      e.preventDefault();
      return setFormError("Please enter your message");
    }

    setFormError("");
  };

  if (state.succeeded) {
    return (
      <div className="text-center py-32 text-white">
        <h2 className="text-3xl font-bold">{t("contactSuccess.title")}</h2>
        <p className="text-gray-400 mt-3">{t("contactSuccess.subtitle")}</p>
      </div>
    );
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black text-white py-24 px-6 overflow-hidden"
    >
      {/* Glow */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
        {/* LEFT */}
        <div>
          <div className="flex justify-center lg:justify-start mb-6">
            <h2 className="text-4xl md:text-6xl font-bold pb-3 relative inline-block">
              {t("title")}
              <div className="mt-6 absolute bottom-[-5px] left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 rounded-full lg:hidden"></div>
            </h2>
          </div>
          <div className="space-y-3 text-gray-400">
            {[t("line1"), t("line2"), t("line3"), t("line5")].map((line, i) => (
              <p
                key={i}
                className={`text-lg ${
                  i === 3 ? "text-blue-400 font-semibold" : ""
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          {/* CONTACT OPTIONS */}
          <div className="mt-10 space-y-4">
            <a
              href="mailto:nodernweb@gmail.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
            >
              <HiOutlineEnvelope className="text-2xl text-blue-400" />
              <span>nodernweb@gmail.com</span>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-green-500/10 hover:bg-green-500/20 transition"
            >
              <HiOutlineChatBubbleLeftEllipsis className="text-2xl text-green-400" />
              <span>WhatsApp: {whatsappNumber}</span>
            </a>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl rounded-3xl" />

          <form
            onSubmit={(e) => {
              validateClientSide(e);
              handleSubmit(e);
            }}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl space-y-5"
          >
            {/* ERROR */}
            {formError && (
              <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-xl">
                {formError}
              </div>
            )}

            {/* NAME */}
            <div>
              <label
                htmlFor="contact-name"
                className="text-sm text-gray-400 flex items-center gap-2"
              >
                <HiOutlineUser /> {t("namePlaceholder")}
              </label>
              <input
                type="text"
                name="name"
                id="contact-name"
                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="contact-email"
                className="text-sm text-gray-400 flex items-center gap-2"
              >
                <HiOutlineEnvelope /> {t("emailPlaceholder")}
              </label>
              <input
                type="email"
                name="email"
                id="contact-email"
                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10"
                required
              />
              <ValidationError field="email" errors={state.errors} />
            </div>

            {/* PHONE (NEW) */}
            <div>
              <label
                htmlFor="contact-phone"
                className="text-sm text-gray-400 flex items-center gap-2"
              >
                <HiOutlinePhone /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="contact-phone"
                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10"
                placeholder="+20 1XXXXXXXXX"
                required
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label
                htmlFor="contact-message"
                className="text-sm text-gray-400 flex items-center gap-2"
              >
                <HiOutlineChatBubbleLeftRight /> {t("messagePlaceholder")}
              </label>
              <textarea
                name="message"
                rows="5"
                id="contact-message"
                className="w-full mt-2 p-4 rounded-xl bg-white/5 border border-white/10"
                required
              />
              <ValidationError field="message" errors={state.errors} />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition"
            >
              {state.submitting ? "Sending..." : t("button")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
