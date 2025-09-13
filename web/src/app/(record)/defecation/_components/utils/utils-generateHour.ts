import { useMemo } from 'react';
import { HOUR } from '../constants';

export const useHourOptions = () => {
  return useMemo(() => {
    const options = [];
    for (let i = 0; i < HOUR; i++) {
      const value = i.toString().padStart(2, '0');
      options.push({
        id: i + 1,
        time: value,
      });
    }
    return options;
  }, []);
};
