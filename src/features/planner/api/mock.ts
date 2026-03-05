import type { Topic } from '@/features/courses/model/types';

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export const topicsList: Topic[] = [
  {
    id: '2b1ec99e',
    title: 'React.memo pitfalls',
    course: 'React',
    minutes: 30,
    status: 'COMPLETED',
  },
  {
    id: 'c0a413fb',
    title: 'Event loop deep dive',
    course: 'JavaScript',
    minutes: 45,
    status: 'IN_PROGRESS',
  },
  {
    id: '98fabc21',
    title: 'RTKQ cache & tags',
    course: 'Redux Toolkit',
    minutes: 35,
    status: 'NOT_STARTED',
  },
  {
    id: 'f7d24c8a',
    title: 'startTransition vs deferred',
    course: 'React',
    minutes: 40,
    status: 'COMPLETED',
  },
];

export const topicsByDay: Record<Day, Topic[]> = {
  Mon: [
    {
      id: '2b1ec99e',
      title: 'React.memo pitfalls',
      course: 'React',
      minutes: 30,
      status: 'COMPLETED',
    },
  ],
  Tue: [
    {
      id: 'c0a413fb',
      title: 'Event loop deep dive',
      course: 'JavaScript',
      minutes: 45,
      status: 'IN_PROGRESS',
    },
  ],
  Wed: [
    {
      id: '98fabc21',
      title: 'RTKQ cache & tags',
      course: 'Redux Toolkit',
      minutes: 35,
      status: 'NOT_STARTED',
    },
  ],
  Thu: [
    {
      id: 'f7d24c8a',
      title: 'startTransition vs deferred',
      course: 'React',
      minutes: 40,
      status: 'COMPLETED',
    },
  ],
  Fri: [],
  Sat: [],
  Sun: [],
};
