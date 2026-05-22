// app/sitemap.js
// Next.js App Router generates /sitemap.xml automatically from this file.

const SITE_URL = "https://nodern-web.vercel.app/ar"; // ← replace with your real domain
const LOCALES = ["en", "ar"];

// Define all your routes here — add new pages as you build them
const ROUTES = [
  { path: "",        priority: 1.0, changeFrequency: "weekly"  },
  { path: "#about",  priority: 0.7, changeFrequency: "monthly" },
  { path: "#work",   priority: 0.8, changeFrequency: "monthly" },
  { path: "#contact",priority: 0.6, changeFrequency: "yearly"  },
];

export default function sitemap() {
  const entries = [];

  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      const url = `${SITE_URL}/${locale}${route.path}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        // hreflang alternates — tells Google about language variants
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}/${l}${route.path}`])
          ),
        },
      });
    }
  }

  return entries;
}