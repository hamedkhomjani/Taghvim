// Official Iranian holidays with fixed dates in the Solar Hijri calendar.
// Lunar (Hijri) holidays move each year and are intentionally not listed here.

export const FIXED_HOLIDAYS: ReadonlyMap<string, string> = new Map([
  ['1-1', 'نوروز'],
  ['1-2', 'عید نوروز'],
  ['1-3', 'عید نوروز'],
  ['1-4', 'عید نوروز'],
  ['1-12', 'روز جمهوری اسلامی'],
  ['1-13', 'سیزده‌بدر'],
  ['3-14', 'رحلت امام خمینی'],
  ['3-15', 'قیام ۱۵ خرداد'],
  ['8-13', 'روز ملی مبارزه با استکبار جهانی'],
  ['11-22', 'پیروزی انقلاب اسلامی'],
  ['12-29', 'ملی شدن صنعت نفت'],
]);

export const getHolidayName = (jm: number, jd: number): string | undefined =>
  FIXED_HOLIDAYS.get(`${jm}-${jd}`);
