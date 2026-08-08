import Image from "next/image";
import { useTranslations } from "next-intl";
import { ATTORNEY } from "@/lib/constants";

export default function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex h-[85vh] min-h-[500px] w-full items-end overflow-hidden">
      <Image src={ATTORNEY.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream-light via-black/30 to-black/50" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-72 lg:px-8">
        <blockquote className="max-w-md">
          <p className="text-xl italic leading-relaxed text-white sm:text-2xl">
            &ldquo;{t("quote")}&rdquo;
          </p>
          <p className="mt-4 text-base text-neutral-200">{t("caption")}</p>
        </blockquote>
      </div>
    </section>
  );
}