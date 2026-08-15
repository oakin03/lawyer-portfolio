import type { MetadataRoute } from "next";

const BASE_URL = "https://lawyer-portfolio-ecru.vercel.app";
const LOCALES = ["tr", "en", "ar"];
const PATHS = ["", "/hakkimda", "/uzmanlik-alanlari", "/yayinlar", "/iletisim"];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );
}