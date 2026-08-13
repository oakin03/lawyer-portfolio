import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ATTORNEY } from "@/lib/constants";
import { CalendarDays, ArrowRight, ArrowLeft, ShieldCheck, Users, Scale as ScaleIcon } from "lucide-react";
import { useLocale } from "next-intl";

export default function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const features = [
    { icon: ShieldCheck, key: "feature1" },
    { icon: Users, key: "feature2" },
    { icon: ScaleIcon, key: "feature3" },
  ];

  return (
    <section className="relative flex h-[85vh] min-h-[600px] w-full items-center overflow-hidden">
      <Image src={ATTORNEY.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream-light via-black/40 to-black/60" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-72 sm:pt-72 lg:px-8">
        <div className="max-w-2xl mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            {ATTORNEY.name}
          </p>

          <h1 className="mt-4 font-serif text-3xl leading-tight text-white sm:mt-4 sm:text-5xl">
            {t("headlineLine1")}
            <br />
            {t("headlineLine2")}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-200 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/yayinlar"
              className="flex items-center justify-center gap-2 rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
            >
              {t("ctaPublications")}
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
            <Link
              href="/uzmanlik-alanlari"
              className="flex items-center justify-center gap-2 rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
            >
              {t("ctaSecondary")}
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
            <Link
              href="/iletisim"
              className="flex items-center justify-center gap-2 rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
            >
              <CalendarDays size={18} />
              {t("ctaPrimary")}
            </Link>
          </div>

          <div className="mt-14 hidden grid-cols-1 gap-6 sm:grid sm:grid-cols-3">
            {features.map(({ icon: Icon, key }, index) => (
              <div key={key} 
                style={{ animationDelay: `${index * 100}ms` }}
                className="flex animate-[fade-in-up_0.5s_ease-out_both] items-start gap-3"
                >
                
                <Icon size={20} className="mt-0.5 flex-shrink-0 text-white" />
                <div>
                  <p className="text-sm font-semibold text-white">{t(`${key}.title`)}</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-300">{t(`${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}