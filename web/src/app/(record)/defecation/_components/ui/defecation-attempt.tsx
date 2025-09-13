'use client';

import { cn } from '@/utils/utils-cn';
import { DEFECATION_TRY } from '../constants/description';
import { useDefecation } from '../providers/defecation-providers';

export const DefecationAttempt = () => {
  const { defecationState, setDefecationState } = useDefecation();

  const handleClick = (value: string) => {
    if (defecationState.selectedTry === value) {
      setDefecationState({ ...defecationState, selectedTry: '' });
    } else {
      setDefecationState({
        ...defecationState,
        selectedTry: value,
      });
    }
  };

  return (
    <div className="flex items-start justify-center w-full gap-3">
      {Object.entries(DEFECATION_TRY).map(([_, value]) => (
        <button
          className={cn(
            'flex-1 h-12 rounded-lg bg-[#2C2C35] text-[#9D9D9D] whitespace-nowrap flex items-center justify-center',
            defecationState.selectedTry === value
              ? 'bg-[#5170FF] text-white'
              : ''
          )}
          type="button"
          key={value}
          onClick={() => {
            handleClick(value);
          }}
        >
          <p className="text-base font-bold">{value}</p>
        </button>
      ))}
    </div>
  );
};
