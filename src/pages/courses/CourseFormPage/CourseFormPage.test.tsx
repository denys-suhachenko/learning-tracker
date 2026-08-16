import { describe, expect, it } from 'vitest';
import { Route, Routes } from 'react-router';
import { http, HttpResponse } from 'msw';
import { screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';

import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import { env } from '@/shared/config/env';
import type { Course, CreateCourse } from '@/features/courses/model/types';

import CourseFormPage from './CourseFormPage';

const COURSE_URL = `${env.apiUrl}/courses/course-123`;

const renderPage = () =>
  renderWithProviders(
    <Routes>
      <Route path="/courses/create" element={<CourseFormPage />} />
      <Route path="/courses" element={<div>Courses list page</div>} />
    </Routes>,
    { route: '/courses/create' },
  );

const renderEditPage = () =>
  renderWithProviders(
    <Routes>
      <Route path="/courses/:courseId/edit" element={<CourseFormPage />} />
      <Route path="/courses" element={<div>Courses list page</div>} />
    </Routes>,
    { route: '/courses/course-123/edit' },
  );

const fillCourseForm = async (
  user: UserEvent,
  values: Partial<CreateCourse> = {},
) => {
  await user.type(
    screen.getByLabelText('title.label'),
    values.title ?? 'New Physics Course',
  );
  await user.type(
    screen.getByLabelText('slug.label'),
    values.slug ?? 'new-physics-course',
  );
  await user.type(
    screen.getByLabelText('description.label'),
    values.description ?? 'Course about classical physics basics',
  );
  await user.click(screen.getByLabelText('studyArea.label'));
  await user.click(await screen.findByRole('option', { name: 'Physics' }));
};

describe('CourseFormPage', () => {
  it('creates a course and navigates to the list', async () => {
    const user = userEvent.setup();

    renderPage();

    await fillCourseForm(user);

    await user.click(screen.getByRole('button', { name: /create course/i }));

    expect(await screen.findByText(/course created/i)).toBeInTheDocument();
    expect(await screen.findByText('Courses list page')).toBeInTheDocument();
  });

  it('shows backend error message and stays on the page when the server returns 400', async () => {
    server.use(
      http.post(`${env.apiUrl}/courses/`, () =>
        HttpResponse.json(
          {
            slug: ['Slug already exists.'],
          },
          {
            status: 400,
          },
        ),
      ),
    );

    const user = userEvent.setup();

    renderPage();

    await fillCourseForm(user);

    await user.click(screen.getByRole('button', { name: /create course/i }));

    expect(
      await screen.findByText('slug: Slug already exists.'),
    ).toBeInTheDocument();

    expect(screen.queryByText('Courses list page')).not.toBeInTheDocument();
  });

  it('prefills the form, updates the course, and navigates after save', async () => {
    let sentBody: Course | undefined;

    server.use(
      http.get(COURSE_URL, () =>
        HttpResponse.json(
          {
            id: 'course-123',
            title: 'Original title',
            description: 'Original description',
            slug: 'original-slug',
            study_area: {
              id: 'area-1',
              name: 'Physics',
              slug: 'physics',
            },
            modules: [],
            status: 'draft',
            created_at: '2026-01-01T00:00:00Z',
            updated_at: '2026-01-01T01:00:00Z',
          },
          {
            status: 200,
          },
        ),
      ),
      http.put(COURSE_URL, async ({ request }) => {
        sentBody = (await request.json()) as Course;
        return HttpResponse.json({
          ...sentBody,
          id: 'course-123',
        });
      }),
    );

    const user = userEvent.setup();

    renderEditPage();

    expect(
      await screen.findByDisplayValue('Original title'),
    ).toBeInTheDocument();

    const titleInput = screen.getByLabelText('title.label');
    await user.clear(titleInput);
    await user.type(titleInput, 'Updated title');
    await user.click(screen.getByRole('button', { name: /save changes/i }));

    expect(await screen.findByText(/course updated/i)).toBeInTheDocument();
    expect(await screen.findByText('Courses list page')).toBeInTheDocument();

    expect(sentBody?.title).toBe('Updated title');
  });
});
