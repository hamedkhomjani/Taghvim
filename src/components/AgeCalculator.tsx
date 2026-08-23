'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, RefreshCcw, CalendarDays, Clock3, PartyPopper } from 'lucide-react';
import jalaali from 'jalaali-js';
import { toPersianDigits } from '@/utils/date';
import {
  toJ,
  jalaliAge,
  totalDaysBetween,
  nextBirthdayIn,
  weekdayFa,
  type JDate,
} from '@/utils/age';

const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد',
  'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر',
  'دی', 'بهمن', 'اسفند',
];

const DEFAULT_BIRTH: JDate = { jy: 1370, jm: 1, jd: 1 };

export const AgeCalculator = () => {
  const [birth, setBirth] = useState({
    jy: DEFAULT_BIRTH.jy.toString(),
    jm: DEFAULT_BIRTH.jm.toString(),
    jd: DEFAULT_BIRTH.jd.toString(),
  });

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const result = useMemo(() => {
    const jy = parseInt(birth.jy);
    const jm = parseInt(birth.jm);
    const jd = parseInt(birth.jd);
    if (!jy || !jm || !jd || !jalaali.isValidJalaaliDate(jy, jm, jd)) {
      return { error: 'تاریخ تولد معتبر نیست' };
    }
    const now = new Date();
    const today = toJ(now);
    const b = { jy, jm, jd };
    if (totalDaysBetween(b, today) < 0) {
      return { error: 'تاریخ تولد نمی‌تواند در آینده باشد' };
    }
    const age = jalaliAge(b, today);
    const totalDays = totalDaysBetween(b, today);
    const nb = nextBirthdayIn(b, today);
    return {
      age,
      totalDays,
      weekday: weekdayFa(b),
      nextInDays: nb.days,
      nextTarget: nb.target,
      isTodayBirthday: nb.days === 0,
    };
  }, [birth]);

  const inputCls =
    'w-full h-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 text-lg font-bold text-slate-900 dark:text-white focus:border-amber-500 outline-none transition-all';

  return (
    <section className="py-2 md:py-6 px-4 max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-5 md:p-8 shadow-xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Cake className="text-amber-500 w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">محاسبه سن دقیق</h2>
          </div>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 pr-2">تاریخ تولد (شمسی)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 pr-2">سال</label>
            <input
              type="number"
              value={birth.jy}
              onChange={(e) => setBirth((b) => ({ ...b, jy: e.target.value }))}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 pr-2">ماه</label>
            <select
              value={birth.jm}
              onChange={(e) => setBirth((b) => ({ ...b, jm: e.target.value }))}
              className={`${inputCls} text-base`}
            >
              {PERSIAN_MONTHS.map((name, i) => (
                <option key={name} value={i + 1}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 pr-2">روز</label>
            <input
              type="number"
              value={birth.jd}
              onChange={(e) => setBirth((b) => ({ ...b, jd: e.target.value }))}
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-6" />

          <AnimatePresence mode="wait">
            {!isMounted ? null : result.error ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-base md:text-lg font-bold text-rose-500 py-4"
              >
                {result.error}
              </motion.p>
            ) : (
              <motion.div
                key={`${result.age?.years}-${result.age?.months}-${result.age?.days}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full text-center"
              >
                <span className="text-xs font-medium text-amber-500 mb-1 block uppercase tracking-widest">
                  سن دقیق شما:
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-normal">
                  {toPersianDigits(result.age!.years)} سال و{' '}
                  {toPersianDigits(result.age!.months)} ماه و{' '}
                  {toPersianDigits(result.age!.days)} روز
                </h3>
                <div className="grid grid-cols-3 gap-2 md:gap-4 mt-5 max-w-xl mx-auto">
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-2.5 md:p-3">
                    <Clock3 className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 mb-0.5">کل روزهای زندگی</p>
                    <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                      {result.totalDays!.toLocaleString('fa-IR')}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-2.5 md:p-3">
                    <CalendarDays className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 mb-0.5">روز هفته تولد</p>
                    <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">{result.weekday}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-2.5 md:p-3">
                    <PartyPopper className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 mb-0.5">تولد بعدی</p>
                    {result.isTodayBirthday ? (
                      <p className="text-sm md:text-base font-black text-amber-500">🎉 امروز تولدته!</p>
                    ) : (
                      <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                        {toPersianDigits(result.nextInDays!)} روز دیگر
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setBirth({
              jy: DEFAULT_BIRTH.jy.toString(),
              jm: DEFAULT_BIRTH.jm.toString(),
              jd: DEFAULT_BIRTH.jd.toString(),
            })}
            className="mt-4 md:mt-6 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-all group"
            title="بازنشانی"
          >
            <RefreshCcw className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:rotate-180 transition-all duration-700" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
