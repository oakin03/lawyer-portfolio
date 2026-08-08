import { useTranslations } from "next-intl";
import { ATTORNEY } from "@/lib/constants";

export default function LocationMap() {
  const t = useTranslations("contact.info");
  const query = encodeURIComponent(ATTORNEY.address);

  return (
    <section className="bg-neutral-100 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-[550px] w-full overflow-hidden rounded-lg">
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
      </div>
    </section>
  );
}