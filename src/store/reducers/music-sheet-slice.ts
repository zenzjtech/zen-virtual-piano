/**
 * Music Sheet Redux Slice
 * 
 * Manages state for music sheet feature including:
 * - Sheet library and selection
 * - Playback state
 * - User preferences (favorites, history)
 * - UI state (dialogs, music stand visibility)
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { 
  MusicSheet, 
  PlaybackState, 
  SheetUserData,
  StatusDisplayMode 
} from '@/components/piano/music-sheet/types';

/**
 * Music sheet state interface
 */
export interface MusicSheetState {
  // Library
  /** All available sheets (built-in + custom) */
  sheets: Record<string, MusicSheet>;
  
  // Current session
  /** Currently loaded sheet */
  currentSheet: MusicSheet | null;
  /** Playback state */
  playback: PlaybackState;
  
  // User data
  /** User's favorites and history */
  userData: SheetUserData;
  
  // UI state
  /** Whether sheet search dialog is open */
  isSearchDialogOpen: boolean;
  /** Whether music stand is visible */
  isMusicStandVisible: boolean;
  /** Status board display mode */
  statusDisplayMode: StatusDisplayMode;
  /** Whether music stand is minimized (show controls only) */
  isMusicStandMinimized: boolean;
  /** Whether user has manually closed sheet mode (prevents auto-load) */
  hasManuallyClosedSheet: boolean;
}

/**
 * Initial playback state
 */
const initialPlaybackState: PlaybackState = {
  currentSheetId: null,
  isPlaying: false,
  isPaused: false,
  currentPage: 0,
  currentMeasure: 0,
  currentNoteIndex: 0,
  tempo: 120,
  autoScroll: true,
  loopEnabled: false,
  progress: 0,
};

/**
 * Initial user data
 */
const initialUserData: SheetUserData = {
  favorites: [],
  recentlyPlayed: [],
  customSheets: {},
  lastPlayedTimestamps: {},
  playCounts: {},
};

/**
 * Initial state
 */
const initialState: MusicSheetState = {
  sheets: {},
  currentSheet: null,
  playback: initialPlaybackState,
  userData: initialUserData,
  isSearchDialogOpen: false,
  isMusicStandVisible: false,
  statusDisplayMode: 'pressed-notes', // Default: show pressed notes
  isMusicStandMinimized: false,
  hasManuallyClosedSheet: false,
};

/**
 * Music sheet slice
 */
