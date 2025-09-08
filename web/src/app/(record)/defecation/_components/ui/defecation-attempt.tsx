'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/utils/utils-cn';
import { DEFECATION_TRY } from '../constants';
import type { DefecationFormValues } from '../schemas';

export const DefecationAttempt = () => {
  const { control, setValue, watch } = useFormContext<DefecationFormValues>();
  const selectedTry = watch('selectedTry');

   const handleClick = (value: string, field:any) => {
      const newValue = selectedTry === value ? '' : value;
      setValue('selectedTry', newValue, { shouldValidate: true });
      field.onChange(newValue);
  };

  return (
    <div className="flex items-start justify-center w-full gap-3">
      <Controller
        name="selectedTry"
        control={control}
        render={({ field }) => (
          <>
            {Object.entries(DEFECATION_TRY).map(([_, value]) => (
              <button
                className={cn(
                  'flex-1 h-12 rounded-lg bg-[#2C2C35] text-[#9D9D9D] whitespace-nowrap flex items-center justify-center',
                  selectedTry === value ? 'bg-[#5170FF] text-white' : ''
                )}
                type="button"
                key={value}
                onClick={() => {
                  handleClick(value, field)
                }}
              >
                <p className="text-base font-bold">{value}</p>
              </button>
            ))}
          </>
        )}
      />
    </div>
  );
};
