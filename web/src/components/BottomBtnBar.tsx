import { Button } from './Button';

export const BottomBtnBar = ({
  text = '등록',
  onSubmit,
}: {
  text?: string;
  onSubmit: () => void;
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-30 z-10 pt-4 px-4 bg-gray-900">
      <Button size="56" color="primary" fullWidth onClick={onSubmit}>
        <p>{text}</p>
      </Button>
    </div>
  );
};