export const musicSheetSlice = createSlice({
  name: 'musicSheet',
  initialState,
  reducers: {
    // Library management
    /**
     * Add sheets to the library
     */
    addSheets: (state, action: PayloadAction<MusicSheet[]>) => {
      action.payload.forEach(sheet => {
        state.sheets[sheet.id] = sheet;
      });
    },

    /**
     * Remove a sheet from the library
     */
    removeSheet: (state, action: PayloadAction<string>) => {
      const sheetId = action.payload;
      delete state.sheets[sheetId];
      delete state.userData.customSheets[sheetId];
      
      // Remove from favorites and history
      state.userData.favorites = state.userData.favorites.filter(id => id !== sheetId);
      state.userData.recentlyPlayed = state.userData.recentlyPlayed.filter(id => id !== sheetId);
    },

    // Sheet selection
    /**
     * Load a sheet for display/playback
     */
    loadSheet: (state, action: PayloadAction<string>) => {
      const sheetId = action.payload;
      const sheet = state.sheets[sheetId];
      
      if (sheet) {
        state.currentSheet = sheet;
        state.playback.currentSheetId = sheetId;
        state.playback.tempo = sheet.tempo;
        state.isMusicStandVisible = true;
        
        // Clear the manual close flag since user is loading a sheet again
        state.hasManuallyClosedSheet = false;
        
        // Add to recently played (at the beginning)
        state.userData.recentlyPlayed = [
          sheetId,
          ...state.userData.recentlyPlayed.filter(id => id !== sheetId)
        ];
        
        // Update timestamp
        state.userData.lastPlayedTimestamps[sheetId] = Date.now();
        
        // Auto-switch status display to sheet progress
        state.statusDisplayMode = 'sheet-progress';
      }
    },

    /**
     * Unload current sheet (return to manual mode)
     */
    unloadSheet: (state) => {
      state.currentSheet = null;
      state.playback = initialPlaybackState;
      state.isMusicStandVisible = false;
      
      // Mark that user has manually closed sheet mode
      state.hasManuallyClosedSheet = true;
      
      // Switch back to pressed notes display
      state.statusDisplayMode = 'pressed-notes';
    },

    // Playback controls
    /**
     * Start or resume playback
     */
    playSheet: (state) => {
      if (state.currentSheet) {
        state.playback.isPlaying = true;
        state.playback.isPaused = false;
        
        // Increment play count
        const sheetId = state.currentSheet.id;
        state.userData.playCounts[sheetId] = (state.userData.playCounts[sheetId] || 0) + 1;
      }
    },

    /**
     * Pause playback
     */
    pauseSheet: (state) => {
      state.playback.isPlaying = false;
      state.playback.isPaused = true;
    },

    /**
     * Stop playback and reset to beginning
     */
    stopSheet: (state) => {
      state.playback.isPlaying = false;
      state.playback.isPaused = false;
      state.playback.currentPage = 0;
      state.playback.currentMeasure = 0;
      state.playback.currentNoteIndex = 0;
      state.playback.progress = 0;
    },

    /**
     * Update playback position
     */
    updatePlaybackPosition: (state, action: PayloadAction<{
      page?: number;
      measure?: number;
      noteIndex?: number;
      progress?: number;
    }>) => {
      const { page, measure, noteIndex, progress } = action.payload;
      
      if (page !== undefined) state.playback.currentPage = page;
      if (measure !== undefined) state.playback.currentMeasure = measure;
      if (noteIndex !== undefined) state.playback.currentNoteIndex = noteIndex;
      if (progress !== undefined) state.playback.progress = progress;
    },

    /**
     * Set playback tempo
     */
    setTempo: (state, action: PayloadAction<number>) => {
      state.playback.tempo = Math.max(40, Math.min(240, action.payload));
    },

    /**
     * Toggle auto-scroll
     */
    toggleAutoScroll: (state) => {
      state.playback.autoScroll = !state.playback.autoScroll;
    },

    /**
     * Toggle loop mode
     */
    toggleLoop: (state) => {
      state.playback.loopEnabled = !state.playback.loopEnabled;
    },

    // Navigation
    /**
     * Go to next page (navigates by 2 pages for 2-page spread)
     * Note: Boundary checking is handled by the UI components which calculate totalPages dynamically
     */
    nextPage: (state) => {
      if (state.currentSheet) {
        const currentPageSet = Math.floor(state.playback.currentPage / 2);
        const nextPageSetStart = (currentPageSet + 1) * 2;
        
        // Always allow navigation - boundary checking happens in UI
        state.playback.currentPage = nextPageSetStart;
        state.playback.currentMeasure = 0;
        state.playback.currentNoteIndex = 0;
      }
    },

    /**
     * Go to previous page (navigates by 2 pages for 2-page spread)
     */
    previousPage: (state) => {
      if (state.playback.currentPage > 0) {
        const currentPageSet = Math.floor(state.playback.currentPage / 2);
        const prevPageSetStart = Math.max(0, (currentPageSet - 1) * 2);
        
        state.playback.currentPage = prevPageSetStart;
        state.playback.currentMeasure = 0;
        state.playback.currentNoteIndex = 0;
      }
    },

    /**
     * Jump to specific page
     */
    goToPage: (state, action: PayloadAction<number>) => {
      const page = action.payload;
      if (state.currentSheet && page >= 0 && page < state.currentSheet.pages.length) {
        state.playback.currentPage = page;
        state.playback.currentMeasure = 0;
        state.playback.currentNoteIndex = 0;
      }
    },

    // Favorites
    /**
     * Toggle favorite status for a sheet
     */
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const sheetId = action.payload;
      const index = state.userData.favorites.indexOf(sheetId);
      
      if (index >= 0) {
        state.userData.favorites.splice(index, 1);
      } else {
        state.userData.favorites.push(sheetId);
      }
    },

    // UI state
    /**
     * Open sheet search dialog
     */
    openSearchDialog: (state) => {
      state.isSearchDialogOpen = true;
    },

    /**
     * Close sheet search dialog
     */
    closeSearchDialog: (state) => {
      state.isSearchDialogOpen = false;
    },

    /**
     * Toggle music stand visibility
     */
    toggleMusicStand: (state) => {
      state.isMusicStandVisible = !state.isMusicStandVisible;
      
      // If hiding, also stop playback
      if (!state.isMusicStandVisible) {
        state.playback.isPlaying = false;
        state.playback.isPaused = false;
      }
    },

    /**
     * Set music stand visibility
     */
    setMusicStandVisible: (state, action: PayloadAction<boolean>) => {
      state.isMusicStandVisible = action.payload;
      
      // If hiding, also stop playback
      if (!action.payload) {
        state.playback.isPlaying = false;
        state.playback.isPaused = false;
      }
    },

    /**
     * Toggle music stand minimized state
     */
    toggleMusicStandMinimized: (state) => {
      state.isMusicStandMinimized = !state.isMusicStandMinimized;
    },

    /**
     * Set status display mode
     */
    setStatusDisplayMode: (state, action: PayloadAction<StatusDisplayMode>) => {
      state.statusDisplayMode = action.payload;
    },

    /**
     * Auto-switch to manual mode (when user presses piano key)
     */
    switchToManualMode: (state) => {
      // Pause playback but keep sheet loaded
      state.playback.isPlaying = false;
      state.playback.isPaused = true;
      
      // Switch status display to show pressed notes
      state.statusDisplayMode = 'pressed-notes';
    },
  },
});

// Export actions
export const {
  addSheets,
  removeSheet,
  loadSheet,
  unloadSheet,
  playSheet,
  pauseSheet,
  stopSheet,
  updatePlaybackPosition,
  setTempo,
  toggleAutoScroll,
  toggleLoop,
  nextPage,
  previousPage,
  goToPage,
  toggleFavorite,
  openSearchDialog,
  closeSearchDialog,
  toggleMusicStand,
  setMusicStandVisible,
  toggleMusicStandMinimized,
  setStatusDisplayMode,
  switchToManualMode,
} = musicSheetSlice.actions;

// Export reducer
export default musicSheetSlice.reducer;
