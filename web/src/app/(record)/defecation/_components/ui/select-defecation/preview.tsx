'use client';

import { useFormContext, useWatch } from 'react-hook-form';
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
  const { control } = useFormContext<DefecationFormValues>();
  const values = useWatch({ control });

  const handlePreview = () => {
    switch (currentKey) {
      case 'COLOR': {
        const colorKey = values.selectedColor as DefecationTryColorKey;
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
        const shapeKey = values.selectedShape as DefecationTryShapeKey;
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
        const painKey = values.selectedPain;
        if (painKey === undefined || painKey === -1) return null;

        const getColorClass = () => {
          if (painKey >= 0 && painKey <= 10) return 'bg-[#74CE7E]';
          if (painKey > 10 && painKey <= 30) return 'bg-[#8BB35F]';
          if (painKey > 30 && painKey <= 50) return 'bg-[#D6AC6A]';
          if (painKey > 50 && painKey <= 70) return 'bg-[#E98259]';
          if (painKey > 70 && painKey <= 100) return 'bg-[#FB5A58]';
          return 'bg-[#454551]';
        };

        return (
          <div
            className={cn(
              'text-[13px] font-semibold rounded-[6px] py-1 px-2',
              getColorClass()
            )}
          >
            {painKey}%
          </div>
        );
      }
      case 'TIME_TAKEN': {
        const timeTakenKey =
          values.selectedTimeTaken as DefecationTryTimeTakenKey;
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
        const optionalKey = values.selectedOptional;
        if (optionalKey === 'initial') return null;

        return (
          <div className="text-[13px] font-semibold rounded-[6px] bg-[#454551] py-1 px-2">
            {optionalKey ? '메모 있음' : '메모 없음'}
          </div>
        );
      }
    }
  };

  return <div>{handlePreview()}</div>;
}
