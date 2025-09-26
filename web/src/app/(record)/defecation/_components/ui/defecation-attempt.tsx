'use client';

import { Controller, type FieldValues, useFormContext } from 'react-hook-form';
import { cn } from '@/utils/utils-cn';
import { DEFECATION_TRY, SCROLL_DELAY } from '../constants';
import type { DefecationFormValues } from '../schemas';

interface DefecationAttemptProps {
  colorRef?: React.RefObject<HTMLDivElement | null>;
  onOpenColorSection?: () => void;
}

export const DefecationAttempt = ({
  colorRef,
  onOpenColorSection,
}: DefecationAttemptProps) => {
  const { control, setValue, watch } = useFormContext<DefecationFormValues>();
  const selectedTry = watch('selectedTry');

  const handleClick = (value: string, field: FieldValues) => {
    const newValue = selectedTry === value ? '' : value;
    setValue('selectedTry', newValue, { shouldValidate: true });
    field.onChange(newValue);

    // DEFECATION_TRY 버튼을 선택하면 다음 폼(COLOR 섹션)으로 스크롤하고 열기
    if (newValue) {
      // COLOR 섹션 열기
      onOpenColorSection?.();

      // COLOR 섹션으로 스크롤
      if (colorRef?.current) {
        setTimeout(() => {
          colorRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, SCROLL_DELAY);
      }
    }
  };

  return (
    <div className="flex items-start justify-center w-full gap-3">
      <Controller
        name="selectedTry"
        control={control}
        render={({ field }: { field: FieldValues }) => (
          <>
            {Object.entries(DEFECATION_TRY).map(([_, value]) => (
              <button
                className={cn(
                  'flex-1 h-12 rounded-[10px] bg-gray-800 text-white/40 whitespace-nowrap flex items-center justify-center',
                  'transition-all duration-200',
                  selectedTry === value ? 'bg-primary-600 text-white' : ''
                )}
                type="button"
                key={value}
                onClick={() => {
                  handleClick(value, field);
                }}
              >
                <p className="text-button-3">{value}</p>
              </button>
            ))}
          </>
        )}
      />
    </div>
  );
};
