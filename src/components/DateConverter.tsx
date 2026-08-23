'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowLeftRight, RefreshCcw } from 'lucide-react';
import { toPersianDigits } from '@/utils/date';
import jalaali from 'jalaali-js';

const PersianMonths = [
  "فروردین", "اردیبهشت", "خرداد",
  "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر",
  "دی", "بهمن", "اسفند"
];

const GregorianMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DateConverter = () => {
  const [mode, setMode] = useState<'gtoj' | 'jtog'>('gtoj'); // g: gregorian, j: jalaali (solar)
  
  // Current date as initial state
  const now = new Date();
  const initialJalaali = jalaali.toJalaali(now);
  
  const [year, setYear] = useState(mode === 'gtoj' ? now.getFullYear().toString() : initialJalaali.jy.toString());
  const [month, setMonth] = useState(mode === 'gtoj' ? (now.getMonth() + 1).toString() : initialJalaali.jm.toString());
  const [day, setDay] = useState(mode === 'gtoj' ? now.getDate().toString() : initialJalaali.jd.toString());
  
  const [result, setResult] = useState<string>('');

  const handleConvert = () => {
    try {
      if (mode === 'gtoj') {
        const j = jalaali.toJalaali(parseInt(year), parseInt(month), parseInt(day));
        if (!jalaali.isValidJalaaliDate(j.jy, j.jm, j.jd)) throw new Error();
        setResult(`${toPersianDigits(j.jd)} ${PersianMonths[j.jm - 1]} ${toPersianDigits(j.jy)}`);
      } else {
        const g = jalaali.toGregorian(parseInt(year), parseInt(month), parseInt(day));
        const gDate = new Date(g.gy, g.gm - 1, g.gd);
        setResult(`${g.gd} ${GregorianMonths[g.gm - 1]} ${g.gy} (${new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(gDate)})`);
      }
    } catch {
      setResult('تاریخ وارد شده معتبر نیست');
    }
  };

  useEffect(() => {
    handleConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, day, mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'gtoj' ? 'jtog' : 'gtoj');
    // Reset to current date on toggle
    const now = new Date();
    if (mode === 'jtog') {
        setYear(now.getFullYear().toString());
        setMonth((now.getMonth() + 1).toString());
        setDay(now.getDate().toString());
    } else {
        const j = jalaali.toJalaali(now);
        setYear(j.jy.toString());
        setMonth(j.jm.toString());
        setDay(j.jd.toString());
    }
  };

  return (
    <section className="py-2 md:py-6 px-4 max-w-4xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-5 md:p-8 shadow-xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Calendar className="text-amber-500 w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">تبدیل تاریخ هوشمند</h2>
          </div>
          
          <button 
            onClick={toggleMode}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-all border border-slate-200 dark:border-slate-700 group text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200"
          >
            <ArrowLeftRight className="w-4 h-4 text-amber-500 group-hover:rotate-180 transition-transform duration-500" />
            {mode === 'gtoj' ? "میلادی به شمسی" : "شمسی به میلادی"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
            <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 pr-2">سال</label>
                <input 
                    type="number" 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full h-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 text-lg font-bold text-slate-900 dark:text-white focus:border-amber-500 outline-none transition-all"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 pr-2">ماه</label>
                <select 
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full h-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 text-base font-bold text-slate-900 dark:text-white focus:border-amber-500 outline-none transition-all"
                >
                    {(mode === 'gtoj' ? GregorianMonths : PersianMonths).map((name, i) => (
                        <option key={name} value={i + 1}>{name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 pr-2">روز</label>
                <input 
                    type="number" 
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full h-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 text-lg font-bold text-slate-900 dark:text-white focus:border-amber-500 outline-none transition-all"
                />
            </div>
        </div>

        <div className="flex flex-col items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-6" />
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={result}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center"
                >
                    <span className="text-xs font-medium text-amber-500 mb-1 block uppercase tracking-widest">خروجی تبدیل شده:</span>
                    <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-normal drop-shadow-glow">
                        {result}
                    </h3>
                </motion.div>
            </AnimatePresence>
            
            <button 
                onClick={() => {
                    const now = new Date();
                    if (mode === 'gtoj') {
                        setYear(now.getFullYear().toString());
                        setMonth((now.getMonth() + 1).toString());
                        setDay(now.getDate().toString());
                    } else {
                        const j = jalaali.toJalaali(now);
                        setYear(j.jy.toString());
                        setMonth(j.jm.toString());
                        setDay(j.jd.toString());
                    }
                }}
                className="mt-4 md:mt-6 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-all group"
                title="بازنشانی به امروز"
            >
                <RefreshCcw className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:rotate-180 transition-all duration-700" />
            </button>
        </div>
      </motion.div>
    </section>
  );
};
