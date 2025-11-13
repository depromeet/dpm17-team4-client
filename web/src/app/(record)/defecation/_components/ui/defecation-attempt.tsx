'use client';

import { useEffect } from 'react';
import { Controller, type FieldValues, useFormContext } from 'react-hook-form';
import type { DefecationDataResponseDto } from '@/types/dto/defecation.dto';
import { cn } from '@/utils/utils-cn';
import { DEFECATION_TRY, SCROLL_DELAY } from '../constants';
import type { DefecationFormValues } from '../schemas';

interface DefecationAttemptProps {
  data?: DefecationDataResponseDto;
  colorRef?: React.RefObject<HTMLDivElement | null>;
  onOpenColorSection?: () => void;
  onCloseColorSection?: () => void;
}

export const DefecationAttempt = ({
  data,
  colorRef,
  onOpenColorSection,
  onCloseColorSection,
}: DefecationAttemptProps) => {
  const { control, setValue, watch, resetField } =
    useFormContext<DefecationFormValues>();
  const selectedTry = watch('selectedTry');

  useEffect(() => {
    if (data) {
      setValue(
        'selectedTry',
        data.data.isSuccessful
          ? DEFECATION_TRY.DID_POO
          : DEFECATION_TRY.DID_NOT_POO
      );
    }
  }, [data, setValue]);

  const handleClick = (value: string, field: FieldValues) => {
    const newValue = selectedTry === value ? '' : value;
    setValue('selectedTry', newValue, { shouldValidate: true });
    field.onChange(newValue);

    // DEFECATION_TRY 버튼을 선택하면 다음 폼(COLOR 섹션)으로 스크롤하고 열기
    if (newValue) {
      if (newValue === DEFECATION_TRY.DID_NOT_POO) {
        resetField('selectedColor');
        resetField('selectedShape');
        resetField('selectedPain');
        resetField('selectedTimeTaken');
        resetField('selectedOptional');
        onCloseColorSection?.();
        return;
      }
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
                  'flex-1 h-12 rounded-[10px] bg-gray-800 whitespace-nowrap flex items-center justify-center',
                  'transition-all duration-200',
                  selectedTry === value
                    ? 'bg-primary-600 text-white'
                    : !selectedTry
                      ? 'text-white'
                      : 'text-white/40'
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
