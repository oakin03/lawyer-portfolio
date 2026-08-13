"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatPanelDate } from "@/lib/formatDate";
import { Settings, Plus, CheckSquare, Square, Trash2, LogOut, X } from "lucide-react";
import type { Publication } from "@/lib/publications";
import { PUBLICATION_CATEGORIES } from "@/lib/constants";
import { routing } from "@/i18n/routing";
import FilterDropdown from "@/components/ui/FilterDropdown";

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  danger,
  primary,
}: {
  icon: typeof Plus;
  label: string;
  onClick: () => void;
  danger?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        primary
          ? "bg-burgundy text-white hover:bg-burgundy-dark"
          : danger
          ? "text-red-600 hover:bg-neutral-100"
          : "text-neutral-700 hover:bg-neutral-100"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

export default function PanelDashboard({ initialPublications }: { initialPublications: Publication[] }) {
  const router = useRouter();
  const tAreas = useTranslations("practiceAreas");
  const [publications, setPublications] = useState(initialPublications);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const languageNames = useMemo(() => new Intl.DisplayNames(["tr"], { type: "language" }), []);

  const availableYears = useMemo(() => {
    const years = new Set(publications.map((pub) => new Date(pub.date).getFullYear().toString()));
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [publications]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((pub) => {
      if (category && pub.category !== category) return false;
      if (language && pub.language !== language) return false;
      if (year && new Date(pub.date).getFullYear().toString() !== year) return false;
      if (!q) return true;
      const haystack = `${pub.title} ${pub.excerpt} ${pub.content}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category, language, year, publications]);

  const allSelected = filtered.length > 0 && filtered.every((pub) => selected.has(pub.id));

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleSelectAll() {
    setSelected(allSelected ? new Set() : new Set(filtered.map((p) => p.id)));
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    const confirmText =
      selected.size === 1
        ? "Bu makaleyi silmek istediğinizden emin misiniz?"
        : `${selected.size} makaleyi silmek istediğinizden emin misiniz?`;
    if (!window.confirm(confirmText)) return;

    const supabase = createClient();
    const { error } = await supabase.from("publications").delete().in("id", Array.from(selected));

    if (error) {
      alert("Silme işlemi başarısız oldu: " + error.message);
      return;
    }
    setPublications((prev) => prev.filter((p) => !selected.has(p.id)));
    setSelected(new Set());
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/panel/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-cream-light px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-neutral-900">Makaleler</h1>
          <div className="flex gap-2">
            <NextLink
              href="/"
              className="rounded-md bg-burgundy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark"
            >
              Anasayfa
            </NextLink>
            <NextLink
              href="/yayinlar"
              className="rounded-md bg-burgundy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark"
            >
              Yayınlar
            </NextLink>
          </div>
        </div>

        {/* Search + filters — mirrors the public Yayınlar page */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Makalelerde ara..."
            className="w-64 rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-burgundy"
          />

          <FilterDropdown
            label="Kategoriler"
            activeLabel={category ? tAreas(`${category}.title`) : "Tümü"}
            activeValue={category}
            onSelect={setCategory}
            options={[
              { value: null, label: "Tümü" },
              ...PUBLICATION_CATEGORIES.map((cat) => ({ value: cat.slug, label: tAreas(`${cat.slug}.title`) })),
            ]}
          />

          <FilterDropdown
            label="Dil"
            activeLabel={language ? languageNames.of(language) ?? language : "Tümü"}
            activeValue={language}
            onSelect={setLanguage}
            options={[
              { value: null, label: "Tümü" },
              ...routing.locales.map((code) => ({ value: code, label: languageNames.of(code) ?? code })),
            ]}
          />

          <FilterDropdown
            label="Yıl"
            activeLabel={year ?? "Tümü"}
            activeValue={year}
            onSelect={setYear}
            options={[{ value: null, label: "Tümü" }, ...availableYears.map((y) => ({ value: y, label: y }))]}
          />

          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(null);
              setLanguage(null);
              setYear(null);
            }}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-md bg-burgundy px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark"
          >
            <X size={14} />
            Filtreleri Sıfırla
          </button>
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-neutral-200 bg-white px-2 py-1.5">
            <ToolbarButton icon={Plus} label="Yeni Makale" onClick={() => router.push("/panel/new")} primary />
            <div className="mx-1 h-6 w-px bg-neutral-200" />
            <ToolbarButton
              icon={allSelected ? CheckSquare : Square}
              label="Tümünü Seç"
              onClick={toggleSelectAll}
            />
            {selected.size > 0 && (
              <>
                <div className="mx-1 h-6 w-px bg-neutral-200" />
                <ToolbarButton
                  icon={Trash2}
                  label={`Seçilenleri Sil (${selected.size})`}
                  onClick={handleBulkDelete}
                  danger
                />
              </>
            )}
            <div className="ml-auto">
              <ToolbarButton icon={Settings} label="Ayarlar" onClick={() => router.push("/panel/settings")} />
              <ToolbarButton icon={LogOut} label="Çıkış Yap" onClick={handleLogout} />
            </div>
          </div>

          <div className="overflow-x-auto rounded-b-lg border border-t-0 border-neutral-200 bg-white">
            {filtered.length === 0 ? (
              <p className="p-6 text-center text-neutral-500">Eşleşen makale bulunamadı.</p>
            ) : (
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-xs font-medium uppercase tracking-wide text-neutral-500">
                    <th className="w-10 px-4 py-3"></th>
                    <th className="w-20 px-4 py-3">Görsel</th>
                    <th className="px-4 py-3">Makale Başlığı</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Dil</th>
                    <th className="px-4 py-3">Yazar</th>
                    <th className="px-4 py-3">Paylaşım Tarihi</th>
                    <th className="px-4 py-3">Son Düzenleme Tarihi</th>
                    <th className="w-24 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((pub) => {
                    const categoryData = PUBLICATION_CATEGORIES.find((c) => c.slug === pub.category);

                    return (
                      <tr
                        key={pub.id}
                        onClick={() => toggleSelect(pub.id)}
                        className="cursor-pointer border-b border-neutral-100 transition-colors last:border-0 hover:bg-neutral-50"
                      >
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selected.has(pub.id)}
                            onChange={() => toggleSelect(pub.id)}
                            className="h-4 w-4 rounded border-neutral-300"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="relative h-12 w-16 overflow-hidden rounded">
                            <Image
                              src={categoryData?.image ?? "/images/practice-areas/other.jpg"}
                              alt={pub.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-neutral-900">{pub.title}</td>
                        <td className="px-4 py-3 text-neutral-600">{categoryData?.slug ?? pub.category}</td>
                        <td className="px-4 py-3 text-neutral-600">
                          {languageNames.of(pub.language) ?? pub.language}
                        </td>
                        <td className="px-4 py-3 text-neutral-600">
                          {pub.profiles?.display_name ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-500">{formatPanelDate(pub.date)}</td>
                        <td className="px-4 py-3 text-sm text-neutral-500">{formatPanelDate(pub.updated_at)}</td>
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <NextLink
                            href={`/panel/edit/${pub.id}`}
                            className="rounded-md bg-burgundy px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark"
                          >
                            Düzenle
                          </NextLink>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}