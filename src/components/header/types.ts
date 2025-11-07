/**
 * Header component types and interfaces
 */

import { PianoTheme } from '../piano/themes';

export interface HeaderProps {
  backgroundThemeId: string;
  isDarkBackground: boolean;
  onShowKeyboardShortcuts: () => void;
  // Recording playback props (optional - only when recording exists)
  recordingPlayback?: {
    hasRecording: boolean;
    isPlaying: boolean;
    currentPosition: number;
    totalDuration: number;
    playbackSpeed: number;
    loop: boolean;
    currentPositionFormatted: string;
    totalDurationFormatted: string;
    pianoTheme: PianoTheme;
    onTogglePlayback: () => void;
    onStop: () => void;
    onToggleLoop: () => void;
    onSpeedChange: (speed: number) => void;
    onClear: () => void;
    onDownload: () => void;
  };
}

export interface HeaderStyleProps {
  isDarkBackground: boolean;
}

export interface UseHeaderHandlersProps {
  onShowKeyboardShortcuts: () => void;
}
