import Image from 'next/image';
import type { Suggestion } from '../types';

interface SuggestionsProps {
  suggestion: Suggestion;
}

export const Suggestions = ({ suggestion }: SuggestionsProps) => {
  return (
    <div className="bg-gray-800 px-[1rem] py-[2.5rem]">
      <span className="text-body3-m text-gray-300">추천 습관</span>
      <div className="h-[0.0625rem] "/>
      <div className="text-h4 text-white">{suggestion.message}</div>
      <div className="h-[1.25rem]"/>
      
      {/* 추천 습관 카드들 */}
      <div className="space-y-3">
        {suggestion.items.map((item, index) => (
          <div key={`suggestion-${index}`} className="bg-gray-700 rounded-lg p-4 flex items-center space-x-4">
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
              <div className="text-white font-semibold text-base mb-1">
                {item.title}
              </div>
              <div className="text-gray-300 text-sm">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};  