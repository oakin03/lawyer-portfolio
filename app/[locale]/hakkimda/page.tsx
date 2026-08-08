import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ZigzagRow from "@/components/sections/ZigzagRow";
import { ATTORNEY, ABOUT_SECTIONS } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about.banner");
  return {
    title: `${t("title")} | ${ATTORNEY.office}`,
    description: t("subtitle"),
  };
}

export default async function HakkimdaPage() {
  const t = await getTranslations("about.banner");

  return (
    <main>
      <Navbar />

      <section className="relative flex h-80 w-full items-center justify-center overflow-hidden sm:h-[420px]">
        <div className="absolute inset-0 bg-[#2a1f1a]" />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{t("title")}</h1>
          <p className="mt-3 text-neutral-200">{t("subtitle")}</p>
        </div>
      </section>

      <section className="bg-cream-light py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4">
          <AboutSection
            translationKey={ABOUT_SECTIONS[0].key}
            image={ABOUT_SECTIONS[0].image}
            imagePosition="right"
          />

          <ZigzagRow image="/images/about-2.jpg" imageAlt="" imagePosition="left">
            <ExperienceTimeline />
          </ZigzagRow>

          <AboutSection
            translationKey={ABOUT_SECTIONS[1].key}
            image={ABOUT_SECTIONS[1].image}
            imagePosition="right"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}