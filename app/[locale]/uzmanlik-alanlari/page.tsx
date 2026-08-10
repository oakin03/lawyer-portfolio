import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/sections/PageBanner";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PracticeAreasGrid from "@/components/sections/PracticeAreasGrid";
import PracticeAreaDetails from "@/components/sections/PracticeAreaDetails";
import SectionDivider from "@/components/ui/SectionDivider";
import { ATTORNEY } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("practiceAreasPage");
  const tMeta = await getTranslations("meta");

  return {
    title: `${t("title")} | ${tMeta("siteTitle")}`,
    description: t("subtitle"),
  };
}

export default async function UzmanlikAlanlariPage() {
  const t = await getTranslations("practiceAreasPage");

  return (
    <main>
      <Navbar />

      <PageBanner image="/images/practice-areas-banner.jpg" title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-cream-light py-20">
        <div className="mx-auto max-w-7xl px-4">
          <PracticeAreasGrid />
        </div>
      </section>

      <SectionDivider />

      <section className="bg-cream-light py-4">
        <div className="mx-auto max-w-7xl px-4">
          <PracticeAreaDetails />
        </div>
      </section>

      <Footer />
    </main>
  );
}