import Image from "next/image";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { ATTORNEY, SOCIAL_LINKS } from "@/lib/constants";
import AppointmentModal from "@/components/ui/AppointmentModal";

export default function ContactIntro() {
  const t = useTranslations("contact.info");

  const items = [
    {
      icon: MapPin,
      label: t("address"),
      value: ATTORNEY.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        ATTORNEY.address
      )}`,
      external: true,
    },
    {
      icon: Phone,
      label: t("phone"),
      value: ATTORNEY.phone,
      href: `tel:${ATTORNEY.phone.replace(/\s/g, "")}`,
      external: false,
    },
    {
      icon: WhatsAppIcon,
      label: t("whatsapp"),
      value: ATTORNEY.phone,
      href: SOCIAL_LINKS.whatsapp,
      external: true,
    },
    {
      icon: Mail,
      label: t("email"),
      value: SOCIAL_LINKS.email,
      href: `mailto:${SOCIAL_LINKS.email}`,
      external: false,
    },
    {
      icon: Clock,
      label: t("workingHours"),
      value: ATTORNEY.workingHours,
      href: undefined,
      external: false,
    },
  ];

  return (
    <section className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-lg border border-neutral-200 bg-cream-light p-8 shadow-sm">
          <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2">

            {/* SOL TARAF */}
            <div className="flex h-full flex-col">

              {/* OFİS FOTOĞRAFI */}
              <div className="relative mx-auto mb-10 h-[280px] w-[280px] flex-shrink-0 overflow-hidden rounded-lg border border-neutral-200 shadow-md md:h-[380px] md:w-[380px]">
                <Image
                  src="/images/office-building.jpg"
                  alt="Büşra Nur Karakoç Hukuk ve Danışmanlık Ofisi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 380px"
                />
              </div>

              {/* AÇIKLAMA */}
              <p className="leading-relaxed text-neutral-600">
                {t("intro")}
              </p>

              {/* İLETİŞİM BİLGİLERİ */}
              <div className="mt-8 space-y-5">
                {items.map((item) => {
                  const Icon = item.icon;

                  const content = (
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-burgundy/30 text-burgundy">
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">
                          {item.label}
                        </p>

                        <p className="mt-1 whitespace-pre-line text-neutral-800">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={
                        item.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block transition-opacity hover:opacity-70"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* BUTONLAR */}
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`tel:${ATTORNEY.phone.replace(/\s/g, "")}`}
                  className="inline-flex w-fit items-center gap-2 rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
                >
                  <Phone size={18} />
                  {t("callCta")}
                </a>

                <AppointmentModal />
              </div>
            </div>

            {/* GOOGLE MAPS */}
            <div className="h-[400px] overflow-hidden rounded-lg border border-neutral-200 md:h-auto md:min-h-full md:self-stretch">
              <iframe
                title={t("mapTitle")}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  ATTORNEY.address
                )}&output=embed`}
                width="100%"
                height="100%"
                className="h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}