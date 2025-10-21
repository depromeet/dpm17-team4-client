'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { BottomBtnBar } from '@/components';
import { QUERY_KEYS } from '@/constants';
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
  const { mutate: createMutation, isPending: isCreatePending } =
    useActivityRecordMutation();
  const { mutate: updateMutation, isPending: isUpdatePending } =
    useActivityRecordUpdateMutation();
  const queryClient = useQueryClient();

  const handleSubmit = useCallback(async () => {
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const date = searchParams.get('day');

    if (!year || !month || !date) {
      return;
    }

    // searchParams에서 가져온 날짜를 그대로 사용 (YYYY-MM-DD 형식)
    const occurredAt = `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}T00:00:00.000`;

    const validFoods = foods.filter((food) => food.mealTime !== '');

    if (validFoods.length === 0) {
      alert('음식을 선택하고 식사 시간을 설정해주세요.');
      return;
    }

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
            router.push('/home?toast-lifestyle=true');
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
          router.push('/home?toast-lifestyle=true');
        },
        onError: (error) => {
          console.error('저장 실패:', error);
        },
      });
    }
  }, [
    foods,
    water,
    stress,
    searchParams,
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
