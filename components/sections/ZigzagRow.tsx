import Image from "next/image";
import { type ReactNode } from "react";

type ZigzagRowProps = {
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  children: ReactNode;
};

export default function ZigzagRow({ image, imageAlt, imagePosition, children }: ZigzagRowProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-10 ${
        isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="relative h-72 w-full max-w-sm flex-shrink-0 overflow-hidden rounded-lg border-2 border-burgundy/30 shadow-md sm:h-80 md:w-64">
        <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 256px" />
      </div>

      <div className="w-full max-w-xl text-center md:text-left">{children}</div>
    </div>
  );
}