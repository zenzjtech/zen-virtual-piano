import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PianoSettingsState {
  theme: string;
  soundSet: string;
  sustain: number;
  backgroundTheme: string;
}

const initialState: PianoSettingsState = {
  theme: 'wooden',
  soundSet: 'classical',
  sustain: 0,
  backgroundTheme: 'white',
};

export const pianoSettingsSlice = createSlice({
  name: 'pianoSettings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setSoundSet: (state, action: PayloadAction<string>) => {
      state.soundSet = action.payload;
    },
    setSustain: (state, action: PayloadAction<number>) => {
      state.sustain = action.payload;
    },
    setBackgroundTheme: (state, action: PayloadAction<string>) => {
      state.backgroundTheme = action.payload;
    },
  },
});

export const { setTheme, setSoundSet, setSustain, setBackgroundTheme } = pianoSettingsSlice.actions;

export default pianoSettingsSlice.reducer;
