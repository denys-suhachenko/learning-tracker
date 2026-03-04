import { createSlice } from '@reduxjs/toolkit';

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
  reducers: {},
});

export default coursesSlice.reducer;
