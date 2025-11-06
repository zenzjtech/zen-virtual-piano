import React, { useState, useRef } from 'react';
import {
  Typography,
  Box,
  Popper,
  ClickAwayListener,
  useTheme,
  Chip,
  ToggleButton,
} from '@mui/material';
import {
  MusicNote as MusicNoteIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { loadSheet, toggleFavorite, setSearchFilters } from '@/store/reducers/music-sheet-slice';
import { PianoTheme } from '../themes';
import {
  StyledPopupPaper,
  PopupHeaderBox,
} from '../popup-styled-components';
import { PopupSearchBar } from '../popup-search-bar';
import { useSheetSearch } from './use-sheet-search';
import { SheetSection } from './sheet-section';
import { SheetEmptyState } from './sheet-empty-state';
import { SheetSearchFooter } from './sheet-search-footer';

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
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // Get persisted filter preferences from Redux
  const savedFilters = useAppSelector((state) => state.musicSheet.searchFilters);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(savedFilters.showFavoritesOnly);
  const [selectedDifficulties, setSelectedDifficulties] = useState<('easy' | 'medium' | 'hard')[]>(savedFilters.selectedDifficulties);
  
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
  
  const handleToggleFavorite = (sheetId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorite(sheetId));
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
  
  // Filter recently played by favorites when favorite filter is active
  const displayedRecentSheets = showFavoritesOnly 
    ? recentSheets.filter(sheet => favorites.includes(sheet.id))
    : recentSheets;
  
  // Exclude recently played sheets from the main list to avoid duplication
  const recentlyPlayedIds = new Set(displayedRecentSheets.map(sheet => sheet.id));
  const displayedAllSheets = (hasActiveFilters ? filteredSheets : allSheets)
    .filter(sheet => !recentlyPlayedIds.has(sheet.id));
  
  // Handle click away, but ignore clicks on MUI Select menus
  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    const target = event.target as HTMLElement;
    // Check if click is on a MUI menu (Select dropdown)
    if (target.closest('.MuiPopover-root') || target.closest('.MuiModal-root')) {
      return;
    }
    onClose();
  };
  
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
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
          <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${pianoTheme.colors.border}` }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Favorites Toggle */}
              <ToggleButton
                value="favorites"
                selected={showFavoritesOnly}
                onChange={handleToggleFavoriteFilter}
                size="small"
                sx={{
                  px: 1.5,
                  py: 0.5,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  borderColor: pianoTheme.colors.border,
                  color: showFavoritesOnly ? pianoTheme.colors.accent : pianoTheme.colors.secondary,
                  '&.Mui-selected': {
                    backgroundColor: `${pianoTheme.colors.accent}22`,
                    borderColor: pianoTheme.colors.accent,
                    color: pianoTheme.colors.accent,
                    '&:hover': {
                      backgroundColor: `${pianoTheme.colors.accent}33`,
                    },
                  },
                }}
              >
                {showFavoritesOnly ? <FavoriteIcon fontSize="small" sx={{ mr: 0.5 }} /> : <FavoriteBorderIcon fontSize="small" sx={{ mr: 0.5 }} />}
                Favorites
              </ToggleButton>
              
              {/* Difficulty Chips */}
              {(['easy', 'medium', 'hard'] as const).map(difficulty => (
                <Chip
                  key={difficulty}
                  label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  size="small"
                  onClick={() => handleToggleDifficulty(difficulty)}
                  sx={{
                    height: 28,
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    color: selectedDifficulties.includes(difficulty) 
                      ? pianoTheme.colors.accent 
                      : pianoTheme.colors.secondary,
                    borderColor: selectedDifficulties.includes(difficulty)
                      ? pianoTheme.colors.accent
                      : pianoTheme.colors.border,
                    backgroundColor: selectedDifficulties.includes(difficulty)
                      ? `${pianoTheme.colors.accent}22`
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: `${pianoTheme.colors.accent}33`,
                      borderColor: pianoTheme.colors.accent,
                    },
                  }}
                  variant="outlined"
                />
              ))}
              
              {/* Clear Filters */}
              {hasActiveFilters && (
                <Chip
                  label="Clear Filters"
                  size="small"
                  onClick={handleClearFilters}
                  sx={{
                    height: 28,
                    fontSize: '0.7rem',
                    color: pianoTheme.colors.secondary,
                    borderColor: pianoTheme.colors.border,
                    '&:hover': {
                      backgroundColor: `${pianoTheme.colors.accent}22`,
                    },
                  }}
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
          
          {/* Content */}
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto',
            px: 1,
          }}>
            {/* Empty State */}
            {allSheets.length === 0 && <SheetEmptyState pianoTheme={pianoTheme} />}
            
            {/* Search Results */}
            {searchQuery.trim() && allSheets.length > 0 && (
              <SheetSection
                title={`Search Results (${filteredSheets.length})`}
                sheets={filteredSheets}
                pianoTheme={pianoTheme}
                favorites={favorites}
                onSelectSheet={handleSelectSheet}
                onToggleFavorite={handleToggleFavorite}
                emptyMessage={`No sheets found matching "${searchQuery}"`}
              />
            )}
            
            {/* Recently Played */}
            {!searchQuery.trim() && displayedRecentSheets.length > 0 && (
              <SheetSection
                title="⏱ Recently Played"
                sheets={displayedRecentSheets}
                pianoTheme={pianoTheme}
                favorites={favorites}
                onSelectSheet={handleSelectSheet}
                onToggleFavorite={handleToggleFavorite}
                showDivider
              />
            )}
            
            {/* All Sheets (when no search) */}
            {!searchQuery.trim() && allSheets.length > 0 && (
              <SheetSection
                title={hasActiveFilters ? `📚 Filtered Sheets (${displayedAllSheets.length})` : `📚 All Sheets (${displayedAllSheets.length})`}
                sheets={displayedAllSheets}
                pianoTheme={pianoTheme}
                favorites={favorites}
                onSelectSheet={handleSelectSheet}
                onToggleFavorite={handleToggleFavorite}
                emptyMessage={hasActiveFilters ? "No sheets match the selected filters" : undefined}
              />
            )}
          </Box>
          
          {/* Footer - External Search Link */}
          <SheetSearchFooter searchQuery={searchQuery} pianoTheme={pianoTheme} />
        </StyledPopupPaper>
      </ClickAwayListener>
    </Popper>
  );
};
