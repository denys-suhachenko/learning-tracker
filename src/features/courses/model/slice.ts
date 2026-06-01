import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Course } from './types';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

type CoursesState = {
  total: number;
  list: Course[];
  status: LoadingStatus;
};

const initialState: CoursesState = {
  total: 0,
  list: [],
  status: 'idle',
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    removeCourse(state, action: PayloadAction<Course>) {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { removeCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
