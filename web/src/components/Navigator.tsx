'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { ArrowIcon } from './icons';

interface NavigatorProps {
  children?: ReactNode;
  className?: string;
}

interface NavigatorLeftProps {
  children?: ReactNode;
  className?: string;
}

interface NavigatorRightProps {
  children?: ReactNode;
  className?: string;
}

interface NavigatorCenterProps {
  children?: ReactNode;
  className?: string;
}
    
const Left = ({ children, className = "" }: NavigatorLeftProps) => (
  <div className={`flex items-center ${className}`}>
    {children}
  </div>
);

const Right = ({ children, className = "" }: NavigatorRightProps) => (
  <div className={`flex items-center justify-end ${className}`}>
    {children}
  </div>
);

const Center = ({ children, className = "" }: NavigatorCenterProps) => (
  <span className={`text-h3 ${className}`}>
    {children}
  </span>
);

const NavigatorComponent = ({ children, className = "" }: NavigatorProps) => {
  const router = useRouter();

  return (
    <div className={`fixed top-0 left-0 w-full h-[56px] z-10 bg-gray-900 text-white p-4 flex shrink-0 ${className}`}>
      <ArrowIcon type="left" className="w-6 h-6" onClick={router.back} />
      <div className="flex-1 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

// 합성 컴포넌트로 export
export const Navigator = Object.assign(NavigatorComponent, {
  Left,
  Right,
  Center,
});
