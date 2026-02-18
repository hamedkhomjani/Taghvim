import { motion } from 'framer-motion';
import { Leaf, History, Sparkles } from 'lucide-react';

export const InfoSection = () => {
    const cards = [
        {
            title: "ریشه و تاریخچه",
            icon: <History className="w-8 h-8 text-amber-500" />,
            content: "نوروز یکی از کهن‌ترین جشن‌های به جا مانده از دوران ایران باستان است که قدمتی بیش از ۳۰۰۰ سال دارد. این جشن همزمان با اعتدال بهاری و آغاز فصل بهار برگزار می‌شود و نماد پیروزی نور بر تاریکی است."
        },
        {
            title: "سفره هفت‌سین",
            icon: <Leaf className="w-8 h-8 text-green-500" />,
            content: "مهم‌ترین نماد نوروز، سفره هفت‌سین است. هفت‌سین شامل هفت نماد که با حرف سین آغاز می‌شوند مانند: سبزه (نشاط)، سیب (زیبایی)، سیر (سلامت)، سنجد (فرزانگی)، سرکه (صبر)، سمنو (قدرت) و سماق (طلوع خورشید)."
        },
        {
            title: "آیین‌ها و رسوم",
            icon: <Sparkles className="w-8 h-8 text-purple-500" />,
            content: "خانه‌تکانی، چهارشنبه‌سوری، دید و بازدید و سیزده‌بدر از مهم‌ترین آیین‌های نوروزی هستند. این جشن فرصتی برای نو شدن، کنار گذاشتن کینه‌ها و شروعی تازه برای همه است."
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        درباره نوروز
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto">
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                {card.content}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
