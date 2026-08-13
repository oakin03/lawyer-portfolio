import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SessionGuard from "@/components/panel/SessionGuard";

export default async function ProtectedPanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/panel/login");
  }

  return (
    <>
      <SessionGuard />
      {children}
    </>
  );
} 