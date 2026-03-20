import { useState, useEffect, useRef, useCallback } from 'react';
import { NOWRUZ_YEARS, getActiveNowruz, type NowruzYear } from '@/utils/nowruzDates';

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

  const [timeLeft, setTimeLeft] = useState<CountdownState>(() => {
    const current = getActiveNowruz();
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isFinished: false,
      activeYear: current,
    };
  });

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const current = getActiveNowruz();
    const difference = current.date.getTime() - now.getTime();

    // Find the most recent Nowruz that happened (within last 24 hours)
    const justPassedNowruz = NOWRUZ_YEARS.find(n => {
        const diff = now.getTime() - n.date.getTime();
        return diff >= 0 && diff < 24 * 60 * 60 * 1000; // 24 hours window
    });

    const transitioned = current.persianYear > lastYearRef.current;
    
    // We signal "finished" if we just transitioned, OR if there's a Nowruz that just passed
    const isFinishedNow = transitioned || !!justPassedNowruz;

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
