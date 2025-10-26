'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FieldErrors, useFormContext } from 'react-hook-form';
import { activityRecordApi } from '@/apis/activityRecordApi';
import { getDateQueryParams } from '@/app/(with-bottom-navigation)/home/_components/utils';
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
  const from = searchParams.get('from');

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
          onSuccess: async () => {
            console.log('🔍 DefecationSubmit - updateDefecation success');
            
            // 모든 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT });
            queryClient.invalidateQueries({ 
              queryKey: [QUERY_KEYS.DEFECATION_RECORD_LIST] 
            });
            queryClient.invalidateQueries({ 
              queryKey: [QUERY_KEYS.CALENDAR] 
            });
            queryClient.invalidateQueries({ 
              queryKey: [QUERY_KEYS.CALENDAR_BY_DATE] 
            });

            // 캘린더에서 온 경우 캘린더로 리디렉션
            if (from === 'calendar') {
              console.log('🔍 DefecationSubmit - navigating to calendar');
              router.push('/calendar');
              return;
            }

            // 해당 날짜의 생활 기록이 있는지 확인
            const dateString = data.selectedWhen.toISOString().slice(0, 10);
            console.log(
              '🔍 DefecationSubmit - checking lifestyle record for date:',
              dateString
            );

            try {
              const existingLifestyleRecord =
                await activityRecordApi.getActivityRecord(dateString);
              console.log(
                '🔍 DefecationSubmit - lifestyle record check result:',
                existingLifestyleRecord
              );

              // 생활 기록이 있든 없든 생활 기록 페이지로 이동 (수정 또는 신규 작성)
              const targetUrl = `/lifestyle${getDateQueryParams(data.selectedWhen)}&from=defecation&toiletRecordId=${searchParams.get('toiletRecordId')}`;
              const mode = existingLifestyleRecord ? 'edit' : 'create';
              console.log(
                `🔍 DefecationSubmit - navigating to lifestyle page (${mode} mode):`,
                targetUrl
              );
              router.push(targetUrl);
            } catch (error) {
              console.error(
                '🔍 DefecationSubmit - error checking lifestyle record:',
                error
              );
              // API 호출 실패 시 기본적으로 생활 기록 페이지로 이동
              const targetUrl = `/lifestyle${getDateQueryParams(data.selectedWhen)}&from=defecation&toiletRecordId=${searchParams.get('toiletRecordId')}`;
              console.log(
                '🔍 DefecationSubmit - API error, navigating to lifestyle page:',
                targetUrl
              );
              router.push(targetUrl);
            }
          },
          onError: (error) => {
            alert(error.message);
          },
        }
      );
    } else {
      createDefecation(defecationData, {
        onSuccess: async (response) => {
          console.log(
            '🔍 DefecationSubmit - createDefecation success:',
            response
          );
          
          // 모든 관련 쿼리 무효화
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT });
          queryClient.invalidateQueries({ 
            queryKey: [QUERY_KEYS.DEFECATION_RECORD_LIST] 
          });
          queryClient.invalidateQueries({ 
            queryKey: [QUERY_KEYS.CALENDAR] 
          });
          queryClient.invalidateQueries({ 
            queryKey: [QUERY_KEYS.CALENDAR_BY_DATE] 
          });

          // 캘린더에서 온 경우 캘린더로 리디렉션
          if (from === 'calendar') {
            console.log('🔍 DefecationSubmit - navigating to calendar');
            router.push('/calendar');
            return;
          }

          // 해당 날짜의 생활 기록이 있는지 확인
          const dateString = data.selectedWhen.toISOString().slice(0, 10);
          console.log(
            '🔍 DefecationSubmit - checking lifestyle record for date:',
            dateString
          );

          try {
            const existingLifestyleRecord =
              await activityRecordApi.getActivityRecord(dateString);
            console.log(
              '🔍 DefecationSubmit - lifestyle record check result:',
              existingLifestyleRecord
            );

            // 생활 기록이 있든 없든 생활 기록 페이지로 이동 (수정 또는 신규 작성)
            const targetUrl = `/lifestyle${getDateQueryParams(data.selectedWhen)}&from=defecation&toiletRecordId=${response.data.id}`;
            const mode = existingLifestyleRecord ? 'edit' : 'create';
            console.log(
              `🔍 DefecationSubmit - navigating to lifestyle page (${mode} mode):`,
              targetUrl
            );
            router.push(targetUrl);
          } catch (error) {
            console.error(
              '🔍 DefecationSubmit - error checking lifestyle record:',
              error
            );
            // API 호출 실패 시 기본적으로 생활 기록 페이지로 이동
            const targetUrl = `/lifestyle${getDateQueryParams(data.selectedWhen)}&from=defecation&toiletRecordId=${response.data.id}`;
            console.log(
              '🔍 DefecationSubmit - API error, navigating to lifestyle page:',
              targetUrl
            );
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
