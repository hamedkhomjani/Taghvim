'use client';

import { motion } from 'framer-motion';
import { Leaf, History, Sparkles } from 'lucide-react';

export const InfoSection = () => {
    const cards = [
        {
            title: "ریشه و تاریخچه",
            icon: <History className="w-8 h-8 text-amber-500" />,
            color: "from-amber-500/20 to-orange-500/20",
            iconBg: "bg-amber-100 dark:bg-amber-900/30",
            content: "نوروز یکی از کهن‌ترین جشن‌های به جا مانده از دوران ایران باستان است که قدمتی بیش از ۳۰۰۰ سال دارد. این جشن همزمان با اعتدال بهاری و آغاز فصل بهار برگزار می‌شود و نماد پیروزی نور بر تاریکی است."
        },
        {
            title: "سفره هفت‌سین",
            icon: <Leaf className="w-8 h-8 text-emerald-500" />,
            color: "from-emerald-500/20 to-teal-500/20",
            iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
            content: "مهم‌ترین نماد نوروز، سفره هفت‌سین است. هفت‌سین شامل هفت نماد که با حرف سین آغاز می‌شوند مانند: سبزه (نشاط)، سیب (زیبایی)، سیر (سلامت)، سنجد (فرزانگی)، سرکه (صبر)، سمنو (قدرت) و سماق (طلوع خورشید)."
        },
        {
            title: "آیین‌ها و رسوم",
            icon: <Sparkles className="w-8 h-8 text-purple-500" />,
            color: "from-purple-500/20 to-fuchsia-500/20",
            iconBg: "bg-purple-100 dark:bg-purple-900/30",
            content: "خانه‌تکانی، چهارشنبه‌سوری، دید و بازدید و سیزده‌بدر از مهم‌ترین آیین‌های نوروزی هستند. این جشن فرصتی برای نو شدن، کنار گذاشتن کینه‌ها و شروعی تازه برای همه است."
        }
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                            رازهای ماندگار نوروز
                        </h2>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-500/20"></div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                        >
                            <div className="h-full bg-white dark:bg-slate-900 p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
                                {/* Hover background gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className={`relative z-10 w-20 h-20 ${card.iconBg} rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    {card.icon}
                                </div>
                                <h3 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white mb-5">
                                    {card.title}
                                </h3>
                                <p className="relative z-10 text-slate-600 dark:text-slate-400 leading-8 text-[1.05rem] text-justify dark:font-light">
                                    {card.content}
                                </p>

                                {/* Corner detail */}
                                <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/20 rounded-tr-xl transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
