'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import type { DefecationFormValues } from '../../schemas';

export default function Optional({ isOpen }: { isOpen: boolean }) {
  const { register } = useFormContext<DefecationFormValues>();
  const { ref, ...rest } = register('selectedOptional');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div>
      <p className="text-sm font-medium opacity-80 mb-5">
        출혈, 악취, 복용 약 등 특이사항을 메모해요!
      </p>
      <input
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        type="text"
        placeholder="ex. 출혈이 많이 났어요 (최대 20자)"
        maxLength={20}
        className="w-full h-6 bg-transparent border-b-[1px] border-b-white/30 text-sm font-normal focus:outline-none"
      />
    </div>
  );
}
