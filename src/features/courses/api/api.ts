import { baseApi } from '@/shared/api/baseApi';

import {
  type Course,
  type CourseDetail,
  type CreateCourse,
  type Lesson,
  type StudyArea,
} from '../model/types';

const coursesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getCourses: create.query<Course[], void>({
      query: () => '/courses',
      providesTags: ['Courses'],
    }),
    getCourse: create.query<CourseDetail, string>({
      query: (courseId) => `/courses/${courseId}`,
      providesTags: ['Courses'],
    }),
    createCourse: create.mutation<Course, CreateCourse>({
      query: (body) => ({
        url: '/courses/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Courses'],
    }),
    updateCourse: create.mutation<Course, { id: string; body: CreateCourse }>({
      query: ({ id, body }) => ({
        url: `/courses/${id}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Courses'],
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
    getStudyAreas: create.query<StudyArea[], void>({
      query: () => '/study-areas',
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useRemoveCourseMutation,
  useGetLessonQuery,
  useGetStudyAreasQuery,
} = coursesApi;
