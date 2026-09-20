import { baseApi } from '@/shared/api/baseApi';

import {
  type NotificationEvent,
  type PaginatedNotification,
} from '../model/types';

import { env } from '@/shared/config/env';
import type { RootState } from '@/app/store/store';

const notificationsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getNotifications: create.infiniteQuery<PaginatedNotification, void, number>(
      {
        infiniteQueryOptions: {
          initialPageParam: 1,
          getNextPageParam: (lastPage, _allPages, lastPageParam) =>
            lastPage.next ? lastPageParam + 1 : undefined,
        },
        query: ({ pageParam }) => `/notifications?page=${pageParam}`,
        async onCacheEntryAdded(
          _arg,
          {
            cacheDataLoaded,
            cacheEntryRemoved,
            updateCachedData,
            getState,
            dispatch,
          },
        ) {
          const token = (getState() as RootState).auth.accessToken;

          if (!token) {
            return;
          }

          try {
            await cacheDataLoaded;

            const socket = new WebSocket(`${env.websocketUrl}/notifications/`);

            socket.addEventListener('open', () => {
              socket.send(
                JSON.stringify({
                  type: 'authenticate',
                  access: token,
                }),
              );
            });

            socket.addEventListener(
              'message',
              (event: MessageEvent<string>) => {
                try {
                  const data = JSON.parse(event.data) as NotificationEvent;

                  switch (data.type) {
                    case 'notification.created': {
                      updateCachedData((draft) => {
                        const exists = draft.pages.some((page) =>
                          page.results.some(
                            (notification) =>
                              notification.id === data.notification.id,
                          ),
                        );

                        if (exists) {
                          return;
                        }

                        const firstPage = draft.pages[0];

                        if (!firstPage) {
                          return;
                        }

                        firstPage.results.unshift(data.notification);
                        firstPage.count += 1;
                      });

                      dispatch(
                        notificationsApi.util.invalidateTags([
                          'NotificationUnreadCount',
                        ]),
                      );

                      break;
                    }

                    case 'notification.updated': {
                      updateCachedData((draft) => {
                        for (const page of draft.pages) {
                          const index = page.results.findIndex(
                            ({ id }) => id === data.notification.id,
                          );

                          if (index !== -1) {
                            page.results[index] = data.notification;
                            return;
                          }
                        }
                      });

                      dispatch(
                        notificationsApi.util.invalidateTags([
                          'NotificationUnreadCount',
                        ]),
                      );

                      break;
                    }

                    case 'notifications.read_all': {
                      updateCachedData((draft) => {
                        for (const page of draft.pages) {
                          page.results = page.results.map((notification) =>
                            notification.read_at
                              ? notification
                              : {
                                  ...notification,
                                  read_at: data.read_at,
                                },
                          );
                        }
                      });

                      // unread-count також 0 / invalidate
                      break;
                    }

                    default:
                      break;
                  }
                } catch (error) {
                  console.error('Invalid notification WebSocket event', error);
                }
              },
            );

            await cacheEntryRemoved;

            socket.close();
          } catch {
            // cache entry may disappear before initial data loads
          }
        },
      },
    ),
    getUnreadCount: create.query<{ count: number }, void>({
      query: () => '/notifications/unread-count/',
      providesTags: ['NotificationUnreadCount'],
    }),
    markNotificationAsRead: create.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}/read/`,
        method: 'POST',
      }),
      invalidatesTags: ['NotificationUnreadCount'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const notificationPatch = dispatch(
          notificationsApi.util.updateQueryData(
            'getNotifications',
            undefined,
            (draft) => {
              for (const page of draft.pages) {
                const index = page.results.findIndex(
                  (notification) => notification.id === id,
                );

                if (index === -1) {
                  continue;
                }

                page.results[index] = {
                  ...page.results[index],
                  read_at: new Date().toISOString(),
                };

                return;
              }
            },
          ),
        );

        const countPatch = dispatch(
          notificationsApi.util.updateQueryData(
            'getUnreadCount',
            undefined,
            (draft) => {
              draft.count = Math.max(0, draft.count - 1);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          notificationPatch.undo();
          countPatch.undo();
        }
      },
    }),
    markAllNotificationsAsRead: create.mutation<void, void>({
      query: () => ({
        url: '/notifications/read-all/',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const optimisticReadAt = new Date().toISOString();

        const notificationsPatch = dispatch(
          notificationsApi.util.updateQueryData(
            'getNotifications',
            undefined,
            (draft) => {
              for (const page of draft.pages) {
                page.results = page.results.map((notification) =>
                  notification.read_at
                    ? notification
                    : {
                        ...notification,
                        read_at: optimisticReadAt,
                      },
                );
              }
            },
          ),
        );

        const countPatch = dispatch(
          notificationsApi.util.updateQueryData(
            'getUnreadCount',
            undefined,
            (draft) => {
              draft.count = 0;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          notificationsPatch.undo();
          countPatch.undo();
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotificationsInfiniteQuery,
  useGetUnreadCountQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} = notificationsApi;
