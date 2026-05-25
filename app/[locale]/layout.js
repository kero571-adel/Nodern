import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "../../i18n/routing";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";
import "../globals.css";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

// ─── Replace with your real domain ───────────────────────────────────────────
const SITE_URL = "https://nodern-web.vercel.app";

// ─── Per-locale metadata ─────────────────────────────────────────────────────
const META = {
  en: {
    title: "Nodern | Professional Web Development Agency",
    description:
      "Nodern builds high-performance websites that turn visitors into customers. We design fast, accessible, conversion-focused digital experiences for ambitious businesses.",
    keywords:
      "web development agency, website design, Next.js, performance, conversion optimization, React, UI/UX",
    ogTitle: "Nodern — Websites Built to Convert",
    ogDescription:
      "Not just beautiful websites. Digital experiences that make people understand you, trust you, and contact you.",
  },
  ar: {
    title: "نودرن | وكالة تطوير مواقع احترافية",
    description:
      "نودرن تبني مواقع عالية الأداء تحوّل الزوار إلى عملاء. نصمم تجارب رقمية سريعة وقابلة للوصول تركز على التحويل للشركات الطموحة.",
    keywords:
      "تطوير مواقع, تصميم مواقع, وكالة رقمية, Next.js, تحسين التحويل, React, تجربة المستخدم",
    ogTitle: "نودرن — مواقع مصممة للتحويل",
    ogDescription:
      "مش مجرد مواقع حلوة. تجارب رقمية تخلي الناس تفهمك وتثق فيك وتتواصل معاك.",
  },
};

// ─── generateMetadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] ?? META.en;
  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    // ── Core ──────────────────────────────────────────────────────────────────
    metadataBase: new URL(SITE_URL),
    title: {
      default: m.title,
      template: `%s | Nodern`, // page-level titles become "Page | Nodern"
    },
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: "Nodern Agency", url: SITE_URL }],
    creator: "Nodern Agency",
    publisher: "Nodern Agency",
    generator: "Next.js",

    // ── Canonical + hreflang alternates ───────────────────────────────────────
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
    other: {
      "link-preload-style": "preload",
    },

    // ── Open Graph ────────────────────────────────────────────────────────────
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: "Nodern",
      title: m.ogTitle,
      description: m.ogDescription,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      images: [
        {
          url: "logo.png",
          width: 1200,
          height: 630,
          alt: m.ogTitle,
        },
      ],
    },

    // ── Twitter / X ───────────────────────────────────────────────────────────
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDescription,
      images: ["/og-image.png"],
      // creator: "@YourTwitterHandle",
    },

    // ── Icons ─────────────────────────────────────────────────────────────────
    icons: {
      icon: [
        { url: "/logo.png", sizes: "192x192", type: "image/png" },
        { url: "/logo.png", sizes: "192x192", type: "image/png" },
        { url: "/logo.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },

    // ── Web app manifest ──────────────────────────────────────────────────────
    manifest: "/manifest.json",

    // ── Robots ────────────────────────────────────────────────────────────────
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ── Verification (add your real tokens) ───────────────────────────────────
    verification: {
      google: "_W9HjXFXmsB2cH8vYbNUvbqm1ukNJXcBxEx4FcK9uTc",
    },
  };
}

// ─── Static params ───────────────────────────────────────────────────────────
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─── Layout ──────────────────────────────────────────────────────────────────
export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cairo.variable}
    >
      <body className={cairo.className}>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:font-semibold"
          >
            {locale === "ar"
              ? "تخطي إلى المحتوى الرئيسي"
              : "Skip to main content"}
          </a>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
