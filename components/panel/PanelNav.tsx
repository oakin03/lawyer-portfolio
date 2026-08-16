"use client";

import NextLink from "next/link";
import { usePathname } from "@/lib/navigation";
import NotificationBell from "@/components/panel/NotificationBell";

export default function PanelNav() {
  const pathname = usePathname();
  const isAppointments = pathname === "/panel/appointments";

  return (
    <div className="flex items-center gap-2">
      <NextLink
        href="/"
        className="rounded-md bg-burgundy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark"
      >
        Siteye Dön
      </NextLink>

      {isAppointments ? (
        <NextLink
          href="/panel"
          className="rounded-md bg-burgundy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark"
        >
          Makaleler
        </NextLink>
      ) : (
        <NextLink
          href="/panel/appointments"
          className="rounded-md bg-burgundy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-burgundy-dark"
        >
          Randevular
        </NextLink>
      )}

      <NotificationBell />
    </div>
  );
}