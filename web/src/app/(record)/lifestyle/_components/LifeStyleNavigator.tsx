import { useRouter, useSearchParams } from 'next/navigation';
import { Navigator } from '@/components';
import { PAGE_ROUTES } from '@/constants';
import { getDateQueryParams } from '@/app/(with-bottom-navigation)/home/_components/utils';

interface LifeStyleNavigatorProps {
  existingRecordId: number | null;
  onOpen: () => void;
  isDeleting: boolean;
}

export const LifeStyleNavigator = ({
  existingRecordId,
  onOpen,
  isDeleting,
}: LifeStyleNavigatorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  const handleSkip = () => {
    router.push(PAGE_ROUTES.HOME);
  };

  const handleBack = () => {
    if (from === 'defecation' && year && month && day) {
      // 배변 기록에서 온 경우, 해당 날짜의 배변 기록으로 돌아가기
      const currentDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      const toiletRecordId = searchParams.get('toiletRecordId');
      
      console.log('🔍 LifeStyleNavigator - handleBack:', {
        from,
        year,
        month,
        day,
        toiletRecordId,
        currentDate
      });
      
      if (toiletRecordId) {
        // 기존 배변 기록이 있으면 편집 모드로 돌아가기
        const targetUrl = `/defecation${getDateQueryParams(currentDate)}&toiletRecordId=${toiletRecordId}`;
        console.log('🔍 LifeStyleNavigator - navigating to:', targetUrl);
        router.push(targetUrl);
      } else {
        // 새로운 배변 기록 페이지로 돌아가기
        const targetUrl = `/defecation${getDateQueryParams(currentDate)}`;
        console.log('🔍 LifeStyleNavigator - navigating to:', targetUrl);
        router.push(targetUrl);
      }
    } else {
      // 기본 뒤로가기
      console.log('🔍 LifeStyleNavigator - default back navigation');
      router.back();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[56px] z-10 bg-gray-900 text-white p-4 flex shrink-0">
      <button
        type="button"
        onClick={handleBack}
        className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 z-10"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex-1 flex justify-center items-center">
        <Navigator.Center>생활 기록</Navigator.Center>
      </div>
      <Navigator.Right>
        {from === 'defecation' && (
          <button
            type="button"
            onClick={handleSkip}
            className="text-body2-m text-primary-600 hover:text-primary-600"
          >
            건너뛰기
          </button>
        )}
        {existingRecordId && (
          <button
            type="button"
            onClick={onOpen}
            disabled={isDeleting}
            className="text-body2-m text-red-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        )}
      </Navigator.Right>
    </div>
  );
};
