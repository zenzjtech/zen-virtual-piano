import React from 'react';
import { Typography } from '@mui/material';
import { PianoTheme } from './themes';
import {
  CurrentNoteDisplay,
  KeyText,
} from './status-board-styled';
import { useAppSelector } from '@/store/hook';

interface SheetPlaybackStatusProps {
  pianoTheme: PianoTheme;
}

export const SheetPlaybackStatus: React.FC<SheetPlaybackStatusProps> = ({
  pianoTheme,
}) => {
  // Get playback state from Redux
  const playback = useAppSelector((state) => state.musicSheet.playback);

  return (
    <CurrentNoteDisplay pianoTheme={pianoTheme}>
      <Typography
        variant="h6"
        sx={{
          color: pianoTheme.colors.primary,
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: 1,
          minWidth: '80px'
        }}
      >
        🎼
      </Typography>
      <KeyText variant="caption" pianoTheme={pianoTheme}>
        {playback.isPlaying ? 'Playing' : playback.isPaused ? 'Paused' : 'Ready'}
      </KeyText>
    </CurrentNoteDisplay>
  );
};
