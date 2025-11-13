import React from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  unloadSheet,
} from '@/store/reducers/music-sheet-slice';
import { PianoTheme } from '../piano/themes';
import { MusicBookDisplay } from './music-book-display';

interface MusicStandProps {
  pianoTheme: PianoTheme;
  isHighlighted?: boolean;
}

/**
 * Music Stand Component
 * Displays sheet music on an open book background with playback controls
 */
export const MusicStand: React.FC<MusicStandProps> = ({ pianoTheme, isHighlighted = false }) => {
  const dispatch = useAppDispatch();
  
  // Redux state
  const currentSheet = useAppSelector((state) => state.musicSheet.currentSheet);
  const playback = useAppSelector((state) => state.musicSheet.playback);
  const isMinimized = useAppSelector((state) => state.musicSheet.isMusicStandMinimized);
  const musicSheetTheme = useAppSelector((state) => state.theme.musicSheetTheme);
  
  if (!currentSheet) return null;
  
  // Event handlers
  const handleClose = () => {
    dispatch(unloadSheet());
  };
  
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mb: 1.4,
        animation: 'slideDown 0.4s ease-out',
        '@keyframes slideDown': {
          from: {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {/* Music Book Display */}
        <MusicBookDisplay
          currentSheet={currentSheet}
          playback={playback}
          isMinimized={isMinimized}
          pianoTheme={pianoTheme}
          musicSheetThemeId={musicSheetTheme}
          onClose={handleClose}
          isHighlighted={isHighlighted}
        />
      </Box>
    </Box>
  );
};
