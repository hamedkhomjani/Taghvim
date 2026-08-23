import jalaali from 'jalaali-js';
import { FIXED_HOLIDAYS } from './iranianHolidays';
import { toHijri, LUNAR_EVENTS, HIJRI_MONTH_NAMES } from './lunarEvents';
import { ZOROASTRIAN_EVENTS } from './zoroastrianEvents';
import { toPersianDigits } from './date';

// National/cultural commemorative days with fixed Jalali dates.
export const SOLAR_OCCASIONS: ReadonlyMap<string, string> = new Map([
  ['2-1', 'روز بزرگداشت سعدی'],
  ['2-3', 'روز بزرگداشت شیخ بهایی و روز ملی کارآفرینی'],
  ['2-10', 'روز ملی خلیج فارس'],
  ['2-25', 'روز بزرگداشت فردوسی و پاسداشت زبان فارسی'],
  ['2-28', 'روز بزرگداشت حکیم عمر خیام'],
  ['4-1', 'روز اصناف'],
  ['4-14', 'روز قلم'],
  ['4-25', 'روز بهزیستی و تأمین اجتماعی'],
  ['5-17', 'روز خبرنگار'],
  ['5-28', 'سالروز کودتای ۲۸ مرداد'],
  ['6-1', 'روز بزرگداشت ابوعلی سینا و روز پزشک'],
  ['6-4', 'زادروز کوروش بزرگ و جشن شهریورگان'],
  ['6-5', 'روز بزرگداشت محمد بن زکریای رازی و روز داروساز'],
  ['6-8', 'روز مبارزه با تروریسم'],
  ['6-11', 'روز ملی صنعت چاپ'],
  ['6-13', 'روز بزرگداشت ابوریحان بیرونی'],
  ['6-21', 'روز سینما'],
  ['6-27', 'روز شعر و ادب پارسی و بزرگداشت استاد شهریار'],
  ['6-31', 'آغاز هفته دفاع مقدس'],
  ['7-13', 'روز نیروی انتظامی'],
  ['7-20', 'روز بزرگداشت حافظ'],
  ['7-24', 'روز پیوند اولیا و مربیان'],
  ['9-5', 'روز بسیج مستضعفین'],
  ['9-8', 'روز نیروی هوایی'],
  ['9-16', 'روز دانشجو'],
  ['9-30', 'شب یلدا (درازترین شب سال)'],
  ['10-12', 'بازگشت امام خمینی (ره) به ایران'],
  ['11-5', 'روز بسیج مستضعفین'],
  ['11-29', 'روز قوه قضاییه'],
  ['12-5', 'روز بزرگداشت خواجه نصیرالدین توسی و روز مهندسی'],
  ['12-15', 'روز درختکاری'],
  ['12-25', 'روز بزرگداشت پروین اعتصامی'],
]);

