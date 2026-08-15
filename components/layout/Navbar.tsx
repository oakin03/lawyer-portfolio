"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { ATTORNEY } from "@/lib/constants";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/hakkimda" },
    { label: t("practiceAreas"), href: "/uzmanlik-alanlari" },
    { label: t("publications"), href: "/yayinlar" },
    { label: t("contact"), href: "/iletisim" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 sm:top-9 ${
        isScrolled ? "border-b border-neutral-200 bg-cream/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          isScrolled ? "h-16" : "h-16 sm:h-24"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >

          <div
            className={`flex flex-col items-center transition-colors duration-300 ${
              isScrolled ? "text-neutral-900" : "text-white"
            }`}
          >
            <span
              className={`font-serif tracking-wide whitespace-nowrap transition-all duration-300 ${
                isScrolled ? "text-base" : "text-base sm:text-lg"
              }`}
            >
              {ATTORNEY.name}
            </span>
          </div>

          <div
            className={`transition-colors duration-300 ${isScrolled ? "bg-neutral-300" : "bg-white/40"} ${
              isScrolled ? "h-8" : "h-8 sm:h-10"
            } w-px`}
          />

          <div
            className={`flex flex-col font-medium leading-tight transition-all duration-300 ${
              isScrolled ? "text-neutral-700" : "text-neutral-100"
            } ${isScrolled ? "text-xs" : "text-xs sm:text-sm"}`}
          >
            <span>{t("titleLine1")}</span>
            <span>{t("titleLine2")}</span>
          </div>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={
                  link.href === "/"
                    ? () => window.scrollTo({ top: 0, behavior: "smooth" })
                    : undefined
                }
                className={`group relative inline-block transition-all duration-300 ease-out [-webkit-text-stroke-width:0px] hover:-translate-y-0.5 hover:text-burgundy hover:[-webkit-text-stroke-width:0.6px] ${
                  isScrolled ? "text-neutral-700" : "text-neutral-100"
                } ${isScrolled ? "text-base" : "text-base sm:text-lg"}`}
              >
                {link.label}
                <span className="absolute -bottom-1 start-0 h-px w-0 bg-burgundy transition-all duration-500 ease-out group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={`tel:${ATTORNEY.phone.replace(/\s/g, "")}`}
          className={`hidden rounded-md bg-burgundy font-semibold text-white transition-all duration-300 hover:bg-burgundy-dark md:inline-block ${
            isScrolled ? "px-5 py-2 text-sm" : "px-5 py-2 text-sm sm:px-6 sm:py-3 sm:text-base"
          }`}
        >
          {t("cta")}
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`md:hidden ${isScrolled ? "text-neutral-900" : "text-white"}`}
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-cream md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setIsOpen(false);
                    if (link.href === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-burgundy"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="flex items-center gap-5 px-3 pt-2">
              <Link
                href={pathname}
                locale="tr"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-base font-bold text-neutral-900"
              >
                <img src="https://flagcdn.com/24x18/tr.png" alt="Türkçe" className="h-[18px] w-6 rounded-sm object-cover" />
                TR
              </Link>
              <Link
                href={pathname}
                locale="en"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-base font-bold text-neutral-900"
              >
                <img src="https://flagcdn.com/24x18/gb.png" alt="English" className="h-[18px] w-6 rounded-sm object-cover" />
                EN
              </Link>
              <Link
                href={pathname}
                locale="ar"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-base font-bold text-neutral-900"
              >
                <img src="https://flagcdn.com/24x18/sa.png" alt="العربية" className="h-[18px] w-6 rounded-sm object-cover" />
                AR
              </Link>
            </li>
            <li>
              <a
                href={`tel:${ATTORNEY.phone.replace(/\s/g, "")}`}
                onClick={() => setIsOpen(false)}
                className="block rounded-md bg-burgundy px-3 py-2 text-center text-sm font-semibold text-white hover:bg-burgundy-dark"
              >
                {t("cta")}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}