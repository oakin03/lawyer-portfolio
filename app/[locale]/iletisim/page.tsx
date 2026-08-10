import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/sections/PageBanner";
import ContactInfo from "@/components/sections/ContactInfo";
import ContactForm from "@/components/sections/ContactForm";
import LocationMap from "@/components/sections/LocationMap";
import SectionDivider from "@/components/ui/SectionDivider";
import { ATTORNEY } from "@/lib/constants";

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

      <section className="bg-cream-light py-16">
        <div className="mx-auto max-w-7xl px-4">
          <ContactInfo />
        </div>
      </section>

      <SectionDivider />

      <section className="bg-cream-light py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
          <LocationMap />
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}