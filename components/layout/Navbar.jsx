"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Navbar() {
  const t = useTranslations("nav");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // إغلاق الموبايل منيو عند الضغط على ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // منع الـ Scroll لما الموبايل منيو مفتوح
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  // تأثير الـ Scroll للـ Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#work", label: t("work") },
    { href: "#about", label: t("whyChooseUs") },
    { href: "#contact", label: t("contact") },
  ];

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      {/* === Overlay للموبايل === */}
      {isMobileOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* === Navbar === */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800/50 py-3"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* === Logo (يسار - ثابت) === */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="text-xl sm:text-2xl md:text-3xl font-bold flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              Nodern<span className="text-purple-600">.</span>
            </Link>

            {/* === Desktop Navigation (في النص) === */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-1 lg:gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* === Actions (يمين - ثابت) === */}
            <div className="flex items-center gap-3 lg:gap-4">
              <Link
                href="#contact"
                className="hidden md:inline-flex items-center justify-center px-4 lg:px-6 py-2 text-sm font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
              >
                {t("startProject")}
              </Link>
              <div className="hidden md:inline-flex">
                <LanguageSwitcher />
              </div>
            </div>

            {/* === Mobile Menu Button === */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
            >
              <IoMdMenu size={24} />
            </button>
          </div>
        </div>

        {/* === Mobile Navigation Drawer === */}
        <div
          className={`fixed top-0 right-0 h-full w-4/5 sm:w-80 max-w-xs bg-black/95 backdrop-blur-xl border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="text-xl font-bold"
            >
              Nodern<span className="text-purple-600">.</span>
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              aria-label="Close menu"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Start Project Button - Mobile */}
            <Link
              href="#contact"
              onClick={closeMobileMenu}
              className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              {t("startProject")}
            </Link>

            {/* Language Switcher - Mobile */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* === Spacer عشان الـ fixed navbar === */}
      <div className="h-16 sm:h-18 md:h-20" />
    </>
  );
}
