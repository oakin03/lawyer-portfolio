import { useTranslations } from "next-intl";

type ListItem = { title: string; text?: string };

function InfoColumn({ heading, items }: { heading: string; items: ListItem[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-neutral-900">{heading}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((item, index) => (
          <li key={item.title} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-burgundy text-xs font-semibold text-white">
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-neutral-900">{item.title}</p>
              {item.text && <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">{item.text}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FirmOverview() {
  const t = useTranslations("home.overview");

  const rawServices = t.raw("services");
  const rawWhy = t.raw("why");
  const rawProcess = t.raw("process");

  const services = Array.isArray(rawServices) ? (rawServices as ListItem[]) : [];
  const why = Array.isArray(rawWhy) ? (rawWhy as ListItem[]) : [];
  const process = Array.isArray(rawProcess) ? (rawProcess as ListItem[]) : [];

  return (
    <section className="bg-cream-light py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="font-serif text-3xl text-neutral-900 sm:text-4xl">{t("title")}</h2>
        <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-neutral-600">{t("intro")}</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-10 px-4 text-left sm:grid-cols-3">
        <InfoColumn heading={t("servicesTitle")} items={services} />
        <InfoColumn heading={t("whyTitle")} items={why} />
        <InfoColumn heading={t("processTitle")} items={process} />
      </div>
    </section>
  );
}