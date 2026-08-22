import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { NowruzProvider } from "@/context/NowruzContext";
import { getActiveNowruz } from "@/utils/nowruzDates";
import { toPersianDigits } from "@/utils/date";
import { SITE_URL, SITE_NAME } from "@/config";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const activeNowruz = getActiveNowruz();
const activeYearFa = toPersianDigits(activeNowruz.persianYear);

export const metadata: Metadata = {
  title: `شمارش معکوس نوروز ${activeYearFa} | Nowruz Countdown`,
  description: "Daghayegh ta tahvil-e saal - Minutes until Persian New Year",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `شمارش معکوس نوروز ${activeYearFa} | Nowruz Countdown`,
    description: "زمان دقیق تحویل سال و شمارش معکوس نوروز",
    type: "website",
    locale: "fa_IR",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Nowruz ${activeNowruz.persianYear} Countdown`,
    "startDate": activeNowruz.date.toISOString(),
    "endDate": new Date(activeNowruz.date.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Global Celebration",
      "address": "Tehran, Iran"
    },
    "image": `${SITE_URL}/opengraph-image`,
    "description": "Celebrate the Persian New Year with a precise countdown to the Vernal Equinox.",
    "performer": {
      "@type": "Organization",
      "name": "Persian Calendar Authority"
    }
  };

  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NowruzProvider>
          {children}
        </NowruzProvider>
      </body>
    </html>
  );
}
