'use client';

import { DateConverter } from "@/components/DateConverter";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConverterPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-12">
      {/* Mini Nav / Header */}
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
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
        >
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Calculator className="text-amber-500 w-5 h-5" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">مبدل تاریخ هوشمند</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                با دقت کامل تاریخ‌های شمسی و میلادی را به یکدیگر تبدیل کنید.
            </p>
        </motion.div>
        
        <DateConverter />

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/calendar" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-bold text-sm text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:border-amber-500/40 transition-colors shadow-sm">
            تقویم شمسی
          </Link>
          <Link href="/age" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-bold text-sm text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:border-amber-500/40 transition-colors shadow-sm">
            محاسبه سن
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
