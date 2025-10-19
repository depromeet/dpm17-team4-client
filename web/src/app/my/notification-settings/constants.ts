export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: 'banner' | 'toggle';
  enabled: boolean;
}

export const NOTIFICATION_ITEMS: NotificationItem[] = [
  {
    id: 'app-notification',
    title: '앱 알림이 꺼져있어요',
    description: '알림을 켜고 기록 소식을 받아보세요',
    type: 'banner',
    enabled: false,
  },
  {
    id: 'record-reminder',
    title: '기록 리마인드 알림',
    description: '기록을 잊지 않도록 리마인드 알림을 보내드려요',
    type: 'toggle',
    enabled: false,
  },
  {
    id: 'report-generation',
    title: '리포트 생성 알림',
    description: '주간 및 월간 리포트가 생성 시 알림을 보내드려요',
    type: 'toggle',
    enabled: false,
  },
];

export const NOTIFICATION_TYPES = {
  BANNER: 'banner',
  TOGGLE: 'toggle',
} as const;
