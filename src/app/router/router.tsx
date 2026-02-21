import { createBrowserRouter } from 'react-router';

import AppLayout from '@/app/layout/AppLayout';
import { DashboardPage, NotFoundPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
