import { baseApi } from '@/shared/api/baseApi';

import type { User } from '../model/types';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  access: string;
  refresh: string;
};

const coursesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    login: create.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login/',
        method: 'POST',
        body,
      }),
    }),

    register: create.mutation({
      query: (body) => ({
        url: '/auth/register/',
        method: 'POST',
        body,
      }),
    }),

    logout: create.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      }),
    }),

    refresh: create.mutation({
      query: () => ({
        url: '/auth/refresh/',
        method: 'POST',
      }),
    }),

    me: create.query<User, void>({
      query: () => ({
        url: '/auth/me/',
        method: 'GET',
      }),
      providesTags: ['Me'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = coursesApi;
