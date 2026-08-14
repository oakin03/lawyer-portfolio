import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { ATTORNEY, SOCIAL_LINKS } from "@/lib/constants";

export default function ContactIntro() {
  const t = useTranslations("contact.info");

  const items = [
    {
      icon: MapPin,
      label: t("address"),
      value: ATTORNEY.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ATTORNEY.address)}`,
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
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="flex flex-col justify-between">
              <div>
                <p className="leading-relaxed text-neutral-600">{t("intro")}</p>

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
                          <p className="mt-1 text-neutral-800">{item.value}</p>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="block transition-opacity hover:opacity-70"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>
              </div>

              <a
                href={`tel:${ATTORNEY.phone.replace(/\s/g, "")}`}
                className="mt-10 inline-flex w-fit items-center gap-2 rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
              >
                <Phone size={18} />
                {t("callCta")}
              </a>
            </div>

            <div className="h-[400px] overflow-hidden rounded-lg border border-neutral-200 md:h-full">
              <iframe
                title={t("mapTitle")}
                src={`https://www.google.com/maps?q=${encodeURIComponent(ATTORNEY.address)}&output=embed`}
                width="100%"
                height="100%"
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