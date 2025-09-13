'use client';

import { type FieldErrors, useFormContext } from 'react-hook-form';
import { BottomBtnBar } from '@/components';
import type { DefecationFormValues } from '../schemas';

export const DefecationSubmit = () => {
  const { handleSubmit } = useFormContext<DefecationFormValues>();

  const onSubmit = (data: DefecationFormValues) => {
    console.log('Form submitted:', data);
    // NOTE(taehyeon): 서버로 데이터 전송 로직 구현
  };

  const onError = (errors: FieldErrors<DefecationFormValues>) => {
    console.error('Form errors:', errors);
    // NOTE(taehyeon): 에러 처리 로직 (예: 첫 번째 에러 필드로 포커스 이동)
    const firstError = Object.keys(errors)[0];
    alert(`${firstError} 필드를 확인해주세요.`);
  };

  return <BottomBtnBar onSubmit={handleSubmit(onSubmit, onError)} />;
};
