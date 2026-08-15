import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/sections/PageBanner";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ZigzagRow from "@/components/sections/ZigzagRow";
import SectionDivider from "@/components/ui/SectionDivider";
import { ATTORNEY, ABOUT_SECTIONS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about.banner");
  const tMeta = await getTranslations("meta");

  return {
    title: `${t("title")} | ${tMeta("siteTitle")}`,
    description: t("subtitle"),
  };
}

export default async function HakkimdaPage() {
  const t = await getTranslations("about.banner");

  return (
    <main>
      <Navbar />

      <PageBanner image="/images/about-banner.jpg" title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-cream-light py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4">
          <ScrollReveal>
            <AboutSection
              translationKey={ABOUT_SECTIONS[0].key}
              image={ABOUT_SECTIONS[0].image}
              imagePosition="right"
            />
          </ScrollReveal>

          <SectionDivider />

          <ScrollReveal>
            <ZigzagRow image="/images/about-2.jpg" imageAlt="" imagePosition="left">
              <ExperienceTimeline />
            </ZigzagRow>
          </ScrollReveal>

          <SectionDivider />

          <ScrollReveal>
            <AboutSection
              translationKey={ABOUT_SECTIONS[1].key}
              image={ABOUT_SECTIONS[1].image}
              imagePosition="right"
            />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}