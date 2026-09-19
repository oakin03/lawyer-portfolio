import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone, ScrollText } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { ATTORNEY, SOCIAL_LINKS } from "@/lib/constants";

export default function ContactInfo() {
  const t = useTranslations("contact.info");

  const items = [
    {
      icon: ScrollText,
      label: t("barNumber"),
      value: ATTORNEY.barNumber,
      href: undefined,
      external: false,
    },
    {
      icon: MapPin,
      label: t("address"),
      value: ATTORNEY.address,
      href: ATTORNEY.googleMapsUrl,
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
      icon: Mail,
      label: t("email"),
      value: SOCIAL_LINKS.email,
      href: `mailto:${SOCIAL_LINKS.email}`,
      external: false,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          const content = (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-burgundy/30 text-burgundy">
                <Icon size={22} />
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">
                  {item.label}
                </p>

                <p className="mt-1 text-neutral-800">
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
              rel={item.external ? "noopener noreferrer" : undefined}
              className="transition-opacity hover:opacity-70"
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

      <div className="mt-10 flex justify-center">
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon size={18} />
          {t("whatsapp")}
        </a>
      </div>
    </div>
  );
}