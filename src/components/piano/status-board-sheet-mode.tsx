import React from 'react';
import { Typography } from '@mui/material';
import { MusicSheet } from '@/components/piano/music-sheet/types';
import { PianoTheme } from './themes';
import {
  CurrentNoteDisplay,
  KeyText,
} from './status-board-styled';
import { NoteHistoryDisplay } from './note-history-display';
import { PlayerControlsContainer } from './player-controls-container';
import { SheetButton } from './sheet-button';
import { useSheetSearch } from '@/hooks/use-sheet-search';
import { useAppSelector } from '@/store/hook';

interface SheetModeDisplayProps {
  currentSheet: MusicSheet;
  pianoTheme: PianoTheme;
  totalPages: number;
  historyText: string;
}

export const SheetModeDisplay: React.FC<SheetModeDisplayProps> = ({
  currentSheet,
  pianoTheme,
  totalPages,
  historyText,
}) => {
  // Sheet search hook
  const { handleSheetSearchOpen } = useSheetSearch();
  
  // Get playback state from Redux
  const playback = useAppSelector((state) => state.musicSheet.playback);

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
        totalPages={totalPages}
        pianoTheme={pianoTheme}
      />

      {/* History Display */}
      <NoteHistoryDisplay pianoTheme={pianoTheme} historyText={historyText} />
      {/* Sheet Button */}
      <SheetButton onClick={handleSheetSearchOpen} pianoTheme={pianoTheme} />      
    </>
  );
};
