import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { ATTORNEY, FOOTER_LINKS_PERSONAL, FOOTER_LINKS_CONTENT, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:flex-row sm:flex-wrap sm:justify-between">

        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-burgundy-light/40">
              <Image src={ATTORNEY.photo} alt="Attorney portrait" fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{ATTORNEY.name}</h2>
              <p className="text-sm text-neutral-400">{ATTORNEY.title}</p>
            </div>
          </div>

          <p className="mt-4 text-neutral-300">
            Hukuki süreçlerinizde güvenilir, şeffaf ve kişiye özel bir çözüm ortağı.
          </p>

          <div className="mt-4 flex items-start gap-2 text-sm text-neutral-400">
            <MapPin size={16} className="mt-0.5 flex-shrink-0" />
            <span>{ATTORNEY.address}</span>
          </div>

          <Link
            href="/iletisim"
            className="mt-6 inline-block rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
          >
            Randevu Al
          </Link>
        </div>

        {/* Kurumsal */}
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">Kurumsal</h3>
          <ul className="mt-4 space-y-3">
            {FOOTER_LINKS_PERSONAL.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative inline-block text-neutral-300 transition-all duration-500 ease-out [-webkit-text-stroke-width:0px] hover:-translate-y-0.5 hover:text-burgundy-light hover:[-webkit-text-stroke-width:0.6px]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-burgundy-light transition-all duration-500 ease-out group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hizmetlerimiz */}
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">Hizmetlerimiz</h3>
          <ul className="mt-4 space-y-3">
            {FOOTER_LINKS_CONTENT.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative inline-block text-neutral-300 transition-all duration-500 ease-out [-webkit-text-stroke-width:0px] hover:-translate-y-0.5 hover:text-burgundy-light hover:[-webkit-text-stroke-width:0.6px]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-burgundy-light transition-all duration-500 ease-out group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Takip Et */}
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">Takip Et</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-700 bg-neutral-900"
            >
              <span className="absolute inset-0 top-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] transition-[top] duration-500 group-hover:top-0" />
              <InstagramIcon
                size={24}
                className="relative z-10 text-neutral-300 transition-all duration-500 group-hover:text-white group-hover:[transform:rotateY(360deg)]"
              />
            </a>

            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              aria-label="Send email"
              className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-700 bg-neutral-900"
            >
              <span className="absolute inset-0 top-full bg-[#EA4335] transition-[top] duration-500 group-hover:top-0" />
              <Mail
                size={24}
                className="relative z-10 text-neutral-300 transition-all duration-500 group-hover:text-white group-hover:[transform:rotateY(360deg)]"
              />
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-700 bg-neutral-900"
            >
              <span className="absolute inset-0 top-full bg-[#0A66C2] transition-[top] duration-500 group-hover:top-0" />
              <LinkedinIcon
                size={24}
                className="relative z-10 text-neutral-300 transition-all duration-500 group-hover:text-white group-hover:[transform:rotateY(360deg)]"
              />
            </a>

            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-700 bg-neutral-900"
            >
              <span className="absolute inset-0 top-full bg-[#25D366] transition-[top] duration-500 group-hover:top-0" />
              <WhatsAppIcon
                size={24}
                className="relative z-10 text-neutral-300 transition-all duration-500 group-hover:text-white group-hover:[transform:rotateY(360deg)]"
              />
            </a>
          </div>
        </div>

      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-neutral-800 px-4 pt-6">
        <p className="text-right text-sm italic text-neutral-500">
          {"\u00A9"} {new Date().getFullYear()} {ATTORNEY.name}. Tum haklari saklidir.
        </p>
      </div>
    </footer>
  );
}