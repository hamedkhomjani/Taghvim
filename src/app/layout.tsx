import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  title: `شمارش معکوس نوروز ${activeYearFa} | Nowruz Countdown`,
  description: "Daghayegh ta tahvil-e saal - Minutes until Persian New Year",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: `شمارش معکوس نوروز ${activeYearFa} | Nowruz Countdown`,
    description: "زمان دقیق تحویل سال و شمارش معکوس نوروز",
    type: "website",
    locale: "fa_IR",
    siteName: SITE_NAME,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `شمارش معکوس نوروز ${activeYearFa} | Nowruz Countdown`,
    description: "زمان دقیق تحویل سال و شمارش معکوس نوروز",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": SITE_NAME,
        "url": SITE_URL,
        "inLanguage": "fa-IR"
      },
      {
        "@type": "WebApplication",
        "name": `${SITE_NAME} - تقویم شمسی`,
        "url": SITE_URL,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "inLanguage": "fa-IR",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
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
      }
    ]
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
        suppressHydrationWarning
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
