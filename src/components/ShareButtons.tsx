'use client';

import { Twitter, Share2, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const TelegramIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-2.39-1.58-2.39-2.58 0-.96.64-1.44 1.08-1.89.28-.28 1.83-1.68 1.83-1.68s.06-.08-.02-.13c-.08-.05-.2-.03-.29-.01-.12.02-3.69 2.37-3.69 2.37-.24.16-.95.16-1.41.03-.5-.14-1.2-.38-1.2-.38s-.88-.54.67-1.14c3.55-1.38 7.37-2.8 8.82-3.39 1.45-.59 2.1-.88 2.1-.88s.64-.09.64.44z" />
    </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export const ShareButtons = () => {
    const [copied, setCopied] = useState(false);
    const url = 'https://taghvim-countdown.vercel.app';
    const text = 'زمان دقیق تحویل سال ۱۴۰۵ و شمارش معکوس نوروز را اینجا ببینید:';

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
                className="p-3.5 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative group flex items-center justify-center"
                aria-label="Copy Link"
            >
                <LinkIcon className="w-5 h-5" />
                <AnimatePresence>
                    {copied && (
                        <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -45, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap"
                        >
                            کپی شد!
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
