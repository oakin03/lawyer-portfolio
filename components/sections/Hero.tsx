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
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      const section = sectionRef.current;
      const imageWrapper = imageWrapperRef.current;
      const overlay = overlayRef.current;
      if (!section || !imageWrapper || !overlay) return;

      const heroHeight = section.offsetHeight;
      const raw = window.scrollY / heroHeight;
      const progress = Math.min(Math.max(raw, 0), 1);

      const scale = 1 - progress * 0.15;
      const opacity = 1 - Math.min(progress * 1.6, 1);

      // Writing directly to the DOM here (instead of React state) skips a
      // re-render on every scroll frame — the browser only has to composite
      // a transform/opacity change, which stays smooth even on lower-end phones.
      imageWrapper.style.transform = `scale(${scale})`;
      imageWrapper.style.opacity = String(opacity);
      overlay.style.opacity = String(opacity * 0.48);

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

  const features = [
    { icon: ShieldCheck, key: "feature1" },
    { icon: Users, key: "feature2" },
    { icon: ScaleIcon, key: "feature3" },
  ];

  const buttonClass =
    "flex items-center justify-center gap-2 rounded-md bg-burgundy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-burgundy-dark sm:px-6 sm:py-3 sm:text-sm";

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[600px] w-full items-end overflow-hidden bg-cream-light"
    >
      <div
        ref={imageWrapperRef}
        className="absolute inset-0"
        style={{ transformOrigin: "center top", willChange: "transform, opacity" }}
      >
        <Image src={ATTORNEY.heroImage} alt="" fill priority quality={65} className="object-cover" sizes="100vw" />
      </div>

      <div ref={overlayRef} className="absolute inset-0 bg-black" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-32 sm:pt-72 lg:px-8">
        <div className="max-w-2xl mt-4 text-left mr-auto sm:mt-10">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] sm:text-sm">
              {ATTORNEY.name}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 sm:text-xs">
              {t("locationTag")}
            </p>
          </div>

          <h1 className="mt-3 font-serif text-2xl leading-tight text-white sm:mt-4 sm:text-5xl">
            {t("headlineLine1")}
            <br />
            <span className="font-bold">{t("headlineLine2")}</span>
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-200 sm:mt-6 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:gap-4">
            <Link href="/yayinlar" className={buttonClass}>
              {t("ctaPublications")}
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
            <Link href="/uzmanlik-alanlari" className={buttonClass}>
              {t("ctaSecondary")}
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
            <AppointmentModal className={buttonClass} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-6">
            {features.map(({ icon: Icon, key }, index) => (
              <div
                key={key}
                style={{ animationDelay: `${index * 100}ms` }}
                className="flex animate-[fade-in-up_0.5s_ease-out_both] items-start gap-2 sm:gap-3"
              >
                <span className="mt-0.5 flex-shrink-0 scale-75 origin-left sm:scale-100">
                  <Icon size={20} className="text-white" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white sm:text-sm">{t(`${key}.title`)}</p>
                  <p className="mt-1 text-xs font-semibold text-neutral-300 sm:text-sm">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}