import { Suspense } from 'react';
import MyPageContent from './_components/MyPageContent';
import MyPageLoading from './_components/MyPageLoading';

export default function MyPage() {
  return (
    <Suspense fallback={<MyPageLoading />}>
      <MyPageContent />
    </Suspense>
  );
}
