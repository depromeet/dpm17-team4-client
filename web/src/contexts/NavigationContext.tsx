'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Tab } from '@/app/(with-bottom-navigation)/home/types';
import { PAGE_ROUTES } from '@/constants';

type NavigationContextType = {
  // 네비게이션 바 관련
  navHeight: number;
  navRef: React.RefObject<HTMLElement | null>;
  // 탭 상태 관련
  currentTab: Tab;
  handleTabClick: (tabName: Tab) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(
      'useNavigationContext must be used within a NavigationProvider'
    );
  }
  return context;
};

type NavigationProviderProps = {
  children: ReactNode;
};

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [navHeight, setNavHeight] = useState(0);
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const navRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  // 네비게이션 바 높이 계산
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  const handleTabClick = useCallback(
    (tabName: Tab) => {
      setCurrentTab(tabName);
      switch (tabName) {
        case 'home':
          router.push(PAGE_ROUTES.HOME);
          break;
        case 'report':
          router.push(PAGE_ROUTES.REPORT_DAILY);
          break;
        case 'calendar':
          router.push(PAGE_ROUTES.CALENDAR);
          break;
        case 'my':
          router.push(PAGE_ROUTES.MY);
          break;
        default:
          break;
      }
    },
    [router]
  );

  return (
    <NavigationContext.Provider
      value={{
        navHeight,
        navRef,
        currentTab,
        handleTabClick,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
