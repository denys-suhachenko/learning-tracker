import { createBrowserRouter } from 'react-router';

import AppLayout from '@/app/layout/AppLayout';
import {
  CoursePage,
  CoursesListPage,
  DashboardPage,
  KnowledgeBasePage,
  LessonPage,
  NotFoundPage,
  PlannerPage,
  SignInPage,
  SignUpPage,
} from '@/pages';

import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    Component: SignInPage,
  },
  {
    path: '/sign-up',
    Component: SignUpPage,
  },
  {
    Component: ProtectedRoute,
    children: [
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
              {
                index: true,
                Component: CoursesListPage,
              },
              {
                path: ':courseId',
                Component: CoursePage,
              },
              {
                path: ':courseId/lessons/:lessonId',
                Component: LessonPage,
              },
            ],
          },
          {
            path: 'planner',
            Component: PlannerPage,
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
    ],
  },
]);
