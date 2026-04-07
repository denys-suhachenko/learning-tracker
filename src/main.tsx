import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';

import { router } from './app/router/router.tsx';
import { store } from './app/store/store.ts';
import { ThemeProvider } from './app/providers/ThemeProvider.tsx';
import { initSentry, SentryUser } from './shared/config/sentry.tsx';

import './index.css';

initSentry();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<div>Error! Something went wrong</div>}>
      <Provider store={store}>
        <ThemeProvider>
          <SentryUser />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </Sentry.ErrorBoundary>
  </StrictMode>,
);
