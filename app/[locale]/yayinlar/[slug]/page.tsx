import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "@/lib/navigation";
import { getPublicationBySlug } from "@/lib/publications";
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
  const tAreas = await getTranslations("practiceAreas");
  const categoryData = PUBLICATION_CATEGORIES.find((cat) => cat.slug === publication.category);
  const categoryLabel = tAreas(`${publication.category}.title`);

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
          <h1 className="mt-4 font-serif text-3xl text-white sm:text-4xl">{publication.title}</h1>
          <p className="mt-2 text-sm text-neutral-300">
            {new Date(publication.date).toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="bg-cream-light py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Link
            href="/yayinlar"
            className="inline-flex items-center gap-2 text-sm font-medium text-burgundy hover:underline"
          >
            <ArrowLeft size={16} />
            {t("backToList")}
          </Link>

          <p className="mt-8 whitespace-pre-line text-lg leading-relaxed text-neutral-700">
            {publication.content}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}