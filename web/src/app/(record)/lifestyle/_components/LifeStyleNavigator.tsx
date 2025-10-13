import { useRouter } from 'next/navigation';
import { Navigator } from '@/components';
import { useActivityRecordDeleteMutation } from '@/hooks/mutations';

interface LifeStyleNavigatorProps {
  existingRecordId: number | null;
}

export const LifeStyleNavigator = ({
  existingRecordId,
}: LifeStyleNavigatorProps) => {
  //TODO(seieun) 삭제 모달에서 삭제 기능 추가
  const router = useRouter();
  const deleteMutation = useActivityRecordDeleteMutation();

  const handleDelete = async () => {
    if (!existingRecordId) return;

    if (confirm('정말로 삭제하시겠습니까?')) {
      try {
        await deleteMutation.mutateAsync({ id: existingRecordId });
        router.push('/home');
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Navigator>
      <Navigator.Center>생활 기록</Navigator.Center>
      {existingRecordId && (
        <Navigator.Right>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="text-body2-m text-red-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </button>
        </Navigator.Right>
      )}
    </Navigator>
  );
};
