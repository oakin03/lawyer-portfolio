import { useTranslations } from "next-intl";
import ZigzagRow from "./ZigzagRow";

type AboutSectionProps = {
  translationKey: string;
  image: string;
  imagePosition: "left" | "right";
};

export default function AboutSection({ translationKey, image, imagePosition }: AboutSectionProps) {
  const t = useTranslations(`about.sections.${translationKey}`);

  return (
    <ZigzagRow image={image} imageAlt={t("title")} imagePosition={imagePosition}>
      <h2 className="text-2xl font-semibold text-neutral-900">{t("title")}</h2>
      <div className="mt-3 space-y-4 leading-relaxed text-neutral-600">
        {t.rich("text", {
          b: (chunks) => <strong className="font-semibold text-neutral-900">{chunks}</strong>,
          p: (chunks) => <p>{chunks}</p>,
        })}
      </div>
    </ZigzagRow>
  );
}