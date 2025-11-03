/**
 * Music Sheet Types
 * 
 * Type definitions for the music sheet feature, including sheet data,
 * playback state, and notation structures.
 */

/**
 * Individual note in a measure
 */
export interface Note {
  /** Note key (e.g., "C4", "D#5", "Eb4") */
  key: string;
  /** Duration in beats (1 = quarter note, 0.5 = eighth note, etc.) */
  duration: number;
  /** Whether this is a rest instead of a note */
  rest?: boolean;
  /** For chords: simultaneous notes */
  chord?: string[];
}

/**
 * A measure containing notes
 */
export interface Measure {
  /** Notes in this measure */
  notes: Note[];
  /** Total duration of the measure in beats */
  duration: number;
}

/**
 * A page of sheet music
 */
export interface SheetPage {
  /** Measures on this page */
  measures: Measure[];
  /** Page number (1-indexed) */
  pageNumber: number;
}

/**
 * Complete music sheet data
 */
export interface MusicSheet {
  /** Unique identifier */
  id: string;
  /** Song title */
  title: string;
  /** Artist/composer name */
  artist: string;
  /** Difficulty level */
  difficulty: 'easy' | 'medium' | 'hard';
  /** Virtual Piano notation string (original format) */
  notation: string;
  /** Tempo in BPM */
  tempo: number;
  /** Time signature (e.g., "4/4", "3/4") */
  timeSignature: string;
  /** Parsed pages */
  pages: SheetPage[];
  /** Tags for categorization */
  tags: string[];
  /** Duration estimate in seconds */
  durationSeconds?: number;
  /** Source URL (if imported) */
  sourceUrl?: string;
  /** Thumbnail URL (optional) */
  thumbnailUrl?: string;
}

/**
 * Playback state for sheet music
 */
export interface PlaybackState {
  /** Currently selected sheet ID */
  currentSheetId: string | null;
  /** Whether playback is active */
  isPlaying: boolean;
  /** Whether playback is paused */
  isPaused: boolean;
  /** Current page number (0-indexed) */
  currentPage: number;
  /** Current measure index (0-indexed) */
  currentMeasure: number;
  /** Current note index within measure (0-indexed) */
  currentNoteIndex: number;
  /** Current tempo (can be adjusted from original) */
  tempo: number;
  /** Whether to auto-scroll pages during playback */
  autoScroll: boolean;
  /** Whether to loop the current sheet */
  loopEnabled: boolean;
  /** Playback progress (0-1) */
  progress: number;
}

/**
 * Sheet library category
 */
export interface SheetCategory {
  /** Category ID */
  id: string;
  /** Display name */
  name: string;
  /** Category icon (emoji or Material icon name) */
  icon: string;
  /** Sheet IDs in this category */
  sheetIds: string[];
}

/**
 * User's sheet preferences and history
 */
export interface SheetUserData {
  /** Favorited sheet IDs */
  favorites: string[];
  /** Recently played sheet IDs (most recent first) */
  recentlyPlayed: string[];
  /** Custom imported sheets */
  customSheets: Record<string, MusicSheet>;
  /** Last played timestamp for each sheet */
  lastPlayedTimestamps: Record<string, number>;
  /** Play count for each sheet */
  playCounts: Record<string, number>;
}

/**
 * Display mode for the status board
 */
export type StatusDisplayMode = 'pressed-notes' | 'sheet-progress' | 'both';

/**
 * Virtual Piano notation parser result
 */
export interface ParsedNotation {
  /** Parsed measures */
  measures: Measure[];
  /** Detected tempo (if specified in notation) */
  tempo?: number;
  /** Any parsing errors or warnings */
  warnings: string[];
}

/**
 * Sheet search filters
 */
export interface SheetSearchFilters {
  /** Search query string */
  query: string;
  /** Filter by difficulty */
  difficulty?: 'easy' | 'medium' | 'hard';
  /** Filter by category */
  category?: string;
  /** Filter by tags */
  tags?: string[];
  /** Show only favorites */
  favoritesOnly?: boolean;
}

/**
 * Playback event for syncing with piano
 */
export interface PlaybackEvent {
  /** Event type */
  type: 'note-start' | 'note-end' | 'measure-complete' | 'page-turn' | 'sheet-complete';
  /** Associated note key (for note events) */
  noteKey?: string;
  /** Current measure index */
  measureIndex?: number;
  /** Current page number */
  pageNumber?: number;
  /** Timestamp of event */
  timestamp: number;
}
