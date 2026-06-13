import 'i18next';

import commonEn from '@/shared/i18n/en.json';
import layoutEn from '@/app/layout/i18n/en.json';
import settingsEn from '@/features/settings/i18n/en.json';
import coursesEn from '@/features/courses/i18n/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof commonEn;
      layout: typeof layoutEn;
      settings: typeof settingsEn;
      courses: typeof coursesEn;
    };
  }
}
