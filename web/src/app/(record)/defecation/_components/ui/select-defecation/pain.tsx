'use client';

import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { DefecationFormValues } from '../../schemas';
import { DraggableProgressBar } from '../common';

export default function Pain({
  pain,
  onPainSelect,
}: {
  pain?: number;
  onPainSelect?: () => void;
}) {
  const { control, setValue } = useFormContext<DefecationFormValues>();

  useEffect(() => {
    if (pain !== undefined) {
      setValue('selectedPain', pain);
    }
  }, [pain, setValue]);

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
      <div className='flex justify-between mt-1'>
        <div className='text-[#96D89B] font-semibold text-sm'>고통이 뭐죠</div>
        <div className='text-[#FD5656] font-semibold text-sm'>똥꼬 찢</div>
      </div>
    </div>
  );
}
