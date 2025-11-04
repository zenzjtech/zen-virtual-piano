import React from 'react';
import { Box, Paper, IconButton, Typography, Collapse } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { MusicSheet, PlaybackState } from './types';
import { PianoTheme } from '../themes';
import { SheetNotationDisplay } from './sheet-notation-display';
import bookImage from '@/assets/image/music-sheet/1.png';

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
  // Calculate 2-page spread
  const pageSetIndex = Math.floor(playback.currentPage / 2);
  const leftPageIndex = pageSetIndex * 2;
  const rightPageIndex = leftPageIndex + 1;
  
  const leftPage = currentSheet.pages[leftPageIndex];
  const rightPage = rightPageIndex < currentSheet.pages.length 
    ? currentSheet.pages[rightPageIndex] 
    : null;
  
  const totalPages = currentSheet.pages.length;

  return (
    <Collapse in={!isMinimized}>
      <Paper
        elevation={8}
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '14/4',
          backgroundColor: 'rgba(139, 69, 19, 0.1)',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Book Content Area */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
              backgroundImage: `url(${bookImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 1,
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
              {currentSheet.artist} - Page {leftPageIndex + 1}
            </Typography>

            {/* Sheet Notation Display - Left Page */}
            <SheetNotationDisplay
              measures={leftPage?.measures || []}
              currentMeasure={playback.currentPage === leftPageIndex ? playback.currentMeasure : -1}
              currentNoteIndex={playback.currentPage === leftPageIndex ? playback.currentNoteIndex : -1}
              isPlaying={playback.isPlaying && playback.currentPage === leftPageIndex}
              pianoTheme={pianoTheme}
            />
          </Box>

          {/* Right Page */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              backgroundImage: `url(${bookImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 1,
              opacity: rightPage ? 1 : 0.3,
            }}
          >
            {rightPage ? (
              <>
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
                  {currentSheet.artist} - Page {rightPageIndex + 1}
                </Typography>

                {/* Sheet Notation Display - Right Page */}
                <SheetNotationDisplay
                  measures={rightPage.measures || []}
                  currentMeasure={playback.currentPage === rightPageIndex ? playback.currentMeasure : -1}
                  currentNoteIndex={playback.currentPage === rightPageIndex ? playback.currentNoteIndex : -1}
                  isPlaying={playback.isPlaying && playback.currentPage === rightPageIndex}
                  pianoTheme={pianoTheme}
                />
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Typography variant="caption" color="text.disabled">
                  End of sheet
                </Typography>
              </Box>
            )}
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
