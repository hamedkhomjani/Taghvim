'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { toPersianDigits } from '@/utils/date';

const TimeUnit = ({ value, label, index }: { value: number; label: string; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            className="flex flex-col items-center mx-2 md:mx-6"
        >
            <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.2rem] md:rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.2)] w-16 h-20 md:w-36 md:h-48 flex items-center justify-center group hover:bg-white/10 transition-colors duration-500">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={value}
                        initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -40, opacity: 0, filter: 'blur(10px)' }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="absolute text-3xl md:text-8xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] tracking-tighter"
                    >
                        {toPersianDigits(value.toString().padStart(2, '0'))}
                    </motion.div>
                </AnimatePresence>

                {/* Decorative inner glow */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="mt-4 md:mt-6 text-xs md:text-lg font-bold text-white/70 uppercase tracking-[0.2em] drop-shadow-sm"
            >
                {label}
            </motion.span>
        </motion.div>
    );
};

export const CountdownTimer = () => {
    const { days, hours, minutes, seconds } = useCountdown();

    const units = [
        { value: days, label: "روز" },
        { value: hours, label: "ساعت" },
        { value: minutes, label: "دقیقه" },
        { value: seconds, label: "ثانیه" }
    ];

    return (
        <div className="flex flex-nowrap justify-center items-center gap-2 md:gap-8" dir="ltr">
            {units.map((unit, i) => (
                <TimeUnit key={unit.label} value={unit.value} label={unit.label} index={i} />
            ))}
        </div>
    );
};
