import type { Course, StudyArea } from '../model/types';

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Principles of Microeconomics',
    slug: 'principles-of-microeconomics',
    description:
      'An introduction to individual decision-making, markets, incentives, and firm behavior.',
    study_area: {
      id: 'area-1',
      name: 'Economics',
      slug: 'economics',
    },
    status: 'active',
    progress: 100,
    created_at: '2026-07-29T00:00:00.000Z',
    updated_at: '2026-07-30T00:00:00.000Z',
  },
  {
    id: 'course-2',
    title: 'World History: Ancient to Medieval',
    slug: 'world-history-ancient-to-medieval',
    description:
      'A broad survey of major civilizations and historical transitions from antiquity to the medieval era.',
    study_area: {
      id: 'area-2',
      name: 'History',
      slug: 'history',
    },
    status: 'draft',
    progress: 0,
    created_at: '2026-07-29T00:00:00.000Z',
    updated_at: '2026-07-30T00:00:00.000Z',
  },
];

export const STUDY_AREAS: StudyArea[] = [
  {
    id: 'area-1',
    name: 'Computer Science',
    slug: 'computer-science',
  },
  {
    id: 'area-2',
    name: 'Economics',
    slug: 'economics',
  },
  {
    id: 'area-3',
    name: 'History',
    slug: 'history',
  },
  {
    id: 'area-4',
    name: 'Physics',
    slug: 'physics',
  },
];
