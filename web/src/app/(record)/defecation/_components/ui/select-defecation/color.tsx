'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/utils/utils-cn';
import { DEFECATION_COLOR } from '../../constants';
import type { DefecationFormValues } from '../../schemas';

export default function Color({
  onColorSelect,
}: {
  onColorSelect?: () => void;
}) {
  const { control, setValue } = useFormContext<DefecationFormValues>();

  return (
    <div className="flex items-center justify-between gap-[12.6px] max-[398px]:gap-1">
      <Controller
        name="selectedColor"
        control={control}
        render={({ field }) => (
          <>
            {Object.entries(DEFECATION_COLOR).map(([key, [label, color]]) => (
              <button
                type="button"
                onClick={() => {
                  setValue('selectedColor', key, { shouldValidate: true });
                  field.onChange(key);
                  onColorSelect?.();
                }}
                key={key}
                className="flex flex-col items-center justify-center gap-2.5"
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-[10px]',
                    field.value === key && 'border-[1px] border-white'
                  )}
                  style={{ backgroundColor: color }}
                />
                <div className="text-button-4">{label}</div>
              </button>
            ))}
          </>
        )}
      />
    </div>
  );
}
