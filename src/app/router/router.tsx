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
            handle: {
              breadcrumb: () => ({ label: 'Courses', link: '/courses' }),
            },
            children: [
              {
                index: true,
                Component: CoursesListPage,
              },
              {
                path: ':courseId',
                handle: {
                  breadcrumb: (match: any) => ({
                    label: match.data?.title ?? 'Course',
                    link: `/courses/${match.params.courseId}`,
                  }),
                },
                children: [
                  { index: true, Component: CoursePage },
                  {
                    path: 'lessons/:lessonId',
                    Component: LessonPage,
                    handle: {
                      breadcrumb: (match: any) => ({
                        label: match.data?.title ?? 'Lesson',
                        link: `/courses/${match.params.courseId}/lessons/${match.params.lessonId}`,
                      }),
                    },
                  },
                ],
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
