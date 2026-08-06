import Image from "next/image";
import Link from "next/link";
import { ATTORNEY } from "@/lib/constants";

export default function ProfileSummary() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:flex-row sm:text-left">
        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-2 border-gold">
          <Image
            src={ATTORNEY.photo}
            alt={`${ATTORNEY.name} portresi`}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-neutral-900">{ATTORNEY.name}</h2>
          <p className="mt-2 text-neutral-600">{ATTORNEY.shortBio}</p>
          <Link
            href="/hakkimda"
            className="mt-4 inline-block text-sm font-medium text-burgundy hover:underline"
          >
            Devamını Oku →
          </Link>
        </div>
      </div>
    </section>
  );
}