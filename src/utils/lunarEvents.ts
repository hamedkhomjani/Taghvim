// Hijri (Qamari) calendar helpers and lunar religious events.
// Conversion uses Intl 'islamic-umalqura'; official Iranian dates follow
// moon sighting and may differ by +/-1 day, hence the approximation disclaimer.

export interface HijriDate {
  hy: number;
  hm: number;
  hd: number;
}

const hiFormat = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura-nu-latn', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

export const toHijri = (date: Date): HijriDate => {
  const parts = hiFormat.formatToParts(date);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value.replace(/[^0-9]/g, ''));
  return { hy: get('year'), hm: get('month'), hd: get('day') };
};

export const HIJRI_MONTH_NAMES = [
  'محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی',
  'جمادی الاول', 'جمادی الثانی', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذیقعده', 'ذیحجه',
];

/** Key: "hijriMonth-hijriDay" */
export const LUNAR_EVENTS: ReadonlyMap<string, { label: string; isHoliday: boolean }> = new Map([
  ['1-9', { label: 'تاسوعای حسینی', isHoliday: true }],
  ['1-10', { label: 'عاشورای حسینی', isHoliday: true }],
  ['2-20', { label: 'اربعین حسینی', isHoliday: true }],
  ['2-28', { label: 'وفات رسول اکرم (ص) و شهادت امام حسن مجتبی (ع)', isHoliday: true }],
  ['3-8', { label: 'شهادت امام حسن عسکری (ع)', isHoliday: false }],
  ['3-17', { label: 'میلاد رسول اکرم (ص) و امام جعفر صادق (ع)', isHoliday: true }],
  ['6-3', { label: 'شهادت حضرت فاطمه زهرا (س)', isHoliday: true }],
  ['7-13', { label: 'ولادت امام علی (ع) و روز پدر', isHoliday: true }],
  ['7-27', { label: 'عید سعید مبعث', isHoliday: true }],
  ['8-15', { label: 'ولادت حضرت قائم (عج) و روز جوان', isHoliday: true }],
  ['9-21', { label: 'شهادت امام علی (ع)', isHoliday: true }],
  ['10-1', { label: 'عید سعید فطر', isHoliday: true }],
  ['10-2', { label: 'تعطیل به مناسبت عید سعید فطر', isHoliday: true }],
  ['11-11', { label: 'ولادت امام رضا (ع)', isHoliday: false }],
  ['12-10', { label: 'عید سعید قربان', isHoliday: true }],
  ['12-18', { label: 'عید سعید غدیر خم', isHoliday: true }],
]);
