'use client';

import { useState, Suspense } from 'react';
import { Food } from './types/dto';
import { FoodListContainer } from './_components/FoodListContainer';
import { LifeStyleSubmit } from './_components/LifeStyleSubmit';
import { StressForm } from './_components/StressForm';
import { WaterForm } from './_components/WaterForm';
import { StressLevel } from './types/entitites';
import { RecordDate } from './_components/RecordDate';

export default function LifestylePage() {
  const [foods, setFoods] = useState<Food[]>([
    { id: -1, foodId: -1, name: '', mealTime: '' },
  ]);
  const [water, setWater] = useState(0);
  const [stress, setStress] = useState<StressLevel | ''>('');

  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<div className="px-[4.78rem] py-[1.25rem] text-h3 text-white text-center">로딩 중...</div>}>
        <RecordDate />
      </Suspense>
      <div className='h-[0.5rem] bg-gray-700'/>
      <div className='h-[1.25rem]'/>
      <FoodListContainer foods={foods} setFoods={setFoods} />
      <div className="h-[1rem]" />
      <WaterForm waterCups={water} setWaterCups={setWater} />
      <div className="h-[1.75rem]" />
      <StressForm selectedLevel={stress} setSelectedLevel={setStress} />
      <div className="h-30" />
      <LifeStyleSubmit />
    </div>
  );
}
