'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/utils/utils-cn';
import { DEFECATION_PAIN } from '../../constants';
import type { DefecationFormValues } from '../../schemas';
import { SelectButton } from '../common';

export default function Pain({ onPainSelect }: { onPainSelect?: () => void }) {
  const { control, setValue } = useFormContext<DefecationFormValues>();

  return (
    <div>
      <p className="text-sm font-medium opacity-80 mb-3.5">
        힘줄 때 느낀 고통은 어땠나요?
      </p>
      <div className="flex flex-wrap gap-[11px]">
        <Controller
          name="selectedPain"
          control={control}
          render={({ field }) => (
            <>
              {Object.entries(DEFECATION_PAIN).map(([key, value]) => (
                <SelectButton
                  key={key}
                  isSelected={field.value === key}
                  onClick={() => {
                    setValue('selectedPain', key, { shouldValidate: true });
                    field.onChange(key);
                    onPainSelect?.();
                  }}
                  className="flex-1"
                  style={{
                    minHeight: '20px !important',
                    minWidth: '20px !important',
                  }}
                >
                  <p
                    className={cn(
                      'flex items-center justify-center text-sm font-medium text-center whitespace-nowrap',
                      field.value === key && 'text-white'
                    )}
                  >
                    {value}
                  </p>
                </SelectButton>
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
}
