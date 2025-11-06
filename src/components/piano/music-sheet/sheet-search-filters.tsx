import React from 'react';
import { Box, Chip, ToggleButton } from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { PianoTheme } from '../themes';

interface SheetSearchFiltersProps {
  showFavoritesOnly: boolean;
  selectedDifficulties: ('easy' | 'medium' | 'hard')[];
  onToggleFavorite: () => void;
  onToggleDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onClearFilters: () => void;
  pianoTheme: PianoTheme;
}

/**
 * Filter controls for sheet search dialog
 */
export const SheetSearchFilters: React.FC<SheetSearchFiltersProps> = ({
  showFavoritesOnly,
  selectedDifficulties,
  onToggleFavorite,
  onToggleDifficulty,
  onClearFilters,
  pianoTheme,
}) => {
  const hasActiveFilters = showFavoritesOnly || selectedDifficulties.length > 0;

  return (
    <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${pianoTheme.colors.border}` }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Favorites Toggle */}
        <ToggleButton
          value="favorites"
          selected={showFavoritesOnly}
          onChange={onToggleFavorite}
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
            onClick={() => onToggleDifficulty(difficulty)}
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
            onClick={onClearFilters}
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
  );
};
