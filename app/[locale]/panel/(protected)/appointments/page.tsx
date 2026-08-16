import { getAppointments } from "@/lib/appointments";
import AppointmentsCalendar from "@/components/panel/AppointmentsCalendar";
import PanelNav from "@/components/panel/PanelNav";

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ highlight?: string }>;
}) {
  const { highlight } = await searchParams;
  const appointments = await getAppointments();

  return (
    <main className="min-h-screen bg-cream-light px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-neutral-900">Randevular</h1>
          <PanelNav />
        </div>

        <div className="mt-8">
          <AppointmentsCalendar appointments={appointments} highlightId={highlight} />
        </div>
      </div>
    </main>
  );
}