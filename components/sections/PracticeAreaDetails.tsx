import { useTranslations } from "next-intl";
import { PRACTICE_AREAS } from "@/lib/constants";

export default function PracticeAreaDetails() {
  const tAreas = useTranslations("practiceAreas");

  return (
    <div className="divide-y divide-neutral-200">
      {PRACTICE_AREAS.map((area) => (
        <div key={area.slug} id={area.slug} className="scroll-mt-24 py-10">
          <h2 className="text-2xl font-semibold text-neutral-900">{tAreas(`${area.slug}.title`)}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-neutral-600">
            {tAreas(`${area.slug}.description`)}
          </p>
        </div>
      ))}
    </div>
  );
}