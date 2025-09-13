import { ChevronDown } from 'lucide-react';

export const DefecationTime = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <p className="text-sm font-normal">배변 시각</p>
      <div className="flex items-center gap-1">
        <p className="text-xl font-bold">9월 4일 (목) 오후 15시</p>
        <ChevronDown />
      </div>
    </div>
  );
};
