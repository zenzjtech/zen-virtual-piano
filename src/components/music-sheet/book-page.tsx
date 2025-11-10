import React from 'react';
import { Box, Typography } from '@mui/material';
import { Measure, PlaybackState } from './types';
import { PianoTheme } from '../piano/themes';
import { SheetNotationDisplay } from './sheet-notation-display';
import { getMusicSheetThemeColors } from './music-sheet-theme-colors';
import bookImage1 from '@/assets/image/music-sheet/1.png';
import bookImage2 from '@/assets/image/music-sheet/2.png';
import bookImage3 from '@/assets/image/music-sheet/3.png';
import bookImage4 from '@/assets/image/music-sheet/4.png';
import bookImage5 from '@/assets/image/music-sheet/5.png';
import bookImage6 from '@/assets/image/music-sheet/6.png';
import bookImage7 from '@/assets/image/music-sheet/7.png';
import bookImage8 from '@/assets/image/music-sheet/8.png';
import bookImage9 from '@/assets/image/music-sheet/9.png';
import bookImage10 from '@/assets/image/music-sheet/10.png';
import bookImage11 from '@/assets/image/music-sheet/11.png';
import bookImage12 from '@/assets/image/music-sheet/12.png';
import bookImage13 from '@/assets/image/music-sheet/13.png';
import bookImage14 from '@/assets/image/music-sheet/14.png';
import bookImage15 from '@/assets/image/music-sheet/15.png';

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
      case 'paper-4':
        return bookImage4;
      case 'paper-5':
        return bookImage5;
      case 'paper-6':
        return bookImage6;
      case 'paper-7':
        return bookImage7;
      case 'paper-8':
        return bookImage8;
      case 'paper-9':
        return bookImage9;
      case 'paper-10':
        return bookImage10;
      case 'paper-11':
        return bookImage11;
      case 'paper-12':
        return bookImage12;
      case 'paper-13':
        return bookImage13;
      case 'paper-14':
        return bookImage14;
      case 'paper-15':
        return bookImage15;
      default:
        return bookImage1;
    }
  };
  const backgroundImage = getBackgroundImage();
  const themeColors = getMusicSheetThemeColors(musicSheetThemeId);
  const isLeftPage = pageNumber % 2 === 1;
  
  if (isEmpty) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          // Book-like margins: inner (binding) smaller, outer larger
          pl: { xs: 2, md: isLeftPage ? 3 : 4 },
          pr: { xs: 2, md: isLeftPage ? 4 : 3 },
          pt: { xs: 2.5, md: 3 },
          pb: { xs: 2, md: 2.5 },
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
        // Book-like margins: inner (binding) smaller, outer larger
        pl: { xs: 2, md: isLeftPage ? 3 : 4 },
        pr: { xs: 2, md: isLeftPage ? 4 : 3 },
        pt: { xs: 2.5, md: 3 },
        pb: { xs: 2, md: 2.5 },
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 1,
        position: 'relative', // Enable absolute positioning for children
      }}
    >
      {/* Title area - always rendered to maintain alignment */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: themeColors.titleFont,
          fontWeight: 600,
          mb: { xs: 2, md: 2.5 },
          mt: { xs: 0.5, md: 0 },
          fontSize: { xs: '0.9rem', md: '1.1rem' },
          color: themeColors.primary,
          visibility: isLeftPage ? 'visible' : 'hidden',
        }}
      >
        {title}
      </Typography>

      <Box sx={{ flex: 1 }}>
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

      {/* Page info at bottom of both pages - absolutely positioned */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: { xs: 2, md: 2.5 },
          left: { xs: 2, md: isLeftPage ? 3 : 4 },
          right: { xs: 2, md: isLeftPage ? 4 : 3 },
          fontFamily: themeColors.bodyFont,
          textAlign: 'center',
          color: themeColors.primary,
          opacity: 0.7,
          fontSize: { xs: '0.7rem', md: '0.8rem' },
        }}
      >
        {artist} - Page {pageNumber} of {totalPages}
      </Typography>
    </Box>
  );
};
