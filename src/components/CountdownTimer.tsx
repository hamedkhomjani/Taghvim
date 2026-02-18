'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { toPersianDigits } from '@/utils/date';
import { cn } from '@/utils/cn';

const TimeUnit = ({ value, label }: { value: number; label: string }) => {
    return (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="relative overflow-hidden bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl w-20 h-24 md:w-32 md:h-40 flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={value}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="absolute text-4xl md:text-7xl font-bold text-white drop-shadow-md"
                    >
                        {toPersianDigits(value.toString().padStart(2, '0'))}
                    </motion.div>
                </AnimatePresence>
            </div>
            <span className="mt-2 md:mt-4 text-sm md:text-xl font-medium text-white/90 drop-shadow-sm">
                {label}
            </span>
        </div>
    );
};

export const CountdownTimer = () => {
    const { days, hours, minutes, seconds } = useCountdown();

    return (
        <div className="flex flex-wrap justify-center items-center p-4 md:p-8 rounded-3xl" dir="rtl">
            <TimeUnit value={seconds} label="ثانیه" />
            <TimeUnit value={minutes} label="دقیقه" />
            <TimeUnit value={hours} label="ساعت" />
            <TimeUnit value={days} label="روز" />
        </div>
    );
};
