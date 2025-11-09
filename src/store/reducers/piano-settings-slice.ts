import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PianoSettingsState {
  soundSet: string;
  sustain: number;
  showKeyboard: boolean;
  showNoteName: boolean;
  isPianoEnabled: boolean;
  soundPopupOpen: boolean;
  soundPopupTargetSection?: string;
  soundPopupPlacement?: 'top-start' | 'bottom-start';
}

const initialState: PianoSettingsState = {
  soundSet: 'classical',
  sustain: 0,
  showKeyboard: true,
  showNoteName: false,
  isPianoEnabled: true,
  soundPopupOpen: false,
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
    openSoundPopup: (state, action: PayloadAction<{ targetSection?: string; placement?: 'top-start' | 'bottom-start' } | string | undefined>) => {
      state.soundPopupOpen = true;
      
      // Handle both old string format and new object format for backwards compatibility
      if (typeof action.payload === 'string') {
        state.soundPopupTargetSection = action.payload;
        state.soundPopupPlacement = 'bottom-start'; // default
      } else if (action.payload) {
        state.soundPopupTargetSection = action.payload.targetSection;
        state.soundPopupPlacement = action.payload.placement || 'bottom-start';
      } else {
        state.soundPopupPlacement = 'bottom-start'; // default
      }
    },
    closeSoundPopup: (state) => {
      state.soundPopupOpen = false;
      state.soundPopupTargetSection = undefined;
      state.soundPopupPlacement = undefined;
    },
  },
});

export const { setSoundSet, setSustain, setShowKeyboard, setShowNoteName, setIsPianoEnabled, openSoundPopup, closeSoundPopup } = pianoSettingsSlice.actions;

export default pianoSettingsSlice.reducer;
