export const FoodList = ({
  debouncedFoodName,
}: {
  debouncedFoodName: string;
}) => {
  //TODO(seieun): debouncedFoodName으로 api fetch 해서 리스트로 뿌리는 로직 필요
  return (
    <div className="px-[1.25rem] text-white text-body2-sb">
      {debouncedFoodName}
    </div>
  );
};
