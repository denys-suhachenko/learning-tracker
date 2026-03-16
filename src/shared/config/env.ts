export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
};

if (!env.apiUrl) {
  throw new Error('Missing VITE_API_URL');
}
