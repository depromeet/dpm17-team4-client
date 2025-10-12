'use client';

import { useRouter } from 'next/navigation';
import { ArrowIcon } from './icons';
import { ReactNode } from 'react';

interface NavigatorProps {
  title: string;
  children?: ReactNode;
}

// Right 컴포넌트 정의
const Right = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center justify-center">{children}</div>;
};

const NavigatorComponent = ({ title, children }: NavigatorProps) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full h-[56px] z-10 bg-gray-900 text-white p-4 flex shrink-0 justify-between">
      <ArrowIcon type="left" className="w-6 h-6" onClick={router.back} />
      <p className={`text-h3 ${children ? '' : 'flex-1 text-center'}`}>{title}</p>
      {children}
    </div>
  );
};


// 합성 컴포넌트로 export
export const Navigator = Object.assign(NavigatorComponent, {
  Right,
});
