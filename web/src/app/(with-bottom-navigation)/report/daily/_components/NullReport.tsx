import Image, { type StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import speechBubble from '@/assets/report/speechBubble.png';
import { Button } from '@/components';
import { getTodayDate } from '@/utils/utils-date';

interface NullReportProps {
  nullIcon: StaticImageData;
  title?: string;
  descrption?: string;
  mode: 'all' | 'defecation' | 'lifstyle';
}

export const NullReport = ({
  nullIcon,
  title = '',
  descrption = '리포트는 기록이 있어야 확인할 수 있어요.',
  mode = 'all',
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
    currentMode: 'all' | 'defecation' | 'lifstyle',
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
      case 'lifstyle':
        return { single: `${defaultTitle} 기록하기`, target: 'lifestyle' };
      default:
        return { single: '기록하기', target: 'lifestyle' };
    }
  };

  const buttonContent = getButtonText(mode, title);

  return (
    <div className="bg-transparent pt-16 pb-16 w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-[15.125rem] h-[6.3125rem]">
          <Image
            src={nullIcon}
            alt="null case emoji"
            width={58}
            height={58}
            className="absolute top-[2rem] right-[5.75rem]"
          />
          <Image
            src={speechBubble}
            alt="말풍선"
            width={36}
            height={36}
            className="absolute top-[0.63rem] right-[3.9rem]"
          />
        </div>
        <div className="mt-3">
          <h2 className="text-h3 text-center">{title} 기록이 없어요!</h2>
          <p className="text-body3-m text-gray-400 text-center">{descrption}</p>
        </div>

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
      </div>
    </div>
  );
};
