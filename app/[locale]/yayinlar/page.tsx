import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/sections/PageBanner";
import PublicationsSearch from "@/components/sections/PublicationsSearch";
import { getPublications } from "@/lib/publications";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("publicationsPage");
  const tMeta = await getTranslations("meta");
  return {
    title: `${t("title")} | ${tMeta("siteTitle")}`,
    description: t("subtitle"),
  };
}

export default async function YayinlarPage() {
  const t = await getTranslations("publicationsPage");
  const publications = await getPublications();

  return (
    <main>
      <Navbar />

      <PageBanner image="/images/publications-banner.jpg" title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-cream-light py-20">
        <div className="mx-auto max-w-7xl px-4">
          <PublicationsSearch publications={publications} />
        </div>
      </section>

      <Footer />
    </main>
  );
}