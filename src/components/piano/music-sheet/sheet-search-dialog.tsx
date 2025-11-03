import React, { useState, useMemo } from 'react';
import {
  List,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Popper,
  ClickAwayListener,
  Chip,
  Divider,
  IconButton,
  Link,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  MusicNote as MusicNoteIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { loadSheet, toggleFavorite } from '@/store/reducers/music-sheet-slice';
import { PianoTheme } from '../themes';
import {
  StyledPopupPaper,
  PopupHeaderBox,
  StyledListItem,
  StyledListItemButton,
} from '../popup-styled-components';
import { PopupSearchBar } from '../popup-search-bar';
import type { MusicSheet } from './types';

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
  
  // Get sheets from Redux
  const sheets = useAppSelector((state) => state.musicSheet.sheets);
  const favorites = useAppSelector((state) => state.musicSheet.userData.favorites);
  const recentlyPlayed = useAppSelector((state) => state.musicSheet.userData.recentlyPlayed);
  
  // Convert sheets object to array
  const allSheets = useMemo(() => Object.values(sheets), [sheets]);
  
  // Filter sheets based on search query
  const filteredSheets = useMemo(() => {
    if (!searchQuery.trim()) {
      return allSheets;
    }
    
    const query = searchQuery.toLowerCase();
    return allSheets.filter(sheet => 
      sheet.title.toLowerCase().includes(query) ||
      sheet.artist.toLowerCase().includes(query) ||
      sheet.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [allSheets, searchQuery]);
  
  // Get recently played sheets (max 5)
  const recentSheets = useMemo(() => {
    return recentlyPlayed
      .slice(0, 5)
      .map(id => sheets[id])
      .filter(Boolean);
  }, [recentlyPlayed, sheets]);
  
  // Get favorite sheets
  const favoriteSheets = useMemo(() => {
    return favorites
      .map(id => sheets[id])
      .filter(Boolean);
  }, [favorites, sheets]);
  
  const handleSelectSheet = (sheetId: string) => {
    dispatch(loadSheet(sheetId));
    onClose();
  };
  
  const handleToggleFavorite = (sheetId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorite(sheetId));
  };
  
  const getDifficultyColor = (difficulty: string): 'success' | 'warning' | 'error' => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'warning';
    }
  };
  
  const isFavorite = (sheetId: string) => favorites.includes(sheetId);
  
  const renderSheetItem = (sheet: MusicSheet) => (
    <StyledListItem
      key={sheet.id}
      disablePadding
      pianoTheme={pianoTheme}
      secondaryAction={
        <IconButton
          edge="end"
          size="small"
          onClick={(e) => handleToggleFavorite(sheet.id, e)}
          sx={{ color: isFavorite(sheet.id) ? 'warning.main' : 'text.secondary' }}
        >
          {isFavorite(sheet.id) ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      }
    >
      <StyledListItemButton
        onClick={() => handleSelectSheet(sheet.id)}
        pianoTheme={pianoTheme}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <MusicNoteIcon sx={{ color: pianoTheme.colors.accent }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {sheet.title}
              </Typography>
              <Chip
                label={sheet.difficulty}
                size="small"
                color={getDifficultyColor(sheet.difficulty)}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          }
          secondary={
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {sheet.artist}
              </Typography>
              {sheet.durationSeconds && (
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.7rem' }}>
                  ~{Math.ceil(sheet.durationSeconds / 60)} min • {sheet.tempo} BPM
                </Typography>
              )}
            </Box>
          }
        />
      </StyledListItemButton>
    </StyledListItem>
  );
  
  const handleSearchOnVirtualPiano = () => {
    const query = encodeURIComponent(searchQuery || 'popular songs');
    window.open(`https://virtualpiano.net/?s=${query}`, '_blank');
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MusicNoteIcon sx={{ color: pianoTheme.colors.accent }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Music Sheets
              </Typography>
            </Box>
          </PopupHeaderBox>
          
          {/* Search Bar */}
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <PopupSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search songs, artists, or tags..."
              pianoTheme={pianoTheme}
            />
          </Box>
          
          {/* Content */}
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto',
            px: 1,
          }}>
            {/* Empty State */}
            {allSheets.length === 0 && (
              <Box sx={{ 
                textAlign: 'center', 
                py: 6,
                px: 3,
              }}>
                <MusicNoteIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  No sheets available yet
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  The sheet library is being loaded...
                </Typography>
              </Box>
            )}
            
            {/* Search Results */}
            {searchQuery.trim() && allSheets.length > 0 && (
              <>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    px: 2, 
                    pt: 1,
                    pb: 0.5,
                    display: 'block',
                    color: 'text.secondary',
                    fontWeight: 600,
                  }}
                >
                  Search Results ({filteredSheets.length})
                </Typography>
                <List sx={{ py: 0 }}>
                  {filteredSheets.length > 0 ? (
                    filteredSheets.map(renderSheetItem)
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 3, px: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        No sheets found matching "{searchQuery}"
                      </Typography>
                    </Box>
                  )}
                </List>
              </>
            )}
            
            {/* Recently Played */}
            {!searchQuery.trim() && recentSheets.length > 0 && (
              <>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    px: 2, 
                    pt: 1,
                    pb: 0.5,
                    display: 'block',
                    color: 'text.secondary',
                    fontWeight: 600,
                  }}
                >
                  ⏱ Recently Played
                </Typography>
                <List sx={{ py: 0 }}>
                  {recentSheets.map(renderSheetItem)}
                </List>
                <Divider sx={{ my: 1 }} />
              </>
            )}
            
            {/* Favorites */}
            {!searchQuery.trim() && favoriteSheets.length > 0 && (
              <>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    px: 2, 
                    pt: 1,
                    pb: 0.5,
                    display: 'block',
                    color: 'text.secondary',
                    fontWeight: 600,
                  }}
                >
                  ⭐ Favorites
                </Typography>
                <List sx={{ py: 0 }}>
                  {favoriteSheets.map(renderSheetItem)}
                </List>
                <Divider sx={{ my: 1 }} />
              </>
            )}
            
            {/* All Sheets (when no search) */}
            {!searchQuery.trim() && allSheets.length > 0 && (
              <>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    px: 2, 
                    pt: 1,
                    pb: 0.5,
                    display: 'block',
                    color: 'text.secondary',
                    fontWeight: 600,
                  }}
                >
                  📚 All Sheets ({allSheets.length})
                </Typography>
                <List sx={{ py: 0 }}>
                  {allSheets.map(renderSheetItem)}
                </List>
              </>
            )}
          </Box>
          
          {/* Footer - External Search Link */}
          <Box
            sx={{
              borderTop: 1,
              borderColor: 'divider',
              px: 2,
              py: 1.5,
              backgroundColor: (theme) => theme.palette.action.hover,
            }}
          >
            <Link
              component="button"
              onClick={handleSearchOnVirtualPiano}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                textDecoration: 'none',
                color: pianoTheme.colors.accent,
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <OpenInNewIcon fontSize="small" />
              Search more on VirtualPiano.net
            </Link>
          </Box>
        </StyledPopupPaper>
      </ClickAwayListener>
    </Popper>
  );
};
