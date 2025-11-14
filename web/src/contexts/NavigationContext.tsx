'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
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
  hasNotification: boolean;
  handleOnNotification: () => void;
  handleOffNotification: () => void;
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
  const pathname = usePathname();
  const [hasNotification, setHasNotification] = useState(false);

  // 경로에 따라 탭 상태 업데이트
  useLayoutEffect(() => {
    if (pathname.startsWith('/report')) {
      setCurrentTab('report');
    } else if (pathname.startsWith('/home')) {
      setCurrentTab('home');
    } else if (pathname.startsWith('/calendar')) {
      setCurrentTab('calendar');
    } else if (pathname.startsWith('/my')) {
      setCurrentTab('my');
    }
  }, [pathname]);

  // 네비게이션 바 높이 계산
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  const currentDate = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return { year, month, day };
  }, []);
  const handleTabClick = useCallback(
    (tabName: Tab) => {
      setCurrentTab(tabName);
      switch (tabName) {
        case 'home':
          router.push(PAGE_ROUTES.HOME);
          break;
        case 'report':
          router.push(
            PAGE_ROUTES.REPORT_DAILY +
              `?date=${currentDate.year}-${currentDate.month}-${currentDate.day}`
          );
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
    [router, currentDate]
  );
  const handleOnNotification = useCallback(() => {
    setHasNotification(true);
  }, []);

  const handleOffNotification = useCallback(() => {
    setHasNotification(false);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        navHeight,
        navRef,
        currentTab,
        hasNotification,
        handleTabClick,
        handleOnNotification,
        handleOffNotification,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
