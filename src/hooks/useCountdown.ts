import { useState, useEffect } from 'react';
import { getActiveNowruz, type NowruzYear } from '@/utils/nowruzDates';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
  activeYear: NowruzYear;
}

export const useCountdown = (): CountdownState => {
  const [activeYear, setActiveYear] = useState<NowruzYear>(getActiveNowruz);

  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
    activeYear,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      // Re-evaluate which year is active (in case we crossed a boundary)
      const current = getActiveNowruz();
      if (current.persianYear !== activeYear.persianYear) {
        setActiveYear(current);
      }

      const difference = current.date.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isFinished: false,
          activeYear: current,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isFinished: true,
          activeYear: current,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [activeYear.persianYear]);

  return timeLeft;
};
