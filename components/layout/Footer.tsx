import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { ATTORNEY, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-burgundy/30">
              <Image src={ATTORNEY.photo} alt="Attorney portrait" fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">{ATTORNEY.name}</h2>
              <p className="text-sm text-neutral-500">{ATTORNEY.title}</p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 text-sm text-neutral-500">
            <MapPin size={16} className="mt-0.5 flex-shrink-0" />
            <span>{ATTORNEY.address}</span>
          </div>

          <Link href="/iletisim" className="mt-6 inline-block rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark">
            Randevu Al
          </Link>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-400">Sayfalar</h3>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-neutral-700 transition-colors hover:text-burgundy">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-400">Takip Et</h3>
          <div className="mt-4 flex gap-4">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-neutral-700 transition-colors hover:text-burgundy">
              <InstagramIcon size={22} />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-neutral-700 transition-colors hover:text-burgundy">
              <LinkedinIcon size={22} />
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} aria-label="Send email" className="text-neutral-700 transition-colors hover:text-burgundy">
              <Mail size={22} />
            </a>
          </div>
        </div>

      </div>

        <div className="mx-auto mt-12 max-w-6xl border-t border-neutral-200 px-4 pt-6">
            <p className="text-right text-sm italic text-neutral-400">
                {"\u00A9"} {new Date().getFullYear()} {ATTORNEY.name}. Tüm hakları saklıdır.
            </p>
        </div>
    </footer>
  );
}