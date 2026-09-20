import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDateTime } from '@/shared/lib/formatTime';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

import {
  useGetNotificationsInfiniteQuery,
  useGetUnreadCountQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} from '../api/api';

const NotificationsWidget = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'notifications' });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetNotificationsInfiniteQuery();
  const notifications = data?.pages.flatMap((page) => page.results) ?? [];

  const { data: unread } = useGetUnreadCountQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

  const infiniteScrollHandler = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = scrollContainerRef.current;

    const observer = new IntersectionObserver(infiniteScrollHandler, {
      root,
      rootMargin: '100px',
    });

    if (!sentinel || !root) {
      return;
    }

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [infiniteScrollHandler]);

  return (
    <div className="bg-card rounded-md border p-4">
      <div className="mb-4 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">{t('title')}</h2>

          {!!unread?.count && (
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-full text-xs font-medium">
              {unread?.count}
            </div>
          )}
        </div>

        <Button variant="ghost" onClick={() => markAllAsRead()}>
          Mark all as read
        </Button>
      </div>

      <div ref={scrollContainerRef} className="max-h-64 overflow-y-scroll">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              'group relative flex cursor-pointer items-center gap-3 rounded-md p-3',
              !notification.read_at && 'bg-muted/50',
            )}
            onClick={() => {
              markAsRead(notification.id);
            }}
          >
            <div className="flex w-full items-center justify-between gap-3">
              <div className="w-2">
                {!notification.read_at && (
                  <span className="bg-primary block size-2 rounded-full" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    'text-sm',
                    !notification.read_at ? 'font-semibold' : 'font-medium',
                  )}
                >
                  {notification.title}
                </div>

                <p className="text-muted-foreground mt-1 text-xs">
                  {notification.message}
                </p>
              </div>

              <div className="text-muted-foreground text-xs">
                {formatDateTime(notification.created_at, 'time')}
              </div>

              {!notification.read_at && (
                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                  ✓
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={sentinelRef} />
      </div>
    </div>
  );
};

export default NotificationsWidget;
