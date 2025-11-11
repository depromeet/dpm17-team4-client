import Image, { type StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';
import { cn } from '@/utils/utils-cn';
import { getTodayDate } from '@/utils/utils-date';

interface NullReportProps {
  nullIcon: StaticImageData;
  title?: string;
  description?: string;
  mode: 'all' | 'defecation' | 'lifestyle';
  type?: 'daily' | 'weekly' | 'monthly';
}

export const NullReport = ({
  nullIcon,
  title = '',
  description = '리포트는 기록이 있어야 확인할 수 있어요.',
  mode = 'all',
  type = 'daily',
}: NullReportProps) => {
  const router = useRouter();

  const handleGoReport = (targetMode: 'defecation' | 'lifestyle') => {
    const { todayYear, todayMonth, todayDay } = getTodayDate();
    const path = targetMode;
    router.push(
      `/${path}?year=${todayYear}&month=${todayMonth}&day=${todayDay}`
    );
  };
  const getButtonText = (
    currentMode: 'all' | 'defecation' | 'lifestyle',
    defaultTitle: string
  ) => {
    switch (currentMode) {
      case 'all':
        return {
          defecation: '배변 기록하기',
          lifestyle: '생활 기록하기',
        };
      case 'defecation':
        return { single: `${defaultTitle} 기록하기`, target: 'defecation' };
      case 'lifestyle':
        return { single: `${defaultTitle} 기록하기`, target: 'lifestyle' };
      default:
        return { single: '기록하기', target: 'lifestyle' };
    }
  };

  const buttonContent = getButtonText(mode, title);

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-[58px] pb-[72px] z-10">
        <div className="relative w-[15.125rem] h-[6.3125rem]">
          <Image
            src={nullIcon}
            alt="null case emoji"
            width={58}
            height={58}
            className="absolute top-[2rem] right-[5.75rem]"
          />
        </div>
        <div className="mt-3">
          <h2 className="text-h3 text-center">{title} 기록이 없어요!</h2>
          <p className="text-body3-m text-gray-500 text-center mt-2">
            {description}
          </p>
        </div>

        {type === 'daily' && (
          <div className="mt-8 flex justify-center gap-2">
            {mode === 'all' ? (
              <>
                <Button onClick={() => handleGoReport('defecation')}>
                  {buttonContent.defecation}
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleGoReport('lifestyle')}
                >
                  {buttonContent.lifestyle}
                </Button>
              </>
            ) : (
              <Button
                className="py-[11px] px-[16px]"
                onClick={() =>
                  handleGoReport(
                    buttonContent.target as 'defecation' | 'lifestyle'
                  )
                }
              >
                {buttonContent.single}
              </Button>
            )}
          </div>
        )}
      </div>
      <div
        className={cn(
          'absolute w-full h-3/4 bottom-0 left-0 right-0 pointer-events-none',
          mode === 'all' && `bg-gradient-to-b from-black to-[#3A3860] flex-1`
        )}
      />
    </>
  );
};
