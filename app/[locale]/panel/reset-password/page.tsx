"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Supabase's password-reset link signs the user into a temporary recovery
    // session automatically when they land on this page — we just wait for
    // that session to be picked up before showing the form.
    const supabase = createClient();
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Şifreler birbiriyle eşleşmiyor.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);

    if (error) {
      setError("Şifre güncellenemedi: " + error.message);
      return;
    }

    window.sessionStorage.setItem("panelActiveSession", "1");
    setMessage("Şifreniz güncellendi. Panele yönlendiriliyorsunuz...");
    setTimeout(() => {
    router.push("./");
    router.refresh();
    }, 2000);
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream-light px-4">
        <p className="text-sm text-neutral-500">Bağlantı doğrulanıyor...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-light px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-neutral-900">Yeni Şifre Belirle</h1>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}

        <div className="mt-6">
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
          disabled={saving}
          className="mt-6 w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-dark disabled:opacity-60"
        >
          {saving ? "Kaydediliyor..." : "Şifreyi Güncelle"}
        </button>
      </form>
    </main>
  );
}