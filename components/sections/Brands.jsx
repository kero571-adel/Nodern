"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CLIENT_SITE_DATA } from "@/data/clientSites";

const NAMES = CLIENT_SITE_DATA.map((d) => d[1]);

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const gradientAnimation = { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] };
const gradientTransition = { duration: 6, repeat: Infinity, ease: "linear" };

export default function Brands() {
  const t = useTranslations("Brands");

  return (
    <section
      aria-labelledby="brands-heading"
      className="relative border-y border-gray-800 bg-black/30 py-8"
    >
      <motion.h2
        id="brands-heading"
        className="mb-6 text-center text-2xl font-bold leading-tight sm:text-3xl md:text-4xl"
        variants={headingVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.span
          style={{
            display: "inline-block",
            backgroundImage:
              "linear-gradient(90deg, #5d00ff, #d008eb, #fff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 50%",
            paddingBottom: "0.2em",
            lineHeight: "1.2",
          }}
          animate={gradientAnimation}
          transition={gradientTransition}
        >
          {t("title")}
        </motion.span>
      </motion.h2>

      {/* dir="ltr" عشان اتجاه الحركة ميتقلبش في النسخة العربي */}
      <div
        dir="ltr"
        className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        <ul className="marquee-track flex w-max items-center">
          {[...NAMES, ...NAMES].map((name, i) => (
            <li
              key={i}
              aria-hidden={i >= NAMES.length}
              className="flex shrink-0 items-center whitespace-nowrap text-lg font-bold text-gray-300 sm:text-xl"
            >
              <span className="px-6 sm:px-10">{name}</span>
              <span aria-hidden="true" className="text-xs text-purple-400/70">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}