'use client';

import { type FieldErrors, useFormContext } from 'react-hook-form';
import { BottomBtnBar } from '@/components';
import { useCreateDefecationMutation } from '@/hooks/mutations/useCreateDefecation';
import { DEFECATION_TRY } from '../constants';
import type { DefecationFormValues } from '../schemas';

export const DefecationSubmit = () => {
  const { handleSubmit } = useFormContext<DefecationFormValues>();
  const { mutate: createDefecation } = useCreateDefecationMutation();

  const onSubmit = (data: DefecationFormValues) => {
    if (data.selectedPain === undefined) {
      return;
    }

    let toiletDuration = 0;
    if (data.selectedTimeTaken === 'LESS_THAN_5_MINUTES') {
      toiletDuration = 5;
    } else if (data.selectedTimeTaken === 'LESS_THAN_10_MINUTES') {
      toiletDuration = 10;
    } else if (data.selectedTimeTaken === 'MORE_THAN_10_MINUTES') {
      toiletDuration = 15;
    }

    createDefecation(
      {
        occurredAt: data.selectedWhen.toISOString(),
        isSuccessful: data.selectedTry === DEFECATION_TRY.DID_POO,
        color: data.selectedColor,
        shape: data.selectedShape,
        pain: data.selectedPain,
        duration: toiletDuration,
        note: data.selectedOptional || '',
      },
      {
        onSuccess: () => {
          alert('데이터가 성공적으로 저장되었습니다!');
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

  const onError = (errors: FieldErrors<DefecationFormValues>) => {
    console.error('Form errors:', errors);
    // NOTE(taehyeon): 에러 처리 로직 (예: 첫 번째 에러 필드로 포커스 이동)
    const firstError = Object.keys(errors)[0];
    alert(`${firstError} 필드를 확인해주세요.`);
  };

  return <BottomBtnBar onSubmit={handleSubmit(onSubmit, onError)} />;
};
