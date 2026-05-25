const SITE_URL = "https://nodern-web.vercel.app";
const LOCALES = ["en", "ar"];

export default function sitemap() {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
  }));
}