import type { Metadata } from "next";
import PageBanner from "@/components/sections/PageBanner";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
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
    path: "/hakkimda",
    title: tMeta("siteTitle"),
    description: tMeta("description"),
  });
}

export default async function HakkimdaPage() {
  const tBanner = await getTranslations("about.banner");
  const tAbout = await getTranslations("about.sections.whoIAm");

  return (
    <main>
      <Navbar />

      <PageBanner
        image="/images/about-banner.jpg"
        title={tBanner("title")}
        subtitle={tBanner("subtitle")}
      />

      <section className="bg-cream-light py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-0">
            
            {/* HAKKIMDA */}
            <ScrollReveal>
              <section className="lg:pr-16">
                <div className="mb-20 flex items-center gap-4">
                  <span className="h-px w-12 flex-shrink-0 bg-burgundy" />

                  <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                    {tAbout("title")}
                  </h2>
                </div>

                <div className="space-y-5 text-[15px] leading-8 text-neutral-600 md:text-base">
                  {tAbout.rich("text", {
                    b: (chunks) => (
                      <strong className="font-semibold text-neutral-900">
                        {chunks}
                      </strong>
                    ),
                    p: (chunks) => <p>{chunks}</p>,
                  })}
                </div>
              </section>
            </ScrollReveal>

            {/* EĞİTİM VE DENEYİM */}
            <ScrollReveal>
              <section className="border-t border-neutral-200 pt-14 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                <ExperienceTimeline />
              </section>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}