import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store/store';

export const selectCourses = (state: RootState) => state.courses.list;

export const selectFiltered = (_: RootState, statuses: any[]) => statuses;

export const selectCoursesList = createSelector(
  [selectCourses, selectFiltered],
  (list, statuses) => {
    const selectedStatuses = new Set(statuses.map((status) => status.value));
    const res = list.filter((item) => selectedStatuses.has(item.status));
    return res.length ? res : list;
  },
);
