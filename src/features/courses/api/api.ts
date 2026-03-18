import { baseApi } from '@/shared/api/baseApi';

import { type Course, type Lesson } from '../model/types';

const coursesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getCourses: create.query<Course[], void>({
      query: () => '/courses',
      providesTags: ['Courses'],
    }),
    getCourse: create.query<Course, string>({
      query: (courseId) => `/courses/${courseId}`,
      providesTags: ['Courses'],
    }),
    removeCourse: create.mutation<void, string>({
      query: (id) => ({
        url: `/courses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses'],
    }),
    getLesson: create.query<Lesson, string>({
      query: (lessonId) => `/lessons/${lessonId}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useRemoveCourseMutation,
  useGetLessonQuery,
} = coursesApi;
