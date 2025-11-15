import Image from 'next/image';
import CompleteImage from '@/assets/calendar/complete.png';
import DefecationImage from '@/assets/common/defecation.png';
import LifestyleImage from '@/assets/common/lifestyle.png';

export const Tag = ({
  type,
}: {
  type: 'defecation' | 'lifestyle' | 'complete';
}) => {
  const image = {
    defecation: DefecationImage,
    lifestyle: LifestyleImage,
    complete: CompleteImage,
  };
  const text = {
    defecation: '배변',
    lifestyle: '생활',
    complete: '모두 완료',
  };
  const backgroundColor = {
    defecation: 'bg-[#CF8350]/20',
    lifestyle: 'bg-blue-100',
    complete: 'bg-red-100',
  };

  return (
    <div
      className={`py-1.5 px-3 h-7.5 rounded-full flex items-center justify-center gap-1 ${backgroundColor[type]}`}
    >
      <Image src={image[type]} alt={`image_${type}`} className="w-4.5 h-4.5" />
      <p className="text-body4-m text-white">{text[type]}</p>
    </div>
  );
};
