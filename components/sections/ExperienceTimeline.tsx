import { EXPERIENCE_TIMELINE } from "@/lib/constants";

export default function ExperienceTimeline() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-neutral-900">Eğitim ve Deneyim</h2>

      <div className="relative mt-10 border-l-2 border-neutral-200 pl-8 text-left sm:pl-10">
        <ul className="space-y-10">
          {EXPERIENCE_TIMELINE.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[38px] top-1 h-3.5 w-3.5 rounded-full border-2 border-burgundy bg-cream-light sm:-left-[46px] sm:h-4 sm:w-4" />
              <p className="text-sm font-semibold uppercase tracking-wide text-burgundy">{item.year}</p>
              <h3 className="mt-1 text-lg font-medium text-neutral-900">{item.title}</h3>
              <p className="mt-1 leading-relaxed text-neutral-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}