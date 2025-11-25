import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enPiano from './locales/en/piano.json';
import enSheet from './locales/en/sheet.json';
import enSettings from './locales/en/settings.json';
import enNotifications from './locales/en/notifications.json';

import jaCommon from './locales/ja/common.json';
import jaPiano from './locales/ja/piano.json';
import jaSheet from './locales/ja/sheet.json';
import jaSettings from './locales/ja/settings.json';
import jaNotifications from './locales/ja/notifications.json';

import viCommon from './locales/vi/common.json';
import viPiano from './locales/vi/piano.json';
import viSheet from './locales/vi/sheet.json';
import viSettings from './locales/vi/settings.json';
import viNotifications from './locales/vi/notifications.json';

const resources = {
  en: {
    common: enCommon,
    piano: enPiano,
    sheet: enSheet,
    settings: enSettings,
    notifications: enNotifications,
  },
  ja: {
    common: jaCommon,
    piano: jaPiano,
    sheet: jaSheet,
    settings: jaSettings,
    notifications: jaNotifications,
  },
  vi: {
    common: viCommon,
    piano: viPiano,
    sheet: viSheet,
    settings: viSettings,
    notifications: viNotifications,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    ns: ['common', 'piano', 'sheet', 'settings', 'notifications'],
    defaultNS: 'common',
  });

export default i18n;
