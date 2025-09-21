'use client';

import { useState } from 'react';
import type { Food } from '@/types/dto/lifestyle.dto';
import { FoodListContainer } from './_components/FoodListContainer';
import { LifeStyleSubmit } from './_components/LifeStyleSubmit';
import { StressForm } from './_components/StressForm';
import { WaterForm } from './_components/WaterForm';

export default function LifestylePage() {
  const [foods, setFoods] = useState<Food[]>([
    { id: 1, name: '', mealTime: '' },
  ]);
  const [waterCups, setWaterCups] = useState(0);
  const [stressLevel, setStressLevel] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-900">
      <FoodListContainer foods={foods} setFoods={setFoods} />
      <div className="h-[2.5rem]" />
      <WaterForm waterCups={waterCups} setWaterCups={setWaterCups} />
      <div className="h-[2.5rem]" />
      <StressForm selectedLevel={stressLevel} setSelectedLevel={setStressLevel} />
      <div className="h-30" />
      <LifeStyleSubmit />
    </div>
  );
}
