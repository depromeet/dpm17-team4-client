import Image from 'next/image';
import type { Suggestion } from '../daily/types';

interface SuggestionsProps {
  suggestion: Suggestion;
}

export const Suggestions = ({ suggestion }: SuggestionsProps) => {
  return (
    <div className="bg-[#1B1D20] min-h-[520px] pt-6 mt-[30px] pb-[160px] px-4 z-10 w-screen">
      <span className="text-body3-m text-gray-300">추천 습관</span>
      <div className="h-[0.0625rem]" />
      <div className="text-h4 text-white">{suggestion.message}</div>
      <div className="h-[1.25rem]" />

      {/* 추천 습관 카드들 */}
      <div className="space-y-3">
        {suggestion.items.map((item) => (
          <div
            key={item.title}
            className="bg-gray-700 rounded-lg p-4 flex items-center space-x-4"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-base leading-5 tracking-tight mb-[0.25rem]">
                {item.title}
              </div>
              <div className="text-gray-400 text-body4-r">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
