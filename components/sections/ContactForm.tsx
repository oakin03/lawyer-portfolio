"use client";

import { useState } from "react";
import { SOCIAL_LINKS } from "@/lib/constants";

function RequiredLabel({ text }: { text: string }) {
  return (
    <label className="text-sm font-medium text-neutral-700">
      {text} <span className="text-red-600">(Gerekli)</span>
    </label>
  );
}

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const mailSubject = encodeURIComponent(`Web sitesi iletişim formu — ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `Ad Soyad: ${firstName} ${lastName}\nE-posta: ${email}\nTelefon: ${phone || "-"}\nŞirket: ${company || "-"}\n\nKonu:\n${subject}`
    );
    window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${mailSubject}&body=${body}`;
  }

  return (
    <div>
      <h2 className="text-xl font-bold uppercase tracking-[0.1em] text-neutral-900">
        İletişim Formu
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <RequiredLabel text="Ad" />
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy"
            />
          </div>
          <div>
            <RequiredLabel text="Soyad" />
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy"
            />
          </div>
        </div>

        <div>
          <RequiredLabel text="E-posta" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-neutral-700">Telefon</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-neutral-700">Şirket</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy"
          />
        </div>

        <div>
          <RequiredLabel text="Konu" />
          <textarea
            required
            rows={5}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 w-full resize-none rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}