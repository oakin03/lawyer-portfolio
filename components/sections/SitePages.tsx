import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function SitePages() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
          Sayfalar
        </h2>
        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center justify-between py-5 text-lg font-medium text-neutral-800 transition-colors hover:text-burgundy"
              >
                {link.label}
                <ArrowUpRight
                  size={20}
                  className="text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}