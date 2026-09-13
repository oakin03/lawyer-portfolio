import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://lawyer-portfolio-ecru.vercel.app";

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const languages: Record<string, string> = {};
  routing.locales.forEach((code) => {
    languages[code] = `${BASE_URL}/${code}${path}`;
  });

  const ogImage = image ?? `${BASE_URL}/opengraph-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}${path}`,
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