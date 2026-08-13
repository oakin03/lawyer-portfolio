"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSending, setResetSending] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-posta veya şifre hatalı.");
      return;
    }
    window.sessionStorage.setItem("panelActiveSession", "1");
    router.push("./");
    router.refresh();
  }

  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResetError("");
    setResetMessage("");
    setResetSending(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/panel/reset-password`,
    });

    setResetSending(false);

    if (error) {
      setResetError("Bir hata oluştu: " + error.message);
      return;
    }
    setResetMessage("E-posta adresiniz kayıtlıysa, şifre sıfırlama bağlantısı gönderildi.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-light px-4">
      {!resetMode ? (
        <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-neutral-900">Panel Girişi</h1>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-6">
            <label className="text-sm font-medium text-neutral-700">E-posta</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-neutral-700">Şifre</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-dark"
          >
            Giriş Yap
          </button>

          <button
            type="button"
            onClick={() => {
              setResetMode(true);
              setResetEmail(email);
            }}
            className="mt-4 w-full text-center text-sm text-neutral-500 hover:text-burgundy"
          >
            Şifrenizi mi unuttunuz?
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit} className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-neutral-900">Şifre Sıfırlama</h1>
          <p className="mt-2 text-sm text-neutral-500">
            E-posta adresinizi girin, şifre sıfırlama bağlantısını gönderelim.
          </p>

          {resetError && <p className="mt-4 text-sm text-red-600">{resetError}</p>}
          {resetMessage && <p className="mt-4 text-sm text-green-600">{resetMessage}</p>}

          <div className="mt-4">
            <label className="text-sm font-medium text-neutral-700">E-posta</label>
            <input
              type="email"
              required
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy"
            />
          </div>

          <button
            type="submit"
            disabled={resetSending}
            className="mt-6 w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-dark disabled:opacity-60"
          >
            {resetSending ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
          </button>

          <button
            type="button"
            onClick={() => setResetMode(false)}
            className="mt-4 w-full text-center text-sm text-neutral-500 hover:text-burgundy"
          >
            Girişe Dön
          </button>
        </form>
      )}
    </main>
  );
}