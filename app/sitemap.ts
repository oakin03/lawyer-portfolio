import type { MetadataRoute } from "next";
import { PRACTICE_AREAS } from "@/lib/constants";
import { getPublications } from "@/lib/publications";
import { SITE_URL } from "@/lib/seo";

const LOCALES = ["tr", "en", "ar"];
const STATIC_PATHS = [
  "",
  "/hakkimda",
  "/uzmanlik-alanlari",
  "/yayinlar",
  "/iletisim",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publications = await getPublications();

  const staticPages = LOCALES.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );

  const practiceAreaPages = LOCALES.flatMap((locale) =>
    PRACTICE_AREAS.map((area) => ({
      url: `${SITE_URL}/${locale}/uzmanlik-alanlari/${area.slug}`,
      lastModified: new Date(),
    }))
  );

  const publicationPages = publications.map((publication) => ({
    url: `${SITE_URL}/${publication.language}/yayinlar/${publication.slug}`,
    lastModified: new Date(publication.updated_at || publication.date),
  }));

  return [
    ...staticPages,
    ...practiceAreaPages,
    ...publicationPages,
  ];
}