'use client';

import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { toPersianDigits } from '@/utils/date';
import jalaali from 'jalaali-js';

export const CalendarIntro = () => {
  const todayJalaali = jalaali.toJalaali(new Date());

  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6"
    >
        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
            <CalendarDays className="text-amber-500 w-5 h-5" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">تقویم شمسی</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          تقویم رسمی ایران با نمایش معادل میلادی هر روز. امروز {toPersianDigits(todayJalaali.jd)} است.
        </p>
    </motion.div>
  );
};
