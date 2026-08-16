import { http, HttpResponse } from 'msw';

import { env } from '@/shared/config/env';
import type { Course, CreateCourse, StudyArea } from '../model/types';

import { COURSES, STUDY_AREAS } from './mocks';

const BASE_API_URL = env.apiUrl;

export const courseHandlers = [
  http.get(`${BASE_API_URL}/courses`, () =>
    HttpResponse.json<Course[]>(COURSES, {
      status: 200,
    }),
  ),
  http.post(`${BASE_API_URL}/courses/`, async ({ request }) => {
    const body = (await request.json()) as CreateCourse;
    return HttpResponse.json(
      {
        id: 'new-course-id',
        ...body,
        status: 'active',
      },
      {
        status: 201,
      },
    );
  }),
  http.delete(
    `${BASE_API_URL}/courses/:id/`,
    () => new HttpResponse(null, { status: 204 }),
  ),
  http.get(`${BASE_API_URL}/study-areas`, () =>
    HttpResponse.json<StudyArea[]>(STUDY_AREAS, {
      status: 200,
    }),
  ),
];
