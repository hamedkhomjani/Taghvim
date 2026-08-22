'use client';

import Link from 'next/link';
import { Layers } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-400 py-12 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
                <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                        <Layers className="w-6 h-6 text-indigo-500" />
                        تقویم و تبدیل تاریخ
                    </h3>
                    <p className="text-sm leading-relaxed mb-4">
                        این وب‌سایت با هدف ارائه زمان دقیق تحویل سال و تبدیل تاریخ شمسی به میلادی طراحی شده است.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-4">دسترسی سریع</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-indigo-500 transition-colors">صفحه اصلی</Link></li>
                        <li><Link href="/converter" className="hover:text-indigo-500 transition-colors">مبدل تاریخ</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-lg font-bold mb-4">هم‌رسانی</h4>
                    <div className="flex space-x-4 space-x-reverse">
                        <a href="https://t.me/share/url?url=https%3A%2F%2Ftaghvim-countdown.vercel.app" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors" aria-label="Telegram">
                            <Layers className="w-5 h-5" />
                        </a>
                        <a href="https://wa.me/?text=https%3A%2F%2Ftaghvim-countdown.vercel.app" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors" aria-label="WhatsApp">
                            <Layers className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-12 text-center text-sm border-t border-gray-200 dark:border-gray-800 pt-8 opacity-60">
                &copy; {currentYear} تمامی حقوق محفوظ است. ساخته شده با عشق برای نوروز.
            </div>
        </footer>
    );
};
