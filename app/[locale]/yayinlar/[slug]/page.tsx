import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FootnoteHighlight from "@/components/publications/FootnoteHighlight";
import { getLocale, getTranslations } from "next-intl/server";
import {
  CornerUpLeft,
  CornerUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { Link } from "@/lib/navigation";
import { formatPublicationDate } from "@/lib/formatDate";
import {
  getPublicationBySlug,
  getAdjacentPublications,
} from "@/lib/publications";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const publication =
    await getPublicationBySlug(slug);

  const tMeta =
    await getTranslations("meta");

  if (!publication) {
    return {
      title: tMeta("siteTitle"),
    };
  }

  return buildMetadata({
    locale: publication.language,
    path: `/yayinlar/${slug}`,
    title: `${publication.title} | ${tMeta("siteTitle")}`,
    description: publication.excerpt,
    image: `/images/practice-areas/${publication.category}-banner.jpg`,
    languageAlternates: false,
  });
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const publication =
    await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const t =
    await getTranslations("publicationsPage");

  const tAreas =
    await getTranslations("practiceAreas");

  const locale =
    await getLocale();

  const isRtl =
    locale === "ar";

  const categoryLabel =
    tAreas(
      `${publication.category}.title`
    );

  const { prev, next } =
    await getAdjacentPublications(
      publication.id
    );

  const navButtonClass =
    "flex items-center gap-1.5 rounded-md bg-burgundy px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark";

  return (
    <main>
      <FootnoteHighlight />
      <Navbar />

      {/* ÜST BANNER */}
      <section className="relative flex h-64 w-full items-end overflow-hidden sm:h-80">
        <Image
          src={`/images/practice-areas/${publication.category}-banner.jpg`}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[#2a1f1a]/70" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-10 lg:px-8">
          <span className="inline-block rounded-full bg-burgundy px-3 py-1 text-xs font-semibold text-white">
            {categoryLabel}
          </span>

          <h1 className="mt-4 font-serif text-2xl text-white sm:text-4xl">
            {publication.title}
          </h1>

          <div className="mt-2 text-sm text-neutral-300">
            <p>
              {formatPublicationDate(
                publication.date,
                locale
              )}
            </p>

            {publication.updated_at !==
              publication.date && (
              <p className="mt-0.5">
                (
                {t("lastEdited")}:{" "}
                {formatPublicationDate(
                  publication.updated_at,
                  locale
                )}
                )
              </p>
            )}
          </div>
        </div>
      </section>

      {/* MAKALE */}
      <section className="bg-cream-light py-16">
        <div className="mx-auto max-w-3xl px-4">

          {/* GEZİNME BUTONLARI */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/yayinlar"
              className={navButtonClass}
            >
              {isRtl ? (
                <CornerUpRight size={16} />
              ) : (
                <CornerUpLeft size={16} />
              )}

              Geri
            </Link>

            {prev && (
              <Link
                href={`/yayinlar/${prev.slug}`}
                className={navButtonClass}
              >
                {isRtl ? (
                  <ChevronRight size={16} />
                ) : (
                  <ChevronLeft size={16} />
                )}

                {t("previousArticle")}
              </Link>
            )}

            {next && (
              <Link
                href={`/yayinlar/${next.slug}`}
                className={navButtonClass}
              >
                {t("nextArticle")}

                {isRtl ? (
                  <ChevronLeft size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </Link>
            )}
          </div>

          {/* MAKALE İÇERİĞİ */}
          <div
            className="
              publication-rich-text
              prose
              mt-8
              max-w-none
              text-neutral-700

              [&_table]:w-full
              [&_table]:border-collapse

              [&_td]:border
              [&_td]:border-neutral-300
              [&_td]:p-2

              [&_th]:border
              [&_th]:border-neutral-300
              [&_th]:bg-neutral-100
              [&_th]:p-2

              [&_a]:break-words

              [&_#footnotes-divider]:mt-12
              [&_#footnotes-divider]:border-neutral-300

              [&_#footnotes-title]:mt-6
              [&_#footnotes-title]:text-lg

              [&_#footnotes-list]:mt-4
              [&_#footnotes-list]:text-sm
              [&_#footnotes-list]:leading-6

              [&_#footnotes-list_li]:my-2
            "
            dangerouslySetInnerHTML={{
              __html: publication.content,
            }}
          />

          {/* YAZAR */}
          {publication.profiles
            ?.display_name && (
            <p className="mt-8 text-end text-sm text-neutral-500">
              Yazar:{" "}
              {
                publication
                  .profiles
                  .display_name
              }
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}