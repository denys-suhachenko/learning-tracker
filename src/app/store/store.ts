import { configureStore } from '@reduxjs/toolkit';

import coursesReducer from '@/features/courses/model/slice';
import { baseApi } from '@/shared/api/baseApi';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
