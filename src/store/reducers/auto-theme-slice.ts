import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeChangeInterval = 'hourly' | '30min' | '15min' | '10min' | '5min' | 'daily' | '1min';

export interface AutoThemeState {
  enabled: boolean;
  interval: ThemeChangeInterval;
  lastChangeDate: string; // ISO date string for tracking
}

const initialState: AutoThemeState = {
  enabled: false,
  interval: 'hourly',
  lastChangeDate: new Date().toISOString(),
};

export const autoThemeSlice = createSlice({
  name: 'autoTheme',
  initialState,
  reducers: {
    setAutoThemeEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
    setAutoThemeInterval: (state, action: PayloadAction<ThemeChangeInterval>) => {
      state.interval = action.payload;
    },
    setLastThemeChangeDate: (state, action: PayloadAction<string>) => {
      state.lastChangeDate = action.payload;
    },
  },
});

export const {
  setAutoThemeEnabled,
  setAutoThemeInterval,
  setLastThemeChangeDate,
} = autoThemeSlice.actions;

export default autoThemeSlice.reducer;
