import { Navigator } from '@/components';

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
  return (
    <Navigator>
      <Navigator.Center>생활 기록</Navigator.Center>
      {existingRecordId && (
        <Navigator.Right>
          <button
            type="button"
            onClick={onOpen}
            disabled={isDeleting}
            className="text-body2-m text-red-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </Navigator.Right>
      )}
    </Navigator>
  );
};
