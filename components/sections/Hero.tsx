"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/navigation";
import { ArrowRight, ArrowLeft, ShieldCheck, Users, Scale as ScaleIcon } from "lucide-react";
import { ATTORNEY } from "@/lib/constants";
import AppointmentModal from "@/components/ui/AppointmentModal";

export default function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      const section = sectionRef.current;
      if (!section) return;
      const heroHeight = section.offsetHeight;
      const raw = window.scrollY / heroHeight;
      setProgress(Math.min(Math.max(raw, 0), 1));
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image fades out well before it would visually reach the fixed Navbar's
  // territory, so the two transparency effects never overlap/compound.
  const imageScale = 1 - progress * 0.15;
  const imageOpacity = 1 - Math.min(progress * 1.6, 1);

  const features = [
    { icon: ShieldCheck, key: "feature1" },
    { icon: Users, key: "feature2" },
    { icon: ScaleIcon, key: "feature3" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[600px] w-full items-end overflow-hidden bg-cream-light"
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${imageScale})`,
          opacity: imageOpacity,
          transformOrigin: "center top",
          willChange: "transform, opacity",
        }}
      >
        <Image src={ATTORNEY.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
      </div>

      <div className="absolute inset-0 bg-black" style={{ opacity: imageOpacity * 0.48 }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 sm:pt-72 lg:px-8">
        <div className="max-w-3xl mt-10 text-left mr-auto">
          <div className="flex flex-col gap-2.5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{ATTORNEY.name}</p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#D4AF37]">{t("locationTag")}</p>
          </div>

          <h1 className="mt-6 font-serif text-3xl leading-tight text-white sm:mt-8 sm:text-5xl">
            {t("headlineLine1")}
            <br />
            <span className="font-bold">{t("headlineLine2")}</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-200 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
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
            <AppointmentModal className="flex items-center justify-center gap-2 rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark" />
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, key }, index) => (
              <div
                key={key}
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