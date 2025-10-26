'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FieldErrors, useFormContext } from 'react-hook-form';
import { getDateQueryParams } from '@/app/(with-bottom-navigation)/home/_components/utils';
import { BottomBtnBar } from '@/components';
import { QUERY_KEYS } from '@/constants';
import {
  useDefecationMutation,
  useDefecationUpdateMutation,
} from '@/hooks/mutations';
import { activityRecordApi } from '@/apis/activityRecordApi';
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
        onSuccess: async (response) => {
          console.log('🔍 DefecationSubmit - createDefecation success:', response);
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT });
          
          // 해당 날짜의 생활 기록이 있는지 확인
          const dateString = data.selectedWhen.toISOString().slice(0, 10);
          console.log('🔍 DefecationSubmit - checking lifestyle record for date:', dateString);
          
          try {
            const existingLifestyleRecord = await activityRecordApi.getActivityRecord(dateString);
            console.log('🔍 DefecationSubmit - lifestyle record check result:', existingLifestyleRecord);
            
            // 생활 기록이 있든 없든 생활 기록 페이지로 이동 (수정 또는 신규 작성)
            const targetUrl = `/lifestyle${getDateQueryParams(data.selectedWhen)}&from=defecation&toiletRecordId=${response.data.id}`;
            const mode = existingLifestyleRecord ? 'edit' : 'create';
            console.log(`🔍 DefecationSubmit - navigating to lifestyle page (${mode} mode):`, targetUrl);
            router.push(targetUrl);
          } catch (error) {
            console.error('🔍 DefecationSubmit - error checking lifestyle record:', error);
            // API 호출 실패 시 기본적으로 생활 기록 페이지로 이동
            const targetUrl = `/lifestyle${getDateQueryParams(data.selectedWhen)}&from=defecation&toiletRecordId=${response.data.id}`;
            console.log('🔍 DefecationSubmit - API error, navigating to lifestyle page:', targetUrl);
            router.push(targetUrl);
          }
        },
        onError: (error) => {
          console.error('🔍 DefecationSubmit - createDefecation error:', error);
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
