"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Appointment } from "@/lib/appointments";

const SEEN_KEY = "panelSeenAppointmentIds";

function getSeenIds(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(SEEN_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function markSeen(id: string) {
  const seen = getSeenIds();
  if (!seen.includes(id)) {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify([...seen, id]));
  }
}

export default function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [unseen, setUnseen] = useState<Appointment[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUnseen() {
      const supabase = createClient();
      const { data } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });
      if (!data) return;
      const seenIds = getSeenIds();
      setUnseen(data.filter((a) => !seenIds.includes(a.id)));
    }
    loadUnseen();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNotificationClick(appt: Appointment) {
    markSeen(appt.id);
    setUnseen((prev) => prev.filter((a) => a.id !== appt.id));
    setOpen(false);
    router.push(`/panel/appointments?highlight=${appt.id}`);
  }

  function handleDismiss(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    markSeen(id);
    setUnseen((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-10 w-10 items-center justify-center rounded-md bg-burgundy text-white transition-colors hover:bg-burgundy-dark"
        aria-label="Bildirimler"
      >
        <Bell size={18} />
        {unseen.length > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {unseen.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute end-0 top-full z-30 mt-2 w-80 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl">
          <div className="border-b border-neutral-200 px-4 py-3">
            <p className="text-sm font-semibold text-neutral-900">Bildirimler</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {unseen.length === 0 ? (
              <p className="p-4 text-center text-sm text-neutral-500">Yeni bildirim yok.</p>
            ) : (
              unseen.map((appt) => (
                <div
                  key={appt.id}
                  onClick={() => handleNotificationClick(appt)}
                  className="flex cursor-pointer items-start justify-between gap-2 border-b border-neutral-100 px-4 py-3 text-left transition-colors last:border-0 hover:bg-neutral-50"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{appt.full_name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {new Date(appt.appointment_date).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}{" "}
                      · {appt.appointment_time}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleDismiss(appt.id, e)}
                    className="flex-shrink-0 rounded p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700"
                    aria-label="Bildirimi kaldır"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}