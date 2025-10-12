'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { BottomBtnBar } from '@/components';
import { useActivityRecordMutation, useActivityRecordUpdateMutation } from '@/hooks';
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
  const { mutate: createMutation, isPending: isCreatePending } = useActivityRecordMutation();
  const { mutate: updateMutation, isPending: isUpdatePending } = useActivityRecordUpdateMutation();

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
            alert('데이터가 성공적으로 수정되었습니다!');
            router.push('/home');
          },
          onError: (error) => {
            console.error('수정 실패:', error);
            alert('데이터 수정에 실패했습니다. 다시 시도해주세요.');
          },
        }
      );
    } else {
      // 기존 데이터가 없으면 새로 생성
      createMutation({
        ...data,
        onSuccess: () => {
          alert('데이터가 성공적으로 저장되었습니다!');
          router.push('/home');
        },
        onError: (error) => {
          console.error('저장 실패:', error);
          alert('데이터 저장에 실패했습니다. 다시 시도해주세요.');
        },
      });
    }
  }, [foods, water, stress, searchParams, createMutation, updateMutation, router, existingRecordId]);

  const isPending = isCreatePending || isUpdatePending;
  const buttonText = existingRecordId ? '수정' : '등록';

  return <BottomBtnBar onSubmit={handleSubmit} disabled={isPending || isLoading} text={buttonText} />;
};
