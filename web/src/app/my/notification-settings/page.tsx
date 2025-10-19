'use client';

import { useState } from 'react';
import { Navigator } from '@/components/Navigator';
import { NotificationBanner } from './_components/NotificationBanner';
import { NotificationToggle } from './_components/NotificationToggle';
import {
  NOTIFICATION_ITEMS,
  NOTIFICATION_TYPES,
  type NotificationItem,
} from './constants';

export default function NotificationSettingsPage() {
  //TODO(seieun): 알림 토글 설정 기능 연동 필요
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(NOTIFICATION_ITEMS);

  const handleNotificationToggle = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigator>
        <Navigator.Center>알림 설정</Navigator.Center>
      </Navigator>

      <div className="pt-[56px] px-4 py-6">
        {notifications.map((item) => {
          if (item.type === NOTIFICATION_TYPES.BANNER && !item.enabled) {
            return (
              <NotificationBanner
                key={item.id}
                item={item}
                onToggle={() => handleNotificationToggle(item.id)}
              />
            );
          }

          if (item.type === NOTIFICATION_TYPES.TOGGLE) {
            console.log(item)
            return (
              <NotificationToggle
                key={item.id}
                item={item}
                onToggle={() => handleNotificationToggle(item.id)}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
