'use client';

import { useRouter } from 'next/navigation';
import { ArrowIcon } from './icons';

export const Navigator = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full h-[56px] z-10 bg-gray-900 text-white p-4 flex shrink-0 justify-between">
      <ArrowIcon
        type="left"
        className="w-6 h-6"
        onClick={() => router.back()}
      />
      <p className="text-h3">{title}</p>
      <div className="w-6 h-6" />
    </div>
  );
};
