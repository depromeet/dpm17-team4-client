import { Calendar, Home as HomeIcon, NotepadText, User } from 'lucide-react';
import type { RefObject } from 'react';
import { cn } from '@/utils/utils-cn';
import type { Tab } from '../../types';

const BOTTOM_NAV_TABS = [
  {
    id: 'home' as const,
    name: '홈',
    icon: HomeIcon,
  },
  {
    id: 'calendar' as const,
    name: '캘린더',
    icon: Calendar,
  },
  {
    id: 'report' as const,
    name: '리포트',
    icon: NotepadText,
  },
  {
    id: 'my' as const,
    name: '마이',
    icon: User,
  },
];

type BottomNavigationProps = {
  navRef: RefObject<HTMLElement | null>;
  onTabClick: (tabName: Tab) => void;
  currentTab: Tab;
};

const BottomNavigation = ({
  navRef,
  onTabClick,
  currentTab,
}: BottomNavigationProps) => {
  return (
    <nav ref={navRef} className="bg-gray-900 fixed bottom-0 border-none w-full">
      <div className="flex justify-between">
        {BOTTOM_NAV_TABS.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              className="py-[1.19rem] pl-[1.78rem] pr-[1.84rem] cursor-pointer flex flex-col items-center gap-1 bg-transparent border-none text-white"
              onClick={() => onTabClick(tab.id)}
            >
              <IconComponent
                className={cn(
                  currentTab === tab.id ? 'text-white' : 'text-gray-500'
                )}
              />
              {tab.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
