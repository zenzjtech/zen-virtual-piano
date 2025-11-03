import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PianoSettingsState {
  theme: string;
  soundSet: string;
  sustain: number;
  backgroundTheme: string;
  showKeyboard: boolean;
  showNoteName: boolean;
}

const initialState: PianoSettingsState = {
  theme: 'wooden',
  soundSet: 'classical',
  sustain: 0,
  backgroundTheme: 'white',
  showKeyboard: false,
  showNoteName: false,
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
    setShowKeyboard: (state, action: PayloadAction<boolean>) => {
      state.showKeyboard = action.payload;
      // Ensure mutual exclusivity: if enabling keyboard, disable note names
      if (action.payload === true && state.showNoteName) {
        state.showNoteName = false;
      }
    },
    setShowNoteName: (state, action: PayloadAction<boolean>) => {
      state.showNoteName = action.payload;
      // Ensure mutual exclusivity: if enabling note names, disable keyboard
      if (action.payload === true && state.showKeyboard) {
        state.showKeyboard = false;
      }
    },
  },
});

export const { setTheme, setSoundSet, setSustain, setBackgroundTheme, setShowKeyboard, setShowNoteName } = pianoSettingsSlice.actions;

export default pianoSettingsSlice.reducer;
