import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Course } from './types';
import { coursesList } from '../api/mock';

type CoursesState = {
  total: number;
  list: Course[];
};

const initialState: CoursesState = {
  total: 0,
  list: coursesList,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    remove(state, action: PayloadAction<Course>) {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { remove } = coursesSlice.actions;
export default coursesSlice.reducer;
