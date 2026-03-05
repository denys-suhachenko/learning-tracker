export type TopicStatus = 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
export type CourseStatus =
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'NOT_STARTED'
  | 'CANCELLED';

export type Course = {
  id: string;
  title: string;
  description?: string;
  progress: number;
  status: CourseStatus;
  area?: string;
  createdAt?: string;
};

export type Topic = {
  id: string;
  title: string;
  minutes: number;
  course: string;
  status: TopicStatus;
};
