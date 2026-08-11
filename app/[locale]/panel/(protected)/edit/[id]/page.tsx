import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PublicationForm from "@/components/panel/PublicationForm";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("publications").select("*").eq("id", id).maybeSingle();

  if (!data) notFound();

  return <PublicationForm existing={data} />;
}