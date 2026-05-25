export default function sitemap() {
  const SITE_URL = "https://nodern-web.vercel.app";

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          ar: SITE_URL,
          en: `${SITE_URL}/en`,
        },
      },
    },
  ];
}
