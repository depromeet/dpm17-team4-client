'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Modal, ModalContent } from '@/components';
import { Button } from '@/components/Button';
import { PAGE_ROUTES } from '@/constants';
import { useActivityRecordDeleteMutation } from '@/hooks';
import { useActivityRecordQuery } from '@/hooks/queries';
import { FoodListContainer } from './_components/FoodListContainer';
import { LifeStyleNavigator } from './_components/LifeStyleNavigator';
import { LifeStyleSubmit } from './_components/LifeStyleSubmit';
import { RecordDate } from './_components/RecordDate';
import { StressForm } from './_components/StressForm';
import { WaterForm } from './_components/WaterForm';
import type { Food } from './types/dto';
import type { StressLevel } from './types/entitites';

function LifestylePageContent() {
  const searchParams = useSearchParams();
  const [foods, setFoods] = useState<Food[]>([
    { id: -1, foodId: -1, name: '', mealTime: '' },
  ]);
  const [water, setWater] = useState(0);
  const [stress, setStress] = useState<StressLevel | ''>('');
  const [existingRecordId, setExistingRecordId] = useState<number | null>(null);

  const router = useRouter();
  const from = searchParams.get('from');
  const deleteMutation = useActivityRecordDeleteMutation({
    onSuccess: () => {
      // 캘린더에서 온 경우 캘린더로 돌아가기
      if (from === 'calendar') {
        router.push('/calendar');
      } else {
        router.push('/home');
      }
    },
  });

  const handleDelete = async () => {
    if (!existingRecordId) return;
    try {
      await deleteMutation.mutateAsync({
        id: existingRecordId,
        date: dateString,
      });
    } catch (error) {
      console.error('삭제 중 오류가 발생했습니다:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSkipModalOpen, setIsSkipModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSkipModal = () => {
    setIsSkipModalOpen(true);
  };
  const closeSkipModal = () => {
    setIsSkipModalOpen(false);
  };

  const handleSkipNavigate = () => {
    router.push('/loading');
  };
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

  const dateString = getDateString().slice(0, 10);

  const { data: existingData, isLoading } = useActivityRecordQuery(dateString);

  useEffect(() => {
    setExistingRecordId(null);
    setWater(0);
    setStress('');
    setFoods([{ id: -1, foodId: -1, name: '', mealTime: '' }]);
  }, []);

  useEffect(() => {
    if (existingData) {
      setExistingRecordId(existingData.id);
      setWater(existingData.waterIntakeCups);
      setStress(existingData.stressLevel as StressLevel);

      const existingFoods: Food[] = existingData.foods.map((food, index) => ({
        id: index,
        foodId: food.id,
        name: food.name,
        mealTime: food.mealTime,
      }));

      setFoods(existingFoods);
    } else {
      setExistingRecordId(null);
      setWater(0);
      setStress('');
      setFoods([{ id: -1, foodId: -1, name: '', mealTime: '' }]);
    }
  }, [existingData]);

  // NOTE(seieun) 데이터를 불러오는 동안 깜빡임 을 없애기 위해 로딩 인디케이터 추가
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <LifeStyleNavigator
          existingRecordId={existingRecordId}
          onOpen={openModal}
          isDeleting={deleteMutation.isPending}
          onSkip={openSkipModal}
        />
        <div className="h-[56px]" />
        <Suspense
          fallback={
            <div className="px-[4.78rem] py-[1.25rem] text-h3 text-white text-center">
              로딩 중...
            </div>
          }
        >
          <RecordDate />
        </Suspense>
        <div className="h-[0.5rem] bg-[#292D32] opacity-20" />
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent onClose={closeModal} onDelete={handleDelete} />
      </Modal>
      <Modal isOpen={isSkipModalOpen} onClose={closeSkipModal}>
        <div className="flex flex-col">
          <div className="mb-6 flex flex-col items-center text-center">
            <h1 className="text-body1-m text-white mb-2">
              생활 기록을 건너뛰시겠어요?
            </h1>
            <p className="text-body4-r text-gray-400 whitespace-pre-line">
              생활 기록을 건너뛰면{'\n'}자세한 리포트를 받아볼 수 없어요.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="!bg-gray-700 flex-1" onClick={closeSkipModal}>
              취소
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                closeSkipModal();
                handleSkipNavigate();
              }}
            >
              건너뛰기
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default function LifestylePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">로딩 중...</p>
          </div>
        </div>
      }
    >
      <LifestylePageContent />
    </Suspense>
  );
}
