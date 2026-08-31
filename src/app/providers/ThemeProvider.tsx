import { useEffect } from 'react';

import { useGetSettingsQuery } from '@/features/settings/api/api';
import type { UserTheme } from '@/features/settings/model/types';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: settings } = useGetSettingsQuery();

  const theme: UserTheme = settings?.theme ?? 'system';

  useEffect(() => {
    if (!settings?.theme) {
      return;
    }

    localStorage.setItem('theme', settings.theme);
  }, [settings?.theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const resolvedTheme =
        theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;

      document.documentElement.dataset.theme = resolvedTheme;
    };

    applyTheme();

    if (theme !== 'system') {
      return;
    }

    media.addEventListener('change', applyTheme);

    return () => {
      media.removeEventListener('change', applyTheme);
    };
  }, [theme]);

  return children;
};
