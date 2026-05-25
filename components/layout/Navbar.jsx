"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Navbar() {
  const t = useTranslations("nav");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const lastFocusedElement = useRef(null);

  // إغلاق الموبايل منيو عند الضغط على ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
        if (lastFocusedElement.current) {
          lastFocusedElement.current.focus();
        }
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileOpen]);

  // منع الـ Scroll لما الموبايل منيو مفتوح + Focus Trap
  useEffect(() => {
    if (isMobileOpen) {
      lastFocusedElement.current = document.activeElement;
      document.body.style.overflow = "hidden";

      // Focus first interactive element in mobile menu
      setTimeout(() => {
        const firstFocusable = mobileMenuRef.current?.querySelector(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }, 100);

      // Focus trap within mobile menu
      const handleTabKey = (e) => {
        if (e.key !== "Tab") return;
        const focusableElements = mobileMenuRef.current?.querySelectorAll(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener("keydown", handleTabKey);
      return () => {
        document.removeEventListener("keydown", handleTabKey);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileOpen]);

  // تأثير الـ Scroll للـ Navbar (مُحسّن بأداء أفضل)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll for anchor links
  const handleAnchorClick = useCallback((e, href) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setIsMobileOpen(false);
    }
  }, []);

  const navLinks = [
    { href: "#about", label: t("whyChooseUs") },
    { href: "#projects", label: t("work") },
    { href: "#contact", label: t("contact") },
  ];

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, []);

  return (
    <>
      {/* === Overlay للموبايل === */}
      {isMobileOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden touch-none"
          aria-hidden="true"
        />
      )}

      {/* === Navbar === */}
      <nav
        className={`mt-2 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800/50 py-3"
            : "bg-transparent py-4"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* === Logo (يسار - ثابت) === */}
            <Link
              href="/"
              onClick={(e) => {
                handleAnchorClick(e, "/");
                closeMobileMenu();
              }}
              className="text-xl sm:text-2xl md:text-3xl font-bold flex-shrink-0 hover:opacity-80 transition-opacity min-h-[44px] min-w-[44px] flex items-center"
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
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
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
                onClick={(e) => handleAnchorClick(e, "#contact")}
                className="hidden md:inline-flex items-center justify-center px-4 lg:px-6 py-2 text-sm font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105 min-h-[44px]"
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
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              <IoMdMenu size={24} />
            </button>
          </div>
        </div>

        {/* === Mobile Navigation Drawer === */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`fixed top-0 right-0 h-[100dvh] w-4/5 sm:w-80 max-w-xs bg-black/95 backdrop-blur-xl border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col`}
          style={{
            transform: isMobileOpen ? "translateX(0)" : "translateX(100%)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 border-b border-gray-800"
            style={{ paddingTop: "calc(1rem + env(safe-area-inset-top))" }}
          >
            <Link
              href="/"
              onClick={(e) => {
                handleAnchorClick(e, "/");
                closeMobileMenu();
              }}
              className="text-xl font-bold min-h-[44px] min-w-[44px] flex items-center"
            >
              Nodern<span className="text-purple-600">.</span>
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Close menu"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col p-4 gap-2 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 min-h-[48px] flex items-center touch-manipulation"
              >
                {link.label}
              </Link>
            ))}

            {/* Start Project Button - Mobile */}
            <Link
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-full transition-all duration-200 min-h-[48px] touch-manipulation"
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
