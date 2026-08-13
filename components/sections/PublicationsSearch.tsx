"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { formatPublicationDate } from "@/lib/formatDate";
import { useTranslations } from "next-intl";
import type { Publication } from "@/lib/publications";
import { PUBLICATION_CATEGORIES } from "@/lib/constants";
import { Link } from "@/lib/navigation";

export default function PublicationsSearch({ publications }: { publications: Publication[] }) {
  const t = useTranslations("publicationsPage");
  const locale = useLocale();
  const tAreas = useTranslations("practiceAreas");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const arrow = locale === "ar" ? "←" : "→";

  const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();

    return publications.filter((pub) => {
      const matchesCategory = !category || pub.category === category;
      if (!matchesCategory) return false;

      if (!q) return true;
      const haystack = `${pub.title} ${pub.excerpt} ${pub.content}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category, publications]);

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full rounded-md border border-neutral-300 bg-white px-5 py-3 text-neutral-900 outline-none transition-colors focus:border-burgundy"
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            category === null
              ? "border-burgundy bg-burgundy text-white"
              : "border-neutral-300 text-neutral-600 hover:border-burgundy hover:text-burgundy"
          }`}
        >
          {t("allCategories")}
        </button>

        {PUBLICATION_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setCategory(cat.slug)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              category === cat.slug
                ? "border-burgundy bg-burgundy text-white"
                : "border-neutral-300 text-neutral-600 hover:border-burgundy hover:text-burgundy"
            }`}
          >
            {tAreas(`${cat.slug}.title`)}
          </button>
        ))}
      </div>

      <div className="mt-12">
        {filtered.length === 0 ? (
          <p className="text-center text-neutral-500">{t("noResults")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pub, index) => {
              const categoryData = PUBLICATION_CATEGORIES.find((cat) => cat.slug === pub.category);
              const categoryLabel = tAreas(`${pub.category}.title`);

              return (
                <Link
                  key={pub.slug}
                  href={`/yayinlar/${pub.slug}`}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className="flex animate-[fade-in-up_0.5s_ease-out_both] flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-44 w-full bg-neutral-100">
                    <Image
                      src={categoryData?.image ?? "/images/practice-areas/other.jpg"}
                      alt={categoryLabel}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute start-3 top-3 rounded-full bg-burgundy px-3 py-1 text-xs font-semibold text-white">
                      {categoryLabel}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                  <div className="text-xs tracking-wide text-neutral-400">
                    <p>{formatPublicationDate(pub.date, locale)}</p>
                    {pub.updated_at !== pub.date && (
                      <p className="mt-0.5">
                        ({t("lastEdited")}: {formatPublicationDate(pub.updated_at, locale)})
                      </p>
                    )}
                  </div>
                    <h3 className="mt-2 text-lg font-semibold text-neutral-900">{pub.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{pub.excerpt}</p>
                    <span className="mt-4 self-end text-sm font-medium text-burgundy">{t("readMore")} {arrow}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}