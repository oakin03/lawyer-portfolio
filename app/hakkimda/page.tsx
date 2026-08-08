import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ZigzagRow from "@/components/sections/ZigzagRow";
import { ATTORNEY, ABOUT_SECTIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Hakkımda | ${ATTORNEY.office}`,
  description: `${ATTORNEY.name} hakkında — eğitim, deneyim ve çalışma prensipleri.`,
};

export default function HakkimdaPage() {
  return (
    <main>
      <Navbar />

      <section className="relative flex h-80 w-full items-center justify-center overflow-hidden sm:h-[420px]">
        <div className="absolute inset-0 bg-[#2a1f1a]" />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">HAKKIMDA</h1>
          <p className="mt-3 text-neutral-200">
            Deneyimim, çalışma prensiplerim ve size nasıl yardımcı olabileceğim hakkında.
          </p>
        </div>
      </section>

      <section className="bg-cream-light py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-20 px-4">
          <AboutSection {...ABOUT_SECTIONS[0]} imagePosition="right" />

          <ZigzagRow image="/images/about-2.jpg" imageAlt="Eğitim ve Deneyim" imagePosition="left">
            <ExperienceTimeline />
          </ZigzagRow>

          <AboutSection {...ABOUT_SECTIONS[1]} imagePosition="right" />
        </div>
      </section>

      <Footer />
    </main>
  );
}