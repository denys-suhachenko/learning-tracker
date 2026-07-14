import React, { type ReactNode } from 'react';
import { BellIcon, CheckIcon, CalendarClockIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';

type NotificationKey = 'lessonCompleted' | 'reviewScheduled' | 'newReminder';

type Notification = {
  id: string;
  key: NotificationKey;
  icon: ReactNode;
  iconBgClass: string;
};

const notifications: Notification[] = [
  {
    id: '1',
    key: 'lessonCompleted',
    icon: <CheckIcon className="size-5" />,
    iconBgClass: 'bg-green-100 text-green-700',
  },
  {
    id: '2',
    key: 'reviewScheduled',
    icon: <CalendarClockIcon className="size-5" />,
    iconBgClass: 'bg-blue-100 text-blue-600',
  },
  {
    id: '3',
    key: 'newReminder',
    icon: <BellIcon className="size-5" />,
    iconBgClass: 'bg-orange-100 text-orange-600',
  },
];

const NotificationsWidget = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'notifications' });

  return (
    <div className="bg-card rounded-md border p-4">
      <h2 className="mb-4 text-lg font-medium">{t('title')}</h2>
      <div className="space-y-4">
        {notifications.map((notification, idx) => (
          <React.Fragment key={notification.id}>
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-sm border',
                  notification.iconBgClass,
                )}
              >
                {notification.icon}
              </div>
              <div className="flex w-full items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-medium">
                    {t(`items.${notification.key}.title`)}
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs font-medium">
                    {t(`items.${notification.key}.description`)}
                  </p>
                </div>
                <div className="text-muted-foreground text-xs font-medium">
                  {t(`items.${notification.key}.time`)}
                </div>
              </div>
            </div>
            {idx !== notifications.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NotificationsWidget;
