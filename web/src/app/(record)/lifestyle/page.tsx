'use client';

import { useState } from 'react';
import { Food } from './types/dto';
import { FoodListContainer } from './_components/FoodListContainer';
import { LifeStyleSubmit } from './_components/LifeStyleSubmit';
import { StressForm } from './_components/StressForm';
import { WaterForm } from './_components/WaterForm';
import { StressLevel } from './types/entitites';

export default function LifestylePage() {
  const [foods, setFoods] = useState<Food[]>([
    { id: -1, foodId: -1, name: '', mealTime: '' },
  ]);
  const [water, setWater] = useState(0);
  const [stress, setStress] = useState<StressLevel | ''>('');

  return (
    <div className="min-h-screen bg-gray-900">
      <FoodListContainer foods={foods} setFoods={setFoods} />
      <div className="h-[2.5rem]" />
      <WaterForm waterCups={water} setWaterCups={setWater} />
      <div className="h-[2.5rem]" />
      <StressForm selectedLevel={stress} setSelectedLevel={setStress} />
      <div className="h-30" />
      <LifeStyleSubmit />
    </div>
  );
}
