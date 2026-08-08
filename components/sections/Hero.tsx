import Image from "next/image";
import { useTranslations } from "next-intl";
import { ATTORNEY } from "@/lib/constants";

export default function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex h-[85vh] min-h-[500px] w-full items-end overflow-hidden">
      <Image src={ATTORNEY.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream-light via-black/30 to-black/50" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end gap-5 px-6 pb-72 lg:px-8">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-white/80 sm:h-24 sm:w-24">
          <Image src={ATTORNEY.photo} alt={ATTORNEY.name} fill className="object-cover" sizes="96px" />
        </div>

        <div className="max-w-md">
          <h2 className="text-lg font-semibold text-white sm:text-xl">{ATTORNEY.name}</h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-200 sm:text-base">{t("bio")}</p>
        </div>
      </div>
    </section>
  );
}