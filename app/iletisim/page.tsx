import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactInfo from "@/components/sections/ContactInfo";
import ContactForm from "@/components/sections/ContactForm";
import LocationMap from "@/components/sections/LocationMap";
import { ATTORNEY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `İletişim | ${ATTORNEY.office}`,
  description: "Sorularınız ve randevu talepleriniz için bizimle iletişime geçin.",
};

export default function IletisimPage() {
  return (
    <main>
      <Navbar />

    {/* Banner — no embedded text in the image itself, page heading is overlaid in white */}
    <section className="relative flex h-80 w-full items-center justify-center overflow-hidden sm:h-[420px]">
    <Image
        src="/images/contact-banner.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
    />
    <div className="absolute inset-0 bg-[#2a1f1a]/70" />

    <div className="relative z-10 text-center">
    <h1 className="text-3xl font-bold text-white sm:text-4xl">İLETİŞİM</h1>
    <p className="mt-3 text-neutral-200">
        Sorularınız ve hukuki danışmanlık talepleriniz için bizimle iletişime geçebilirsiniz.
    </p>
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