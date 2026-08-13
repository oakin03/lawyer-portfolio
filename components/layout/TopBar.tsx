"use client";

import { MapPin, Phone } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { ATTORNEY } from "@/lib/constants";

const LANGUAGES = [
  { code: "tr", flag: "https://flagcdn.com/24x18/tr.png", label: "TR" },
  { code: "en", flag: "https://flagcdn.com/24x18/gb.png", label: "EN" },
  { code: "ar", flag: "https://flagcdn.com/24x18/sa.png", label: "AR" },
];

export default function TopBar() {
  const locale = useLocale();
  const pathname = usePathname();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ATTORNEY.address)}`;
  const telHref = `tel:${ATTORNEY.phone.replace(/\s/g, "")}`;

  return (
    <div className="fixed top-0 z-50 hidden h-9 w-full bg-neutral-100 sm:block">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-end gap-6 px-4 text-xs text-neutral-600 sm:px-6 lg:px-8">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-burgundy">
          <MapPin size={13} />
          {ATTORNEY.shortLocation}
        </a>
        <a href={telHref} className="flex items-center gap-1.5 transition-colors hover:text-burgundy">
          <Phone size={13} />
          {ATTORNEY.phone}
        </a>

        <div className="h-4 w-px bg-neutral-300" />

        <div className="flex items-center gap-3">
          {LANGUAGES.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code}
              className={`flex items-center gap-1 transition-opacity ${
                locale === lang.code ? "opacity-100" : "opacity-50 hover:opacity-100"
              }`}
            >
              <img src={lang.flag} alt={lang.label} className="h-[12px] w-4 rounded-sm object-cover" />
              {lang.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}