// Nowruz (Spring Equinox) dates computed astronomically.
// Uses Jean Meeus' low-precision March equinox algorithm
// (Astronomical Algorithms, 2nd ed., ch. 27), accurate to ~1 minute,
// corrected for Delta T (TT -> UTC) with the Espenak-Meeus polynomial.

export interface NowruzYear {
  persianYear: number;
  date: Date;
  tehranTime: string; // "HH:MM"
}

const DEG = Math.PI / 180;

// Periodic correction terms [A, B, C]: each contributes A·cos(B° + C°·T).
const PERIODIC_TERMS: ReadonlyArray<readonly [number, number, number]> = [
  [485, 324.96, 1934.136],
  [203, 337.23, 32964.467],
  [199, 342.08, 20.186],
  [182, 27.85, 445267.112],
  [156, 73.14, 45036.886],
  [136, 171.52, 22518.443],
  [77, 222.54, 65928.934],
  [74, 296.72, 3034.906],
  [70, 243.58, 9037.513],
  [58, 119.81, 33718.147],
  [52, 297.17, 150.678],
  [50, 21.02, 2281.226],
  [45, 247.54, 29929.562],
  [44, 325.15, 31555.956],
  [29, 60.93, 4443.417],
  [18, 155.12, 67555.328],
  [17, 288.79, 4562.452],
  [16, 198.04, 62894.029],
  [14, 199.76, 31436.921],
  [12, 95.39, 14577.848],
  [12, 287.11, 31931.756],
  [12, 320.81, 34777.259],
  [9, 227.73, 1222.114],
  [8, 15.45, 16859.074],
];

const deltaTSeconds = (year: number): number => {
  const y = year - 2000;
  return 62.92 + 0.32217 * y + 0.005589 * y * y;
};

/** Julian Ephemeris Date of the March equinox for a Gregorian year (in TT). */
const marchEquinoxJDE = (year: number): number => {
  const Y = (year - 2000) / 1000;
  const jde0 =
    2451623.80984 + 365242.37404 * Y + 0.05169 * Y * Y - 0.00411 * Y ** 3 - 0.00057 * Y ** 4;
  const T = (jde0 - 2451545.0) / 36525;
  const W = 35999.373 * T - 2.47;
  const dLambda = 1 + 0.0334 * Math.cos(W * DEG) + 0.0007 * Math.cos(2 * W * DEG);
  const S = PERIODIC_TERMS.reduce(
    (sum, [A, B, C]) => sum + A * Math.cos((B + C * T) * DEG),
    0,
  );
  return jde0 + (0.00001 * S) / dLambda;
};

/** Returns the March equinox of the given Gregorian year as a UTC Date. */
export const marchEquinoxUTC = (year: number): Date => {
  const jdeUTC = marchEquinoxJDE(year) - deltaTSeconds(year) / 86400;
  const ms = (jdeUTC - 2440587.5) * 86400000; // JD -> Unix epoch (JD 2440587.5 = 1970-01-01T00:00Z)
  return new Date(Math.round(ms / 1000) * 1000);
};

const formatTehranTime = (date: Date): string =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tehran',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

/** Nowruz moment for the Persian year that begins in the given Gregorian year. */
export const computeNowruzYear = (gregorianYear: number): NowruzYear => ({
  persianYear: gregorianYear - 621,
  date: marchEquinoxUTC(gregorianYear),
  tehranTime: formatTehranTime(marchEquinoxUTC(gregorianYear)),
});

const buildNowruzYears = (): NowruzYear[] => {
  const currentGregYear = new Date().getFullYear();
  const years: NowruzYear[] = [];
  for (let y = currentGregYear - 1; y <= currentGregYear + 10; y++) {
    years.push(computeNowruzYear(y));
  }
  return years;
};

export const NOWRUZ_YEARS: NowruzYear[] = buildNowruzYears();

/**
 * Returns the next upcoming Nowruz based on the current time.
 * Falls back to the last known year if all have passed.
 */
export const getActiveNowruz = (): NowruzYear => {
  const now = new Date();
  const upcoming = NOWRUZ_YEARS.find((n) => n.date.getTime() > now.getTime());
  return upcoming ?? NOWRUZ_YEARS[NOWRUZ_YEARS.length - 1];
};
