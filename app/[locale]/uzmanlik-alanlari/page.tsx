import type { Metadata } from "next";
import PageBanner from "@/components/sections/PageBanner";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PracticeAreasGrid from "@/components/sections/PracticeAreasGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("practiceAreasPage");
  const tMeta = await getTranslations("meta");

  return buildMetadata({
    locale,
    path: "/uzmanlik-alanlari",
    title: `${t("title")} | ${tMeta("siteTitle")}`,
    description: t("subtitle"),
  });
}

export default async function UzmanlikAlanlariPage() {
  const t = await getTranslations("practiceAreasPage");

  return (
    <main>
      <Navbar />

      <PageBanner
        image="/images/practice-areas-banner.jpg"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <ScrollReveal>
        <section className="bg-cream-light py-20">
          <div className="mx-auto max-w-7xl px-4">
            <PracticeAreasGrid />
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </main>
  );
}