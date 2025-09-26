'use client';

import { Controller, useFormContext } from 'react-hook-form';
import type { DefecationFormValues } from '../../schemas';
import { DraggableProgressBar } from '../common';

export default function Pain({ onPainSelect }: { onPainSelect?: () => void }) {
  const { control } = useFormContext<DefecationFormValues>();

  return (
    <div>
      <p className="text-body3-r opacity-80 mb-3.5">
        힘줄 때 느낀 고통은 어땠나요?
      </p>
      <div className="flex items-center justify-start gap-1">
        <Controller
          name="selectedPain"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DraggableProgressBar
              value={value ?? 0}
              onChange={onChange}
              onDragEnd={onPainSelect}
            />
          )}
        />
      </div>
    </div>
  );
}
