'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { type DefecationFormValues, defecationFormSchema } from '../schemas';

export const DefecationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('toiletRecordId') !== null;

  // URL 파라미터에서 날짜 가져오기
  const initialDate = useMemo(() => {
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const day = searchParams.get('day');

    if (year && month && day) {
      // 날짜는 URL 파라미터에서 가져오되, 시간은 현재 시간 사용
      const dateFromParams = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10)
      );
      const now = new Date();
      // 시간 정보는 현재 시간 사용
      dateFromParams.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        0
      );
      return dateFromParams;
    }

    return new Date();
  }, [searchParams]);

  const methods = useForm<DefecationFormValues>({
    resolver: zodResolver(defecationFormSchema),
    defaultValues: {
      selectedWhen: initialDate,
      selectedTry: '',
      selectedColor: '',
      selectedShape: '',
      selectedPain: -1,
      selectedTimeTaken: '',
      selectedOptional: 'initial',
    },
    mode: 'onChange',
  });

  // 편집 모드가 아닐 때만 URL 파라미터가 변경되면 폼 값을 업데이트
  useEffect(() => {
    if (!isEdit) {
      methods.reset({
        selectedWhen: initialDate,
        selectedTry: '',
        selectedColor: '',
        selectedShape: '',
        selectedPain: -1,
        selectedTimeTaken: '',
        selectedOptional: 'initial',
      });
    }
  }, [initialDate, isEdit, methods]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
