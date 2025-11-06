import React from 'react';
import { Box, Typography } from '@mui/material';
import { Measure, PlaybackState } from './types';
import { PianoTheme } from '../themes';
import { SheetNotationDisplay } from './sheet-notation-display';
import { MUSIC_SHEET_THEMES } from '../music-sheet-themes';
import { getMusicSheetThemeColors } from './music-sheet-theme-colors';
import bookImage1 from '@/assets/image/music-sheet/1.png';
import bookImage2 from '@/assets/image/music-sheet/2.png';
import bookImage3 from '@/assets/image/music-sheet/3.png';

interface BookPageProps {
  /** Sheet title */
  title: string;
  /** Sheet artist */
  artist: string;
  /** Page number (1-indexed) */
  pageNumber: number;
  /** Total number of pages */
  totalPages: number;
  /** All measures */
  measures: Measure[];
  /** Line range for this page */
  lineRange?: { start: number; end: number };
  /** Current playback state */
  playback: PlaybackState;
  /** Piano theme */
  pianoTheme: PianoTheme;
  /** Music sheet theme ID */
  musicSheetThemeId: string;
  /** Whether this page is currently active in playback */
  isActivePage: boolean;
  /** Whether this is an empty page (end of sheet) */
  isEmpty?: boolean;
}

/**
 * Renders a single page of sheet music in the book layout
 */
export const BookPage: React.FC<BookPageProps> = ({
  title,
  artist,
  pageNumber,
  totalPages,
  measures,
  lineRange,
  playback,
  pianoTheme,
  musicSheetThemeId,
  isActivePage,
  isEmpty = false,
}) => {
  // Get the background image based on theme
  const getBackgroundImage = () => {
    switch (musicSheetThemeId) {
      case 'paper-2':
        return bookImage2;
      case 'paper-3':
        return bookImage3;
      default:
        return bookImage1;
    }
  };
  const backgroundImage = getBackgroundImage();
  const themeColors = getMusicSheetThemeColors(musicSheetThemeId);
  if (isEmpty) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 1,
          opacity: 0.3,
        }}
      >
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
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        backgroundImage: `url(${backgroundImage})`,
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
          color: themeColors.primary,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          mb: 2,
          color: themeColors.primary,
          opacity: 0.7,
          fontSize: { xs: '0.7rem', md: '0.8rem' },
        }}
      >
        {artist} - Page {pageNumber} of {totalPages}
      </Typography>

      <SheetNotationDisplay
        measures={measures}
        currentMeasure={isActivePage ? playback.currentMeasure : -1}
        currentNoteIndex={isActivePage ? playback.currentNoteIndex : -1}
        isPlaying={playback.isPlaying && isActivePage}
        pianoTheme={pianoTheme}
        musicSheetThemeId={musicSheetThemeId}
        lineRange={lineRange}
      />
    </Box>
  );
};
