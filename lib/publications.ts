import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createBrowserClient } from "@/lib/supabase/client";

export type Publication = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  language: string;
  date: string;
  updated_at: string;
  author_id: string | null;
  profiles: { display_name: string | null } | null;
};

export async function getPublications(): Promise<Publication[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("publications")
    .select("*, profiles(display_name)")
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to fetch publications:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("publications")
    .select("*, profiles(display_name)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch publication:", error.message);
    return null;
  }
  return data;
}

export async function getPublicationsClient(): Promise<Publication[]> {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("publications")
    .select("*, profiles(display_name)")
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to fetch publications:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPublicationByIdClient(id: string): Promise<Publication | null> {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("publications")
    .select("*, profiles(display_name)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch publication:", error.message);
    return null;
  }
  return data;
}

export async function getAdjacentPublications(
  currentId: string
): Promise<{ prev: Publication | null; next: Publication | null }> {
  const all = await getPublications();
  const index = all.findIndex((p) => p.id === currentId);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export async function hasPublications(): Promise<boolean> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("publications")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Failed to check publications:", error.message);
    return false;
  }

  return (data?.length ?? 0) > 0;
}