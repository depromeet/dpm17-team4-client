'use client';

import { X } from 'lucide-react';
import { BottomSheet } from '@/components/BottomSheet';
import { useTermsQuery } from '@/hooks/queries';
import type { TermsItem } from '@/types/dto/terms.dto';

interface TermsContentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  type?: 'service' | 'privacy-policy';
}

export default function TermsContentBottomSheet({
  isOpen,
  onClose,
  onBack,
  type = 'service',
}: TermsContentBottomSheetProps) {
  const { data: terms, isLoading, error } = useTermsQuery();

  const getPageTitle = () => {
    if (type === 'service') {
      return '이용약관';
    }
    if (type === 'privacy-policy') {
      return '개인정보 처리방침';
    }
    return '약관 및 정책';
  };

  // 파라미터에 따른 필터링
  const getFilteredTerms = () => {
    if (!terms) return [];

    switch (type) {
      case 'service':
        return terms.filter(
          (term) =>
            term.title.includes('서비스') || term.title.includes('이용약관')
        );
      case 'privacy-policy':
        return terms.filter(
          (term) =>
            term.title.includes('개인정보') || term.title.includes('처리방침')
        );
      default:
        return terms;
    }
  };

  const filteredTerms = getFilteredTerms();

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-h-[90vh] rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {onBack && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBack();
                }}
                className="p-2"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
          <h2 className="text-xl font-semibold text-white absolute left-1/2 transform -translate-x-1/2">
            {getPageTitle()}
          </h2>
          <div></div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 max-h-[calc(90vh-80px)] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-white">로딩 중...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-red-500">
                약관 정보를 불러오는데 실패했습니다.
              </div>
            </div>
          ) : !filteredTerms || filteredTerms.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-white">해당 약관 정보가 없습니다.</div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredTerms.map((term: TermsItem, index: number) => (
                <div
                  key={`${term.title}-${index}`}
                  className="border-b border-gray-800 pb-6 last:border-b-0"
                >
                  <div className="text-body3-r text-[#D7E1EF] leading-relaxed whitespace-pre-line">
                    {term.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
