import React from 'react';
import { Box, Paper, IconButton, Typography, Collapse } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { MusicSheet, PlaybackState } from './types';
import { PianoTheme } from '../themes';
import { SheetNotationDisplay } from './sheet-notation-display';
import bookImage from '@/assets/image/music-sheet.png';

interface MusicBookDisplayProps {
  currentSheet: MusicSheet;
  playback: PlaybackState;
  isMinimized: boolean;
  pianoTheme: PianoTheme;
  onClose: () => void;
}

/**
 * Displays sheet music in an open book layout
 */
export const MusicBookDisplay: React.FC<MusicBookDisplayProps> = ({
  currentSheet,
  playback,
  isMinimized,
  pianoTheme,
  onClose,
}) => {
  const currentPage = currentSheet.pages[playback.currentPage];
  const totalPages = currentSheet.pages.length;

  return (
    <Collapse in={!isMinimized}>
      <Paper
        elevation={8}
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '14/4',
          backgroundImage: `url(${bookImage})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Book Content Area */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '12%',
            right: '12%',
            bottom: '15%',
            display: 'flex',
            gap: 2,
          }}
        >
          {/* Left Page */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                color: 'text.primary',
              }}
            >
              {currentSheet.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mb: 2,
                color: 'text.secondary',
                fontSize: { xs: '0.7rem', md: '0.8rem' },
              }}
            >
              {currentSheet.artist}
            </Typography>

            {/* Sheet Notation Display */}
            <SheetNotationDisplay
              measures={currentPage?.measures || []}
              currentMeasure={playback.currentMeasure}
              currentNoteIndex={playback.currentNoteIndex}
              isPlaying={playback.isPlaying}
              pianoTheme={pianoTheme}
            />
          </Box>

          {/* Right Page - Page info */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="caption" color="text.disabled">
              Page {playback.currentPage + 1} of {totalPages}
            </Typography>
          </Box>
        </Box>

        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Collapse>
  );
};
