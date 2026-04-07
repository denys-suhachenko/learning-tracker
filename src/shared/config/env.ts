export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
  sentryDsn: import.meta.env.VITE_APP_SENTRY_DSN,
  enableSentry: import.meta.env.VITE_ENABLE_SENTRY === 'true',
};

if (!env.apiUrl) {
  throw new Error('Missing VITE_API_URL');
}
