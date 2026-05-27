import { baseApi } from '@/shared/api/baseApi';

import type { CreateLesson, Lesson } from '../model/types';

const lessonsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getLesson: create.query<Lesson, string>({
      query: (lessonId) => `/lessons/${lessonId}`,
      providesTags: (_, __, id) => [{ type: 'Lessons', id }],
    }),
    createLesson: create.mutation<Lesson, CreateLesson>({
      query: (body) => ({
        url: '/lessons/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Courses', 'Lessons'],
    }),
    updateLesson: create.mutation<Lesson, Partial<Lesson> & Pick<Lesson, 'id'>>(
      {
        query: ({ id, ...body }) => ({
          url: `/lessons/${id}/`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: (_, __, { id }) => [
          { type: 'Lessons', id },
          'Courses',
        ],
      },
    ),
    removeLesson: create.mutation<void, string>({
      query: (id) => ({
        url: `/lessons/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses', 'Lessons'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetLessonQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useRemoveLessonMutation,
} = lessonsApi;
