import { baseApi } from '@/shared/api/baseApi';

import {
  type ContinueLearningCourse,
  type Course,
  type CourseDetail,
  type CourseSummary,
  type CreateCourse,
  type CreateModule,
  type Module,
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
    createModule: create.mutation<Module, CreateModule>({
      query: (body) => ({
        url: `/modules/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Courses'],
    }),
    removeModule: create.mutation<void, string>({
      query: (id) => ({
        url: `/modules/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses'],
    }),
    getStudyAreas: create.query<StudyArea[], void>({
      query: () => '/study-areas',
    }),
    getContinueLearning: create.query<ContinueLearningCourse[], void>({
      query: () => '/courses/continue-learning/',
    }),
    getCourseSummary: create.query<CourseSummary, void>({
      query: () => '/courses/summary/',
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
  useCreateModuleMutation,
  useRemoveModuleMutation,
  useGetStudyAreasQuery,
  useGetContinueLearningQuery,
  useGetCourseSummaryQuery,
} = coursesApi;
