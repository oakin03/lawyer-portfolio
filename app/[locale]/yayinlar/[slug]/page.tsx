import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { formatPublicationDate } from "@/lib/formatDate";
import { CornerUpLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "@/lib/navigation";
import { getPublicationBySlug, getAdjacentPublications } from "@/lib/publications";
import { PUBLICATION_CATEGORIES } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);
  const tMeta = await getTranslations("meta");

  if (!publication) {
    return { title: tMeta("siteTitle") };
  }

  return {
    title: `${publication.title} | ${tMeta("siteTitle")}`,
    description: publication.excerpt,
  };
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const t = await getTranslations("publicationsPage");
  const locale = await getLocale();
  const tAreas = await getTranslations("practiceAreas");
  const categoryData = PUBLICATION_CATEGORIES.find((cat) => cat.slug === publication.category);
  const categoryLabel = tAreas(`${publication.category}.title`);
  const { prev, next } = await getAdjacentPublications(publication.id);

  const navButtonClass =
    "flex items-center gap-1.5 rounded-md bg-burgundy px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark";

  return (
    <main>
      <Navbar />

      <section className="relative flex h-64 w-full items-end overflow-hidden sm:h-80">
        <Image
          src={categoryData?.image ?? "/images/practice-areas/other.jpg"}
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

          <h1 className="mt-4 font-serif text-2xl text-white sm:text-4xl">{publication.title}</h1>

          <div className="mt-2 text-sm text-neutral-300">
            <p>{formatPublicationDate(publication.date, locale)}</p>
            {publication.updated_at !== publication.date && (
              <p className="mt-0.5">
                ({t("lastEdited")}: {formatPublicationDate(publication.updated_at, locale)})
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-cream-light py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex flex-wrap gap-3">
            <Link href="/yayinlar" className={navButtonClass}>
              <CornerUpLeft size={16} />
              Geri
            </Link>

            {prev && (
              <Link href={`/yayinlar/${prev.slug}`} className={navButtonClass}>
                <ChevronLeft size={16} />
                {t("previousArticle")}
              </Link>
            )}

            {next && (
              <Link href={`/yayinlar/${next.slug}`} className={navButtonClass}>
                {t("nextArticle")}
                <ChevronRight size={16} />
              </Link>
            )}
          </div>

          <div
            className="prose prose-lg mt-8 max-w-none text-neutral-700 [&_table]:border-collapse [&_table]:w-full [&_td]:border [&_td]:border-neutral-300 [&_td]:p-2 [&_th]:border [&_th]:border-neutral-300 [&_th]:bg-neutral-100 [&_th]:p-2"
            dangerouslySetInnerHTML={{ __html: publication.content }}
          />

          {publication.profiles?.display_name && (
            <p className="mt-8 text-right text-sm text-neutral-500">
              Yazar: {publication.profiles.display_name}
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}