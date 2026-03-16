export type CourseStatus = 'draft' | 'active';
export type LessonStatus = 'planned' | 'in_progress' | 'completed';

export type StudyArea = {
  id: string;
  name: string;
  slug?: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  study_area: StudyArea;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
  modules: Module[];
};

export type Module = {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
};

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
