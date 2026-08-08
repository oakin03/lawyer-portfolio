"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Scale } from "lucide-react";
import { ATTORNEY, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? "border-b border-neutral-200 bg-cream/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors duration-300 ${
            isScrolled ? "text-neutral-900" : "text-white"
          }`}
        >
          <Scale size={22} className="text-burgundy" />
          {ATTORNEY.office}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group relative inline-block text-sm transition-all duration-500 ease-out [-webkit-text-stroke-width:0px] hover:-translate-y-0.5 hover:text-burgundy hover:[-webkit-text-stroke-width:0.6px] ${
                  isScrolled ? "text-neutral-700" : "text-neutral-100"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-burgundy transition-all duration-500 ease-out group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/iletisim"
          className="hidden rounded-md bg-burgundy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark md:inline-block"
        >
          Randevu Al
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`md:hidden ${isScrolled ? "text-neutral-900" : "text-white"}`}
          aria-label="Menüyü aç/kapat"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-cream md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
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
            <li className="pt-2">
              <Link
                href="/iletisim"
                onClick={() => setIsOpen(false)}
                className="block rounded-md bg-burgundy px-3 py-2 text-center text-sm font-semibold text-white hover:bg-burgundy-dark"
              >
                Randevu Al
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}