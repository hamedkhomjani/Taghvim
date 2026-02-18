'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { CountdownTimer } from './CountdownTimer';
import { ThemeToggle } from './ThemeToggle';
import { formatPersianDate, formatGregorianDate, toPersianDigits } from '@/utils/date';
import { useEffect, useState, useRef } from 'react';

// Hardcoded Nowruz date for 2026 (1405 SH)
const NOWRUZ_DATE = new Date('2026-03-20T14:46:00Z');

export const Hero = () => {
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        setCurrentDate(new Date());
        const interval = setInterval(() => setCurrentDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-700">

            {/* Animated Background Blobs */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 pointer-events-none"
            >
                <motion.div
                    className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/30 rounded-full blur-[120px]"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-400/20 rounded-full blur-[120px]"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-300/20 rounded-full blur-[100px]"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-30">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                        <span className="text-white text-xl">⏳</span>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight drop-shadow-md">
                        نوروز ۱۴۰۵
                    </span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4"
                >
                    <ThemeToggle />
                </motion.div>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-5xl w-full flex flex-col items-center"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mb-6 inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-wide uppercase"
                >
                    جشن باستانی ایرانیان
                </motion.div>

                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] leading-[1.1] tracking-tight">
                    سال نو مبارک
                </h1>

                <p className="text-xl md:text-3xl text-white/90 mb-12 font-light drop-shadow-md max-w-3xl mx-auto leading-relaxed">
                    با عشق و امید، به استقبال بهار و آغاز سال <span className="font-bold text-amber-300">۱۴۰۵</span> خورشیدی می‌رویم
                </p>

                <div className="w-full max-w-4xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-[3rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transform hover:scale-[1.01] transition-all duration-500"
                    >
                        <CountdownTimer />
                    </motion.div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto px-4">
                    {[
                        { label: "لحظه تحویل سال (ایران):", value: `${toPersianDigits(formatPersianDate(NOWRUZ_DATE))} ساعت ${toPersianDigits('18:16')}` },
                        { label: "تاریخ میلادی:", value: formatGregorianDate(NOWRUZ_DATE), ltr: true }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + (i * 0.1) }}
                            className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg text-right md:text-center"
                        >
                            <span className="block text-sm text-white/60 mb-2 font-medium">{item.label}</span>
                            <div className={`font-bold text-xl md:text-2xl text-white group-hover:text-amber-300 transition-colors ${item.ltr ? 'ltr' : ''}`}>
                                {item.value}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-sm font-light tracking-widest uppercase flex flex-col items-center gap-4"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
                امروز: {currentDate ? toPersianDigits(formatPersianDate(currentDate)) : '...'}
            </motion.div>
        </div>
    );
};
