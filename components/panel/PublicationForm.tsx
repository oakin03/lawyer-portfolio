"use client";

import { useState } from "react";
import { CornerUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/slugify";
import { PUBLICATION_CATEGORIES } from "@/lib/constants";
import RichTextEditor from "./RichTextEditor";
import type { Publication } from "@/lib/publications";

export default function PublicationForm({ existing }: { existing?: Publication }) {
  const router = useRouter();
  const [title, setTitle] = useState(existing?.title ?? "");
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? "");
  const [category, setCategory] = useState(existing?.category ?? PUBLICATION_CATEGORIES[0].slug);
  const [content, setContent] = useState(existing?.content ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const payload = {
      title,
      excerpt,
      content,
      category,
      slug: existing ? existing.slug : slugify(title),
      ...(existing && { updated_at: new Date().toISOString() }),
    };

    const { error } = existing
      ? await supabase.from("publications").update(payload).eq("id", existing.id)
      : await supabase.from("publications").insert(payload);

    setSaving(false);

    if (error) {
      setError("Kaydetme başarısız oldu: " + error.message);
      return;
    }
    router.push("/panel");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-cream-light px-4 py-10">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
        <button
            type="button"
            onClick={() => router.push("/panel")}
            className="flex items-center gap-1.5 rounded-md bg-burgundy px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark"
            >
            <CornerUpLeft size={16} />
            Geri
        </button>
        <h1 className="text-xl font-semibold text-neutral-900">
            {existing ? "Makaleyi Düzenle" : "Yeni Makale"}
        </h1>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6">
          <label className="text-sm font-medium text-neutral-700">Başlık</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-neutral-700">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
          >
            {PUBLICATION_CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.slug}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
        <label className="text-sm font-medium text-neutral-700">Kısa Özet</label>
        <textarea
            required
            rows={1}
            value={excerpt}
            onChange={(e) => {
            setExcerpt(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className="mt-1 w-full resize-none overflow-hidden rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
        />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-neutral-700">İçerik</label>
          <div className="mt-1">
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-dark disabled:opacity-60"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </main>
  );
}