import type { RootState } from '@/app/store/store';

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsHydrated = (state: RootState) => state.auth.isHydrated;
