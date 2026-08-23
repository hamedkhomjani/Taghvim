import type { Metadata } from "next";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { JalaliCalendar } from "@/components/JalaliCalendar";
import { CalendarIntro } from "@/components/CalendarIntro";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "تقویم شمسی | تقویم ایران",
  description: "تقویم شمسی (هجری خورشیدی) با نمایش تاریخ میلادی هر روز - مشاهده ماه‌های سال شمسی",
  alternates: { canonical: "/calendar" },
};

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-12">
      <nav className="p-4 md:px-8 md:py-5 flex justify-between items-center z-50">
        <Link 
          href="/"
          className="flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
          <span className="font-bold text-sm">بازگشت به شمارش معکوس</span>
        </Link>
        <ThemeToggle variant="page" />
      </nav>

      <div className="container mx-auto px-6 max-w-5xl mt-4 mb-10 text-center">
        <CalendarIntro />
        
        <JalaliCalendar />

        <div className="mt-6">
          <Link href="/converter" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-bold text-sm text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:border-amber-500/40 transition-colors shadow-sm">
            مبدل تاریخ شمسی و میلادی
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
