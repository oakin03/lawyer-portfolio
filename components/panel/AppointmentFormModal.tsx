"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { generateTimeSlots } from "@/lib/timeSlots";

export default function AppointmentFormModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const timeSlots = generateTimeSlots();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.from("appointments").insert({
      full_name: fullName,
      phone,
      appointment_date: date,
      appointment_time: time,
      subject,
    });

    setSaving(false);

    if (error) {
      setError(
        error.code === "23505"
          ? "Bu tarih ve saat için zaten bir randevu var, lütfen başka bir saat seçin."
          : "Kaydetme başarısız oldu: " + error.message
      );
      return;
    }

    setIsOpen(false);
    setFullName("");
    setPhone("");
    setDate("");
    setTime("");
    setSubject("");
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-md bg-burgundy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
      >
        <Plus size={16} />
        Yeni Randevu Ekle
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-neutral-900">Yeni Randevu</h2>
              <button type="button" onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <X size={20} />
              </button>
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-700">Ad Soyad</label>
                <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy" />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700">Telefon</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy" />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700">Tarih</label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy" />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700">Saat</label>
                <select required value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy">
                  <option value="" disabled>Saat Seçin</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700">Konu</label>
                <textarea required rows={3} value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full resize-none rounded-md border border-neutral-300 px-4 py-2.5 outline-none focus:border-burgundy" />
              </div>

              <button type="submit" disabled={saving} className="w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white hover:bg-burgundy-dark disabled:opacity-60">
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}