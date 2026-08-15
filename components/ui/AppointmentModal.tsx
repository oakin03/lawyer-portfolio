"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X, CalendarPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { generateTimeSlots, getTomorrowISODate } from "@/lib/timeSlots";

function RequiredLabel({ text, requiredLabel }: { text: string; requiredLabel: string }) {
  return (
    <label className="text-sm font-medium text-neutral-700">
      {text} <span className="text-xs italic text-red-600">({requiredLabel})</span>
    </label>
  );
}

export default function AppointmentModal({ className }: { className?: string } = {}) {
  const t = useTranslations("appointment");
  const tInfo = useTranslations("contact.info");
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "conflict">("idle");

  const timeSlots = generateTimeSlots();
  const minDate = getTomorrowISODate();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const supabase = createClient();
    const { error } = await supabase.from("appointments").insert({
      full_name: fullName,
      phone,
      appointment_date: date,
      appointment_time: time,
      subject,
    });

    setSubmitting(false);

    if (error) {
      setStatus(error.code === "23505" ? "conflict" : "error");
      return;
    }

    setStatus("success");
    setFullName("");
    setPhone("");
    setDate("");
    setTime("");
    setSubject("");
  }

  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900">{t("title")}</h2>
          <button type="button" onClick={() => setIsOpen(false)} aria-label={t("close")} className="text-neutral-400 hover:text-neutral-700">
            <X size={20} />
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-6">
            <p className="text-sm text-green-600">{t("successMessage")}</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
            >
              {t("close")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {status === "error" && <p className="text-sm text-red-600">{t("errorMessage")}</p>}

            <div>
              <RequiredLabel text={t("fullName")} requiredLabel={t("required")} />
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy" />
            </div>

            <div>
              <RequiredLabel text={t("phone")} requiredLabel={t("required")} />
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy" />
            </div>

            <div>
              <RequiredLabel text={t("date")} requiredLabel={t("required")} />
              <input type="date" required min={minDate} value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy" />
            </div>

            <div>
              <RequiredLabel text={t("time")} requiredLabel={t("required")} />
              <select required value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy">
                <option value="" disabled>{t("selectTime")}</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div>
              <RequiredLabel text={t("subject")} requiredLabel={t("required")} />
              <textarea required rows={4} value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full resize-none rounded-md border border-neutral-300 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-burgundy" />
            </div>

            <button type="submit" disabled={submitting} className="w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark disabled:opacity-60">
              {submitting ? "..." : t("submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ??
          "inline-flex items-center gap-2 rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
        }
      >
        <CalendarPlus size={18} />
        {tInfo("appointmentCta")}
      </button>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}