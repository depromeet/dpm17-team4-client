interface FoodListProps {
  debouncedFoodName: string;
  onFoodSelect: (selectedFood: string) => void;
}

export const FoodList = ({
  debouncedFoodName,
  onFoodSelect,
}: FoodListProps) => {
  // TODO(seieun): debouncedFoodName으로 api fetch 해서 리스트로 뿌리는 로직 필요
  // 임시로 더미 데이터 사용
  const mockFoodList = [
    `${debouncedFoodName} 김치찌개`,
    `${debouncedFoodName} 된장찌개`,
    `${debouncedFoodName} 불고기`,
    `${debouncedFoodName} 비빔밥`,
    `${debouncedFoodName} 김치`,
  ];

  const handleFoodClick = (food: string) => {
    onFoodSelect(food);
  };

  return (
    <div className="px-[1.25rem]">
      <div className="space-y-2">
        {mockFoodList.map((food, index) => (
          <div
            key={index}
            onClick={() => handleFoodClick(food)}
            className="p-3 text-white text-body2"
          >
            {food}
          </div>
        ))}
      </div>
    </div>
  );
};
