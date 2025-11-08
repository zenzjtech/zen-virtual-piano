import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PianoSettingsState {
  soundSet: string;
  sustain: number;
  showKeyboard: boolean;
  showNoteName: boolean;
  isPianoEnabled: boolean;
}

const initialState: PianoSettingsState = {
  soundSet: 'classical',
  sustain: 0,
  showKeyboard: true,
  showNoteName: false,
  isPianoEnabled: true,
};

export const pianoSettingsSlice = createSlice({
  name: 'pianoSettings',
  initialState,
  reducers: {
    setSoundSet: (state, action: PayloadAction<string>) => {
      state.soundSet = action.payload;
    },
    setSustain: (state, action: PayloadAction<number>) => {
      state.sustain = action.payload;
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
    setIsPianoEnabled: (state, action: PayloadAction<boolean>) => {
      state.isPianoEnabled = action.payload;
    },
  },
});

export const { setSoundSet, setSustain, setShowKeyboard, setShowNoteName, setIsPianoEnabled } = pianoSettingsSlice.actions;

export default pianoSettingsSlice.reducer;
