import React, { useMemo, useState } from 'react';
import { Box, Paper, Collapse, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Close as CloseIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Palette as PaletteIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { toggleFavorite, previousPage, nextPage, deleteSheet } from '@/store/reducers/music-sheet-slice';
import { MusicSheet, PlaybackState } from './types';
import { PianoTheme } from '../piano/themes';
import { useAppConfig } from '#imports';
import { useSheetPlayback } from '@/hooks/use-sheet-playback';
import { usePageTransition } from '@/hooks/use-page-transition';
import { BookPage } from './book-page';
import { calculateLineRanges, calculatePageSpread } from './music-book-utils';
import { ActionButton } from './action-button';
import { getMusicSheetThemeColors } from './music-sheet-theme-colors';
import { ThemeGalleryDialog } from './theme-gallery-dialog';

interface MusicBookDisplayProps {
  currentSheet: MusicSheet;
  playback: PlaybackState;
  isMinimized: boolean;
  pianoTheme: PianoTheme;
  musicSheetThemeId: string;
  onClose: () => void;
}

/**
 * Navigation button for previous page
 */
const PreviousPageButton: React.FC<{
  onPrevious: () => void;
  musicSheetThemeId: string;
}> = ({ onPrevious, musicSheetThemeId }) => (
  <Box
    sx={{
      position: 'absolute',
      top: theme => theme.spacing(1.5),
      left: '50%',
      transform: 'translateX(-50%)',
      marginLeft: theme => theme.spacing(-5),
    }}
  >
    <ActionButton
      onClick={onPrevious}
      icon={<ChevronLeftIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Previous page"
      tooltip="Previous Page (← / Backspace)"
    />
  </Box>
);

/**
 * Navigation button for next page
 */
const NextPageButton: React.FC<{
  onNext: () => void;
  musicSheetThemeId: string;
}> = ({ onNext, musicSheetThemeId }) => (
  <Box
    sx={{
      position: 'absolute',
      top: theme => theme.spacing(1.5),
      left: '50%',
      marginLeft: theme => theme.spacing(4),
    }}
  >
    <ActionButton
      onClick={onNext}
      icon={<ChevronRightIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Next page"
      tooltip="Next Page (→ / Enter)"
    />
  </Box>
);

/**
 * Action buttons container (favorite, theme, delete, close)
 */
const ActionButtons: React.FC<{
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onThemeClick: () => void;
  onDelete: () => void;
  onClose: () => void;
  musicSheetThemeId: string;
}> = ({ isFavorite, onToggleFavorite, onThemeClick, onDelete, onClose, musicSheetThemeId }) => (
  <Box
    sx={{
      position: 'absolute',
      top: theme => theme.spacing(1.5),
      right: theme => theme.spacing(1.5),
      display: 'flex',
      gap: 0.5,
    }}
  >
    <ActionButton
      onClick={onToggleFavorite}
      icon={isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      isActive={isFavorite}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      tooltip={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    />
    
    <ActionButton
      onClick={onThemeClick}
      icon={<PaletteIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Change theme"
      tooltip="Change paper theme"
    />
    
    <ActionButton
      onClick={onDelete}
      icon={<DeleteIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Delete sheet"
      tooltip="Delete sheet"
    />
    
    <ActionButton
      onClick={onClose}
      icon={<CloseIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Close sheet"
      tooltip="Close sheet"
    />
  </Box>
);

/**
 * Displays sheet music in an open book layout
 */
export const MusicBookDisplay: React.FC<MusicBookDisplayProps> = ({
  currentSheet,
  playback,
  isMinimized,
  pianoTheme,
  musicSheetThemeId,
  onClose,
}) => {
  useSheetPlayback();

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.musicSheet.userData.favorites);
  const isFavorite = favorites.includes(currentSheet.id);
  const appConfig = useAppConfig();
  
  // Theme gallery state
  const [isThemeGalleryOpen, setIsThemeGalleryOpen] = useState(false);
  
  // Delete confirmation state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Check if current sheet is custom
  const customSheets = useAppSelector((state) => state.musicSheet.userData.customSheets);
  const isCustomSheet = !!customSheets[currentSheet.id];
  
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
            totalPages={totalPages}
            measures={allMeasures}
            lineRange={hasLeftPage ? pageRanges[leftPageIndex] : undefined}
            playback={playback}
            pianoTheme={pianoTheme}
            musicSheetThemeId={musicSheetThemeId}
            isActivePage={playback.currentPage === leftPageIndex}
          />

          {/* Right Page */}
          <BookPage
            title={currentSheet.title}
            artist={currentSheet.artist}
            pageNumber={rightPageIndex + 1}
            totalPages={totalPages}
            measures={allMeasures}
            lineRange={hasRightPage ? pageRanges[rightPageIndex] : undefined}
            playback={playback}
            pianoTheme={pianoTheme}
            musicSheetThemeId={musicSheetThemeId}
            isActivePage={playback.currentPage === rightPageIndex}
            isEmpty={!hasRightPage}
          />
        </Box>

        {/* Navigation Buttons */}
        {playback.currentPage > 0 && (
          <PreviousPageButton
            onPrevious={() => dispatch(previousPage())}
            musicSheetThemeId={musicSheetThemeId}
          />
        )}

        {rightPageIndex < totalPages && (
          <NextPageButton
            onNext={() => dispatch(nextPage())}
            musicSheetThemeId={musicSheetThemeId}
          />
        )}

        {/* Action Buttons */}
        <ActionButtons
          isFavorite={isFavorite}
          onToggleFavorite={() => dispatch(toggleFavorite(currentSheet.id))}
          onThemeClick={() => setIsThemeGalleryOpen(true)}
          onDelete={() => setIsDeleteDialogOpen(true)}
          onClose={onClose}
          musicSheetThemeId={musicSheetThemeId}
        />
      </Paper>
      
      {/* Theme Gallery Dialog */}
      <ThemeGalleryDialog
        open={isThemeGalleryOpen}
        onClose={() => setIsThemeGalleryOpen(false)}
      />
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Delete Sheet?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {isCustomSheet ? (
              <>
                This will permanently remove <strong>{currentSheet.title}</strong> from your library.
              </>
            ) : (
              <>
                This will hide <strong>{currentSheet.title}</strong> from your library. The built-in sheet can be restored later.
              </>
            )}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setIsDeleteDialogOpen(false)}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteSheet(currentSheet.id));
              setIsDeleteDialogOpen(false);
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Collapse>
  );
};