// Important international (UN/world) days with fixed Gregorian dates.
export const INTERNATIONAL_DAYS: ReadonlyMap<string, string> = new Map([
  ['2-4', 'روز جهانی سرطان'],
  ['2-11', 'روز جهانی زن و دختر در علم'],
  ['2-21', 'روز جهانی زبان مادری'],
  ['3-8', 'روز جهانی زن'],
  ['3-20', 'روز جهانی شادی'],
  ['3-21', 'روز جهانی شعر و روز جهانی جنگل‌ها'],
  ['3-22', 'روز جهانی آب'],
  ['4-7', 'روز جهانی بهداشت'],
  ['4-22', 'روز جهانی زمین'],
  ['5-1', 'روز جهانی کار و کارگر'],
  ['5-12', 'روز جهانی پرستار'],
  ['5-15', 'روز جهانی خانواده'],
  ['5-31', 'روز جهانی بدون دخانیت'],
  ['6-5', 'روز جهانی محیط زیست'],
  ['6-8', 'روز جهانی اقیانوس‌ها'],
  ['6-14', 'روز جهانی اهدای خون'],
  ['6-20', 'روز جهانی پناهنده'],
  ['6-21', 'روز جهانی موسیقی و یوگا'],
  ['7-11', 'روز جهانی جمعیت'],
  ['7-18', 'روز جهانی نلسون ماندلا'],
  ['8-12', 'روز جهانی جوانان'],
  ['8-19', 'روز جهانی بشردوستانه و عکاسی'],
  ['9-8', 'روز جهانی سوادآموزی'],
  ['9-10', 'روز جهانی پیشگیری از خودکشی'],
  ['9-21', 'روز جهانی صلح'],
  ['9-27', 'روز جهانی گردشگری'],
  ['10-1', 'روز جهانی سالمندان'],
  ['10-4', 'روز جهانی حیوانات'],
  ['10-5', 'روز جهانی معلم'],
  ['10-10', 'روز جهانی سلامت روان'],
  ['10-16', 'روز جهانی غذا'],
  ['10-24', 'روز ملل متحد'],
  ['11-14', 'روز جهانی دیابت'],
  ['11-16', 'روز جهانی مدارا'],
  ['11-20', 'روز جهانی کودک'],
  ['12-1', 'روز جهانی مبارزه با ایدز'],
  ['12-3', 'روز جهانی معلولان'],
  ['12-10', 'روز جهانی حقوق بشر'],
]);

export interface EventItem {
  label: string;
  isHoliday: boolean;
  isInternational?: boolean;
  isZoroastrian?: boolean;
  isLunar?: boolean;
  hijriLabel?: string;
}

export interface DayEvents {
  day: number;
  items: EventItem[];
}

/** All occasions of a Jalali month, sorted by day (fixed + lunar + holidays). */
export const getMonthEvents = (jy: number, jm: number): DayEvents[] => {
  const daysInMonth = jalaali.jalaaliMonthLength(jy, jm);
  const byDay = new Map<number, DayEvents>();

  const push = (day: number, item: EventItem) => {
    let entry = byDay.get(day);
    if (!entry) {
      entry = { day, items: [] };
      byDay.set(day, entry);
    }
    entry.items.push(item);
  };

  for (let jd = 1; jd <= daysInMonth; jd++) {
    const solarKey = `${jm}-${jd}`;
    const holidayName = FIXED_HOLIDAYS.get(solarKey);
    if (holidayName) push(jd, { label: holidayName, isHoliday: true });
    const occasion = SOLAR_OCCASIONS.get(solarKey);
    if (occasion) push(jd, { label: occasion, isHoliday: false });

    const g = jalaali.toGregorian(jy, jm, jd);
    const international = INTERNATIONAL_DAYS.get(`${g.gm}-${g.gd}`);
    if (international) push(jd, { label: international, isHoliday: false, isInternational: true });

    const zoroastrian = ZOROASTRIAN_EVENTS.get(solarKey);
    if (zoroastrian) push(jd, { label: zoroastrian, isHoliday: false, isZoroastrian: true });

    const date = new Date(g.gy, g.gm - 1, g.gd);
    const h = toHijri(date);
    let lunarKey = `${h.hm}-${h.hd}`;
    // "LAST-m": the event falls on the final day of Hijri month m
    if (h.hm >= 1 && h.hm <= 12 && !LUNAR_EVENTS.has(lunarKey)) {
      const hTomorrow = toHijri(new Date(g.gy, g.gm - 1, g.gd + 1));
      if (hTomorrow.hm !== h.hm) lunarKey = `LAST-${h.hm}`;
    }
    const lunar = LUNAR_EVENTS.get(lunarKey);
    if (lunar) {
      push(jd, {
        label: lunar.label,
        isHoliday: lunar.isHoliday,
        isLunar: true,
        hijriLabel: `${toPersianDigits(h.hd)} ${HIJRI_MONTH_NAMES[h.hm - 1]}`,
      });
    }
  }

  return Array.from(byDay.values()).sort((a, b) => a.day - b.day);
};
