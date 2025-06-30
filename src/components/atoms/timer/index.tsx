'use client';
import { Text } from '@/components/atoms/text';
import { cn } from '@/lib/utils';
import { AlarmClock } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

type TimerProps = {
  time: number; //minutes
  format?: 'hh:mm:ss' | 'hh:mm' | 'mm:ss';
  classNames?: string;
};
// TODO: Properly document this component.
// TODO: extend the props in this component
// TODO: memoize this component
const Timer = ({
  time,
  format = 'hh:mm:ss',
  classNames,
  ...props
}: TimerProps) => {
  const totalSeconds = time * 60;
  const [_time, setTime] = useState<number>(totalSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime: number) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    switch (format) {
      case 'hh:mm':
        return `${hours}hr${hours > 1 ? 's' : ''} : ${minutes < 10 ? '0' : ''}${minutes}ms`;
      case 'mm:ss':
        const totalMinutes = Math.floor(seconds / 60);
        return `${totalMinutes}ms : ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}s${remainingSeconds > 1 ? 's' : ''}`;
      case 'hh:mm:ss':
      default:
        return `${hours}hr${hours > 1 ? 's' : ''} : ${minutes < 10 ? '0' : ''}${minutes}ms : ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}s${remainingSeconds > 1 ? 's' : ''}`;
    }
  };

  return (
    <Text
      variant="ps"
      fontWeight="medium"
      color="text-red-tone-300"
      classNames={cn(
        'flex flex-nowrap whitespace-nowrap gap-1 items-center border border-green-tone-300 rounded-full w-fit min-w-20 py-1 px-2',
        classNames,
      )}
      {...props}
    >
      <AlarmClock height={16} width={16} color="#666666" className="shrink-0" />
      {formatTime(_time)}
    </Text>
  );
};

export { Timer };
