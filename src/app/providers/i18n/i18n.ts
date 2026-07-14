import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from '@/shared/i18n/en.json';
import commonUk from '@/shared/i18n/uk.json';

import layoutEn from '@/app/layout/i18n/en.json';
import layoutUk from '@/app/layout/i18n/uk.json';

import settingsEn from '@/features/settings/i18n/en.json';
import settingsUk from '@/features/settings/i18n/uk.json';

import coursesEn from '@/features/courses/i18n/en.json';
import coursesUk from '@/features/courses/i18n/uk.json';

import dashboardEn from '@/features/dashboard/i18n/en.json';
import dashboardUk from '@/features/dashboard/i18n/uk.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['common', 'layout', 'settings', 'courses', 'dashboard'],
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: commonEn,
        layout: layoutEn,
        settings: settingsEn,
        courses: coursesEn,
        dashboard: dashboardEn,
      },
      uk: {
        common: commonUk,
        layout: layoutUk,
        settings: settingsUk,
        courses: coursesUk,
        dashboard: dashboardUk,
      },
    },
  });

export default i18n;
