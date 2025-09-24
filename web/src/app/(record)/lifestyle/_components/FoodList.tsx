import { useFoodSearch } from '@/hooks';

interface FoodListProps {
  debouncedFoodName: string;
  onFoodSelect: (foodId: number, foodName: string) => void;
}

export const FoodList = ({
  debouncedFoodName,
  onFoodSelect,
}: FoodListProps) => {
  const {
    data: foodList,
    isLoading,
    error,
  } = useFoodSearch({
    query: debouncedFoodName,
    count: 10,
    enabled: debouncedFoodName.trim().length > 0,
  });

  // API 데이터가 없으면 빈 배열 사용
  const foods = foodList?.items || [];

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

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="p-3 text-center text-gray-400">음식을 검색 중...</div>
    );
  }

  // 에러가 있을 때
  if (error) {
    return (
      <div className="p-3 text-center text-red-400">
        검색 중 오류가 발생했습니다.
      </div>
    );
  }

  // 검색 결과가 없을 때
  if (foods.length === 0 && debouncedFoodName.trim().length > 0) {
    return (
      <div className="p-3 text-center text-gray-400">검색 결과가 없습니다.</div>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {foods.map((food) => (
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
