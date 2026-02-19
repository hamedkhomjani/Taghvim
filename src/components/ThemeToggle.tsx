'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
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
        console.log('Toggling theme to:', newTheme);
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
            <button className="p-2 rounded-full bg-white/10 border border-white/20 w-9 h-9" aria-hidden="true" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors border border-white/20 relative overflow-hidden group"
            aria-label="Toggle Dark Mode"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-yellow-300 drop-shadow-glow" />
                ) : (
                    <Sun className="w-5 h-5 text-yellow-500 drop-shadow-glow" />
                )}
            </motion.div>
        </button>
    );
};
