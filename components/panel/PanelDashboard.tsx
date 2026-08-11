"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPanelDate } from "@/lib/formatDate";
import { Settings } from "lucide-react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Publication } from "@/lib/publications";
import { PUBLICATION_CATEGORIES } from "@/lib/constants";
import { Plus, CheckSquare, Square, Trash2, LogOut } from "lucide-react";

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
  const [publications, setPublications] = useState(initialPublications);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = publications.length > 0 && selected.size === publications.length;

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
    setSelected(allSelected ? new Set() : new Set(publications.map((p) => p.id)));
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

        <div className="mt-10">
          {/* Toolbar — Outlook-style action bar */}
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

          {/* Table */}
          <div className="overflow-x-auto rounded-b-lg border border-t-0 border-neutral-200 bg-white">
            {publications.length === 0 ? (
              <p className="p-6 text-center text-neutral-500">Henüz hiç makale eklenmemiş.</p>
            ) : (
                <table className="w-full min-w-[820px]">
                <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-xs font-medium uppercase tracking-wide text-neutral-500">
                        <th className="w-10 px-4 py-3"></th>
                        <th className="w-20 px-4 py-3">Görsel</th>
                        <th className="px-4 py-3">Makale Başlığı</th>
                        <th className="px-4 py-3">Kategori</th>
                        <th className="px-4 py-3">Yazar</th>
                        <th className="px-4 py-3">Paylaşım Tarihi</th>
                        <th className="px-4 py-3">Son Düzenleme Tarihi</th>
                        <th className="w-24 px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {publications.map((pub) => {
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
                            {pub.profiles?.display_name ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-500">
                        {formatPanelDate(pub.date)}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-500">
                        {formatPanelDate(pub.updated_at)}
                        </td>
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