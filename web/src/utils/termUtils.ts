import type { TermsItem } from '@/types/dto/terms.dto';

export type TermsContentType = 'service' | 'privacy-policy';

/**
 * 약관 타입에 따라 필터링된 약관 목록을 반환합니다.
 * @param terms - 전체 약관 목록
 * @param type - 필터링할 약관 타입
 * @returns 필터링된 약관 목록
 */
export const filterTermsByType = (
  terms: TermsItem[] | undefined,
  type: TermsContentType
): TermsItem[] => {
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

/**
 * 약관 타입에 따른 페이지 제목을 반환합니다.
 * @param type - 약관 타입
 * @returns 페이지 제목
 */
export const getTermsPageTitle = (type: TermsContentType): string => {
  switch (type) {
    case 'service':
      return '이용약관';
    case 'privacy-policy':
      return '개인정보 처리방침';
    default:
      return '약관 및 정책';
  }
};
