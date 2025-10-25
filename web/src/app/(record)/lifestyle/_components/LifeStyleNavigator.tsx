import { useRouter, useSearchParams } from 'next/navigation';
import { Navigator } from '@/components';
import { PAGE_ROUTES } from '@/constants';

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

  const handleSkip = () => {
    router.push(PAGE_ROUTES.HOME);
  };
  return (
    <Navigator>
      <Navigator.Center>생활 기록</Navigator.Center>
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
    </Navigator>
  );
};
