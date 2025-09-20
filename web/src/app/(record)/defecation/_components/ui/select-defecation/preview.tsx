'use client';

import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils/utils-cn';
import {
  DEFECATION_COLOR,
  DEFECATION_SHAPE,
  DEFECATION_TIME_TAKEN,
} from '../../constants';
import type { DefecationFormValues } from '../../schemas';
import type {
  DefecationTryColorKey,
  DefecationTryShapeKey,
  DefecationTryTimeTakenKey,
} from '../../types';

export default function Preview({ currentKey }: { currentKey: string }) {
  const { getValues } = useFormContext<DefecationFormValues>();

  const handlePreview = useCallback(() => {
    switch (currentKey) {
      case 'COLOR': {
        const colorKey = getValues('selectedColor') as DefecationTryColorKey;
        if (!colorKey || !DEFECATION_COLOR[colorKey]) {
          return null;
        }
        const [_, colorCode] = DEFECATION_COLOR[colorKey];

        return (
          <div className="flex items-center gap-2">
            <div
              className="h-6.5 w-6.5 rounded-[6px]"
              style={{ backgroundColor: colorCode }}
            />
          </div>
        );
      }
      case 'SHAPE': {
        const shapeKey = getValues('selectedShape') as DefecationTryShapeKey;
        if (!shapeKey || !DEFECATION_SHAPE[shapeKey]) {
          return null;
        }
        const shapeCode = DEFECATION_SHAPE[shapeKey];

        return (
          <div className="text-[13px] font-semibold rounded-[6px] bg-[#454551] py-1 px-2">
            {shapeCode}
          </div>
        );
      }
      case 'PAIN': {
        const painKey = getValues('selectedPain');
        if (painKey === undefined) return null;

        const calculatedPainCode = () => {
          if (painKey >= 0 && painKey < 10) return '10';
          else if (painKey >= 10 && painKey < 30) return '30';
          else if (painKey >= 30 && painKey <= 50) return '50';
          else if (painKey >= 50 && painKey <= 70) return '70';
          else if (painKey >= 70 && painKey <= 100) return '100';
          else return '0';
        };

        return (
          <div
            className={cn('text-[13px] font-semibold rounded-[6px] py-1 px-2', {
              'bg-[#74CE7E]': calculatedPainCode() === '10',
              'bg-[#8BB35F]': calculatedPainCode() === '30',
              'bg-[#D6AC6A]': calculatedPainCode() === '50',
              'bg-[#E98259]': calculatedPainCode() === '70',
              'bg-[#FB5A58]': calculatedPainCode() === '100',
            })}
          >
            {calculatedPainCode()}%
          </div>
        );
      }
      case 'TIME_TAKEN': {
        const timeTakenKey = getValues(
          'selectedTimeTaken'
        ) as DefecationTryTimeTakenKey;
        if (!timeTakenKey || !DEFECATION_TIME_TAKEN[timeTakenKey]) {
          return null;
        }
        const timeTakenCode = DEFECATION_TIME_TAKEN[timeTakenKey];

        return (
          <div className="text-[13px] font-semibold rounded-[6px] bg-[#454551] py-1 px-2">
            {timeTakenCode}
          </div>
        );
      }
      case 'OPTIONAL': {
        const optionalKey = getValues('selectedOptional');
        if (optionalKey === 'initial') return null;

        return (
          <div className="text-[13px] font-semibold rounded-[6px] bg-[#454551] py-1 px-2">
            {optionalKey ? '메모 있음' : '메모 없음'}
          </div>
        );
      }
    }
  }, [currentKey, getValues]);

  useEffect(() => {
    handlePreview();
  }, [handlePreview]);

  return <div>{handlePreview()}</div>;
}
