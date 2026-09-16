import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://busrakarakoc.av.tr";

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  languageAlternates = true,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  languageAlternates?: boolean;
}): Metadata {
  const languages: Record<string, string> = {};

  if (languageAlternates) {
    routing.locales.forEach((code) => {
      languages[code] = `${SITE_URL}/${code}${path}`;
    });

    languages["x-default"] = `${SITE_URL}/tr${path}`;
  }

  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/opengraph-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      ...(languageAlternates ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: "Büşra Nur Karakoç",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}