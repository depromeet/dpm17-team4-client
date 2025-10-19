import { Suspense } from 'react';
import ProfilePageContent from './_components/ProfilePageContent';
import ProfilePageLoading from './_components/ProfilePageLoading';

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfilePageLoading />}>
      <ProfilePageContent />
    </Suspense>
  );
}
