import Image, { type StaticImageData } from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components';
import { usePreventScroll } from '@/hooks';
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
  description = `오늘 하루 배변 기록과 생활 기록을\n작성하고 리포트를 확인해보세요`,
  mode = 'all',
  type = 'daily',
}: NullReportProps) => {
  const router = useRouter();

  usePreventScroll(mode === 'all');
  const searchParams = useSearchParams();
  //2025-11-15
  const dateParam = searchParams.get('date');
  const [year, month, day] =
    dateParam?.split('-').map(Number) ||
    (() => {
      const today = getTodayDate();
      return [today.todayYear, today.todayMonth, today.todayDay];
    })();
  const handleGoReport = (targetMode: 'defecation' | 'lifestyle') => {
    const path = targetMode;
    router.push(`/${path}?year=${year}&month=${month}&day=${day}`);
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
      <div
        className={cn(
          'flex flex-col items-center justify-center z-10 pb-[72px] pt-[58px]',
          mode === 'all' &&
            'min-h-screen fixed top-0 left-0 right-0 bottom-0 pointer-events-none'
        )}
      >
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
          <h2 className="text-h3 text-center">
            {title} 리포트가 생성되지 않았어요.
          </h2>
          <p className="text-body3-m text-gray-500 text-center mt-2 whitespace-pre-line">
            {description}
          </p>
        </div>

        {type === 'daily' && (
          <div
            className={cn(
              'mt-8 flex justify-center gap-2',
              mode === 'all' && 'pointer-events-auto'
            )}
          >
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
          mode === 'all' &&
            `bg-gradient-to-b from-[#121213] to-[#3A3860] flex-1`
        )}
      />
    </>
  );
};
