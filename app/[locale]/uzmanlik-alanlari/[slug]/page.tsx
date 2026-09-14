import type { Metadata } from "next";
import PageBanner from "@/components/sections/PageBanner";
import ReactMarkdown from "react-markdown";
import {
  CornerUpLeft,
  CornerUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "@/lib/navigation";
import { PRACTICE_AREAS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type PracticeAreaTranslation = {
  title: string;
  short: string;
  description?: string;
};

function prepareMarkdown(text: string) {
  return text
    .replace(/^•\s+/gm, "- ")
    .replace(/^\*\*(.+)\*\*$/gm, "## $1");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const tMeta = await getTranslations("meta");
  const tAreas = await getTranslations("practiceAreas");

  const area = PRACTICE_AREAS.find(
    (item) => item.slug === slug
  );

  if (!area) {
    return {
      title: tMeta("siteTitle"),
    };
  }

  const data = tAreas.raw(slug) as PracticeAreaTranslation;

  if (!data.description?.trim()) {
    return {
      title: tMeta("siteTitle"),
    };
  }

  return buildMetadata({
    locale,
    path: `/uzmanlik-alanlari/${slug}`,
    title: `${data.title} | ${tMeta("siteTitle")}`,
    description: data.short,
  });
}

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const locale = await getLocale();
  const isRtl = locale === "ar";

  const tAreas = await getTranslations("practiceAreas");
  const tPage = await getTranslations("practiceAreasPage");

  const currentArea = PRACTICE_AREAS.find(
    (area) => area.slug === slug
  );

  if (!currentArea) {
    notFound();
  }

  const currentData = tAreas.raw(
    currentArea.slug
  ) as PracticeAreaTranslation;

  if (!currentData.description?.trim()) {
    notFound();
  }

  const availableAreas = PRACTICE_AREAS.map((area) => {
    const data = tAreas.raw(
      area.slug
    ) as PracticeAreaTranslation;

    return {
      ...area,
      title: data.title,
      short: data.short,
      description: data.description ?? "",
    };
  }).filter((area) => area.description.trim());

  const currentIndex = availableAreas.findIndex(
    (area) => area.slug === slug
  );

  if (currentIndex === -1) {
    notFound();
  }

  const previousArea =
    currentIndex > 0
      ? availableAreas[currentIndex - 1]
      : null;

  const nextArea =
    currentIndex < availableAreas.length - 1
      ? availableAreas[currentIndex + 1]
      : null;

  const navButtonClass =
    "flex items-center gap-1.5 rounded-md bg-burgundy px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark";

  return (
    <main>
      <Navbar />

      <PageBanner
        image={`/images/practice-areas/${currentArea.slug}-banner.jpg`}
        title={currentData.title}
        subtitle={currentData.short}
      />

      {/* İÇERİK */}
      <section className="bg-cream-light py-16">
        <div className="mx-auto max-w-7xl px-4">

          {/*
            MASAÜSTÜNDE:
            Sol içerik + sağ sticky menü aynı satırdan başlıyor.

            MOBİLDE:
            grid devreye girmediği için mevcut mobil yapı değişmiyor.
          */}
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-16">

            {/* SOL İÇERİK */}
            <div className="min-w-0">

              {/* NAV BUTONLARI */}
              <div className="mx-auto mb-8 max-w-3xl lg:mx-0">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/uzmanlik-alanlari"
                    className={navButtonClass}
                  >
                    {isRtl ? (
                      <CornerUpRight size={16} />
                    ) : (
                      <CornerUpLeft size={16} />
                    )}

                    {tPage("back")}
                  </Link>

                  {previousArea && (
                    <Link
                      href={`/uzmanlik-alanlari/${previousArea.slug}`}
                      className={navButtonClass}
                    >
                      {isRtl ? (
                        <ChevronRight size={16} />
                      ) : (
                        <ChevronLeft size={16} />
                      )}

                      {tPage("previousArea")}
                    </Link>
                  )}

                  {nextArea && (
                    <Link
                      href={`/uzmanlik-alanlari/${nextArea.slug}`}
                      className={navButtonClass}
                    >
                      {tPage("nextArea")}

                      {isRtl ? (
                        <ChevronLeft size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </Link>
                  )}
                </div>
              </div>

              {/* ANA FAALİYET ALANI BAŞLIĞI */}
              <div className="mx-auto mb-8 max-w-3xl lg:mx-0">
                <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  {currentData.title}
                </h1>
              </div>

              {/* MOBİL FAALİYET ALANLARI MENÜSÜ */}
              <div className="sticky top-16 z-20 mb-8 lg:hidden">
                <div className="border-y border-neutral-200 bg-cream-light/95 py-2 backdrop-blur-md">
                  <nav className="flex gap-2 overflow-x-auto px-1">
                    {availableAreas.map((area) => {
                      const isActive = area.slug === slug;

                      return (
                        <Link
                          key={area.slug}
                          href={`/uzmanlik-alanlari/${area.slug}`}
                          className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-burgundy text-white"
                              : "bg-white/70 text-neutral-700 hover:text-burgundy"
                          }`}
                        >
                          {area.title}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* METİN */}
              <article className="min-w-0">
                <div className="mx-auto max-w-3xl lg:mx-0">
                  <div
                    className="
                      prose
                      prose-lg
                      max-w-none
                      text-neutral-700

                      max-sm:prose-h1:text-xl
                      max-sm:prose-h2:text-lg
                      max-sm:prose-h3:text-base

                      prose-strong:font-normal

                      lg:prose-h2:mt-8
                      lg:prose-h2:mb-3
                      lg:prose-h2:text-xl
                      lg:prose-h2:font-semibold
                      lg:prose-h2:leading-snug
                      lg:prose-h2:text-neutral-900

                      lg:prose-h3:text-lg
                      lg:prose-h3:font-semibold
                      lg:prose-h3:text-neutral-900

                      prose-li:marker:text-burgundy
                    "
                  >
                    <ReactMarkdown>
                      {prepareMarkdown(currentData.description)}
                    </ReactMarkdown>
                  </div>
                </div>
              </article>
            </div>

            {/* MASAÜSTÜ SAĞ MENÜ */}
            <aside className="sticky top-28 hidden self-start lg:block">
              <div className="overflow-hidden rounded-md border border-neutral-200 bg-white/60">
                <div className="border-b border-neutral-200 px-4 py-3">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    {tPage("menuTitle")}
                  </h2>
                </div>

                <nav className="max-h-[calc(100vh-9rem)] overflow-y-auto p-2">
                  {availableAreas.map((area) => {
                    const isActive = area.slug === slug;

                    return (
                      <Link
                        key={area.slug}
                        href={`/uzmanlik-alanlari/${area.slug}`}
                        className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-burgundy font-medium text-white"
                            : "text-neutral-700 hover:bg-neutral-100 hover:text-burgundy"
                        }`}
                      >
                        {area.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}