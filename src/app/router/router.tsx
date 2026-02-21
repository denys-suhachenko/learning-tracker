import { createBrowserRouter } from 'react-router';

import AppLayout from '@/app/layout/AppLayout';
import {
  CoursePage,
  CoursesListPage,
  DashboardPage,
  KnowledgeBasePage,
  NotFoundPage,
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: 'courses',
        children: [
          { index: true, Component: CoursesListPage },
          {
            path: ':courseId',
            Component: CoursePage,
          },
        ],
      },
      {
        path: 'knowledge-base',
        Component: KnowledgeBasePage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
