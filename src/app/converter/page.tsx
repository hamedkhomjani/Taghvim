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
      <nav className="p-8 flex justify-between items-center z-50">
        <Link 
          href="/"
          className="flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
          <span className="font-bold text-sm">بازگشت به تقویم</span>
        </Link>
        <ThemeToggle />
      </nav>

      <div className="container mx-auto px-6 max-w-5xl mt-12 mb-20 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
        >
            <div className="w-16 h-16 bg-amber-500/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
                <Calculator className="text-amber-500 w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">مبدل تاریخ هوشمند</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                با دقت کامل تاریخ‌های شمسی و میلادی را به یکدیگر تبدیل کنید. تمامی محاسبات بر اساس تقویم رسمی و معتبر انجام می‌شود.
            </p>
        </motion.div>
        
        <DateConverter />
      </div>
      
      <Footer />
    </main>
  );
}
