'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DeleteIcon } from '@/components';
import type { DefecationFormValues } from '../../schemas';

export default function Optional({
  isOpen,
  onOptionalSelect,
}: {
  isOpen: boolean;
  onOptionalSelect?: () => void;
}) {
  const { register, setValue, getValues } =
    useFormContext<DefecationFormValues>();
  const { ref, ...rest } = register('selectedOptional');

  const [showDelete, setShowDelete] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const currentValue = getValues('selectedOptional');
      if (currentValue === 'initial') {
        inputRef.current.value = '';
      }
      inputRef.current.focus();
      setShowDelete(inputRef.current.value.length > 0);
    }
  }, [isOpen, getValues]);

  return (
    <div>
      <p className="text-body3-r text-white opacity-80 mb-5">
        출혈, 악취, 복용 약 등 특이사항을 메모해요!
      </p>
      <div className="relative">
        <input
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          type="text"
          placeholder="ex. 출혈이 많이 났어요 (최대 30자)"
          maxLength={30}
          onChange={(e) => {
            rest.onChange(e);
            setShowDelete(e.target.value.length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setValue('selectedOptional', inputRef.current?.value, {
                shouldValidate: true,
              });
              onOptionalSelect?.();
            }
          }}
          className="w-full h-6 pb-2 pl-2 pr-6 bg-transparent border-b-[1px] border-b-white/30 text-sm font-normal focus:outline-none focus:border-b-white"
        />
        {showDelete && (
          <button
            className="absolute right-0 top-0"
            type="button"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.value = '';
              }
              inputRef.current?.focus();
              setShowDelete(false);
              setValue('selectedOptional', '', { shouldDirty: true });
            }}
          >
            <DeleteIcon className="text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
}
