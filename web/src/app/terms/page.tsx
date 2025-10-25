'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Navigator } from '@/components/Navigator';
import { useTermsQuery } from '@/hooks/queries';
import type { TermsItem } from '@/types/dto/terms.dto';
import {
  filterTermsByType,
  getTermsPageTitle,
  type TermsContentType,
} from '@/utils/termUtils';

const TermsPageContent = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as TermsContentType;

  const { data: terms, isLoading, error } = useTermsQuery();

  const filteredTerms = filterTermsByType(terms, type);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121213] flex items-center justify-center">
        <div className="text-lg text-white">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121213] flex items-center justify-center">
        <div className="text-lg text-red-500">
          약관 정보를 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

  if (!filteredTerms || filteredTerms.length === 0) {
    return (
      <div className="min-h-screen bg-[#121213]">
        <Navigator>
          <Navigator.Center>{getTermsPageTitle(type)}</Navigator.Center>
        </Navigator>

        <div className="flex items-center justify-center min-h-[calc(100vh-56px)] pt-[56px]">
          <div className="text-lg text-white">해당 약관 정보가 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121213]">
      <Navigator>
        <Navigator.Center>{getTermsPageTitle(type)}</Navigator.Center>
      </Navigator>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pt-[72px]">
        <div className="space-y-8">
          {filteredTerms.map((term: TermsItem) => (
            <div
              key={`${term.title}-${term.content.slice(0, 20)}`}
              className="border-b border-gray-800 pb-6 last:border-b-0"
            >
              <div className="text-body3-r text-[#D7E1EF] leading-relaxed whitespace-pre-line">
                {term.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TermsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#121213] flex items-center justify-center">
          <div className="text-lg text-white">로딩 중...</div>
        </div>
      }
    >
      <TermsPageContent />
    </Suspense>
  );
};

export default TermsPage;
