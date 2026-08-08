import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactInfo from "@/components/sections/ContactInfo";
import ContactForm from "@/components/sections/ContactForm";
import LocationMap from "@/components/sections/LocationMap";
import { ATTORNEY } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact.banner");
  return {
    title: `${t("title")} | ${ATTORNEY.office}`,
    description: t("subtitle"),
  };
}

export default async function IletisimPage() {
  const t = await getTranslations("contact.banner");

  return (
    <main>
      <Navbar />

      <section className="relative flex h-80 w-full items-center justify-center overflow-hidden sm:h-[420px]">
        <div className="absolute inset-0 bg-[#2a1f1a]/70" />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{t("title")}</h1>
          <p className="mt-3 text-neutral-200">{t("subtitle")}</p>
        </div>
      </section>

      <section className="bg-cream-light py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:items-center">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <ContactForm />
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
            <ContactInfo />
          </div>
        </div>
      </section>

      <LocationMap />

      <Footer />
    </main>
  );
}