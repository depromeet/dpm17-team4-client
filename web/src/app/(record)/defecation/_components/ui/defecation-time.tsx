'use client';

import { type ChangeEvent, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ChevronIcon } from '@/components';
import { cn } from '@/utils/utils-cn';
import type { DefecationFormValues } from '../schemas';
import { formatDate } from '../utils';
import { DefecationBottomSheet } from './defecation-bottom-sheet';

export const DefecationTime = () => {
  const { control } = useFormContext<DefecationFormValues>();
  const [isOpen, setIsOpen] = useState(false);

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

            <DefecationBottomSheet
              isOpen={isOpen}
              selectedHour={field.value.getHours().toString().padStart(2, '0')}
              selectedDate={currentDate}
              onClose={setIsOpen}
              handleDateChange={handleDateChange}
              handleHourChange={handleHourChange}
            />
          </div>
        );
      }}
    />
  );
};
