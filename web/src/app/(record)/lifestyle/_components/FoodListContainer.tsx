import { Button } from '@/components';
import { FoodTextField } from './FoodTextField';

export const FoodListContainer = () => {
  return (
    <div>
      <div className="px-[1rem]">
        <div className="flex justify-between items-center">
          <div className="text-h4 text-gray-400">먹은 음식</div>
          <Button size="32" color="secondary">
            + 음식 추가
          </Button>
        </div>
        <FoodTextField />
      </div>
    </div>
  );
};
