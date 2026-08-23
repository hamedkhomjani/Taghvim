'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
    variant?: 'hero' | 'page';
}

export const ThemeToggle = ({ variant = 'hero' }: ThemeToggleProps) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const currentTheme = savedTheme || systemTheme;

        setTheme(currentTheme as 'light' | 'dark');
        if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', newTheme);
    };

    if (!mounted) {
        return (
            <button
                className={`p-2 rounded-full w-9 h-9 ${
                    variant === 'page'
                        ? 'bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10'
                        : 'bg-white/10 border border-white/20'
                }`}
                aria-hidden="true"
            />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full backdrop-blur transition-colors relative overflow-hidden group w-9 h-9 flex items-center justify-center ${
                variant === 'page'
                    ? 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
            }`}
            aria-label="Toggle Dark Mode"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                {theme === 'dark' ? (
                    <Moon className={`w-4 h-4 ${variant === 'page' ? 'text-amber-500' : 'text-yellow-300'} drop-shadow-glow`} />
                ) : (
                    <Sun className={`w-4 h-4 ${variant === 'page' ? 'text-amber-500' : 'text-yellow-500'} drop-shadow-glow`} />
                )}
            </motion.div>
        </button>
    );
};
