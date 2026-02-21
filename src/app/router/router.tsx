import { createBrowserRouter } from 'react-router';

import AppLayout from '@/app/layout/AppLayout';
import {
  CoursesPage,
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
        Component: CoursesPage,
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
