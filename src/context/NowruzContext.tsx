'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCountdown, type CountdownState } from '@/hooks/useCountdown';
import { getActiveNowruz } from '@/utils/nowruzDates';

// Default (SSR-safe) value
const defaultState: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isFinished: false,
  activeYear: getActiveNowruz(),
};

const NowruzContext = createContext<CountdownState>(defaultState);

export const NowruzProvider = ({ children }: { children: ReactNode }) => {
  const state = useCountdown();
  return <NowruzContext.Provider value={state}>{children}</NowruzContext.Provider>;
};

export const useNowruz = () => useContext(NowruzContext);
