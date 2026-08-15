import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/panel",
    },
    sitemap: "https://lawyer-portfolio-ecru.vercel.app/sitemap.xml",
  };
}