import type { Schemas } from '@/shared/api/types';

export type Notification = Schemas['Notification'];

export type PaginatedNotification = Schemas['PaginatedNotificationList'];

export type NotificationEvent =
  | { type: 'notifications.ready' }
  | { type: 'notification.created'; notification: Notification }
  | { type: 'notification.updated'; notification: Notification }
  | { type: 'notification.read'; id: string; read_at: string }
  | { type: 'notifications.read_all'; updated_count: number; read_at: string };
