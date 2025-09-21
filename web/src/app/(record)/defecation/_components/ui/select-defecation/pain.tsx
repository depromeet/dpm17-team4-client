'use client';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDebounce } from '@/hooks';
import type { DefecationFormValues } from '../../schemas';
import { DraggableProgressBar } from '../common';

const DEBOUNCE_DELAY = 300;

export default function Pain({ onPainSelect }: { onPainSelect?: () => void }) {
  const { control, setValue } = useFormContext<DefecationFormValues>();
  const [painValue, setPainValue] = useState<number | null>(null);

  const debouncedPainValue = useDebounce(painValue, DEBOUNCE_DELAY);

  useEffect(() => {
    setValue('selectedPain', debouncedPainValue ?? undefined, {
      shouldValidate: true,
    });
  }, [debouncedPainValue, setValue]);

  return (
    <div>
      <p className="text-body3-r opacity-80 mb-3.5">
        힘줄 때 느낀 고통은 어땠나요?
      </p>
      <div className="flex items-center justify-start gap-1">
        <Controller
          name="selectedPain"
          control={control}
          render={() => (
            <DraggableProgressBar
              value={painValue ?? 0}
              onChange={setPainValue}
              onDragEnd={onPainSelect}
            />
          )}
        />
      </div>
    </div>
  );
}
