'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FieldErrors, useFormContext } from 'react-hook-form';
import { BottomBtnBar } from '@/components';
import { QUERY_KEYS } from '@/constants';
import {
  useDefecationMutation,
  useDefecationUpdateMutation,
} from '@/hooks/mutations';
import { DEFECATION_TRY } from '../constants';
import type { DefecationFormValues } from '../schemas';
import { getToiletDuration } from '../utils/utils-getToiletDuration';

export const DefecationSubmit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('toiletRecordId') !== null;

  const { handleSubmit } = useFormContext<DefecationFormValues>();

  const { mutate: createDefecation } = useDefecationMutation();
  const { mutate: updateDefecation } = useDefecationUpdateMutation();
  const queryClient = useQueryClient();

  const onSubmit = (data: DefecationFormValues) => {
    if (data.selectedPain === undefined) {
      return;
    }

    const toiletDuration = getToiletDuration(data.selectedTimeTaken);

    const defecationData = {
      occurredAt: data.selectedWhen.toISOString(),
      isSuccessful: data.selectedTry === DEFECATION_TRY.DID_POO,
      color: data.selectedColor || '',
      shape: data.selectedShape || '',
      pain: data.selectedPain,
      duration: toiletDuration,
      note: data.selectedOptional || '',
    };

    if (isEdit) {
      updateDefecation(
        {
          toiletRecordId: Number(searchParams.get('toiletRecordId')),
          ...defecationData,
        },
        {
          onSuccess: () => {
            router.push('/defecation-complete');
          },
          onError: (error) => {
            alert(error.message);
          },
        }
      );
    } else {
      createDefecation(defecationData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT });
          router.push('/defecation-complete');
        },
        onError: (error) => {
          alert(error.message);
        },
      });
    }
  };

  const onError = (errors: FieldErrors<DefecationFormValues>) => {
    console.error('Form errors:', errors);
    // NOTE(taehyeon): 에러 처리 로직 (예: 첫 번째 에러 필드로 포커스 이동)
    const firstError = Object.keys(errors)[0];
    alert(`${firstError} 필드를 확인해주세요.`);
  };

  return (
    <BottomBtnBar
      text={isEdit ? '수정' : '다음'}
      onSubmit={handleSubmit(onSubmit, onError)}
    />
  );
};
