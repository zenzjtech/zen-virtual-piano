import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeChangeInterval = 'hourly' | '30min' | '15min' | '10min' | '5min' | 'daily' | '1min';

export interface ThemeState {
  // Piano theme
  pianoTheme: string;
  // Background theme
  backgroundTheme: string;
  // Music sheet theme
  musicSheetTheme: string;
  // Auto theme rotation settings
  autoThemeEnabled: boolean;
  autoThemeInterval: ThemeChangeInterval;
  lastThemeChangeDate: string; // ISO date string for tracking
}

const initialState: ThemeState = {
  pianoTheme: 'wooden',
  backgroundTheme: 'warm',
  musicSheetTheme: 'paper-1',
  autoThemeEnabled: false,
  autoThemeInterval: 'hourly',
  lastThemeChangeDate: new Date().toISOString(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPianoTheme: (state, action: PayloadAction<string>) => {
      state.pianoTheme = action.payload;
    },
    setBackgroundTheme: (state, action: PayloadAction<string>) => {
      state.backgroundTheme = action.payload;
    },
    setMusicSheetTheme: (state, action: PayloadAction<string>) => {
      state.musicSheetTheme = action.payload;
    },
    setAutoThemeEnabled: (state, action: PayloadAction<boolean>) => {
      state.autoThemeEnabled = action.payload;
    },
    setAutoThemeInterval: (state, action: PayloadAction<ThemeChangeInterval>) => {
      state.autoThemeInterval = action.payload;
    },
    setLastThemeChangeDate: (state, action: PayloadAction<string>) => {
      state.lastThemeChangeDate = action.payload;
    },
  },
});

export const {
  setPianoTheme,
  setBackgroundTheme,
  setMusicSheetTheme,
  setAutoThemeEnabled,
  setAutoThemeInterval,
  setLastThemeChangeDate,
} = themeSlice.actions;

export default themeSlice.reducer;
