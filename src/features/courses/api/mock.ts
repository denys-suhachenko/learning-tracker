import type { Course } from '../model/types';

export const coursesList: Course[] = [
  {
    id: '1',
    title: 'Classical mechanics',
    description: '',
    progress: 100,
    status: 'COMPLETED',
    area: 'Physics',
  },
  {
    id: '2',
    title: 'Number theory',
    description: '',
    progress: 32,
    status: 'IN_PROGRESS',
    area: 'Mathematics',
  },
  {
    id: '3',
    title: 'Python',
    description: '',
    progress: 0,
    status: 'NOT_STARTED',
    area: 'Programming',
  },
  {
    id: '4',
    title: 'HTML & CSS',
    description: '',
    progress: 73,
    status: 'CANCELLED',
    area: 'Programming',
  },
];
