import { baseApi } from '@/shared/api/baseApi';

import type { CreateLesson, Lesson } from '../model/types';

const lessonsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getLesson: create.query<Lesson, Lesson['id']>({
      query: (id) => `/lessons/${id}`,
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
    setBookmark: create.mutation<void, Pick<Lesson, 'id' | 'is_bookmarked'>>({
      query: ({ id, is_bookmarked }) => ({
        url: `/lessons/${id}/bookmark/`,
        method: is_bookmarked ? 'PUT' : 'DELETE',
      }),
      onQueryStarted: async (
        { id, is_bookmarked },
        { dispatch, queryFulfilled },
      ) => {
        const res = dispatch(
          lessonsApi.util.updateQueryData('getLesson', id, (draft) => {
            draft.is_bookmarked = is_bookmarked;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          res.undo();
        }
      },
    }),
    removeLesson: create.mutation<void, Lesson['id']>({
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
  useSetBookmarkMutation,
} = lessonsApi;
