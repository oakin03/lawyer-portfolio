import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PracticeAreasGrid from "@/components/sections/PracticeAreasGrid";
import PracticeAreaDetails from "@/components/sections/PracticeAreaDetails";
import { ATTORNEY } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("practiceAreasPage");
  return {
    title: `${t("title")} | ${ATTORNEY.office}`,
    description: t("subtitle"),
  };
}

export default async function UzmanlikAlanlariPage() {
  const t = await getTranslations("practiceAreasPage");

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
        <div className="mx-auto max-w-7xl px-4">
          <PracticeAreasGrid />
        </div>
      </section>

      <section className="bg-white py-4">
        <div className="mx-auto max-w-7xl px-4">
          <PracticeAreaDetails />
        </div>
      </section>

      <Footer />
    </main>
  );
}