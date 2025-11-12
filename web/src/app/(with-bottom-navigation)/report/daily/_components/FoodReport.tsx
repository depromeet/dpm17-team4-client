import Image from 'next/image';
import { useRef, useState } from 'react';
import { ChevronIcon } from '@/components';
import type { Food } from '../types';
import {
  fillMissingMealTimes,
  formatDate,
  getMealTimeIcon,
  getMealTimeLabel,
} from '../utils';

const GAP_WIDTH = 48;
const ANIMATION_DURATION = 300;

export const FoodReport = ({ foodData }: { foodData: Food }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const handleScroll = () => {
    if (scrollRef.current && !isProgrammaticScroll.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / (itemWidth + GAP_WIDTH));
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      isProgrammaticScroll.current = true;
      setCurrentIndex(index);

      const itemWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * (itemWidth + GAP_WIDTH),
        behavior: 'smooth',
      });

      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, ANIMATION_DURATION);
    }
  };

  return (
    <div className="bg-[#1B1D20] rounded-[14px] py-7 px-6 w-full">
      <p className="text-[#4E5560] text-body3-m mb-2">식단 분석 결과</p>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
        onScroll={handleScroll}
      >
        {foodData.items.map((item, index) => {
          return (
            <div
              key={item.occurredAt}
              className={`flex flex-col flex-shrink-0 w-full ${index > 0 ? 'ml-12' : ''}`}
              style={{ scrollSnapAlign: 'start' }}
            >
              <p className="text-white text-[18px] font-semibold whitespace-pre-line">
                {foodData.message}
              </p>
              <span className="w-full h-[1px] bg-[#3C4149] my-5" />
              <div className="mb-4">
                <p className="text-[#99A1B1] text-body4-m">
                  {formatDate(new Date(item.occurredAt))}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {fillMissingMealTimes(item.meals).map((meal) => (
                  <div
                    key={meal.mealTime}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-1 bg-[#292D32] rounded-[4px] py-1 px-2">
                      <Image
                        src={getMealTimeIcon(meal.mealTime)}
                        alt={getMealTimeLabel(meal.mealTime)}
                        width={16}
                        height={16}
                      />
                      <p className="text-white text-body3-m text-center">
                        {getMealTimeLabel(meal.mealTime)}
                      </p>
                    </div>

                    {meal.foods.length > 0 ? (
                      <div className="flex items-center gap-2">
                        {meal.dangerous && (
                          <div className="w-[34px] h-5 flex items-center justify-center rounded-[4px] bg-red-600 py-1 px-[7px]">
                            <p className="text-[11px] font-semibold text-white">
                              주의
                            </p>
                          </div>
                        )}
                        <div className="flex">
                          {meal.foods.map((food, foodIndex) => (
                            <p
                              key={food}
                              className="text-white text-caption text-center"
                            >
                              {food}
                              {foodIndex < meal.foods.length - 1 ? (
                                <>,&nbsp;</>
                              ) : (
                                ''
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-white text-caption text-center">
                        -
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {foodData.items.length > 1 && (
        <div className="flex justify-center items-center gap-1 mt-4">
          <button
            type="button"
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            <ChevronIcon
              type="left"
              className={`w-4 h-4 ${currentIndex === 0 ? 'text-gray-500' : 'text-white'}`}
            />
          </button>
          <p className="text-white text-base font-medium">
            {currentIndex + 1} / {foodData.items.length}
          </p>
          <button
            type="button"
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === foodData.items.length - 1}
          >
            <ChevronIcon
              type="right"
              className={`w-4 h-4 ${currentIndex === foodData.items.length - 1 ? 'text-gray-500' : 'text-white'}`}
            />
          </button>
        </div>
      )}
    </div>
  );
};
