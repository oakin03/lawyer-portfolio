import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        // Omitting maxAge makes this a browser "session cookie" — it's cleared
        // automatically when the browser itself is fully closed, but survives
        // page refreshes and in-app navigation while the browser stays open.
        maxAge: undefined,
      },
    }
  );
}