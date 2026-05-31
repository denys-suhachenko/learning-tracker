import { http, HttpResponse } from 'msw';

import type { CreateCourse } from '@/features/courses/model/types';
import { env } from '@/shared/config/env';

const BASE_API_URL = env.apiUrl;

export const handlers = [
  http.get(`${BASE_API_URL}/study-areas`, () => {
    return HttpResponse.json([
      {
        id: 'area-1',
        name: 'Physics',
        slug: 'physics',
      },
      {
        id: 'area-2',
        name: 'Math',
        slug: 'math',
      },
    ]);
  }),
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
];
