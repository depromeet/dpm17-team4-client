import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import forkIcon from '@/assets/home/fork.svg';
import ChevronLeft from '@/assets/home/IC_Chevron_Left.png';
import ChevronRight from '@/assets/home/IC_Chevron_Right.png';
import poopIcon from '@/assets/home/poop.svg';
import { cn } from '@/utils/utils-cn';
import { formatDate, isNextDisabled, isPrevDisabled } from '../utils/util-date';
import { getRecordPath } from '../utils/util-route';
import RecordButton from './RecordButton';

type RecordSectionProps = {
  navHeight: number;
};

const RecordSection = ({ navHeight }: RecordSectionProps) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isReady = false;

  const handleDateChange = (direction: 'prev' | 'next') => {
    if(!isReady){
      // TODO form 에 설정된 date 가 전달되지 않음
      return;
    }

    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };
  const handleRecordClick = (type: 'defecation' | 'lifestyle') => {
    const path = getRecordPath(type, selectedDate);
    router.push(path);
  };

  return (
    <section
      className={cn(
        'bg-gray-900 fixed w-full left-0 px-4 py-8 rounded-t-[1.25rem]'
      )}
      style={{ bottom: `${navHeight - 19}px` }}
    >
      <div className="text-h4 flex gap-5 justify-center items-center">
        <button
          type="button"
          onClick={() => handleDateChange('prev')}
          disabled={!isReady || isPrevDisabled(selectedDate)}
          className={cn(
            'cursor-pointer block transition-opacity',
            isPrevDisabled(selectedDate) && 'opacity-30 cursor-not-allowed'
          )}
        >
          <Image src={ChevronLeft} alt="화살표 왼쪽 아이콘" className="block" />
        </button>
        <span className="select-none text-white">{formatDate(selectedDate)}</span>
        <button
          type="button"
          onClick={() => handleDateChange('next')}
          disabled={!isReady || isNextDisabled(selectedDate)}
          className={cn(
            'cursor-pointer block transition-opacity',
            isNextDisabled(selectedDate) && 'opacity-30 cursor-not-allowed'
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
