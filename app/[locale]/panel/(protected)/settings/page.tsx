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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

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

    const { error } = await supabase.from("profiles").upsert({ id: user.id, display_name: name });

    setSaving(false);

    if (error) {
      setMessage("Kaydetme başarısız oldu: " + error.message);
      return;
    }
    setMessage("Kaydedildi.");
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Yeni şifreler birbiriyle eşleşmiyor.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Yeni şifre en az 6 karakter olmalıdır.");
      return;
    }

    setPasswordSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      setPasswordSaving(false);
      setPasswordError("Kullanıcı bilgisi alınamadı.");
      return;
    }

    // Verify the current password by attempting to re-authenticate with it
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: oldPassword,
    });

    if (verifyError) {
      setPasswordSaving(false);
      setPasswordError("Mevcut şifre hatalı.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    setPasswordSaving(false);

    if (updateError) {
      setPasswordError("Şifre güncellenemedi: " + updateError.message);
      return;
    }

    setPasswordMessage("Şifreniz başarıyla güncellendi.");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <main className="min-h-screen bg-cream-light px-4 py-10">
      <div className="mx-auto flex max-w-md flex-col gap-6">
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

        <form onSubmit={handleSubmit} className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
          {message && <p className="mb-4 text-sm text-neutral-600">{message}</p>}

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

          <button
            type="submit"
            disabled={saving}
            className="mt-6 w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-dark disabled:opacity-60"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>

        <form onSubmit={handlePasswordSubmit} className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Şifre Değiştir</h2>

          {passwordError && <p className="mt-4 text-sm text-red-600">{passwordError}</p>}
          {passwordMessage && <p className="mt-4 text-sm text-green-600">{passwordMessage}</p>}

          <div className="mt-4">
            <label className="text-sm font-medium text-neutral-700">Eski Şifre</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-neutral-700">Yeni Şifre</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-neutral-700">Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
            />
          </div>

          <button
            type="submit"
            disabled={passwordSaving}
            className="mt-6 w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-dark disabled:opacity-60"
          >
            {passwordSaving ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>
        </form>
      </div>
    </main>
  );
}