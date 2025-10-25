'use client';

import { useSearchParams } from 'next/navigation';
import { Navigator } from '@/components/Navigator';
import { useTermsQuery } from '@/hooks/queries';
import type { TermsItem } from '@/types/dto/terms.dto';

const TermsPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const { data: terms, isLoading, error } = useTermsQuery();

  const getPageTitle = () => {
    // service 타입일 때는 "서비스"나 "이용약관"이 포함된 title 찾기
    if (type === 'service') {
      const serviceTerm = filteredTerms.find(
        (term) =>
          term.title.includes('서비스') || term.title.includes('이용약관')
      );
      return serviceTerm?.title;
    }

    // privacy-policy 타입일 때는 "개인정보"나 "처리방침"이 포함된 title 찾기
    if (type === 'privacy-policy') {
      const privacyTerm = filteredTerms.find(
        (term) =>
          term.title.includes('개인정보') || term.title.includes('처리방침')
      );
      return privacyTerm?.title;
    }
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
      case 'personalInformation':
        return terms.filter(
          (term) =>
            term.title.includes('개인정보') ||
            term.title.includes('처리방침') ||
            term.title.includes('개인정보 처리방침') ||
            term.title.includes('개인정보처리방침') ||
            term.title.includes('Privacy Policy') ||
            term.title.includes('privacy')
        );
      default:
        return terms;
    }
  };

  const filteredTerms = getFilteredTerms();

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
          <Navigator.Center>{getPageTitle()}</Navigator.Center>
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
        <Navigator.Center>{getPageTitle()}</Navigator.Center>
      </Navigator>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pt-[72px]">
        <div className="space-y-8">
          {filteredTerms.map((term: TermsItem, index: number) => (
            <div
              key={index}
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

export default TermsPage;
