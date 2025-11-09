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
  // Track if piano was disabled due to dialog opening (for restoration)
  wasDisabledByDialog: boolean;
}

const initialState: PianoSettingsState = {
  soundSet: 'classical',
  sustain: 0,
  showKeyboard: true,
  showNoteName: false,
  isPianoEnabled: true,
  soundPopupOpen: false,
  wasDisabledByDialog: false,
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
      // Clear dialog flag when manually toggled
      if (action.payload === false) {
        state.wasDisabledByDialog = false;
      }
    },
    disablePianoForDialog: (state) => {
      // Only disable if currently enabled
      if (state.isPianoEnabled) {
        state.isPianoEnabled = false;
        state.wasDisabledByDialog = true;
      }
    },
    enablePianoAfterDialog: (state) => {
      // Only re-enable if it was disabled by dialog
      if (state.wasDisabledByDialog) {
        state.isPianoEnabled = true;
        state.wasDisabledByDialog = false;
      }
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

export const {
  setSoundSet,
  setSustain,
  setShowKeyboard,
  setShowNoteName,
  setIsPianoEnabled,
  disablePianoForDialog,
  enablePianoAfterDialog,
  openSoundPopup,
  closeSoundPopup,
} = pianoSettingsSlice.actions;

export default pianoSettingsSlice.reducer;
