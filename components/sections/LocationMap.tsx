import { useTranslations } from "next-intl";
import { ATTORNEY } from "@/lib/constants";

export default function LocationMap() {
  const t = useTranslations("contact.info");

  return (
    <div className="h-[750px] w-full overflow-hidden rounded-lg border border-neutral-200 shadow-sm">
      <iframe
        title={t("mapTitle")}
        src={ATTORNEY.googleMapsEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}