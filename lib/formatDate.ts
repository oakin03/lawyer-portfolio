const INTL_LOCALES: Record<string, string> = {
  tr: "tr-TR",
  en: "en-US",
};

export function formatPublicationDate(dateString: string, locale: string): string {
  const intlLocale = INTL_LOCALES[locale] ?? "tr-TR";
  const date = new Date(dateString);

  const datePart = date.toLocaleDateString(intlLocale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const weekday = date.toLocaleDateString(intlLocale, { weekday: "long" });
  const time = date.toLocaleTimeString(intlLocale, { hour: "2-digit", minute: "2-digit" });

  return `${datePart} ${weekday} ${time}`;
}

export function formatPanelDate(dateString: string): string {
  const date = new Date(dateString);

  const datePart = date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const weekday = date.toLocaleDateString("tr-TR", { weekday: "short" });
  const time = date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

  return `${datePart} ${weekday} ${time}`;
}