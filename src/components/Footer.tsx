'use client';

import { Github, Twitter, Layers } from 'lucide-react';

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
                    <h4 className="text-lg font-bold mb-4">لینک‌های مفید</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-indigo-500 transition-colors">درباره ما</a></li>
                        <li><a href="#" className="hover:text-indigo-500 transition-colors">تماس با ما</a></li>
                        <li><a href="#" className="hover:text-indigo-500 transition-colors">سیاست حریم خصوصی</a></li>
                    </ul>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-lg font-bold mb-4">شبکه‌های اجتماعی</h4>
                    <div className="flex space-x-4 space-x-reverse">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors" aria-label="Twitter">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors" aria-label="Github">
                            <Github className="w-5 h-5" />
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
