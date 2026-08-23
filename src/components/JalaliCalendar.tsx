'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import jalaali from 'jalaali-js';
import { toPersianDigits } from '@/utils/date';
import { getMonthEvents, type DayEvents, type EventItem } from '@/utils/monthEvents';

const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد',
  'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر',
  'دی', 'بهمن', 'اسفند',
];

// Week starts on Saturday (rightmost column in RTL)
const WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const FRIDAY_INDEX = 6;

interface CalendarCell {
  jy: number;
  jm: number;
  jd: number;
  gregorianDay: number;
}

export const JalaliCalendar = () => {
  const todayJalaali = jalaali.toJalaali(new Date());
  const [view, setView] = useState({ jy: todayJalaali.jy, jm: todayJalaali.jm });
  const [direction, setDirection] = useState(1);

  const cells = useMemo<CalendarCell[]>(() => {
    const daysInMonth = jalaali.jalaaliMonthLength(view.jy, view.jm);
    const firstGreg = jalaali.toGregorian(view.jy, view.jm, 1);
    // JS getDay(): 0=Sunday..6=Saturday -> Saturday-first column index
    const startCol = (new Date(firstGreg.gy, firstGreg.gm - 1, firstGreg.gd).getDay() + 1) % 7;
    const list: (CalendarCell | null)[] = Array(startCol).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const g = jalaali.toGregorian(view.jy, view.jm, d);
      list.push({ jy: view.jy, jm: view.jm, jd: d, gregorianDay: g.gd });
    }
    return list as CalendarCell[];
  }, [view]);

  const goMonth = (delta: number) => {
    setDirection(delta);
    setView((v) => {
      let jm = v.jm + delta;
      let jy = v.jy;
      if (jm > 12) { jm = 1; jy++; }
      if (jm < 1) { jm = 12; jy--; }
      return { jy, jm };
    });
  };

  const goToday = () => {
    setDirection(todayJalaali.jy * 12 + todayJalaali.jm >= view.jy * 12 + view.jm ? 1 : -1);
    setView({ jy: todayJalaali.jy, jm: todayJalaali.jm });
  };

  const isToday = (cell: CalendarCell) =>
    cell.jy === todayJalaali.jy && cell.jm === todayJalaali.jm && cell.jd === todayJalaali.jd;

  const events = getMonthEvents(view.jy, view.jm);
  const todayIn = (d: DayEvents) =>
    d.day === todayJalaali.jd && view.jm === todayJalaali.jm && view.jy === todayJalaali.jy;

  const isZoro = (item: EventItem) => !!item.isZoroastrian;
  const eventsByDay = useMemo(() => {
    const m = new Map<number, DayEvents>();
    for (const d of events) m.set(d.day, d);
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch lg:items-start justify-center">
      {/* Calendar card */}
      <div className="w-full max-w-xl shrink-0 mx-auto lg:mx-0 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100 dark:border-white/10">
        <button
          onClick={() => goMonth(1)}
          aria-label="ماه بعد"
          className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <div className="text-center">
          <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
            {PERSIAN_MONTHS[view.jm - 1]}
          </h2>
          <p className="text-[11px] md:text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {toPersianDigits(view.jy)}
          </p>
        </div>
        <button
          onClick={() => goMonth(-1)}
          aria-label="ماه قبل"
          className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Weekday names */}
      <div className="grid grid-cols-7 gap-1.5 md:gap-2 px-3 md:px-4 pt-2.5">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-xs font-bold py-1 ${
              i === FRIDAY_INDEX
                ? 'text-rose-500'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${view.jy}-${view.jm}`}
          initial={{ opacity: 0, x: direction * -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-7 gap-1 md:gap-1.5 p-3 pt-1.5"
        >
          {cells.map((cell, i) => {
            if (!cell) return <div key={`empty-${i}`} />;
            const friday = i % 7 === FRIDAY_INDEX;
            const today = isToday(cell);
            const dayEvents = eventsByDay.get(cell.jd);
            const hasCivilHoliday = !!dayEvents?.items.some((it) => it.isHoliday);
            const hasZoroDay = !!dayEvents?.items.some(isZoro);
            const tooltipLabel = dayEvents ? ` - ${dayEvents.items.map((it) => it.label).join('، ')}` : '';
            return (
              <div
                key={cell.jd}
                title={`${toPersianDigits(cell.jd)} ${PERSIAN_MONTHS[cell.jm - 1]} ${toPersianDigits(cell.jy)}${tooltipLabel}`}
                className={`h-10 flex flex-col items-center justify-center rounded-lg transition-all ${
                  today
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                    : friday || hasCivilHoliday
                      ? 'bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20'
                      : hasZoroDay
                        ? 'bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20'
                        : 'bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                <span
                  className={`text-sm font-bold leading-tight ${
                    today
                      ? 'text-white'
                      : friday || hasCivilHoliday
                        ? 'text-rose-500 dark:text-rose-400'
                        : hasZoroDay
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {toPersianDigits(cell.jd)}
                </span>
                <span
                  className={`text-[9px] md:text-[10px] leading-tight ${
                    today ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {cell.gregorianDay}
                </span>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Footer bar */}
      <div className="flex items-center justify-between px-4 pb-3.5 md:pb-4">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          امروز: {toPersianDigits(todayJalaali.jd)} {PERSIAN_MONTHS[todayJalaali.jm - 1]} {toPersianDigits(todayJalaali.jy)}
        </p>
        <button
          onClick={goToday}
          disabled={view.jy === todayJalaali.jy && view.jm === todayJalaali.jm}
          className="px-4 py-2 text-sm font-bold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          برو به امروز
        </button>
      </div>
      </div>

      {/* Occasions panel (like time.ir) */}
      <aside className="flex-1 min-w-0 w-full bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden flex flex-col lg:self-stretch">
        <div className="px-5 py-3 border-b border-slate-100 dark:border-white/10">
          <h2 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
            مناسبت‌های ماه {PERSIAN_MONTHS[view.jm - 1]} {toPersianDigits(view.jy)}
          </h2>
          <p className="text-[10px] md:text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            تاریخ‌های قمری بر اساس تقویم اوم‌القری تقریبی است
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-[10px] md:text-[11px]">
            <span className="flex items-center gap-1 text-rose-500 dark:text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> تعطیل رسمی
            </span>
            <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" /> مناسبت ملی
            </span>
            <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" /> روز جهانی
            </span>
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> جشن‌های زرتشتی
            </span>
          </div>
        </div>
        <ul className="p-3 lg:flex-1 lg:overflow-y-auto">
          {events.length === 0 && (
            <li className="text-center text-xs text-slate-400 dark:text-slate-500 py-8">
              مناسبت ثبت‌شده‌ای در این ماه نیست
            </li>
          )}
          {events.map((d) => {
            const hasZoro = d.items.some(isZoro);
            const hasHoliday = !hasZoro && d.items.some((it) => it.isHoliday);
            const hasInternational = !hasZoro && !hasHoliday && d.items.some((i) => i.isInternational);
            return (
              <li
                key={d.day}
                className={`flex items-start gap-3 px-2 py-1.5 rounded-xl ${todayIn(d) ? 'bg-slate-100 dark:bg-white/5 ring-1 ring-amber-500/40' : ''}`}
              >
                <span
                  className={`shrink-0 min-w-9 text-center px-1.5 py-1 rounded-lg text-xs font-bold ${
                    hasZoro
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400'
                      : hasHoliday
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400'
                        : hasInternational
                          ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400'
                          : 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400'
                  }`}
                >
                  {toPersianDigits(d.day)}
                </span>
                <div className="min-w-0">
                  {d.items.map((item, idx) => (
                    <p
                      key={idx}
                      className={`text-xs md:text-sm leading-6 ${
                        isZoro(item)
                          ? 'text-amber-600 dark:text-amber-400'
                          : item.isHoliday
                            ? 'text-rose-600 dark:text-rose-400 font-bold'
                            : item.isInternational
                              ? 'text-sky-700 dark:text-sky-400'
                              : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {item.label}
                      {item.isZoroastrian && (
                        <span className="text-slate-400 dark:text-slate-500 font-normal"> (زرتشتی)</span>
                      )}
                      {item.hijriLabel && (
                        <span className="text-slate-400 dark:text-slate-500 font-normal"> [ {item.hijriLabel} ]</span>
                      )}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};
