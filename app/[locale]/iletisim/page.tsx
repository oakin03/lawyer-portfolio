import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/sections/PageBanner";
import ContactIntro from "@/components/sections/ContactIntro";
import ContactForm from "@/components/sections/ContactForm";
import SectionDivider from "@/components/ui/SectionDivider";
import { ATTORNEY } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact.banner");
  const tMeta = await getTranslations("meta");
  return {
    title: `${t("title")} | ${tMeta("siteTitle")}`,
    description: t("subtitle"),
  };
}

export default async function IletisimPage() {
  const t = await getTranslations("contact.banner");

  return (
    <main>
      <Navbar />

      <PageBanner image="/images/contact-banner.jpg" title={t("title")} subtitle={t("subtitle")} />

      <ScrollReveal>
        <ContactIntro />
      </ScrollReveal>

      <ScrollReveal>
        <SectionDivider />
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-cream-light py-20">
          <div className="mx-auto max-w-3xl px-4">
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </main>
  );
}