'use client';

import { motion } from 'framer-motion';
import { CountdownTimer } from './CountdownTimer';
import { ThemeToggle } from './ThemeToggle';
import { formatPersianDate, formatGregorianDate, toPersianDigits } from '@/utils/date';
import { useEffect, useState } from 'react';

// Hardcoded Nowruz date for 2026 (1405 SH)
const NOWRUZ_DATE = new Date('2026-03-20T14:46:00Z');

export const Hero = () => {
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentDate(new Date());
        const interval = setInterval(() => setCurrentDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-500">

            {/* Background Animated Elements */}
            <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl opacity-50"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.5, 1], x: [0, -50, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <div className="text-white font-bold text-xl drop-shadow-md">
                    شمارش معکوس نوروز
                </div>
                <div className="flex gap-4">
                    <ThemeToggle />
                    {/* Language Switcher could go here */}
                </div>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl w-full"
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
                    سال نو مبارک
                </h1>
                <p className="text-lg md:text-2xl text-white/90 mb-8 font-light drop-shadow-sm max-w-2xl mx-auto">
                    پیشاپیش فرا رسیدن نوروز باستانی و آغاز سال ۱۴۰۵ خورشیدی مبارک باد
                </p>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl mb-12 transform hover:scale-[1.01] transition-transform duration-300">
                    <CountdownTimer />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white text-right md:text-center w-full max-w-2xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="block text-sm opacity-70 mb-1">لحظه تحویل سال:</span>
                        <div className="font-bold text-lg md:text-xl">
                            {toPersianDigits(formatPersianDate(NOWRUZ_DATE))}
                            <br />
                            ساعت {toPersianDigits('18:16')}
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="block text-sm opacity-70 mb-1">تاریخ میلادی:</span>
                        <div className="font-bold text-lg md:text-xl ltr">
                            {formatGregorianDate(NOWRUZ_DATE)}
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="absolute bottom-6 text-white/50 text-sm">
                امروز: {currentDate ? toPersianDigits(formatPersianDate(currentDate)) : '...'}
            </div>
        </div>
    );
};
