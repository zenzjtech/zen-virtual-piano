// Translation key types for TypeScript support

export type TranslationKeys = {
  common: string;
  piano: string;
  sheet: string;
  settings: string;
  notifications: string;
};

export type Namespace = keyof TranslationKeys;
