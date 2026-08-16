import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import BackToTop from "@/components/ui/BackToTop";
import "../globals.css";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { getTranslations } from "next-intl/server";
import WhatsAppButton from "@/components/ui/WhatsAppButton";


const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const t = await getTranslations("meta");
  return {
    title: t("siteTitle"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <TopBar />
          {children}
          <BackToTop />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}