import React, { useState } from 'react';
import {
  Typography,
  Box,
  Popper,
  ClickAwayListener,
  useTheme,
  Chip,
  ToggleButton,
  MenuItem,
  Select,
  FormControl,
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
  
  // Get persisted filter preferences from Redux
  const savedFilters = useAppSelector((state) => state.musicSheet.searchFilters);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(savedFilters.showFavoritesOnly);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(savedFilters.selectedArtist);
  
  // Use custom hook for data management
  const {
    allSheets,
    filteredSheets,
    recentSheets,
    favoriteSheets,
    favorites,
    allArtists,
  } = useSheetSearch({
    searchQuery,
    showFavoritesOnly,
    selectedTags: [],
    selectedArtist,
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
    setSelectedArtist(null);
    dispatch(setSearchFilters({ showFavoritesOnly: false, selectedArtist: null }));
  };
  
  const handleToggleFavoriteFilter = () => {
    const newValue = !showFavoritesOnly;
    setShowFavoritesOnly(newValue);
    dispatch(setSearchFilters({ showFavoritesOnly: newValue }));
  };
  
  const handleArtistChange = (artist: string | null) => {
    setSelectedArtist(artist);
    dispatch(setSearchFilters({ selectedArtist: artist }));
  };
  
  const hasActiveFilters = showFavoritesOnly || selectedArtist !== null;
  
  // Filter recently played by favorites when favorite filter is active
  const displayedRecentSheets = showFavoritesOnly 
    ? recentSheets.filter(sheet => favorites.includes(sheet.id))
    : recentSheets;
  
  // Exclude recently played sheets from the main list to avoid duplication
  const recentlyPlayedIds = new Set(displayedRecentSheets.map(sheet => sheet.id));
  const displayedAllSheets = (hasActiveFilters ? filteredSheets : allSheets)
    .filter(sheet => !recentlyPlayedIds.has(sheet.id));
  
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
      <ClickAwayListener onClickAway={onClose}>
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
              
              {/* Artist Filter */}
              {allArtists.length > 0 && (
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={selectedArtist || ''}
                    onChange={(e) => handleArtistChange(e.target.value || null)}
                    displayEmpty
                    onClick={(e) => e.stopPropagation()}
                    MenuProps={{
                      disablePortal: false,
                      onClick: (e) => e.stopPropagation(),
                    }}
                    sx={{
                      fontSize: '0.75rem',
                      height: 28,
                      borderColor: pianoTheme.colors.border,
                      color: selectedArtist ? pianoTheme.colors.primary : pianoTheme.colors.secondary,
                      '& .MuiSelect-select': {
                        py: 0.5,
                      },
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '0.75rem' }}>All Artists</MenuItem>
                    {allArtists.map(artist => (
                      <MenuItem key={artist} value={artist} sx={{ fontSize: '0.75rem' }}>
                        {artist}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              
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
