import Image from 'next/image';
import AlarmImage from '@/assets/my/alarm.png';
import type { NotificationItem } from '../constants';

interface NotificationBannerProps {
  item: NotificationItem;
  onToggle: () => void;
}

export function NotificationBanner({
  item,
  onToggle,
}: NotificationBannerProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6 flex items-center space-x-4">
      <Image src={AlarmImage} alt="alarm" width={24} height={24} />
      <div className="flex-1">
        <h3 className="text-boy3-sb font-semibold text-white mb-1">
          {item.title}
        </h3>
        <p className="text-body4-m text-gray-300">{item.description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="bg-primary-600 text-white px-4 py-2 rounded-lg text-button-5 font-medium hover:bg-primary-700 transition-colors"
      >
        알림 켜기
      </button>
    </div>
  );
}
