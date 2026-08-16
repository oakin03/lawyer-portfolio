"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { generateTimeSlots } from "@/lib/timeSlots";
import AppointmentFormModal from "./AppointmentFormModal";
import AppointmentDetailPopover from "./AppointmentDetailPopover";
import type { Appointment } from "@/lib/appointments";

const DAY_LABELS = ["Pzt", "Sal", "Çrş", "Prş", "Cum", "Cmt", "Paz"];

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AppointmentsCalendar({
  appointments,
  highlightId,
}: {
  appointments: Appointment[];
  highlightId?: string;
}) {
  const router = useRouter();
  const [weekStart, setWeekStart] = useState(() => {
    if (highlightId) {
      const target = appointments.find((a) => a.id === highlightId);
      if (target) return getMonday(new Date(target.appointment_date));
    }
    return getMonday(new Date());
  });
  const timeSlots = generateTimeSlots();

  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        return d;
      }),
    [weekStart]
  );

  const rangeLabel = `${weekDays[0].toLocaleDateString("tr-TR", { day: "2-digit", month: "long" })} – ${weekDays[6].toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })}`;

  function shiftWeek(direction: 1 | -1) {
    setWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + direction * 7);
      return next;
    });
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Bu randevuyu silmek istediğinizden emin misiniz?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) {
      alert("Silme başarısız oldu: " + error.message);
      return;
    }
    router.refresh();
  }

  function findAppointment(dayISO: string, time: string) {
    return appointments.find((a) => a.appointment_date === dayISO && a.appointment_time === time);
  }

  const today = toISODate(new Date());

  return (
    <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 p-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => shiftWeek(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 hover:bg-neutral-100"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-neutral-900">{rangeLabel}</span>
          <button
            type="button"
            onClick={() => shiftWeek(1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 hover:bg-neutral-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <AppointmentFormModal />
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[900px] grid-cols-[70px_repeat(7,1fr)]">
          <div className="border-b border-neutral-200 bg-neutral-50" />
          {weekDays.map((day, i) => {
            const isToday = toISODate(day) === today;
            return (
              <div
                key={i}
                className={`border-b border-l border-neutral-200 p-2 text-center ${isToday ? "bg-burgundy/5" : "bg-neutral-50"}`}
              >
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">{DAY_LABELS[i]}</p>
                <p className={`text-sm font-semibold ${isToday ? "text-burgundy" : "text-neutral-900"}`}>
                  {day.getDate()}
                </p>
              </div>
            );
          })}

          {timeSlots.map((slot) => (
            <div key={slot} className="contents">
              <div className="border-b border-neutral-100 px-2 py-3 text-right text-xs text-neutral-400">{slot}</div>
              {weekDays.map((day, i) => {
                const dayISO = toISODate(day);
                const appt = findAppointment(dayISO, slot);
                const isHighlighted = appt && appt.id === highlightId;
                return (
                  <div key={i} className="group relative min-h-[52px] border-b border-l border-neutral-100 p-1">
                    {appt && (
                      <>
                        <div
                          className={`rounded-md border p-1.5 text-xs ${
                            isHighlighted
                              ? "border-[#D4AF37] bg-[#D4AF37]/25"
                              : "border-burgundy/30 bg-burgundy/10"
                          }`}
                        >
                          <p className={`truncate font-semibold ${isHighlighted ? "text-[#8a6d1f]" : "text-burgundy"}`}>
                            {appt.full_name}
                          </p>
                          <p className="truncate text-neutral-600">{appt.phone}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDelete(appt.id)}
                          className="absolute right-1 top-1 hidden rounded bg-white p-1 text-red-500 shadow group-hover:block"
                          aria-label="Sil"
                        >
                          <Trash2 size={12} />
                        </button>
                        <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                          <AppointmentDetailPopover appointment={appt} />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}