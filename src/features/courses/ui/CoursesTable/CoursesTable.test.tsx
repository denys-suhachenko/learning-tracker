import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';

import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import { env } from '@/shared/config/env';
import { COURSES } from '../../test/mocks';

import CoursesTable from './CoursesTable';

const renderCoursesTable = () => renderWithProviders(<CoursesTable />);

describe('CoursesTable', () => {
  it('renders list of courses', async () => {
    renderCoursesTable();

    expect(
      await screen.findByText('Principles of Microeconomics'),
    ).toBeInTheDocument();
  });

  it('renders empty list', async () => {
    server.use(http.get(`${env.apiUrl}/courses`, () => HttpResponse.json([])));

    renderCoursesTable();

    expect(
      await screen.findByText('table.emptyList.message'),
    ).toBeInTheDocument();
  });

  it('renders error message instead of table', async () => {
    server.use(
      http.get(
        `${env.apiUrl}/courses`,
        () => new HttpResponse(null, { status: 500 }),
      ),
    );

    renderCoursesTable();

    expect(
      await screen.findByText('Failed to load courses.'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it('shows a loading state while fetching', () => {
    renderCoursesTable();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('removes a course from the list', async () => {
    let courses = [...COURSES];

    server.use(
      http.get(`${env.apiUrl}/courses`, () => HttpResponse.json(courses)),
      http.delete(`${env.apiUrl}/courses/:id/`, ({ params }) => {
        courses = courses.filter((course) => course.id !== params.id);
        return new HttpResponse(null, { status: 204 });
      }),
    );

    const user = userEvent.setup();

    renderCoursesTable();

    expect(
      await screen.findByText('Principles of Microeconomics'),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Remove course Principles of Microeconomics',
      }),
    );

    expect(await screen.findByRole('alertdialog')).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'table.alert.delete' }),
    );

    expect(await screen.findByText('Course deleted')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByText('Principles of Microeconomics'),
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByText('World History: Ancient to Medieval'),
    ).toBeInTheDocument();
  });
});
