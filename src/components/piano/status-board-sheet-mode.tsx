import React from 'react';
import { Typography } from '@mui/material';
import { MusicSheet, PlaybackState } from '@/components/piano/music-sheet/types';
import { PianoTheme } from './themes';
import {
  CurrentNoteDisplay,
  KeyText,
  PressedKeysDisplay,
  Label,
  PressedKeysText,
  HistoryDisplay,
} from './status-board-styled';

interface SheetModeDisplayProps {
  currentSheet: MusicSheet;
  playback: PlaybackState;
  pianoTheme: PianoTheme;
}

export const SheetModeDisplay: React.FC<SheetModeDisplayProps> = ({
  currentSheet,
  playback,
  pianoTheme,
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

      {/* Sheet Title and Progress */}
      <PressedKeysDisplay>
        <Label variant="caption" pianoTheme={pianoTheme}>Now Playing</Label>
        <PressedKeysText variant="h6" pianoTheme={pianoTheme} sx={{ fontSize: '1.2rem' }}>
          {currentSheet.title}
        </PressedKeysText>
        <Typography variant="caption" sx={{ color: pianoTheme.colors.secondary, mt: 0.5 }}>
          {currentSheet.artist}
        </Typography>
      </PressedKeysDisplay>

      {/* Playback Progress */}
      <HistoryDisplay>
        <Label variant="caption" pianoTheme={pianoTheme}>Progress</Label>
        <PressedKeysText variant="h6" pianoTheme={pianoTheme}>
          Page {playback.currentPage + 1}/{currentSheet.pages.length} • Measure {playback.currentMeasure + 1}
        </PressedKeysText>
        <Typography variant="caption" sx={{ color: pianoTheme.colors.secondary, mt: 0.5 }}>
          {Math.round(playback.progress * 100)}% • {playback.tempo} BPM
        </Typography>
      </HistoryDisplay>
    </>
  );
};
