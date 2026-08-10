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

  const inactiveText = isScrolled ? "text-neutral-500 hover:text-neutral-800" : "text-neutral-300 hover:text-white";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? "border-b border-neutral-200 bg-cream/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={isScrolled ? "/images/logo-black.png" : "/images/logo-white.png"}
            alt="Büşra Nur Karakoç — Avukat & Arabulucu"
            width={48}
            height={48}
            priority
            className="h-11 w-11 transition-opacity duration-300"
          />

          <div
            className={`flex flex-col items-center transition-colors duration-300 ${
              isScrolled ? "text-neutral-900" : "text-white"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-px w-5 bg-current opacity-60" />
              <span className="h-1 w-1 rotate-45 bg-current" />
              <span className="h-px w-5 bg-current opacity-60" />
            </div>

            <span className="font-serif text-base tracking-wide whitespace-nowrap">
              {ATTORNEY.name}
            </span>

            <div className="flex items-center gap-1.5">
              <span className="h-px w-5 bg-current opacity-60" />
              <span className="h-1 w-1 rotate-45 bg-current" />
              <span className="h-px w-5 bg-current opacity-60" />
            </div>
          </div>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group relative inline-block text-base transition-all duration-500 ease-out [-webkit-text-stroke-width:0px] hover:-translate-y-0.5 hover:text-burgundy hover:[-webkit-text-stroke-width:0.6px] ${
                  isScrolled ? "text-neutral-700" : "text-neutral-100"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-burgundy transition-all duration-500 ease-out group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          {/* Language switcher — compact inline, color follows scroll state like nav links */}
          <div className="flex items-center gap-2 text-sm font-bold">
            <Link
              href={pathname}
              locale="tr"
              className={`flex items-center gap-1.5 transition-colors ${
                isScrolled ? "text-neutral-800 hover:text-burgundy" : "text-white hover:text-neutral-200"
              }`}
            >
              <img src="https://flagcdn.com/24x18/tr.png" alt="Türkçe" className="h-[14px] w-5 rounded-sm object-cover" />
              TR
            </Link>
            <span className={isScrolled ? "text-neutral-300" : "text-white/40"}>/</span>
            <Link
              href={pathname}
              locale="en"
              className={`flex items-center gap-1.5 transition-colors ${
                isScrolled ? "text-neutral-800 hover:text-burgundy" : "text-white hover:text-neutral-200"
              }`}
            >
              <img src="https://flagcdn.com/24x18/gb.png" alt="English" className="h-[14px] w-5 rounded-sm object-cover" />
              EN
            </Link>
          </div>

          <Link
            href="/iletisim"
            className="rounded-md bg-burgundy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
          >
            {t("cta")}
          </Link>
        </div>

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
                  onClick={() => setIsOpen(false)}
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
            </li>
            <li>
              <Link
                href="/iletisim"
                onClick={() => setIsOpen(false)}
                className="block rounded-md bg-burgundy px-3 py-2 text-center text-sm font-semibold text-white hover:bg-burgundy-dark"
              >
                {t("cta")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}