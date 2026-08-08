import Image from "next/image";
import { PRACTICE_AREAS } from "@/lib/constants";

export default function PracticeAreas() {
  return (
    <section className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-2xl font-bold uppercase tracking-[0.15em] text-neutral-900 sm:text-3xl">
          Faaliyet Alanlarımız
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {PRACTICE_AREAS.map((area) => (
            <div
              key={area.title}
              className="group relative aspect-square w-full overflow-hidden rounded-lg"
            >
              <Image
                src={area.image}
                alt={area.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 border-t border-white/30 bg-white/20 py-3 text-center backdrop-blur-md">
                <p className="text-sm font-semibold text-white sm:text-base">{area.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}