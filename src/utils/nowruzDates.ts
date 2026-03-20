// Nowruz (Spring Equinox) dates for upcoming years
// Times are in UTC. Tehran is UTC+3:30.
export interface NowruzYear {
  persianYear: number;
  date: Date;
  tehranTime: string; // "HH:MM"
}

export const NOWRUZ_YEARS: NowruzYear[] = [
  {
    persianYear: 1405,
    date: new Date('2026-03-20T14:46:00Z'),
    tehranTime: '18:16',
  },
  {
    persianYear: 1406,
    date: new Date('2027-03-21T08:24:00Z'),
    tehranTime: '11:54',
  },
  {
    persianYear: 1407,
    date: new Date('2028-03-20T14:17:00Z'),
    tehranTime: '17:47',
  },
];

/**
 * Returns the next upcoming Nowruz based on the current time.
 * Falls back to the last known year if all have passed.
 */
export const getActiveNowruz = (): NowruzYear => {
  const now = new Date();
  const upcoming = NOWRUZ_YEARS.find((n) => n.date.getTime() > now.getTime());
  return upcoming ?? NOWRUZ_YEARS[NOWRUZ_YEARS.length - 1];
};
