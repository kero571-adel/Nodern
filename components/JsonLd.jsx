// components/JsonLd.jsx
// Drop this into any page to inject structured data understood by Google.
// It renders nothing visible — only a <script> tag in <head>.

const SITE_URL = "https://nodern.agency"; // ← replace with your real domain

export default function JsonLd({ locale = "en" }) {
  const isAr = locale === "ar";

  // ── Organization schema ────────────────────────────────────────────────────
  // Helps Google understand who you are, show your logo in search, and build
  // a knowledge-graph entry for "Nodern Agency".
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Nodern",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 160,
      height: 160,
    },
    description: isAr
      ? "وكالة تطوير مواقع احترافية تبني تجارب رقمية عالية الأداء"
      : "Professional web development agency building high-performance digital experiences",
    // Add your real social profiles:
    sameAs: [
      // "https://www.linkedin.com/company/nodern",
      // "https://twitter.com/nodern",
      // "https://www.instagram.com/nodern",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
  };

  // ── WebSite schema ─────────────────────────────────────────────────────────
  // Enables the Google sitelinks search box and confirms your canonical URL.
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Nodern",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: isAr ? "ar" : "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // ── WebPage schema ─────────────────────────────────────────────────────────
  // Marks up the current page so Google understands its purpose and language.
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/${locale}/#webpage`,
    url: `${SITE_URL}/${locale}`,
    name: isAr
      ? "نودرن | وكالة تطوير مواقع احترافية"
      : "Nodern | Professional Web Development Agency",
    description: isAr
      ? "نودرن تبني مواقع عالية الأداء تحوّل الزوار إلى عملاء"
      : "Nodern builds websites that turn visitors into customers",
    inLanguage: isAr ? "ar" : "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isAr ? "الرئيسية" : "Home",
          item: `${SITE_URL}/${locale}`,
        },
      ],
    },
  };

  // ── ProfessionalService schema ─────────────────────────────────────────────
  // Signals to Google that this is a business offering specific services —
  // important for local / service-based search results.
  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "Nodern",
    url: SITE_URL,
    description: isAr
      ? "تصميم وتطوير مواقع ويب احترافية تركز على التحويل وتجربة المستخدم"
      : "Professional website design and development focused on conversion and user experience",
    serviceType: isAr ? "تطوير مواقع ويب" : "Web Development",
    areaServed: {
      "@type": "Country",
      name: "EG", // Egypt — change or add more countries as needed
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isAr ? "خدماتنا" : "Our Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "تصميم مواقع ويب" : "Website Design",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "تطوير مواقع ويب" : "Web Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "تحسين تجربة المستخدم" : "UX Optimization",
          },
        },
      ],
    },
  };

  const schemas = [organization, website, webpage, service];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // ✅ dangerouslySetInnerHTML is safe here — no user input involved
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}