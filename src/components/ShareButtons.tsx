'use client';

import { Twitter, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNowruz } from '@/context/NowruzContext';
import { toPersianDigits } from '@/utils/date';
import { SITE_URL } from '@/config';
import { TelegramIcon, WhatsAppIcon } from './icons/SocialIcons';

export const ShareButtons = () => {
    const [copied, setCopied] = useState(false);
    const { activeYear } = useNowruz();
    const url = SITE_URL;
    const text = `زمان دقیق تحویل سال ${toPersianDigits(activeYear.persianYear)} و شمارش معکوس نوروز را اینجا ببینید:`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex justify-center items-center gap-6 py-2">
            {[
                {
                    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                    icon: <Twitter className="w-5 h-5" />,
                    bg: "bg-[#1DA1F2]",
                    label: "Twitter"
                },
                {
                    href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
                    icon: <TelegramIcon className="w-5 h-5" />,
                    bg: "bg-[#0088cc]",
                    label: "Telegram"
                },
                {
                    href: `https://wa.me/?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`,
                    icon: <WhatsAppIcon className="w-5 h-5" />,
                    bg: "bg-[#25D366]",
                    label: "WhatsApp"
                }
            ].map((btn, i) => (
                <motion.a
                    key={i}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3.5 ${btn.bg} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center`}
                    aria-label={`Share on ${btn.label}`}
                >
                    {btn.icon}
                </motion.a>
            ))}

            <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3.5 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative group flex items-center justify-center"
                aria-label="Copy Link"
            >
                <LinkIcon className="w-5 h-5" />
                <AnimatePresence>
                    {copied && (
                        <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -45, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap"
                        >
                            کپی شد!
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
