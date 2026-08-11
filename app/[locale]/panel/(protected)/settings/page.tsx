"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerUpLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle();
      if (data?.display_name) setName(data.display_name);
    }
    loadProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: name });

    setSaving(false);

    if (error) {
      setMessage("Kaydetme başarısız oldu: " + error.message);
      return;
    }
    setMessage("Kaydedildi.");
  }

  return (
    <main className="min-h-screen bg-cream-light px-4 py-10">
      <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/panel")}
            className="flex items-center gap-1.5 rounded-md bg-burgundy px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark"
          >
            <CornerUpLeft size={16} />
            Geri
          </button>
          <h1 className="text-xl font-semibold text-neutral-900">Profil Ayarları</h1>
        </div>

        {message && <p className="mt-4 text-sm text-neutral-600">{message}</p>}

        <div className="mt-6">
          <label className="text-sm font-medium text-neutral-700">Görünen Ad (Yazar Adı)</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Örn. Büşra Nur Karakoç"
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
          />
          <p className="mt-2 text-xs text-neutral-500">
            Bu isim, yayınladığınız makalelerin altında &ldquo;Yazar: [isim]&rdquo; olarak görünecek.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-dark disabled:opacity-60"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </main>
  );
}