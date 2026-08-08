import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ATTORNEY } from "@/lib/constants";

export default function AboutPreview() {
  const t = useTranslations("home.about");

  return (
    <section className="bg-cream-light py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-32 px-4 text-center sm:flex-row sm:items-start sm:text-left">
        <div className="relative h-72 w-56 flex-shrink-0 overflow-hidden rounded-lg border-2 border-burgundy/30 shadow-md sm:h-80 sm:w-64">
          <Image src={ATTORNEY.photo} alt={ATTORNEY.name} fill className="object-cover" sizes="(max-width: 640px) 224px, 256px" />
        </div>

        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-neutral-900">{ATTORNEY.name}</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">{t("tagline")}</p>
          <Link href="/hakkimda" className="mt-4 inline-block text-sm font-medium text-burgundy hover:underline">
            {t("cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
}