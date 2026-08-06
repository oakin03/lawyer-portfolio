"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ATTORNEY, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-neutral-900">
          {ATTORNEY.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-burgundy"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/iletisim"
          className="hidden rounded-md bg-burgundy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark md:inline-block"
        >
          Ücretsiz Danışmanlık
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-neutral-700 md:hidden"
          aria-label="Menüyü aç/kapat"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
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
                Ücretsiz Danışmanlık
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}