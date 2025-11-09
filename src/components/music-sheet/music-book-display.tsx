import React, { useMemo, useState, useEffect } from 'react';
import { Box, Paper, Collapse, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Close as CloseIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Palette as PaletteIcon, Delete as DeleteIcon, Add as AddIcon, FormatListNumbered as FormatListNumberedIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { toggleFavorite, previousPage, nextPage, deleteSheet, openAddSheetDialog, closeAddSheetDialog, goToPage } from '@/store/reducers/music-sheet-slice';
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
import { DeleteSheetDialog } from './delete-sheet-dialog';
import { AddSheetDialog } from './add-sheet-dialog';

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
 * Navigation button for going to a specific page
 */
const GoToPageButton: React.FC<{
  onGoToPage: () => void;
  musicSheetThemeId: string;
}> = ({ onGoToPage, musicSheetThemeId }) => (
  <Box
    sx={{
      position: 'absolute',
      top: theme => theme.spacing(1.5),
      left: '50%',
      marginLeft: theme => theme.spacing(8),
    }}
  >
    <ActionButton
      onClick={onGoToPage}
      icon={<FormatListNumberedIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Go to page"
      tooltip="Go to Page (Ctrl+G)"
    />
  </Box>
);

/**
 * Action buttons container (favorite, theme, add, delete, close)
 */
const ActionButtons: React.FC<{
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onThemeClick: () => void;
  onAddSheet: () => void;
  onDelete: () => void;
  onClose: () => void;
  musicSheetThemeId: string;
}> = ({ isFavorite, onToggleFavorite, onThemeClick, onAddSheet, onDelete, onClose, musicSheetThemeId }) => (
  <Box
    sx={{
      position: 'absolute',
      top: theme => theme.spacing(1.5),
      right: theme => theme.spacing(1.5),
      display: 'flex'      
    }}
  >    
    <ActionButton
      onClick={onThemeClick}
      icon={<PaletteIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Change theme"
      tooltip="Change paper theme"
    />

    <ActionButton
      onClick={onToggleFavorite}
      icon={isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      isActive={isFavorite}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      tooltip={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    />
    
    <ActionButton
      onClick={onAddSheet}
      icon={<AddIcon fontSize="small" />}
      customColors={getMusicSheetThemeColors(musicSheetThemeId)}
      ariaLabel="Add custom sheet"
      tooltip="Add custom sheet"
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
  
  // Page navigation dialog state
  const [isGoToPageDialogOpen, setIsGoToPageDialogOpen] = useState(false);
  const [pageInput, setPageInput] = useState('');
  
  // Delete confirmation state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Add sheet dialog state from Redux
  const isAddSheetDialogOpen = useAppSelector((state) => state.musicSheet.isAddSheetDialogOpen);
  
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

  // Handle page navigation
  const handleGoToPage = () => {
    const pageNumber = parseInt(pageInput) - 1; // Convert to 0-based index
    if (pageNumber >= 0 && pageNumber < totalPages) {
      dispatch(goToPage(pageNumber));
      setIsGoToPageDialogOpen(false);
      setPageInput('');
    }
  };

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

        <GoToPageButton
          onGoToPage={() => setIsGoToPageDialogOpen(true)}
          musicSheetThemeId={musicSheetThemeId}
        />

        {/* Action Buttons */}
        <ActionButtons
          isFavorite={isFavorite}
          onToggleFavorite={() => dispatch(toggleFavorite(currentSheet.id))}
          onThemeClick={() => setIsThemeGalleryOpen(true)}
          onAddSheet={() => dispatch(openAddSheetDialog())}
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
      <DeleteSheetDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => dispatch(deleteSheet(currentSheet.id))}
        sheetTitle={currentSheet.title}
        sheetArtist={currentSheet.artist}
        isCustomSheet={isCustomSheet}
      />
      
      {/* Add Sheet Dialog */}
      <AddSheetDialog
        open={isAddSheetDialogOpen}
        onClose={() => dispatch(closeAddSheetDialog())}
      />

      {/* Page Navigation Dialog */}
      <Dialog
        open={isGoToPageDialogOpen}
        onClose={() => setIsGoToPageDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Go to Page</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Page Number"
            type="number"
            fullWidth
            variant="outlined"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGoToPage();
              }
            }}
            helperText={`Enter page number (1-${totalPages})`}
            inputProps={{
              min: 1,
              max: totalPages,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsGoToPageDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleGoToPage}
            variant="contained"
            disabled={!pageInput || isNaN(parseInt(pageInput)) || parseInt(pageInput) < 1 || parseInt(pageInput) > totalPages}
          >
            Go to Page
          </Button>
        </DialogActions>
      </Dialog>
    </Collapse>
  );
};
