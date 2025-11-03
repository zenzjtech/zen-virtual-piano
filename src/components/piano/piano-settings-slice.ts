import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PianoSettingsState {
  theme: string;
  soundSet: string;
  sustain: number;
}

const initialState: PianoSettingsState = {
  theme: 'wooden',
  soundSet: 'classical',
  sustain: 0,
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
  },
});

export const { setTheme, setSoundSet, setSustain } = pianoSettingsSlice.actions;

export default pianoSettingsSlice.reducer;
