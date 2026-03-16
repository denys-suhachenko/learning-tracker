export type LessonStatus = 'planned' | 'in_progress' | 'completed';

export type Lesson = {
  id: string;
  module: string;
  title: string;
  description?: string;
  content?: string;
  order: number;
  estimated_minutes: number;
  status: LessonStatus;
};
