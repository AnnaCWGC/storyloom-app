import { useEffect, useMemo, useState } from 'react';

type CountdownResult = {
  totalMs: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
  formatted: string | null;
};

function getTimeRemaining(targetDate?: string | null): CountdownResult {
  if (!targetDate) {
    return {
      totalMs: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isFinished: true,
      formatted: null,
    };
  }

  const targetMs = new Date(targetDate).getTime();
  const nowMs = Date.now();
  const totalMs = Math.max(0, targetMs - nowMs);

  const totalSeconds = Math.floor(totalMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatted =
    hours > 0
      ? `${hours}h ${String(minutes).padStart(2, '0')}m`
      : `${minutes}m ${String(seconds).padStart(2, '0')}s`;

  return {
    totalMs,
    hours,
    minutes,
    seconds,
    isFinished: totalMs <= 0,
    formatted,
  };
}

export function useCountdown(targetDate?: string | null) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return useMemo(() => {
    void now;

    return getTimeRemaining(targetDate);
  }, [now, targetDate]);
}
