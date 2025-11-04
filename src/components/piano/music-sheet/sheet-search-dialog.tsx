import React, { useState } from 'react';
import {
  Typography,
  Box,
  Popper,
  ClickAwayListener,
} from '@mui/material';
import {
  MusicNote as MusicNoteIcon,
} from '@mui/icons-material';
import { useAppDispatch } from '@/store/hook';
import { loadSheet, toggleFavorite } from '@/store/reducers/music-sheet-slice';
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
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use custom hook for data management
  const {
    allSheets,
    filteredSheets,
    recentSheets,
    favoriteSheets,
    favorites,
  } = useSheetSearch(searchQuery);
  
  // Event handlers
  const handleSelectSheet = (sheetId: string) => {
    dispatch(loadSheet(sheetId));
    onClose();
  };
  
  const handleToggleFavorite = (sheetId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorite(sheetId));
  };
  
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{ zIndex: 1300 }}
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
            maxHeight: '70vh',
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
            {!searchQuery.trim() && recentSheets.length > 0 && (
              <SheetSection
                title="⏱ Recently Played"
                sheets={recentSheets}
                pianoTheme={pianoTheme}
                favorites={favorites}
                onSelectSheet={handleSelectSheet}
                onToggleFavorite={handleToggleFavorite}
                showDivider
              />
            )}
            
            {/* Favorites */}
            {!searchQuery.trim() && favoriteSheets.length > 0 && (
              <SheetSection
                title="⭐ Favorites"
                sheets={favoriteSheets}
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
                title={`📚 All Sheets (${allSheets.length})`}
                sheets={allSheets}
                pianoTheme={pianoTheme}
                favorites={favorites}
                onSelectSheet={handleSelectSheet}
                onToggleFavorite={handleToggleFavorite}
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
