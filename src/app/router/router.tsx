import { createBrowserRouter } from 'react-router';

import { DashboardPage, NotFoundPage } from '@/pages';

import AppLayout from '@/app/layout/layout';

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
