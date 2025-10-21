import { ChevronIcon } from '@/components';
import { cn } from '@/utils/utils-cn';
import type { Step } from '../page';

interface PasswrodIndicatorProps {
  currentPassword: string;
  title: () => string;
  onReset: () => void;
  step: Step;
}

export const PasswordIndicator = ({
  currentPassword,
  title,
  onReset,
  step,
}: PasswrodIndicatorProps) => {
  const length = 4;
  const filled = Math.min(currentPassword.length, length);

  const dotClass = (index: number) =>
    index < filled ? 'bg-primary-500' : 'bg-gray-700';
  const dotIds = ['pw-dot-1', 'pw-dot-2', 'pw-dot-3', 'pw-dot-4'].slice(
    0,
    length
  );
  return (
    <section className="pt-[108px] flex-1/2 pb-8 flex flex-col items-center">
      <h2 className="text-h3">{title()}</h2>
      <ul className="flex gap-4 mt-6">
        {dotIds.map((id, idx) => (
          <li
            key={id}
            className={cn(
              'rounded-full w-4 h-4 transition-colors',
              dotClass(idx)
            )}
          >
            <span className="sr-only">{idx < filled ? '입력됨' : '미입력'}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 h-10">
        {/* 버튼의 높이와 여백에 맞게 조정된 공간 */}
        {step === 'confirm' && (
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-2 bg-[#7850FB60] text-white text-center rounded-[7px] text-button-4 flex items-center gap-0.5"
          >
            다시 설정하기
            <ChevronIcon type="right" size="12" />
          </button>
        )}
      </div>
    </section>
  );
};
