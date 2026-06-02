import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Toaster } from 'sonner';

import { router } from './app/router/router.tsx';
import { store } from './app/store/store.ts';
import { ThemeProvider } from './app/providers/ThemeProvider.tsx';
import { initSentry } from './shared/config/sentry/sentry.tsx';

import { SentryUser } from './shared/config/sentry/SentryUser.tsx';
import './index.css';

initSentry();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<div>Error! Something went wrong</div>}>
      <Provider store={store}>
        <ThemeProvider>
          <SentryUser />
          <RouterProvider router={router} />
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                success:
                  '!bg-emerald-600 !text-white !border-emerald-600 !text-sm',
                error: '!bg-red-600 !text-white !border-red-600 !text-sm',
                description: '!text-gray-200',
              },
              duration: 2000,
            }}
          />
        </ThemeProvider>
      </Provider>
    </Sentry.ErrorBoundary>
  </StrictMode>,
);
