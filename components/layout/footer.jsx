"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { HiOutlineEnvelope } from "react-icons/hi2";

export default function Footer() {
  const t = useTranslations("footer");

  // Smooth scroll handler for anchor links
  const handleAnchorClick = (e, href) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const socialLinks = [
    {
      href: "https://www.instagram.com/nodernweb?igsh=MTh6Ym50MHNpbWIwdA==",
      icon: <IoLogoInstagram size={24} />,
      label: "Instagram",
      ariaLabel: "Follow us on Instagram"
    },
    {
      href: "https://www.tiktok.com/@nodernweb?_r=1&_t=ZS-95bLRDMbD08",
      icon: <FaTiktok size={24} />,
      label: "TikTok",
      ariaLabel: "Follow us on TikTok"
    },
    {
      href: "mailto:nodernweb@gmail.com",
      icon: <HiOutlineEnvelope size={24} />,
      label: "Email",
      ariaLabel: "Send us an email"
    },
    {
      href: "https://www.facebook.com/share/1Be5EuADcb/",
      icon: <FaFacebookF size={24} />,
      label: "Facebook",
      ariaLabel: "Follow us on Facebook"
    }
  ];

  const quickLinks = [
    { href: "#services", label: t("services") },
    { href: "#work", label: t("work") },
    { href: "#whyChooseUs", label: t("whyChooseUs") },
    { href: "#contact", label: t("contact") }
  ];

  const legalLinks = [
    { href: "#", label: t("privacyPolicy") },
    { href: "#", label: t("termsOfService") }
  ];

  return (
    <footer 
      className="w-full py-12 px-4 sm:px-8 bg-black border-white/50 text-white text-center"
      style={{ paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))' }}
    >
      <div className="container w-full relative mx-auto flex flex-col justify-around items-start">
        {/* Background blur effect - unchanged */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-25 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full">
          
          {/* Brand & Message */}
          <div className="flex flex-col flex-2 items-start justify-start">
            <Link 
              href="/" 
              className="mb-6 sm:mb-10 text-3xl sm:text-4xl font-bold min-h-[44px] min-w-[44px] flex items-center touch-manipulation"
              onClick={(e) => handleAnchorClick(e, "/")}
            >
              Nordern <span className="font-bold text-purple-700">.</span>
            </Link>
            <p className="w-full sm:w-11/12 text-lg sm:text-xl text-start text-gray-500 leading-7 sm:leading-8">
              {t("messageForClient")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-1 flex-col md:items-center md:justify-start items-start">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-10">{t("quickLinks")}</h3>
            <nav aria-label="Quick links">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  className="block text-lg sm:text-xl opacity-75 hover:opacity-100 transition-all duration-150 my-1 sm:my-2 py-2 min-h-[44px] flex items-center touch-manipulation"
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col flex-1 md:items-center md:justify-start items-start">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10">{t("connect")}</h3>
            <nav aria-label="Social media links">
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 justify-start md:justify-center">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    className="rounded-full border-gray-600 border-2 p-3 bg-gray-900/60 hover:bg-gray-900 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={social.ariaLabel}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-white/50 h-px w-full my-8 sm:my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-0 items-center justify-between w-full">
          <p className="text-gray-500 text-base sm:text-xl font-light text-center md:text-start">
            &copy; {new Date().getFullYear()} Nordern. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <div className="flex flex-wrap gap-4 sm:gap-7 items-center justify-center md:justify-start">
              {legalLinks.map((link, index) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="text-base sm:text-xl text-gray-500 font-light hover:text-white transition-all duration-150 py-2 min-h-[44px] flex items-center touch-manipulation"
                  style={{ marginRight: index === 0 ? undefined : 0 }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}