import { baseApi } from '@/shared/api/baseApi';

import type { UserSettings } from '../model/types';

const settingsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getSettings: create.query<UserSettings, void>({
      query: () => '/auth/me/settings/',
      providesTags: ['UserSettings'],
    }),
    updateSettings: create.mutation<UserSettings, UserSettings>({
      query: (body) => ({
        url: '/auth/me/settings/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['UserSettings'],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
