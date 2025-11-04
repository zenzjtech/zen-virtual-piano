import React from 'react';
import { Typography, Box } from '@mui/material';
import { MusicSheet, PlaybackState } from '@/components/piano/music-sheet/types';
import { PianoTheme } from './themes';
import {
  CurrentNoteDisplay,
  KeyText,
} from './status-board-styled';
import { NoteHistoryDisplay } from './note-history-display';
import { PlayerControlsContainer } from './player-controls-container';

interface SheetModeDisplayProps {
  currentSheet: MusicSheet;
  playback: PlaybackState;
  pianoTheme: PianoTheme;
  totalPages: number;
  historyText: string;
  onPlayPause: () => void;
  onStop: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onTempoChange: (tempo: number) => void;
  onToggleLoop: () => void;
}

export const SheetModeDisplay: React.FC<SheetModeDisplayProps> = ({
  currentSheet,
  playback,
  pianoTheme,
  totalPages,
  historyText,
  onPlayPause,
  onStop,
  onPreviousPage,
  onNextPage,
  onTempoChange,
  onToggleLoop,
}) => {

  return (
    <>
      {/* Current Sheet Info */}
      <CurrentNoteDisplay pianoTheme={pianoTheme}>
        <Typography 
          variant="h6"
          sx={{ 
            color: pianoTheme.colors.primary,
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          🎼
        </Typography>
        <KeyText variant="caption" pianoTheme={pianoTheme}>
          {playback.isPlaying ? 'Playing' : playback.isPaused ? 'Paused' : 'Ready'}
        </KeyText>
      </CurrentNoteDisplay>

      {/* Player Controls */}
      <PlayerControlsContainer
        isPlaying={playback.isPlaying}
        currentPage={playback.currentPage}
        totalPages={totalPages}
        loopEnabled={playback.loopEnabled}
        tempo={playback.tempo}
        pianoTheme={pianoTheme}
        onPlayPause={onPlayPause}
        onStop={onStop}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onToggleLoop={onToggleLoop}
        onTempoChange={onTempoChange}
      />

      {/* History Display */}
      <NoteHistoryDisplay pianoTheme={pianoTheme} historyText={historyText} />
    </>
  );
};
