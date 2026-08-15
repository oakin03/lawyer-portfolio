import type { Appointment } from "@/lib/appointments";

export default function AppointmentDetailPopover({ appointment }: { appointment: Appointment }) {
  return (
    <div className="absolute left-1/2 top-full z-30 mt-1 w-64 -translate-x-1/2 rounded-lg border border-neutral-200 bg-white p-4 text-left shadow-xl">
      <p className="font-semibold text-neutral-900">{appointment.full_name}</p>
      <p className="mt-1 text-sm text-neutral-600">{appointment.phone}</p>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-neutral-400">
        {appointment.appointment_date} · {appointment.appointment_time}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{appointment.subject}</p>
    </div>
  );
}