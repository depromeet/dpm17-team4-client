'use client';

import { type ChangeEvent, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ChevronIcon } from '@/components';
import { cn } from '@/utils/utils-cn';
import type { DefecationFormValues } from '../schemas';
import { formatDate, useHourOptions } from '../utils';

export const DefecationTime = () => {
  const { control } = useFormContext<DefecationFormValues>();
  const [isOpen, setIsOpen] = useState(false);

  const hourOptions = useHourOptions();

  return (
    <Controller
      name="selectedWhen"
      control={control}
      render={({ field }) => {
        const currentDate =
          field.value instanceof Date ? field.value : new Date();

        const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;

          if (!value) return;

          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(value)) return;

          const [year, month, day] = value.split('-').map(Number);
          const newDate = new Date(currentDate);
          newDate.setFullYear(year, month - 1, day);

          if (Number.isNaN(newDate.getTime())) return;

          field.onChange(newDate);
        };

        const handleHourChange = (hour: string) => {
          const newDate = new Date(currentDate);
          newDate.setHours(parseInt(hour, 10));
          newDate.setMinutes(0);
          newDate.setSeconds(0);
          newDate.setMilliseconds(0);
          field.onChange(newDate);
        };

        return (
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-h4">배변 시각</p>
            <button
              className="flex items-center gap-1"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p className="text-h3">{formatDate(currentDate)}</p>
              <ChevronIcon
                type="down"
                className={cn(
                  'transition-transform duration-300',
                  isOpen ? 'rotate-180' : ''
                )}
              />
            </button>

            {isOpen && (
              <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-[#17171C] border border-white rounded-lg p-4 flex flex-col gap-4">
                <input
                  type="date"
                  className="bg-gray-700 text-white p-2 rounded"
                  value={`${currentDate.getFullYear()}-${String(
                    currentDate.getMonth() + 1
                  ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(
                    2,
                    '0'
                  )}`}
                  onChange={handleDateChange}
                />
                <div className="w-full flex items-center justify-start gap-2 overflow-x-auto">
                  {hourOptions.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      className={cn(
                        'flex items-center justify-center min-w-10 h-10 bg-[#454552] text-white rounded',
                        currentDate.getHours() === parseInt(option.time, 10)
                          ? 'bg-[#5170FF] text-white'
                          : ''
                      )}
                      onClick={() => handleHourChange(option.time)}
                    >
                      {option.time}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-auto bg-blue-500 text-white rounded-lg p-2"
                  onClick={() => setIsOpen(false)}
                >
                  확인
                </button>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
