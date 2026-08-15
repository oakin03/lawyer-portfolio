import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import { PRACTICE_AREAS } from "@/lib/constants";
import SectionDivider from "@/components/ui/SectionDivider";

function normalizeLineBreaks(text: string): string {
  return text.replace(/\n{2,}/g, "\n");
}

export default function PracticeAreaDetails() {
  const tAreas = useTranslations("practiceAreas");

  return (
    <div>
      {PRACTICE_AREAS.map((area, index) => (
        <div key={area.slug}>
          <div id={area.slug} className="scroll-mt-24 flex flex-col gap-4 py-10 md:flex-row md:gap-16">
            <h2 className="text-2xl font-semibold text-neutral-900 md:w-64 md:flex-shrink-0">
              {tAreas(`${area.slug}.title`)}
            </h2>
            <div className="prose max-w-3xl flex-1 whitespace-pre-line text-neutral-600">
              <ReactMarkdown>{normalizeLineBreaks(tAreas(`${area.slug}.description`))}</ReactMarkdown>
            </div>
          </div>
          {index < PRACTICE_AREAS.length - 1 && <SectionDivider />}
        </div>
      ))}
    </div>
  );
}