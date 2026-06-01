import type { RootState } from '@/app/store/store';

export const selectCourses = (state: RootState) => state.courses.list;
