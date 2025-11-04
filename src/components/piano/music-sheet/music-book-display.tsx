import React, { useMemo } from 'react';
import { Box, Paper, IconButton, Typography, Collapse } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { MusicSheet, PlaybackState } from './types';
import { PianoTheme } from '../themes';
import { SheetNotationDisplay } from './sheet-notation-display';
import bookImage from '@/assets/image/music-sheet/1.png';
import { useAppConfig } from '#imports';
import { useSheetPlayback } from '@/hooks/use-sheet-playback';

interface MusicBookDisplayProps {
  currentSheet: MusicSheet;
  playback: PlaybackState;
  isMinimized: boolean;
  pianoTheme: PianoTheme;
  onClose: () => void;
}

/**
 * Calculate line ranges dynamically based on config
 */
function calculateLineRanges(measures: any[], maxCharsPerLine: number, linesPerPage: number) {
  // Convert measures to tokens
  const tokens: string[] = [];
  measures.forEach((measure) => {
    measure.notes.forEach((note: any) => {
      tokens.push((note.originalNotation || note.key) + ' ');
    });
  });
  
  // Split into lines
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let currentLength = 0;
  
  tokens.forEach((token) => {
    if (currentLength + token.length > maxCharsPerLine && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = [];
      currentLength = 0;
    }
    currentLine.push(token);
    currentLength += token.length;
  });
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  // Calculate page ranges
  const pageRanges: Array<{ start: number; end: number }> = [];
  for (let i = 0; i < lines.length; i += linesPerPage) {
    pageRanges.push({
      start: i,
      end: Math.min(i + linesPerPage, lines.length),
    });
  }
  
  return { totalLines: lines.length, pageRanges };
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
  const { totalLines, pageRanges } = useMemo(() => 
    calculateLineRanges(
      allMeasures,
      appConfig.musicStand.musicSheet.maxCharsPerLine,
      appConfig.musicStand.musicSheet.linesPerPage
    ),
    [allMeasures, appConfig.musicStand.musicSheet.maxCharsPerLine, appConfig.musicStand.musicSheet.linesPerPage]
  );
  
  const totalPages = pageRanges.length;
  
  // Calculate 2-page spread
  const pageSetIndex = Math.floor(playback.currentPage / 2);
  const leftPageIndex = pageSetIndex * 2;
  const rightPageIndex = leftPageIndex + 1;
  
  const leftPage = leftPageIndex < totalPages ? {
    measures: allMeasures,
    lineRange: pageRanges[leftPageIndex],
    pageNumber: leftPageIndex + 1,
  } : null;
  
  const rightPage = rightPageIndex < totalPages ? {
    measures: allMeasures,
    lineRange: pageRanges[rightPageIndex],
    pageNumber: rightPageIndex + 1,
  } : null;    

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
              lineRange={leftPage?.lineRange}
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
                  lineRange={rightPage.lineRange}
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
