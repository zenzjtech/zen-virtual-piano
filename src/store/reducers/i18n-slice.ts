import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SupportedLocale = 'en' | 'ja' | 'vi';

export interface I18nState {
  locale: SupportedLocale;
}

const getDefaultLocale = (): SupportedLocale => {
  const browserLang = navigator.language.substring(0, 2);
  return browserLang === 'ja' ? 'ja' : browserLang === 'vi' ? 'vi' : 'en';
};

const initialState: I18nState = {
  locale: getDefaultLocale(),
};

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<SupportedLocale>) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = i18nSlice.actions;

export default i18nSlice.reducer;
