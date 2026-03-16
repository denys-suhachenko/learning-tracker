import { baseApi } from '@/shared/api/baseApi';

import type { Lesson } from '../model/types';

const lessonsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getLesson: create.query<Lesson, string>({
      query: (lessonId) => `/lessons/${lessonId}`,
      providesTags: (_, __, id) => [{ type: 'Lessons', id }],
    }),
    updateLesson: create.mutation<Lesson, Partial<Lesson> & Pick<Lesson, 'id'>>(
      {
        query: ({ id, ...body }) => ({
          url: `/lessons/${id}/`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: (_, __, { id }) => [{ type: 'Lessons', id }],
      },
    ),
  }),
  overrideExisting: true,
});

export const { useGetLessonQuery, useUpdateLessonMutation } = lessonsApi;
