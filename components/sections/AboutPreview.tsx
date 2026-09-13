import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ATTORNEY } from "@/lib/constants";
import { useLocale } from "next-intl";

export default function AboutPreview() {
  const t = useTranslations("home.about");
  const locale = useLocale();
  const arrow = locale === "ar" ? "←" : "→";

  const paragraphs = t("tagline")
    .split("\n\n")
    .filter(Boolean);

  return (
    <section className="bg-cream-light py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-32 px-4 text-center sm:flex-row-reverse sm:items-start sm:text-left">
        <div className="relative h-72 w-72 flex-shrink-0 overflow-hidden rounded-lg border-2 border-burgundy/30 shadow-md sm:h-[400px] sm:w-[400px]">
          <Image
            src={ATTORNEY.photo}
            alt={ATTORNEY.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 288px, 400px"
          />
        </div>

        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-neutral-900">
            {t("title")}
          </h2>

          <div className="mt-7 space-y-5 leading-relaxed text-neutral-600">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            href="/hakkimda"
            className="mt-6 inline-block text-sm font-medium text-burgundy hover:underline"
          >
            {t("cta")} {arrow}
          </Link>
        </div>
      </div>
    </section>
  );
}