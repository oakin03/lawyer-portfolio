import { useTranslations } from "next-intl";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export default function ExperienceTimeline() {
  const t = useTranslations("about.timeline");
  const rawItems = t.raw("items");
  const items: TimelineItem[] = Array.isArray(rawItems) ? rawItems : [];

  return (
    <div>
      <div className="mb-20 flex items-center gap-4">
        <span className="h-px w-12 flex-shrink-0 bg-burgundy" />

        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {t("heading")}
        </h2>
      </div>

      <div className="relative border-s-2 border-neutral-200 ps-8 text-start sm:ps-10">
        <ul className="space-y-10">
          {items.map((item, index) => (
            <li
              key={`${item.year}-${index}`}
              style={{ animationDelay: `${index * 100}ms` }}
              className="relative animate-[fade-in-up_0.5s_ease-out_both]"
            >
              <span className="absolute -start-[38px] top-1 h-3.5 w-3.5 rounded-full border-2 border-burgundy bg-cream-light sm:-start-[46px] sm:h-4 sm:w-4" />

              <p className="text-sm font-semibold uppercase tracking-wide text-burgundy">
                {item.year}
              </p>

              <h3 className="mt-1 text-lg font-medium text-neutral-900">
                {item.title}
              </h3>

              <p className="mt-1 leading-relaxed text-neutral-600">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}