import { useState, useEffect, useRef, useCallback } from 'react';
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
  const lastYearRef = useRef(activeYear.persianYear);

  const [timeLeft, setTimeLeft] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
    activeYear,
  });

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const current = getActiveNowruz();
    const difference = current.date.getTime() - now.getTime();

    // Determine if we just finished the PREVIOUS target year
    const transitioned = current.persianYear > lastYearRef.current;
    
    // We are finished if we just transitioned OR we are at/past the target date for the first time
    const isFinishedNow = transitioned || difference <= 0;

    if (transitioned) {
      lastYearRef.current = current.persianYear;
      setActiveYear(current);
    }

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isFinished: isFinishedNow,
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
  }, [activeYear.persianYear]);

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
};
