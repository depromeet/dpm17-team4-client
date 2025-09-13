import { useState, useEffect } from 'react';

/**
 * 디바운스 훅
 * @param value - 디바운스할 값
 * @param delay - 디바운스 지연 시간 (밀리초)
 * @returns 디바운스된 값
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
