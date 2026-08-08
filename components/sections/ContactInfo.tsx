import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone, ScrollText } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { ATTORNEY, SOCIAL_LINKS } from "@/lib/constants";

export default function ContactInfo() {
  const t = useTranslations("contact.info");

  const items = [
    { icon: ScrollText, label: t("barNumber"), value: ATTORNEY.barNumber, href: undefined },
    { icon: MapPin, label: t("address"), value: ATTORNEY.address, href: undefined },
    { icon: Phone, label: t("phone"), value: ATTORNEY.phone, href: `tel:${ATTORNEY.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: t("email"), value: SOCIAL_LINKS.email, href: `mailto:${SOCIAL_LINKS.email}` },
  ];

  return (
    <div className="space-y-6">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-burgundy/30 text-burgundy">
              <Icon size={20} />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">{item.label}</p>
              <p className="mt-1 text-neutral-800">{item.value}</p>
            </div>
          </div>
        );

        return item.href ? (
          <a key={item.label} href={item.href} className="block transition-opacity hover:opacity-70">
            {content}
          </a>
        ) : (
          <div key={item.label}>{content}</div>
        );
      })}

      <a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-fit items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <WhatsAppIcon size={18} />
        {t("whatsapp")}
      </a>
    </div>
  );
}