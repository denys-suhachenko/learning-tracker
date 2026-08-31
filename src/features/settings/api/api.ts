import { baseApi } from '@/shared/api/baseApi';

import type { UserSettings } from '../model/types';

const settingsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getSettings: create.query<UserSettings, void>({
      query: () => '/auth/me/settings/',
      providesTags: ['UserSettings'],
    }),
    updateSettings: create.mutation<UserSettings, Partial<UserSettings>>({
      query: (body) => ({
        url: '/auth/me/settings/',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            settingsApi.util.updateQueryData(
              'getSettings',
              undefined,
              () => data,
            ),
          );
        } catch {
          // mutation failed - cache do not changed
        }
      },
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
