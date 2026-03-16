import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '../config/env';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
  }),
  tagTypes: ['Courses', 'Lessons'],
  endpoints: () => ({}),
});
