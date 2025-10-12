'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useActivityRecordQuery } from '@/hooks/queries';
import { FoodListContainer } from './_components/FoodListContainer';
import { LifeStyleSubmit } from './_components/LifeStyleSubmit';
import { RecordDate } from './_components/RecordDate';
import { StressForm } from './_components/StressForm';
import { WaterForm } from './_components/WaterForm';
import type { Food } from './types/dto';
import type { StressLevel } from './types/entitites';

export default function LifestylePage() {
  const searchParams = useSearchParams();
  const [foods, setFoods] = useState<Food[]>([
    { id: -1, foodId: -1, name: '', mealTime: '' },
  ]);
  const [water, setWater] = useState(0);
  const [stress, setStress] = useState<StressLevel | ''>('');
  const [existingRecordId, setExistingRecordId] = useState<number | null>(null);

  // 날짜 파라미터로부터 ISO 문자열 생성
  const getDateString = () => {
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const date = searchParams.get('day');

    if (!year || !month || !date) {
      return '';
    }
    return `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}T00:00:00.000`;
  };

  // 기존 데이터 조회
  const { data: existingData, isLoading } = useActivityRecordQuery(
    getDateString()
  );

  // 기존 데이터가 있으면 상태 초기화
  useEffect(() => {
    console.log('existingData', existingData);
    if (existingData) {
      setExistingRecordId(existingData.id);
      setWater(existingData.waterIntakeCups);
      setStress(existingData.stressLevel as StressLevel);

      // foods 데이터 변환
      const existingFoods: Food[] = existingData.foods.map((food, index) => ({
        id: index,
        foodId: food.id,
        name: food.name,
        mealTime: food.mealTime as any,
      }));

      // 빈 food 항목이 없으면 추가
      if (existingFoods.length > 0) {
        existingFoods.push({ id: -1, foodId: -1, name: '', mealTime: '' });
      }

      setFoods(existingFoods);
    }
  }, [existingData]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense
        fallback={
          <div className="px-[4.78rem] py-[1.25rem] text-h3 text-white text-center">
            로딩 중...
          </div>
        }
      >
        <RecordDate />
      </Suspense>
      <div className="h-[0.5rem] bg-gray-700" />
      <div className="h-[1.25rem]" />
      <FoodListContainer foods={foods} setFoods={setFoods} />
      <div className="h-[1rem]" />
      <WaterForm waterCups={water} setWaterCups={setWater} />
      <div className="h-[1.75rem]" />
      <StressForm selectedLevel={stress} setSelectedLevel={setStress} />
      <div className="h-30" />
      <Suspense
        fallback={
          <div className="px-[4.78rem] py-[1.25rem] text-h3 text-white text-center">
            로딩 중...
          </div>
        }
      >
        <LifeStyleSubmit
          foods={foods}
          water={water}
          stress={stress}
          existingRecordId={existingRecordId}
          isLoading={isLoading}
        />
      </Suspense>
    </div>
  );
}
