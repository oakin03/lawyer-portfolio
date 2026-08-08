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
      <p className="mt-3 leading-relaxed text-neutral-600">{t("text")}</p>
    </ZigzagRow>
  );
}