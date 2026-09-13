"use client";

import { Phone } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { ATTORNEY } from "@/lib/constants";
import AddressHoverPreview from "@/components/ui/AddressHoverPreview";

const LANGUAGES = [
  { code: "tr", flag: "https://flagcdn.com/24x18/tr.png", label: "TR" },
  { code: "en", flag: "https://flagcdn.com/24x18/gb.png", label: "EN" },
  { code: "ar", flag: "https://flagcdn.com/24x18/sa.png", label: "AR" },
];

export default function TopBar() {
  const locale = useLocale();
  const pathname = usePathname();

  if (pathname.startsWith("/panel")) {
    return null;
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    ATTORNEY.address
  )}`;

  const telHref = `tel:${ATTORNEY.phone.replace(/\s/g, "")}`;

  return (
    <div className="fixed top-0 z-50 hidden h-9 w-full bg-neutral-100 sm:block">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-end gap-6 px-4 text-xs font-semibold text-neutral-800 sm:px-6 lg:px-8">

        <AddressHoverPreview
          address={ATTORNEY.address}
          displayText={ATTORNEY.shortLocation}
          href={mapsUrl}
          imageSrc="/images/office-building.jpg"
          iconSize={13}
          iconClassName="flex-shrink-0"
          className="flex items-center gap-1.5 transition-colors hover:text-burgundy"
        />

        <a
          href={telHref}
          className="flex items-center gap-1.5 transition-colors hover:text-burgundy"
        >
          <Phone size={13} />
          {ATTORNEY.phone}
        </a>

        <div className="h-4 w-px bg-neutral-300" />

        <div className="flex items-center gap-1">
          {LANGUAGES.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code}
              className={`flex items-center gap-1 rounded px-2 py-1 transition-colors ${
                locale === lang.code
                  ? "bg-burgundy text-white"
                  : "text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              <img
                src={lang.flag}
                alt={lang.label}
                className="h-[12px] w-4 rounded-sm object-cover"
              />

              {lang.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}