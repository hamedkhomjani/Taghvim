import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "شمارش معکوس نوروز ۱۴۰۵ | Nowruz Countdown",
  description: "Daghayegh ta tahvil-e saal - Minutes until Persian New Year",
  metadataBase: new URL('https://taghvim-countdown.vercel.app'), // Placeholder
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Nowruz 1405 Countdown",
    "startDate": "2026-03-20T14:46:00+00:00",
    "endDate": "2026-03-20T23:59:59+00:00",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Global Celebration",
      "address": "Tehran, Iran"
    },
    "image": "https://taghvim-countdown.vercel.app/og-image.jpg",
    "description": "Celebrate the Persian New Year with a precise countdown to the Vernal Equinox.",
    "performer": {
      "@type": "Organization",
      "name": "Persian Calendar Authority"
    }
  };

  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
