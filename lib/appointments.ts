import { createClient as createServerClient } from "@/lib/supabase/server";

export type Appointment = {
  id: string;
  full_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  subject: string;
  created_at: string;
};

export async function getAppointments(): Promise<Appointment[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (error) {
    console.error("Failed to fetch appointments:", error.message);
    return [];
  }
  return data ?? [];
}