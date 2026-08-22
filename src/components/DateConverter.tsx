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
    <section className="py-12 px-4 max-w-4xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-white/5 dark:bg-gray-950/40 backdrop-blur-2xl border border-white/10 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
              <Calendar className="text-amber-500 w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">تبدیل تاریخ هوشمند</h2>
          </div>
          
          <button 
            onClick={toggleMode}
            className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-all border border-white/20 group text-sm font-bold text-gray-800 dark:text-gray-200"
          >
            <ArrowLeftRight className="w-4 h-4 text-amber-500 group-hover:rotate-180 transition-transform duration-500" />
            {mode === 'gtoj' ? "میلادی به شمسی" : "شمسی به میلادی"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 pr-2">سال</label>
                <input 
                    type="number" 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full h-16 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 text-xl font-bold text-gray-900 dark:text-white focus:border-amber-500 outline-none transition-all"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 pr-2">ماه</label>
                <select 
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full h-16 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 text-lg font-bold text-gray-900 dark:text-white focus:border-amber-500 outline-none transition-all"
                >
                    {(mode === 'gtoj' ? GregorianMonths : PersianMonths).map((name, i) => (
                        <option key={name} value={i + 1}>{name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 pr-2">روز</label>
                <input 
                    type="number" 
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full h-16 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 text-xl font-bold text-gray-900 dark:text-white focus:border-amber-500 outline-none transition-all"
                />
            </div>
        </div>

        <div className="flex flex-col items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent mb-10" />
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={result}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center"
                >
                    <span className="text-sm font-medium text-amber-500 mb-2 block uppercase tracking-widest">خروجی تبدیل شده:</span>
                    <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-normal drop-shadow-glow">
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
                className="mt-10 p-4 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-all group"
                title="بازنشانی به امروز"
            >
                <RefreshCcw className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:rotate-180 transition-all duration-700" />
            </button>
        </div>
      </motion.div>
    </section>
  );
};
