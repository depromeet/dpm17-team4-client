import { cn } from '@/utils/utils-cn';
import { Button } from './Button';

export const BottomBtnBar = ({
  text = '등록',
  onSubmit,
  disabled = false,
  className = 'bg-gray-900',
}: {
  text?: string;
  onSubmit: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 w-full h-[96px] z-10 pt-4 px-4 bg-gray-900',
        className
      )}
    >
      <Button
        size="56"
        color="primary"
        fullWidth
        onClick={onSubmit}
        disabled={disabled}
      >
        <p>{text}</p>
      </Button>
    </div>
  );
};
