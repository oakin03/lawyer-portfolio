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

      <section className="bg-neutral-900 py-16 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">İletişim</h1>
        <p className="mt-3 text-neutral-400">
          Sorularınız için bize ulaşın, en kısa sürede dönüş yapalım.
        </p>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:items-center">
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