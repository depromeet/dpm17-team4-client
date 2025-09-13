'use client';

import { useCallback, useEffect, useRef } from 'react';
import { SCROLL_DELAY } from '../constants';

export const useScrollToSection = <T extends string>() => {
  const refs = useRef<Partial<Record<T, HTMLDivElement | null>>>({});
  const timerRef = useRef<number | null>(null);

  const setRef = (key: T) => (el: HTMLDivElement | null) => {
    refs.current[key] = el;
  };

  const scrollToSection = useCallback((key: T) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      const element = refs.current[key];
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, SCROLL_DELAY);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    []
  );

  return { setRef, scrollToSection };
};
