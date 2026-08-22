import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { PRACTICE_AREAS } from "@/lib/constants";

export default function PracticeAreasGrid() {
  const t = useTranslations("home.practiceAreas");
  const tAreas = useTranslations("practiceAreas");

  return (
    <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 [@media(max-height:500px)]:!grid-cols-4 [@media(max-height:500px)]:!gap-3">
      {PRACTICE_AREAS.map((area, index) => {
        const title = tAreas(`${area.slug}.title`);
        return (
          <Link
            key={area.slug}
            href={`#${area.slug}`}
            style={{ animationDelay: `${index * 60}ms` }}
            className="group relative aspect-square w-full animate-[fade-in-up_0.5s_ease-out_both] overflow-hidden rounded-lg"
          >
            <Image
              src={area.image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100">
              <p className="px-4 text-center text-sm font-medium text-white">{t("hoverCta")}</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 border-t border-white/30 bg-white/20 py-3 text-center backdrop-blur-md [@media(max-height:500px)]:!py-1">
              <p className="text-sm font-semibold text-white sm:text-base [@media(max-height:500px)]:!text-[10px]">
                {title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}