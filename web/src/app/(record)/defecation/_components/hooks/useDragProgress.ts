'use client';

import { useCallback, useEffect, useRef } from 'react';

type UseDragProgressProps = {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  onDragEnd?: () => void;
};

export const useDragProgress = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  onDragEnd,
}: UseDragProgressProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  const getNewValueFromPosition = useCallback(
    (clientX: number): number => {
      if (!progressBarRef.current) return value;

      const circleElement = progressBarRef.current
        .children[0] as HTMLDivElement;
      if (!circleElement) return value;

      const circleWidth = circleElement.offsetWidth;

      const progressBarRect = progressBarRef.current.getBoundingClientRect();
      const progressBarWidth = progressBarRect.width;

      if (progressBarWidth === 0) return value;

      const effectiveWidth = progressBarWidth - circleWidth;
      const middle = circleWidth / 2;

      const clickPositionInBar = clientX - progressBarRect.left;

      const clampedClickPosition = Math.max(
        middle,
        Math.min(clickPositionInBar, progressBarWidth - middle)
      );

      const positionRatio =
        effectiveWidth > 0
          ? (clampedClickPosition - middle) / effectiveWidth
          : 0;

      const rawValue = min + positionRatio * (max - min);

      const steppedValue = Math.round(rawValue / step) * step;

      return Math.max(min, Math.min(max, steppedValue));
    },
    [max, min, step, value]
  );

  const handleInteraction = useCallback(
    (clientX: number) => {
      const newValue = getNewValueFromPosition(clientX);
      if (newValue !== value) {
        onChange(newValue);
      }
    },
    [getNewValueFromPosition, onChange, value]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleInteraction(e.clientX);
    },
    [handleInteraction]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    onDragEnd?.();
  }, [handleMouseMove, onDragEnd]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      isDraggingRef.current = true;
      document.body.style.cursor = 'grabbing';
      handleInteraction(e.clientX);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [handleInteraction, handleMouseMove, handleMouseUp]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInteraction(e.touches[0].clientX);
      }
    },
    [handleInteraction]
  );

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    onDragEnd?.();
  }, [handleTouchMove, onDragEnd]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      if (e.touches.length > 0) {
        handleInteraction(e.touches[0].clientX);
      }
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [handleInteraction, handleTouchMove, handleTouchEnd]
  );

  const percentage = max - min === 0 ? 0 : ((value - min) / (max - min)) * 100;

  return {
    progressBarRef,
    percentage,
    handleMouseDown,
    handleTouchStart,
  };
};
