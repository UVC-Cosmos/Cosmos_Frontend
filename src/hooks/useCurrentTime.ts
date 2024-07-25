import { useEffect, useRef, useState } from 'react';

export const useCurrentTime = (): string => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(formattedTime);
      const delay = 1000 - (now.getMilliseconds() % 1000);
      intervalRef.current = setTimeout(updateTime, delay);
    };

    updateTime();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current as unknown as number);
      }
    };
  }, []);

  return currentTime;
};
