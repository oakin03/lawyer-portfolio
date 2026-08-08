import ZigzagRow from "./ZigzagRow";

type AboutSectionProps = {
  title: string;
  text?: string;
  bullets?: string[];
  image: string;
  imagePosition: "left" | "right";
};

export default function AboutSection({ title, text, bullets, image, imagePosition }: AboutSectionProps) {
  return (
    <ZigzagRow image={image} imageAlt={title} imagePosition={imagePosition}>
      <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>

      {text && <p className="mt-3 leading-relaxed text-neutral-600">{text}</p>}

      {bullets && (
        <ul className="mt-4 space-y-2 text-left">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-2 text-neutral-600">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-burgundy" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </ZigzagRow>
  );
}