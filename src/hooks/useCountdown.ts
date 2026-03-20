import { useState, useEffect, useRef } from 'react';
import { getActiveNowruz, type NowruzYear } from '@/utils/nowruzDates';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean; // This will trigger the popup
  activeYear: NowruzYear;
}

export const useCountdown = (): CountdownState => {
  const [activeYear, setActiveYear] = useState<NowruzYear>(getActiveNowruz);
  const lastYearRef = useRef(activeYear.persianYear);

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
      const current = getActiveNowruz();
      
      const difference = current.date.getTime() - now.getTime();

      // If we just transitioned to a new year (the previous one just finished)
      // or if the difference is <= 0 for the current target
      const justFinished = current.persianYear > lastYearRef.current || difference <= 0;

      if (justFinished && current.persianYear > lastYearRef.current) {
        // Update the ref to the new year so we don't trigger finish again immediately
        lastYearRef.current = current.persianYear;
        setActiveYear(current);
      }

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isFinished: justFinished, // Signal to show popup
          activeYear: current,
        });
      } else {
        // This case handles the exact 0 or if we ran out of dates
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
