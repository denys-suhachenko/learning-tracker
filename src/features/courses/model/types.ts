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

export type CreateModule = Omit<Schemas['Module'], 'id'>;

export type ContinueLearningCourse = {
  id: string;
  title: string;
  description: string;
  progress: number;
  completed_lessons: number;
  total_lessons: number;
  next_lesson: {
    id: string;
    title: string;
  } | null;
};

export type CourseSummary = {
  active_courses: number;
  courses_in_progress: number;
  lessons_completed: number;
  lessons_completed_this_week: number;
};
