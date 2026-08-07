import Image from "next/image";
import Link from "next/link";
import { ATTORNEY } from "@/lib/constants";

export default function AboutPreview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:flex-row sm:text-left">
        <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-full border-2 border-burgundy/30 sm:h-48 sm:w-48">
          <Image
            src={ATTORNEY.photo}
            alt={`${ATTORNEY.name} portresi`}
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-neutral-900">{ATTORNEY.name}</h2>
          <p className="mt-3 leading-relaxed text-neutral-600">{ATTORNEY.aboutPreview}</p>
          <Link
            href="/hakkimda"
            className="mt-4 inline-block text-sm font-medium text-burgundy hover:underline"
          >
            Devamını Gör →
          </Link>
        </div>
      </div>
    </section>
  );
}