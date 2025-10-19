import type { NotificationItem } from '../constants';

interface NotificationToggleProps {
  item: NotificationItem;
  onToggle: () => void;
}

export function NotificationToggle({
  item,
  onToggle,
}: NotificationToggleProps) {
  console.log(item,'item')
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-body2-sb text-white mb-1">{item.title}</h3>
          <p className="text-body4-m text-gray-300">{item.description}</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={`relative inline-flex w-11 h-6 items-center rounded-full transition-colors ${
            item.enabled ? 'bg-primary-600' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform ${
              item.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
