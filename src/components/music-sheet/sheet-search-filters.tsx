import React from 'react';
import { Box, Chip, ToggleButton, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Sort as SortIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';
import { PianoTheme } from '../piano/themes';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setSearchFilters } from '@/store/reducers/music-sheet-slice';
import { useTranslation } from '@/hooks/use-translation';

interface SheetSearchFiltersProps {
  showFavoritesOnly: boolean;
  selectedDifficulties: ('easy' | 'medium' | 'hard')[];
  onToggleFavorite: () => void;
  onToggleDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onClearFilters: () => void;
  onSortSelectOpen: () => void;
  onSortSelectClose: () => void;
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
  onSortSelectOpen,
  onSortSelectClose,
  pianoTheme,
}) => {
  const dispatch = useAppDispatch();
  const { t: tCommon } = useTranslation('common');
  const { t: tSheet } = useTranslation('sheet');
  const sortBy = useAppSelector((state) => state.musicSheet.searchFilters.sortBy);
  const showSort = useAppSelector((state) => state.musicSheet.searchFilters.showSort);
  
  const hasActiveFilters = showFavoritesOnly || selectedDifficulties.length > 0;
  
  const handleSortChange = (newSortBy: 'title' | 'artist' | 'difficulty' | 'recent') => {
    dispatch(setSearchFilters({ sortBy: newSortBy }));
  };
  
  const handleToggleShowSort = () => {
    dispatch(setSearchFilters({ showSort: !showSort }));
  };

  return (
    <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${pianoTheme.colors.border}` }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mb: 2, justifyContent: 'space-between' }}>
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
          {tCommon('favorites')}
        </ToggleButton>
        
        {/* Difficulty Chips */}
        {(['easy', 'medium', 'hard'] as const).map(difficulty => (
          <Chip
            key={difficulty}
            label={tSheet(difficulty)}
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
            label={tCommon('clearFilters')}
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
        
        {/* Show Sort Button - Right aligned */}
        <Button
          size="small"
          onClick={handleToggleShowSort}
          startIcon={<SortIcon />}
          endIcon={<ArrowDropDownIcon sx={{ 
            transform: showSort ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }} />}
          sx={{
            ml: 'auto',
            px: 1.5,
            py: 0.5,
            textTransform: 'none',
            fontSize: '0.75rem',
            color: showSort ? pianoTheme.colors.accent : pianoTheme.colors.secondary,
            borderColor: pianoTheme.colors.border,
            border: '1px solid',
            '&:hover': {
              backgroundColor: `${pianoTheme.colors.accent}22`,
              borderColor: pianoTheme.colors.accent,
            },
          }}
        >
          {tCommon('sort')}
        </Button>
      </Box>
      
      {/* Sort Selector - Conditionally shown */}
      {showSort && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <FormControl 
          size="small" 
          sx={{ 
            minWidth: 140,
            '& .MuiOutlinedInput-root': {
              fontSize: '0.75rem',
              color: pianoTheme.colors.primary,
              backgroundColor: 'transparent',
              '& fieldset': {
                borderColor: pianoTheme.colors.border,
              },
              '&:hover fieldset': {
                borderColor: pianoTheme.colors.accent,
              },
              '&.Mui-focused fieldset': {
                borderColor: pianoTheme.colors.accent,
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.75rem',
              color: pianoTheme.colors.secondary,
              '&.Mui-focused': {
                color: pianoTheme.colors.accent,
              },
            },
            '& .MuiSelect-icon': {
              color: pianoTheme.colors.secondary,
            },
          }}
        >
          <InputLabel id="sort-by-label">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SortIcon sx={{ fontSize: '0.875rem' }} />
              {tSheet('sortBy')}
            </Box>
          </InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as any)}
            onOpen={onSortSelectOpen}
            onClose={onSortSelectClose}
            label={tSheet('sortBy')}
            MenuProps={{
              slotProps: {
                paper: {
                  sx: {
                    backgroundColor: pianoTheme.colors.containerSolid,
                    color: pianoTheme.colors.primary,
                    '& .MuiMenuItem-root': {
                      fontSize: '0.75rem',
                      '&:hover': {
                        backgroundColor: `${pianoTheme.colors.accent}22`,
                      },
                      '&.Mui-selected': {
                        backgroundColor: `${pianoTheme.colors.accent}33`,
                        '&:hover': {
                          backgroundColor: `${pianoTheme.colors.accent}44`,
                        },
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="title">{tSheet('titleAZ')}</MenuItem>
            <MenuItem value="artist">{tSheet('artistAZ')}</MenuItem>
            <MenuItem value="difficulty">{tSheet('difficulty')}</MenuItem>
            <MenuItem value="recent">{tSheet('recentlyAdded')}</MenuItem>
          </Select>
        </FormControl>
        </Box>
      )}
    </Box>
  );
};
