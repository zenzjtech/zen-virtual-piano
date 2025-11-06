import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents a single recorded note event
 */
export interface RecordedNote {
  /** Musical note (e.g., 'C4', 'D#4') */
  note: string;
  /** Timestamp in milliseconds relative to recording start */
  timestamp: number;
  /** Duration the note was held (in ms) */
  duration: number;
  /** Velocity/intensity of the note (0-1) */
  velocity: number;
}

/**
 * Recording state interface
 */
export interface RecordingState {
  /** Whether currently recording */
  isRecording: boolean;
  /** Array of recorded notes */
  recordedNotes: RecordedNote[];
  /** Timestamp when recording started */
  recordingStartTime: number | null;
  /** Map of currently pressed notes (note -> start timestamp) */
  activeNotes: { [note: string]: number };
  /** Playback state */
  playback: {
    /** Whether currently playing back */
    isPlaying: boolean;
    /** Current playback position in milliseconds */
    currentPosition: number;
    /** Playback speed multiplier (1.0 = normal speed) */
    playbackSpeed: number;
    /** Whether to loop the recording */
    loop: boolean;
  };
}

const initialState: RecordingState = {
  isRecording: false,
  recordedNotes: [],
  recordingStartTime: null,
  activeNotes: {},
  playback: {
    isPlaying: false,
    currentPosition: 0,
    playbackSpeed: 1.0,
    loop: false,
  },
};

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    /**
     * Start a new recording session
     */
    startRecording: (state) => {
      state.isRecording = true;
      state.recordedNotes = [];
      state.recordingStartTime = Date.now();
      state.activeNotes = {};
    },

    /**
     * Stop the current recording session
     */
    stopRecording: (state) => {
      state.isRecording = false;
      state.recordingStartTime = null;
      state.activeNotes = {};
    },

    /**
     * Record a note press event
     */
    recordNotePress: (state, action: PayloadAction<{ note: string; velocity?: number }>) => {
      if (!state.isRecording || !state.recordingStartTime) return;
      
      const { note, velocity = 0.8 } = action.payload;
      const now = Date.now();
      
      // Store the start time for this note
      state.activeNotes[note] = now;
    },

    /**
     * Record a note release event and create a complete note record
     */
    recordNoteRelease: (state, action: PayloadAction<{ note: string }>) => {
      if (!state.isRecording || !state.recordingStartTime) return;
      
      const { note } = action.payload;
      const releaseTime = Date.now();
      const pressTime = state.activeNotes[note];
      
      if (pressTime !== undefined) {
        // Calculate relative timestamp and duration
        const timestamp = pressTime - state.recordingStartTime;
        const duration = releaseTime - pressTime;
        
        // Add the completed note to the recording
        state.recordedNotes.push({
          note,
          timestamp,
          duration,
          velocity: 0.8, // Default velocity, can be enhanced later
        });
        
        // Remove from active notes
        delete state.activeNotes[note];
      }
    },

    /**
     * Clear the recorded notes
     */
    clearRecording: (state) => {
      state.recordedNotes = [];
      state.recordingStartTime = null;
      state.activeNotes = {};
      state.playback.isPlaying = false;
      state.playback.currentPosition = 0;
    },

    /**
     * Start playback
     */
    startPlayback: (state) => {
      if (state.recordedNotes.length > 0) {
        state.playback.isPlaying = true;
        state.playback.currentPosition = 0;
      }
    },

    /**
     * Pause playback
     */
    pausePlayback: (state) => {
      state.playback.isPlaying = false;
    },

    /**
     * Resume playback
     */
    resumePlayback: (state) => {
      if (state.recordedNotes.length > 0) {
        state.playback.isPlaying = true;
      }
    },

    /**
     * Stop playback and reset position
     */
    stopPlayback: (state) => {
      state.playback.isPlaying = false;
      state.playback.currentPosition = 0;
    },

    /**
     * Update playback position
     */
    updatePlaybackPosition: (state, action: PayloadAction<number>) => {
      state.playback.currentPosition = action.payload;
    },

    /**
     * Set playback speed
     */
    setPlaybackSpeed: (state, action: PayloadAction<number>) => {
      state.playback.playbackSpeed = Math.max(0.25, Math.min(2.0, action.payload));
    },

    /**
     * Toggle loop mode
     */
    toggleLoop: (state) => {
      state.playback.loop = !state.playback.loop;
    },
  },
});

export const {
  startRecording,
  stopRecording,
  recordNotePress,
  recordNoteRelease,
  clearRecording,
  startPlayback,
  pausePlayback,
  resumePlayback,
  stopPlayback,
  updatePlaybackPosition,
  setPlaybackSpeed,
  toggleLoop,
} = recordingSlice.actions;

export default recordingSlice.reducer;
