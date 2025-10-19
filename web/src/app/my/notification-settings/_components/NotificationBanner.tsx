import { Bell } from 'lucide-react';
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
      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Bell className="w-6 h-6 text-black" />
      </div>
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
