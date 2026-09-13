import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLocale } from "next-intl";
import { PRACTICE_AREAS } from "@/lib/constants";
import StaggerGroup from "@/components/ui/StaggerGroup";

export default function PracticeAreas() {
  const t = useTranslations("home.practiceAreas");
  const tAreas = useTranslations("practiceAreas");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold uppercase tracking-[0.2em] text-burgundy">{t("label")}</p>
          <h2 className="mt-3 font-serif text-2xl text-neutral-900 sm:text-3xl">{t("heading")}</h2>
          <p className="mt-4 leading-relaxed text-neutral-600">{t("subtitle")}</p>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRACTICE_AREAS.map((area, index) => {
            const title = tAreas(`${area.slug}.title`);
            return (
              <Link
                key={area.slug}
                href={`/uzmanlik-alanlari/${area.slug}`}
                style={{ animationDelay: `${index * 60}ms` }}
                className="group/card flex flex-col rounded-lg border border-neutral-200 bg-white p-5 opacity-0 transition-shadow group-[.is-visible]:animate-[fade-in-up_0.5s_ease-out_both] hover:shadow-md"
              >
                <div className="relative h-36 w-full overflow-hidden rounded-md">
                  <Image
                    src={area.image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {tAreas(`${area.slug}.short`)}
                </p>
              </Link>
            );
          })}
        </StaggerGroup>

        <div className="mt-12 flex justify-center">
          <Link
            href="/uzmanlik-alanlari"
            className="flex items-center gap-2 rounded-md border border-burgundy px-6 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white"
          >
            {t("viewAll")}
            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>
      </div>
    </section>
  );
}