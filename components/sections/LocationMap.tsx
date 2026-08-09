import { useTranslations } from "next-intl";
import { ATTORNEY } from "@/lib/constants";

export default function LocationMap() {
  const t = useTranslations("contact.info");
  const query = encodeURIComponent(ATTORNEY.address);

  return (
    <div className="h-[750px] w-full overflow-hidden rounded-lg border border-neutral-200 shadow-sm">
      <iframe
        title={t("mapTitle")}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}