import { useState, useEffect } from 'react';

// Target date: March 20, 2026 14:46:00 UTC (18:16 Tehran Time)
// This should be updated for future years dynamically or manually.
// For a robust app, we should fetch this from an API or calculate it.
// Here we hardcode for 2026 as per request to focus on UI/UX now.
const NOWRUZ_DATE = new Date('2026-03-20T14:46:00Z');

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = NOWRUZ_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Time is up, maybe handle confetti or success state
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};
