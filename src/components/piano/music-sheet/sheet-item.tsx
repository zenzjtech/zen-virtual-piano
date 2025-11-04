import React from 'react';
import {
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  MusicNote as MusicNoteIcon,
} from '@mui/icons-material';
import { PianoTheme } from '../themes';
import {
  StyledListItem,
  StyledListItemButton,
} from '../popup-styled-components';
import type { MusicSheet } from './types';
import { getDifficultyColor, isFavorite } from './sheet-search-utils';

interface SheetItemProps {
  sheet: MusicSheet;
  pianoTheme: PianoTheme;
  favorites: string[];
  onSelect: (sheetId: string) => void;
  onToggleFavorite: (sheetId: string, event: React.MouseEvent) => void;
}

/**
 * Individual sheet list item component
 */
export const SheetItem: React.FC<SheetItemProps> = ({
  sheet,
  pianoTheme,
  favorites,
  onSelect,
  onToggleFavorite,
}) => {
  const isSheetFavorite = isFavorite(sheet.id, favorites);

  return (
    <StyledListItem
      key={sheet.id}
      disablePadding
      pianoTheme={pianoTheme}
      secondaryAction={
        <IconButton
          edge="end"
          size="small"
          onClick={(e) => onToggleFavorite(sheet.id, e)}
          sx={{
            color: isSheetFavorite ? pianoTheme.colors.accent : pianoTheme.colors.secondary,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: pianoTheme.colors.accent,
            },
          }}
        >
          {isSheetFavorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      }
    >
      <StyledListItemButton
        onClick={() => onSelect(sheet.id)}
        sx={{
          py: 0
        }}
        pianoTheme={pianoTheme}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <MusicNoteIcon sx={{ color: pianoTheme.colors.accent }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: pianoTheme.colors.primary,
                  letterSpacing: '0.3px',
                }}
              >
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
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, mt: 0.5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: pianoTheme.colors.secondary,
                  opacity: 0.85,
                }}
              >
                {sheet.artist + ' | '}
              </Typography>
              {sheet.durationSeconds && (
                <Typography
                  variant="caption"
                  sx={{
                    color: pianoTheme.colors.secondary,
                    opacity: 0.6,
                    fontSize: '0.7rem',
                  }}
                >
                  ~{Math.ceil(sheet.durationSeconds / 60)} min • {sheet.tempo} BPM
                </Typography>
              )}
            </Box>
          }
        />
      </StyledListItemButton>
    </StyledListItem>
  );
};
