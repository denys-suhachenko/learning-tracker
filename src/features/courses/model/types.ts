import type { Schemas } from '@/shared/api/types';

export type CourseStatus = Schemas['CourseStatusEnum'];
export type LessonStatus = Schemas['LessonStatusEnum'];

export type StudyArea = Schemas['StudyArea'];

export type Course = Schemas['CourseRead'];
export type CourseDetail = Schemas['CourseDetailRead'];

export type CreateCourse = Omit<
  Schemas['Course'],
  'id' | 'created_at' | 'updated_at'
>;

export type Module = Schemas['ModuleDetail'];

export type Lesson = Schemas['Lesson'];
