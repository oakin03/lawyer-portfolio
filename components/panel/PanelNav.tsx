"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "@/lib/navigation";
import { createClient } from "@/lib/supabase/client";

const LAST_VIEWED_KEY = "panelAppointmentsLastViewed";

export default function PanelNav() {
  const pathname = usePathname();
  const isAppointments = pathname === "/panel/appointments";
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    async function check() {
      const supabase = createClient();
      const { data } = await supabase.from("appointments").select("created_at");
      if (!data) return;
      const lastViewed = window.localStorage.getItem(LAST_VIEWED_KEY) ?? "1970-01-01";
      setNewCount(data.filter((a) => a.created_at > lastViewed).length);
    }
    check();
  }, [pathname]);

  useEffect(() => {
    if (isAppointments) {
      window.localStorage.setItem(LAST_VIEWED_KEY, new Date().toISOString());
    }
  }, [isAppointments]);

  return (
    <div className="flex gap-2">
      <NextLink href="/" className="rounded-md bg-burgundy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark">
        Siteye Dön
      </NextLink>

      {isAppointments ? (
        <NextLink href="/panel" className="rounded-md bg-burgundy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark">
          Makaleler
        </NextLink>
      ) : (
        <NextLink href="/panel/appointments" className="relative rounded-md bg-burgundy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark">
          Randevular
          {newCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {newCount}
            </span>
          )}
        </NextLink>
      )}
    </div>
  );
}