"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/navigation";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Users,
  Scale as ScaleIcon,
} from "lucide-react";
import { ATTORNEY } from "@/lib/constants";
import AppointmentModal from "@/components/ui/AppointmentModal";

export default function Hero({
  hasPublications,
}: {
  hasPublications: boolean;
}) {
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    { icon: ShieldCheck, key: "feature1" },
    { icon: Users, key: "feature2" },
    { icon: ScaleIcon, key: "feature3" },
  ];

  const buttonClass =
    "flex items-center justify-center gap-2 rounded-md bg-burgundy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-burgundy-dark sm:px-6 sm:py-3 sm:text-sm [@media(max-height:500px)]:!px-3 [@media(max-height:500px)]:!py-1.5";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-cream-light"
    >
      <div
        ref={imageWrapperRef}
        className="absolute inset-0"
        style={{
          transformOrigin: "center top",
          willChange: "transform, opacity",
        }}
      >
        <Image
          src={ATTORNEY.heroImage}
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={65}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="mr-auto max-w-4xl text-left">

          {/* ALINTI */}
          <div className="font-serif text-2xl leading-[1.35] text-white sm:text-4xl lg:text-[40px] [@media(max-height:500px)]:!text-lg">
            <h1>
              <span className="block">
                {t("headlineLine1")}
              </span>

              <span className="mt-1 block">
                {t("headlineLine2")}
              </span>
            </h1>

            <p className="mt-4 text-base font-medium italic text-white/80 sm:text-lg [@media(max-height:500px)]:!mt-2 [@media(max-height:500px)]:!text-xs">
              {t("quoteAuthor")}
            </p>
          </div>

          {/* BUTONLAR */}
          <div className="mt-20 flex flex-col gap-2 sm:mt-24 sm:flex-row sm:gap-4 [@media(max-height:500px)]:!mt-2 [@media(max-height:500px)]:!flex-row [@media(max-height:500px)]:!gap-2">

            {hasPublications && (
              <Link
                href="/yayinlar"
                className={buttonClass}
              >
                {t("ctaPublications")}

                {isRtl ? (
                  <ArrowLeft size={16} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </Link>
            )}

            <Link
              href="/uzmanlik-alanlari"
              className={buttonClass}
            >
              {t("ctaSecondary")}

              {isRtl ? (
                <ArrowLeft size={16} />
              ) : (
                <ArrowRight size={16} />
              )}
            </Link>

            <AppointmentModal className={buttonClass} />
          </div>

          {/* ÖZELLİKLER */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6 [@media(max-height:500px)]:!mt-3 [@media(max-height:500px)]:!grid-cols-3 [@media(max-height:500px)]:!gap-2">
            {features.map(({ icon: Icon, key }, index) => (
              <div
                key={key}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                className="flex animate-[fade-in-up_0.5s_ease-out_both] items-start gap-2 sm:gap-3"
              >
                <span className="mt-0.5 flex-shrink-0 origin-left scale-75 sm:scale-100 [@media(max-height:500px)]:!scale-50">
                  <Icon
                    size={20}
                    className="text-white"
                  />
                </span>

                <div>
                  <p className="text-xs font-semibold text-white sm:text-sm [@media(max-height:500px)]:!text-[10px]">
                    {t(`${key}.title`)}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-neutral-300 sm:text-sm [@media(max-height:500px)]:!hidden">
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