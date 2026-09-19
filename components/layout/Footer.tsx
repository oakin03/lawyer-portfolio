import Image from "next/image";
import { useTranslations } from "next-intl";
import LegalLinkModal from "@/components/ui/LegalLinkModal";
import { Link } from "@/lib/navigation";
import AddressHoverPreview from "@/components/ui/AddressHoverPreview";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { ATTORNEY, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const corporateLinks = [
    { label: tNav("home"), href: "/" },
    { label: tNav("about"), href: "/hakkimda" },
    { label: tNav("contact"), href: "/iletisim" },
  ];

  const serviceLinks = [
    { label: tNav("practiceAreas"), href: "/uzmanlik-alanlari" },
    { label: tNav("publications"), href: "/yayinlar" },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-cream py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:flex-wrap sm:justify-between">

        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-burgundy/30">
              <Image src={ATTORNEY.photo} alt="Attorney portrait" fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">{ATTORNEY.name}</h2>
              <p className="text-sm text-neutral-500">{tFooter("title")}</p>
            </div>
          </div>

          <p className="mt-4 text-neutral-600">{tFooter("tagline")}</p>

          <div className="mt-4 space-y-2 text-sm text-neutral-500">
            <AddressHoverPreview
              address={ATTORNEY.address}
              href={ATTORNEY.googleMapsUrl}
              imageSrc="/images/office-building.jpg"
            />
            <a
              href={`tel:${ATTORNEY.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm text-neutral-700 transition-colors hover:text-burgundy"
            >
              <Phone size={16} className="flex-shrink-0" />
              <span>{ATTORNEY.phone}</span>
            </a>
          </div>
        </div>

        {/* Sayfalar */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-neutral-400">
            {tFooter("corporate")}
          </h3>
          <ul className="mt-4 space-y-3">
            {[...corporateLinks, ...serviceLinks].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative inline-block text-neutral-700 transition-all duration-500 ease-out [-webkit-text-stroke-width:0px] hover:-translate-y-0.5 hover:text-burgundy hover:[-webkit-text-stroke-width:0.6px]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 start-0 h-px w-0 bg-burgundy transition-all duration-500 ease-out group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Takip Et / Follow */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-neutral-400">
            {tFooter("follow")}
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-300 bg-white"
            >
              <span className="absolute inset-0 top-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] transition-[top] duration-500 group-hover:top-0" />
              <InstagramIcon size={24} className="relative z-10 text-neutral-600 transition-all duration-500 group-hover:text-white group-hover:[transform:rotateY(360deg)]" />
            </a>

            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              aria-label="Send email"
              className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-300 bg-white"
            >
              <span className="absolute inset-0 top-full bg-[#EA4335] transition-[top] duration-500 group-hover:top-0" />
              <Mail size={24} className="relative z-10 text-neutral-600 transition-all duration-500 group-hover:text-white group-hover:[transform:rotateY(360deg)]" />
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-300 bg-white"
            >
              <span className="absolute inset-0 top-full bg-[#0A66C2] transition-[top] duration-500 group-hover:top-0" />
              <LinkedinIcon size={24} className="relative z-10 text-neutral-600 transition-all duration-500 group-hover:text-white group-hover:[transform:rotateY(360deg)]" />
            </a>

            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-300 bg-white"
            >
              <span className="absolute inset-0 top-full bg-[#25D366] transition-[top] duration-500 group-hover:top-0" />
              <WhatsAppIcon size={24} className="relative z-10 text-neutral-600 transition-all duration-500 group-hover:text-white group-hover:[transform:rotateY(360deg)]" />
            </a>
          </div>
        </div>

      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center gap-4 border-t border-neutral-200 px-4 pt-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <LegalLinkModal
            label={tFooter("legal.kvkkLabel")}
            title={tFooter("legal.kvkkTitle")}
            content={tFooter("legal.kvkkContent")}
            closeLabel={tFooter("legal.close")}
          />
          <span className="text-neutral-700">|</span>
          <LegalLinkModal
            label={tFooter("legal.privacyLabel")}
            title={tFooter("legal.privacyTitle")}
            content={tFooter("legal.privacyContent")}
            closeLabel={tFooter("legal.close")}
          />
        </div>

        <p className="text-end text-sm italic text-neutral-700">
          {"\u00A9"} {new Date().getFullYear()} {ATTORNEY.name}. {tFooter("rights")}
        </p>
      </div>
    </footer>
  );
}