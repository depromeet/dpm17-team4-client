import { Button } from '@/components';

export const FoodTextField = () => {
  return (
    <div>
      <div className="px-[1rem]">
        <div className="flex justify-between align-center">
          <div className="text-h4 text-gray-400">먹은 음식</div>
          <Button size="32" color="secondary">
            + 음식 추가
          </Button>
        </div>
        <div className="h-[0.9375rem]" />
        <div className="w-full p-[1rem] flex gap-[0.75rem] rounded-[0.94rem] bg-gray-800">
          <div className="bg-gray-600 text-gray-200 rounded-[0.5rem] px-[0.375rem] py-[0.25rem]">
            시간
          </div>
          <input
            type="text"
            placeholder="음식 이름을 입력해주세요"
            className="flex-1 text-white
        
          "
          />
          <div className="text-white">x</div>
        </div>
      </div>
      <div className="h-[0.9375rem]" />
      <div className="px-[1.25rem] text-white">마라탕</div>
    </div>
  );
};
