import type { Metadata } from "next";
import { SITE_NAME } from "@/config";

export const metadata: Metadata = {
  title: "مبدل تاریخ شمسی و میلادی",
  description:
    "تبدیل آنلاین تاریخ شمسی به میلادی و قمری و بالعکس - مبدل سریع و دقیق تقویم هجری شمسی، میلادی و هجری قمری",
  alternates: { canonical: "/converter" },
  openGraph: {
    title: "مبدل تاریخ شمسی و میلادی",
    description:
      "تبدیل آنلاین تاریخ شمسی به میلادی و قمری و بالعکس - مبدل سریع و دقیق تقویم",
    type: "website",
    locale: "fa_IR",
    siteName: SITE_NAME,
    url: "/converter",
  },
};

export default function ConverterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
