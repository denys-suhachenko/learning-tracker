import type { Schemas } from '@/shared/api/types';

export type LessonStatus = Schemas['LessonStatusEnum'];

export type Lesson = Schemas['Lesson'];

export type CreateLesson = Omit<Lesson, 'id'>;
