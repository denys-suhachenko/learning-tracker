import { createListenerMiddleware } from '@reduxjs/toolkit';

import { logout, setAccessToken, setTokens } from './slice';

export const authListener = createListenerMiddleware();

authListener.startListening({
  actionCreator: setTokens,
  effect: (action) => {
    localStorage.setItem('accessToken', action.payload.access);
    localStorage.setItem('refreshToken', action.payload.refresh);
  },
});

authListener.startListening({
  actionCreator: setAccessToken,
  effect: (action) => {
    localStorage.setItem('accessToken', action.payload);
  },
});

authListener.startListening({
  actionCreator: logout,
  effect: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
});
