import React, { useState, useRef } from 'react';
import {
  Typography,
  Box,
  Popper,
  ClickAwayListener,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  MusicNote as MusicNoteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { loadSheet, setSearchFilters, openAddSheetDialog, closeAddSheetDialog } from '@/store/reducers/music-sheet-slice';
import { PianoTheme } from '../piano/themes';
import {
  StyledPopupPaper,
  PopupHeaderBox,
} from '../piano/popup-styled-components';
import { PopupSearchBar } from '../piano/popup-search-bar';
import { useSheetSearch } from './use-sheet-search';
import { SheetSearchFooter } from './sheet-search-footer';
import { SheetSearchFilters } from './sheet-search-filters';
import { SheetSearchContent } from './sheet-search-content';
import { AddSheetDialog } from './add-sheet-dialog';

interface SheetSearchDialogProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  pianoTheme: PianoTheme;
}

/**
 * Sheet search and selection dialog
 * Displays library of available sheets with search, favorites, and recently played
 */
export const SheetSearchDialog: React.FC<SheetSearchDialogProps> = ({
  open,
  anchorEl,
  onClose,
  pianoTheme,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSortSelectOpen, setIsSortSelectOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // Add sheet dialog state from Redux
  const isAddSheetDialogOpen = useAppSelector((state) => state.musicSheet.isAddSheetDialogOpen);
  
  // Get persisted filter preferences from Redux
  const savedFilters = useAppSelector((state) => state.musicSheet.searchFilters);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(savedFilters.showFavoritesOnly);
  const [selectedDifficulties, setSelectedDifficulties] = useState<('easy' | 'medium' | 'hard')[]>(savedFilters.selectedDifficulties);
  const sortBy = savedFilters.sortBy; // Read from Redux directly
  
  // Use custom hook for data management
  const {
    allSheets,
    filteredSheets,
    recentSheets,
    favoriteSheets,
    favorites,
  } = useSheetSearch({
    searchQuery,
    showFavoritesOnly,
    selectedTags: [],
    selectedArtist: null,
    selectedDifficulties,
  });
  
  // Event handlers
  const handleSelectSheet = (sheetId: string) => {
    dispatch(loadSheet(sheetId));
    onClose();
  };
  
  const handleClearFilters = () => {
    setShowFavoritesOnly(false);
    setSelectedDifficulties([]);
    dispatch(setSearchFilters({ showFavoritesOnly: false, selectedDifficulties: [] }));
  };
  
  const handleToggleFavoriteFilter = () => {
    const newValue = !showFavoritesOnly;
    setShowFavoritesOnly(newValue);
    dispatch(setSearchFilters({ showFavoritesOnly: newValue }));
  };
  
  const handleToggleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    const newDifficulties = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter(d => d !== difficulty)
      : [...selectedDifficulties, difficulty];
    setSelectedDifficulties(newDifficulties);
    dispatch(setSearchFilters({ selectedDifficulties: newDifficulties }));
  };
  
  const hasActiveFilters = showFavoritesOnly || selectedDifficulties.length > 0;
  
  // Filter recently played by active filters
  const displayedRecentSheets = recentSheets.filter(sheet => {
    // Filter by favorites if enabled
    if (showFavoritesOnly && !favorites.includes(sheet.id)) {
      return false;
    }
    // Filter by difficulties if any selected
    if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(sheet.difficulty)) {
      return false;
    }
    return true;
  });
  
  // Sort sheets based on sortBy preference
  const sortSheets = (sheets: typeof allSheets) => {
    const sorted = [...sheets];
    switch (sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'artist':
        return sorted.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
      case 'difficulty':
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
      case 'recent':
        // Most recent first (assuming array is already in order or we reverse)
        return sorted.reverse();
      default:
        return sorted;
    }
  };
  
  // Exclude recently played sheets from the main list to avoid duplication
  const recentlyPlayedIds = new Set(displayedRecentSheets.map(sheet => sheet.id));
  const displayedAllSheets = sortSheets(
    (hasActiveFilters ? filteredSheets : allSheets)
      .filter(sheet => !recentlyPlayedIds.has(sheet.id))
  );
  
  // Handle click away, but ignore clicks when sort selector is open
  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    // Don't close if sort select is open
    if (isSortSelectOpen) {
      return;
    }
    
    const target = event.target as HTMLElement;
    // Check if click is on a MUI menu (Select dropdown) or MUI backdrop
    if (
      target.closest('.MuiPopover-root') || 
      target.closest('.MuiModal-root') ||
      target.closest('.MuiMenu-root') ||
      target.closest('.MuiPaper-root') ||
      target.classList.contains('MuiBackdrop-root')
    ) {
      return;
    }
    onClose();
  };
  
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="top-end"
      style={{ zIndex: theme.zIndex.modal }}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            fallbackPlacements: ['top-start', 'bottom-start'],
          },
        },
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            padding: 8,
          },
        },
      ]}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <StyledPopupPaper
          pianoTheme={pianoTheme}
          elevation={8}
          sx={{
            width: 450,
            maxWidth: '90vw',
            maxHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <PopupHeaderBox pianoTheme={pianoTheme}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MusicNoteIcon
                  sx={{
                    color: pianoTheme.colors.accent,
                    fontSize: '1.5rem',
                    filter: `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))`,
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{
                    color: pianoTheme.colors.primary,
                    textShadow: `
                      0 1px 2px rgba(0, 0, 0, 0.3),
                      0 -1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.1 : 0.05})
                    `,
                    letterSpacing: '0.5px',
                  }}
                >
                  Music Sheets
                </Typography>
              </Box>
              
              {/* Add Sheet Button */}
              <Tooltip title="Add custom sheet" placement="left">
                <IconButton
                  onClick={() => dispatch(openAddSheetDialog())}
                  size="small"
                  sx={{
                    color: pianoTheme.colors.accent,
                    '&:hover': {
                      backgroundColor: `rgba(${pianoTheme.isLight ? '0, 0, 0' : '255, 255, 255'}, 0.1)`,
                    },
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </PopupHeaderBox>
          
          {/* Search Bar */}
          <PopupSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search songs, artists, or tags..."
            pianoTheme={pianoTheme}
            isOpen={open}
          />
          
          {/* Filters */}
          <SheetSearchFilters
            showFavoritesOnly={showFavoritesOnly}
            selectedDifficulties={selectedDifficulties}
            onToggleFavorite={handleToggleFavoriteFilter}
            onToggleDifficulty={handleToggleDifficulty}
            onClearFilters={handleClearFilters}
            onSortSelectOpen={setIsSortSelectOpen}
            pianoTheme={pianoTheme}
          />
          
          {/* Content */}
          <SheetSearchContent
            searchQuery={searchQuery}
            allSheets={allSheets}
            filteredSheets={sortSheets(filteredSheets)}
            displayedRecentSheets={displayedRecentSheets}
            displayedAllSheets={displayedAllSheets}
            hasActiveFilters={hasActiveFilters}
            favorites={favorites}
            pianoTheme={pianoTheme}
            onSelectSheet={handleSelectSheet}
          />
          
          {/* Footer - External Search Link */}
          <SheetSearchFooter searchQuery={searchQuery} pianoTheme={pianoTheme} />
        </StyledPopupPaper>
      </ClickAwayListener>
      
      {/* Add Sheet Dialog */}
      <AddSheetDialog
        open={isAddSheetDialogOpen}
        onClose={() => dispatch(closeAddSheetDialog())}
      />
    </Popper>
  );
};
