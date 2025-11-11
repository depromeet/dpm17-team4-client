import Image from 'next/image';
import { useRouter } from 'next/navigation';
import forkIcon from '@/assets/home/fork.svg';
import ChevronLeft from '@/assets/home/IC_Chevron_Left.png';
import ChevronRight from '@/assets/home/IC_Chevron_Right.png';
import poopIcon from '@/assets/home/poop.svg';
import { cn } from '@/utils/utils-cn';
import { formatDate, isNextDisabled, isPrevDisabled } from '../utils/util-date';
import { getRecordPath } from '../utils/util-route';
import RecordButton from './RecordButton';

interface RecordSectionProps {
  navHeight: number;
  currentDate: Date;
  onChangeDate: (direction: 'prev' | 'next') => void;
}

const RecordSection = ({
  navHeight,
  currentDate,
  onChangeDate,
}: RecordSectionProps) => {
  const router = useRouter();

  const handleRecordClick = (type: 'defecation' | 'lifestyle') => {
    const path = getRecordPath(type, currentDate);
    router.push(path);
  };

  return (
    <section
      className={cn(
        'bg-gray-900 w-full left-0 px-4 py-8 rounded-t-[1.25rem] absolute bottom-0'
      )}
      style={{ bottom: `${navHeight - 19}px` }}
    >
      <div className="text-h4 flex gap-5 justify-center items-center">
        <button
          type="button"
          onClick={() => onChangeDate('prev')}
          disabled={isPrevDisabled(currentDate)}
          className={cn(
            'cursor-pointer block transition-opacity',
            isPrevDisabled(currentDate) && 'opacity-30 cursor-not-allowed'
          )}
        >
          <Image src={ChevronLeft} alt="화살표 왼쪽 아이콘" className="block" />
        </button>
        <span className="select-none text-white">
          {formatDate(currentDate)}
        </span>
        <button
          type="button"
          onClick={() => onChangeDate('next')}
          disabled={isNextDisabled(currentDate)}
          className={cn(
            'cursor-pointer block transition-opacity',
            isNextDisabled(currentDate) && 'opacity-30 cursor-not-allowed'
          )}
        >
          <Image
            src={ChevronRight}
            alt="화살표 오른쪽 아이콘"
            className="block"
          />
        </button>
      </div>
      <div className="flex gap-[0.69rem] mt-4">
        <RecordButton
          title="이날의 뿡"
          subtitle="배변 기록하기"
          onClick={() => handleRecordClick('defecation')}
          icon={poopIcon}
        />
        <RecordButton
          title="이날의 냠"
          subtitle="생활 기록하기"
          onClick={() => handleRecordClick('lifestyle')}
          icon={forkIcon}
        />
      </div>
    </section>
  );
};

export default RecordSection;
