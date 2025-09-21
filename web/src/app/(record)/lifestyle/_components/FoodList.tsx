interface FoodListProps {
  debouncedFoodName: string;
  onFoodSelect: (foodId: number, foodName: string) => void;
}

export const FoodList = ({
  debouncedFoodName,
  onFoodSelect,
}: FoodListProps) => {
  // TODO(seieun): debouncedFoodName으로 api fetch 해서 리스트로 뿌리는 로직 필요
  // 임시로 더미 데이터 사용
  const mockFoodList = [
    { id: 1, name: `${debouncedFoodName} 김치찌개` },
    { id: 2, name: `${debouncedFoodName} 된장찌개` },
    { id: 3, name: `${debouncedFoodName} 불고기` },
    { id: 4, name: `${debouncedFoodName} 비빔밥` },
    { id: 5, name: `${debouncedFoodName} 김치` },
  ];

  const handleFoodClick = (foodId: number, foodName: string) => {
    onFoodSelect(foodId, foodName);
  };

  return (
    <div className="px-[1.25rem]">
      <div className="space-y-2">
        {mockFoodList.map((food) => (
          <div
            key={food.id}
            onClick={() => handleFoodClick(food.id, food.name)}
            className="p-3 text-white text-body2"
          >
            {food.name}
          </div>
        ))}
      </div>
    </div>
  );
};
