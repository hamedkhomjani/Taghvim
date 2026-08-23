import jalaali from 'jalaali-js';

export interface JDate {
  jy: number;
  jm: number;
  jd: number;
}

const gToDate = (g: { gy: number; gm: number; gd: number }) =>
  new Date(g.gy, g.gm - 1, g.gd);

export const toJ = (d: Date): JDate => {
  const j = jalaali.toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
  return { jy: j.jy, jm: j.jm, jd: j.jd };
};

/** Calendar-aware Jalali difference (borrowing from previous month lengths). */
export const jalaliAge = (birth: JDate, today: JDate) => {
  let years = today.jy - birth.jy;
  let months = today.jm - birth.jm;
  let days = today.jd - birth.jd;

  if (days < 0) {
    months -= 1;
    const prevMonth = today.jm === 1 ? 12 : today.jm - 1;
    const prevYear = today.jm === 1 ? today.jy - 1 : today.jy;
    days += jalaali.jalaaliMonthLength(prevYear, prevMonth);
    if (days < 0) {
      months -= 1;
      const pm = prevMonth === 1 ? 12 : prevMonth - 1;
      const py = prevMonth === 1 ? prevYear - 1 : prevYear;
      days += jalaali.jalaaliMonthLength(py, pm);
    }
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
};

/** Whole-day difference between two Gregorian dates. */
export const totalDaysBetween = (from: JDate, to: JDate) => {
  const a = jalaali.toGregorian(from.jy, from.jm, from.jd);
  const b = jalaali.toGregorian(to.jy, to.jm, to.jd);
  return Math.round(
    (gToDate(b).getTime() - gToDate(a).getTime()) / 86400000
  );
};

/**
 * Days until the next occurrence of the birthday.
 * Esfand-30 births are clamped to the last day of Esfand in non-leap years.
 */
export const nextBirthdayIn = (
  birth: JDate,
  today: JDate
): { days: number; target: JDate } => {
  let jy = today.jy;
  const maxDay = jalaali.jalaaliMonthLength(jy, birth.jm);
  const bd = Math.min(birth.jd, maxDay);
  let target: JDate = { jy, jm: birth.jm, jd: bd };
  if (totalDaysBetween(today, target) < 0) {
    jy += 1;
    const maxNext = jalaali.jalaaliMonthLength(jy, birth.jm);
    target = { jy, jm: birth.jm, jd: Math.min(birth.jd, maxNext) };
  }
  return { days: totalDaysBetween(today, target), target };
};

const WEEKDAYS_FA = [
  'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه',
];

export const weekdayFa = (d: JDate) => {
  const g = jalaali.toGregorian(d.jy, d.jm, d.jd);
  // JS getDay(): 0=Sunday..6=Saturday
  return WEEKDAYS_FA[(new Date(g.gy, g.gm - 1, g.gd).getDay() + 1) % 7];
};
