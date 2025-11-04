import React, { useMemo } from 'react';
import { Box, Paper, IconButton, Collapse } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { MusicSheet, PlaybackState } from './types';
import { PianoTheme } from '../themes';
import { useAppConfig } from '#imports';
import { useSheetPlayback } from '@/hooks/use-sheet-playback';
import { usePageTransition } from '@/hooks/use-page-transition';
import { BookPage } from './book-page';
import { calculateLineRanges, calculatePageSpread } from './music-book-utils';

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
  useSheetPlayback();

  const appConfig = useAppConfig();
  
  // Get all measures from the sheet (stored in first page)
  const allMeasures = currentSheet.pages[0]?.measures || [];
  
  // Calculate pagination dynamically based on current config
  const { pageRanges } = useMemo(() => 
    calculateLineRanges(
      allMeasures,
      appConfig.musicStand.musicSheet.maxCharsPerLine,
      appConfig.musicStand.musicSheet.linesPerPage
    ),
    [allMeasures, appConfig.musicStand.musicSheet.maxCharsPerLine, appConfig.musicStand.musicSheet.linesPerPage]
  );
  
  const totalPages = pageRanges.length;
  
  // Calculate 2-page spread
  const { leftPageIndex, rightPageIndex, pageSetIndex } = calculatePageSpread(playback.currentPage);
  
  // Page transition animations
  const { showContent, pageDirection } = usePageTransition(pageSetIndex);
  
  const hasLeftPage = leftPageIndex < totalPages;
  const hasRightPage = rightPageIndex < totalPages;    

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
            transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateX(0)' : `translateX(${pageDirection === 'right' ? '-8px' : '8px'})`,
          }}
        >
          {/* Left Page */}
          <BookPage
            title={currentSheet.title}
            artist={currentSheet.artist}
            pageNumber={leftPageIndex + 1}
            measures={allMeasures}
            lineRange={hasLeftPage ? pageRanges[leftPageIndex] : undefined}
            playback={playback}
            pianoTheme={pianoTheme}
            isActivePage={playback.currentPage === leftPageIndex}
          />

          {/* Right Page */}
          <BookPage
            title={currentSheet.title}
            artist={currentSheet.artist}
            pageNumber={rightPageIndex + 1}
            measures={allMeasures}
            lineRange={hasRightPage ? pageRanges[rightPageIndex] : undefined}
            playback={playback}
            pianoTheme={pianoTheme}
            isActivePage={playback.currentPage === rightPageIndex}
            isEmpty={!hasRightPage}
          />
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
