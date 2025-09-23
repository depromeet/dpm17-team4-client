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

  // debouncedFoodName과 일치하는 부분을 하이라이트하는 함수
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) {
      return <span className="text-white">{text}</span>;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <span key={`highlight-${index}-${part}`} className="text-primary-400">
            {part}
          </span>
        );
      }
      return (
        <span key={`normal-${index}-${part}`} className="text-white">
          {part}
        </span>
      );
    });
  };

  return (
    <div>
      <div className="space-y-2">
        {mockFoodList.map((food) => (
          <button
            key={food.id}
            type="button"
            onClick={() => handleFoodClick(food.id, food.name)}
            className="w-full p-3 text-white text-body2 cursor-pointer hover:bg-gray-700 transition-colors rounded text-body2-sb text-left"
          >
            {highlightText(food.name, debouncedFoodName)}
          </button>
        ))}
      </div>
    </div>
  );
};
