import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Toaster } from 'sonner';

import { baseApi } from '@/shared/api/baseApi';
import authReducer from '@/features/auth/model/slice';

export const createTestStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
    },
    middleware: (gDM) => gDM().concat(baseApi.middleware),
  });

export const renderWithProviders = (ui: React.ReactElement) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
        <Toaster />
      </MemoryRouter>
    </Provider>,
  );
};
