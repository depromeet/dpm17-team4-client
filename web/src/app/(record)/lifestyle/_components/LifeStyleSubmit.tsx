'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { BottomBtnBar } from '@/components';
import { PAGE_ROUTES, QUERY_KEYS } from '@/constants';
import {
  useActivityRecordMutation,
  useActivityRecordUpdateMutation,
} from '@/hooks';
import type { Food } from '../types/dto';
import type { StressLevel } from '../types/entitites';

interface LifeStyleSubmitProps {
  foods: Food[];
  water: number;
  stress: StressLevel | '';
  existingRecordId?: number | null;
  isLoading?: boolean;
}

export const LifeStyleSubmit = ({
  foods,
  water,
  stress,
  existingRecordId,
  isLoading,
}: LifeStyleSubmitProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const { mutate: createMutation, isPending: isCreatePending } =
    useActivityRecordMutation();
  const { mutate: updateMutation, isPending: isUpdatePending } =
    useActivityRecordUpdateMutation();
  const queryClient = useQueryClient();

  // 폼 유효성 검사
  const validation = useMemo(() => {
    const validFoods = foods.filter(
      (food) => food.name && food.mealTime !== ''
    );
    const missingItems: string[] = [];

    if (validFoods.length === 0) {
      missingItems.push('음식');
    }
    if (water === 0) {
      missingItems.push('물');
    }
    if (stress === '') {
      missingItems.push('스트레스');
    }

    return {
      isValid: missingItems.length === 0,
      missingItems,
    };
  }, [foods, water, stress]);

  const handleSubmit = useCallback(async () => {
    // 유효성 검사 실패 시 토스트 표시
    if (!validation.isValid) {
      const missingText = validation.missingItems.join(', ');
      toast.error(`${missingText} 항목을 입력해주세요.`);
      return;
    }
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const date = searchParams.get('day');

    if (!year || !month || !date) {
      return;
    }

    // searchParams에서 가져온 날짜를 그대로 사용 (YYYY-MM-DD 형식)
    const occurredAt = `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}T00:00:00.000`;

    const validFoods = foods.filter(
      (food) => food.name && food.mealTime !== ''
    );

    const data = {
      water,
      stress,
      foods: validFoods.map((food) => ({
        id: food.foodId,
        mealTime: food.mealTime,
      })),
      occurredAt,
    };

    if (existingRecordId) {
      // 기존 데이터가 있으면 업데이트
      updateMutation(
        {
          id: existingRecordId,
          ...data,
        },
        {
          onSuccess: () => {
            // 캘린더 관련 쿼리 무효화
            queryClient.invalidateQueries({ 
              queryKey: [QUERY_KEYS.CALENDAR] 
            });
            queryClient.invalidateQueries({ 
              queryKey: [QUERY_KEYS.CALENDAR_BY_DATE] 
            });
            
            // 캘린더에서 온 경우 캘린더로, 그렇지 않으면 리포트로
            if (from === 'calendar') {
              router.push('/calendar');
            } else {
              router.push(`${PAGE_ROUTES.REPORT_DAILY}?toast-lifestyle=true`);
            }
          },
          onError: (error) => {
            console.error('수정 실패:', error);
          },
        }
      );
    } else {
      // 기존 데이터가 없으면 새로 생성
      createMutation({
        ...data,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT });
          // 캘린더 관련 쿼리 무효화
          queryClient.invalidateQueries({ 
            queryKey: [QUERY_KEYS.CALENDAR] 
          });
          queryClient.invalidateQueries({ 
            queryKey: [QUERY_KEYS.CALENDAR_BY_DATE] 
          });
          
          // 캘린더에서 온 경우 캘린더로, 그렇지 않으면 리포트로
          if (from === 'calendar') {
            router.push('/calendar');
          } else {
            router.push(`${PAGE_ROUTES.REPORT_DAILY}?toast-lifestyle=true`);
          }
        },
        onError: (error) => {
          console.error('저장 실패:', error);
        },
      });
    }
  }, [
    validation,
    foods,
    water,
    stress,
    searchParams,
    from,
    createMutation,
    updateMutation,
    router,
    existingRecordId,
    queryClient,
  ]);

  const isPending = isCreatePending || isUpdatePending;
  const buttonText = existingRecordId ? '수정' : '등록';

  return (
    <BottomBtnBar
      onSubmit={handleSubmit}
      disabled={isPending || isLoading}
      text={buttonText}
    />
  );
};
