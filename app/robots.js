// app/robots.js
// Next.js App Router generates /robots.txt automatically from this file.

const SITE_URL = "https://nodern-web.vercel.app/ar"; // ← replace with your real domain

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}