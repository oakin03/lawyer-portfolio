import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import PracticeAreas from "@/components/sections/PracticeAreas";
import SectionDivider from "@/components/ui/SectionDivider";
import FirmOverview from "@/components/sections/FirmOverview";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations("meta");
  return buildMetadata({
    locale,
    path: "",
    title: tMeta("siteTitle"),
    description: tMeta("description"),
  });
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <ScrollReveal>
        <AboutPreview />
      </ScrollReveal>
      <ScrollReveal>
        <SectionDivider />
      </ScrollReveal>
      <ScrollReveal>
        <PracticeAreas />
      </ScrollReveal>
      <ScrollReveal>
        <SectionDivider />
      </ScrollReveal>
      <ScrollReveal>
        <FirmOverview />
      </ScrollReveal>
      <Footer />
    </main>
  );
}