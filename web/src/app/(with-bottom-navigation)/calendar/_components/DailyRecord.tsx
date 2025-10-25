import Image from 'next/image';
import CompleteImage from '@/assets/calendar/complete.png';
import DefecationImage from '@/assets/calendar/defecation.png';
import LifestyleImage from '@/assets/calendar/lifestyle.png';

export const DailyRecord = ({
  type,
}: {
  type: 'defecation' | 'lifestyle' | 'complete';
}) => {
  const image = {
    defecation: DefecationImage,
    lifestyle: LifestyleImage,
    complete: CompleteImage,
  };
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
      <Image src={image[type]} alt={`image_${type}`} className="w-6 h-6" />
    </div>
  );
};
