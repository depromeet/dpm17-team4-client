'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { BottomBtnBar } from '@/components';
import { useActivityRecordMutation } from '@/hooks';
import type { Food } from '../types/dto';
import type { StressLevel } from '../types/entitites';

interface LifeStyleSubmitProps {
  foods: Food[];
  water: number;
  stress: StressLevel | '';
}

export const LifeStyleSubmit = ({
  foods,
  water,
  stress,
}: LifeStyleSubmitProps) => {
  const searchParams = useSearchParams();
  const { mutate, isPending } = useActivityRecordMutation();

  const handleSubmit = useCallback(() => {
    const year =
      searchParams.get('year') || new Date().getFullYear().toString();
    const month =
      searchParams.get('month') || (new Date().getMonth() + 1).toString();
    const date = searchParams.get('date') || new Date().getDate().toString();

    const occurredAt = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(date, 10)
    )
    .toISOString()
    .replace('Z', '');

    const validFoods = foods.filter((food) => food.mealTime !== '');

    if (validFoods.length === 0) {
      alert('음식을 선택하고 식사 시간을 설정해주세요.');
      return;
    }

    mutate({
      water,
      stress,
      //TODO(seieun): db 채워지면 실제 foods 로 보내기
      // foods: validFoods.map((food) => ({
      //   id: food.foodId,
      //   mealTime: food.mealTime,
      // })),
      foods: [],
      occurredAt,
      onSuccess: () => {
        alert('데이터가 성공적으로 저장되었습니다!');
      },
      onError: (error) => {
        console.error('저장 실패:', error);
        alert('데이터 저장에 실패했습니다. 다시 시도해주세요.');
      },
    });
  }, [foods, water, stress, searchParams, mutate]);

  return <BottomBtnBar onSubmit={handleSubmit} disabled={isPending} />;
};
