import type { RefObject } from 'react';
import { CalendarIcon, HomeIcon, ReportIcon, UserIcon } from '@/components';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { cn } from '@/utils/utils-cn';

const BOTTOM_NAV_TABS = [
  {
    id: 'home' as const,
    name: '홈',
    icon: HomeIcon,
    active: true,
  },
  {
    id: 'calendar' as const,
    name: '캘린더',
    icon: CalendarIcon,
    active: true,
  },
  {
    id: 'report' as const,
    name: '리포트',
    icon: ReportIcon,
    active: true,
  },
  {
    id: 'my' as const,
    name: '마이',
    icon: UserIcon,
    active: true,
  },
];

type BottomNavigationProps = {
  navRef: RefObject<HTMLElement | null>;
};

const BottomNavigation = ({ navRef }: BottomNavigationProps) => {
  const { handleTabClick, currentTab } = useNavigationContext();

  return (
    <nav ref={navRef} className="bg-gray-900 fixed bottom-0 border-none w-full">
      <div className="flex justify-between">
        {BOTTOM_NAV_TABS.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => {
                if (tab.active) {
                  handleTabClick(tab.id);
                } else {
                  alert('아직 개발중..');
                }
              }}
              className={`py-[1.19rem] pl-[1.78rem] pr-[1.84rem] cursor-pointer flex flex-col items-center gap-2 bg-transparent border-none  text-button-5 ${currentTab === tab.id ? 'text-white' : 'text-gray-500'}`}
            >
              <IconComponent
                className={cn(
                  currentTab === tab.id ? 'text-white' : 'text-gray-500',
                  'w-[24px] h-[24px]'
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
