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

import zh_CNCommon from './locales/zh_CN/common.json';
import zh_CNPiano from './locales/zh_CN/piano.json';
import zh_CNSheet from './locales/zh_CN/sheet.json';
import zh_CNSettings from './locales/zh_CN/settings.json';
import zh_CNNotifications from './locales/zh_CN/notifications.json';

import zh_HKCommon from './locales/zh_HK/common.json';
import zh_HKPiano from './locales/zh_HK/piano.json';
import zh_HKSheet from './locales/zh_HK/sheet.json';
import zh_HKSettings from './locales/zh_HK/settings.json';
import zh_HKNotifications from './locales/zh_HK/notifications.json';

import hiCommon from './locales/hi/common.json';
import hiPiano from './locales/hi/piano.json';
import hiSheet from './locales/hi/sheet.json';
import hiSettings from './locales/hi/settings.json';
import hiNotifications from './locales/hi/notifications.json';

import esCommon from './locales/es/common.json';
import esPiano from './locales/es/piano.json';
import esSheet from './locales/es/sheet.json';
import esSettings from './locales/es/settings.json';
import esNotifications from './locales/es/notifications.json';

import frCommon from './locales/fr/common.json';
import frPiano from './locales/fr/piano.json';
import frSheet from './locales/fr/sheet.json';
import frSettings from './locales/fr/settings.json';
import frNotifications from './locales/fr/notifications.json';

import bnCommon from './locales/bn/common.json';
import bnPiano from './locales/bn/piano.json';
import bnSheet from './locales/bn/sheet.json';
import bnSettings from './locales/bn/settings.json';
import bnNotifications from './locales/bn/notifications.json';

import ruCommon from './locales/ru/common.json';
import ruPiano from './locales/ru/piano.json';
import ruSheet from './locales/ru/sheet.json';
import ruSettings from './locales/ru/settings.json';
import ruNotifications from './locales/ru/notifications.json';

import pt_BRCommon from './locales/pt_BR/common.json';
import pt_BRPiano from './locales/pt_BR/piano.json';
import pt_BRSheet from './locales/pt_BR/sheet.json';
import pt_BRSettings from './locales/pt_BR/settings.json';
import pt_BRNotifications from './locales/pt_BR/notifications.json';

import idCommon from './locales/id/common.json';
import idPiano from './locales/id/piano.json';
import idSheet from './locales/id/sheet.json';
import idSettings from './locales/id/settings.json';
import idNotifications from './locales/id/notifications.json';

import deCommon from './locales/de/common.json';
import dePiano from './locales/de/piano.json';
import deSheet from './locales/de/sheet.json';
import deSettings from './locales/de/settings.json';
import deNotifications from './locales/de/notifications.json';

import trCommon from './locales/tr/common.json';
import trPiano from './locales/tr/piano.json';
import trSheet from './locales/tr/sheet.json';
import trSettings from './locales/tr/settings.json';
import trNotifications from './locales/tr/notifications.json';

import mrCommon from './locales/mr/common.json';
import mrPiano from './locales/mr/piano.json';
import mrSheet from './locales/mr/sheet.json';
import mrSettings from './locales/mr/settings.json';
import mrNotifications from './locales/mr/notifications.json';

import teCommon from './locales/te/common.json';
import tePiano from './locales/te/piano.json';
import teSheet from './locales/te/sheet.json';
import teSettings from './locales/te/settings.json';
import teNotifications from './locales/te/notifications.json';

import taCommon from './locales/ta/common.json';
import taPiano from './locales/ta/piano.json';
import taSheet from './locales/ta/sheet.json';
import taSettings from './locales/ta/settings.json';
import taNotifications from './locales/ta/notifications.json';

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
  zh_CN: {
    common: zh_CNCommon,
    piano: zh_CNPiano,
    sheet: zh_CNSheet,
    settings: zh_CNSettings,
    notifications: zh_CNNotifications,
  },
  zh_HK: {
    common: zh_HKCommon,
    piano: zh_HKPiano,
    sheet: zh_HKSheet,
    settings: zh_HKSettings,
    notifications: zh_HKNotifications,
  },
  hi: {
    common: hiCommon,
    piano: hiPiano,
    sheet: hiSheet,
    settings: hiSettings,
    notifications: hiNotifications,
  },
  es: {
    common: esCommon,
    piano: esPiano,
    sheet: esSheet,
    settings: esSettings,
    notifications: esNotifications,
  },
  fr: {
    common: frCommon,
    piano: frPiano,
    sheet: frSheet,
    settings: frSettings,
    notifications: frNotifications,
  },
  bn: {
    common: bnCommon,
    piano: bnPiano,
    sheet: bnSheet,
    settings: bnSettings,
    notifications: bnNotifications,
  },
  ru: {
    common: ruCommon,
    piano: ruPiano,
    sheet: ruSheet,
    settings: ruSettings,
    notifications: ruNotifications,
  },
  pt_BR: {
    common: pt_BRCommon,
    piano: pt_BRPiano,
    sheet: pt_BRSheet,
    settings: pt_BRSettings,
    notifications: pt_BRNotifications,
  },
  id: {
    common: idCommon,
    piano: idPiano,
    sheet: idSheet,
    settings: idSettings,
    notifications: idNotifications,
  },
  de: {
    common: deCommon,
    piano: dePiano,
    sheet: deSheet,
    settings: deSettings,
    notifications: deNotifications,
  },
  tr: {
    common: trCommon,
    piano: trPiano,
    sheet: trSheet,
    settings: trSettings,
    notifications: trNotifications,
  },
  mr: {
    common: mrCommon,
    piano: mrPiano,
    sheet: mrSheet,
    settings: mrSettings,
    notifications: mrNotifications,
  },
  te: {
    common: teCommon,
    piano: tePiano,
    sheet: teSheet,
    settings: teSettings,
    notifications: teNotifications,
  },
  ta: {
    common: taCommon,
    piano: taPiano,
    sheet: taSheet,
    settings: taSettings,
    notifications: taNotifications,
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
