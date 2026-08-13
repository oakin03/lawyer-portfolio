"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const SESSION_FLAG = "panelActiveSession";

export default function SessionGuard() {
  const router = useRouter();

  useEffect(() => {
    const hasFlag = window.sessionStorage.getItem(SESSION_FLAG);
    if (!hasFlag) {
      const supabase = createClient();
      supabase.auth.signOut().then(() => {
        router.push("/panel/login");
        router.refresh();
      });
    }
  }, [router]);

  return null;
}