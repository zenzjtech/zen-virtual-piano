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
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { PianoTheme } from '../piano/themes';
import {
  StyledListItem,
  StyledListItemButton,
} from '../piano/popup-styled-components';
import type { MusicSheetMetadata } from '@/services/sheet-library';
import { getDifficultyColor, isFavorite } from './sheet-search-utils';
import { useAppDispatch } from '@/store/hook';
import { toggleFavorite, deleteSheet } from '@/store/reducers/music-sheet-slice';
import { useTranslation } from '@/hooks/use-translation';

interface SheetItemProps {
  sheet: MusicSheetMetadata;
  pianoTheme: PianoTheme;
  favorites: string[];
  onSelect: (sheetId: string) => void;
}

/**
 * Individual sheet list item component
 */
export const SheetItem: React.FC<SheetItemProps> = ({
  sheet,
  pianoTheme,
  favorites,
  onSelect,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('sheet');
  const isSheetFavorite = isFavorite(sheet.id, favorites);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    dispatch(toggleFavorite(sheet.id));
    return false;
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    dispatch(deleteSheet(sheet.id));
    return false;
  };

  return (
    <StyledListItem
      key={sheet.id}
      disablePadding
      pianoTheme={pianoTheme}
      sx={{ position: 'relative' }}
    >
      <StyledListItemButton
        onClick={() => onSelect(sheet.id)}
        sx={{
          py: 0,
          pr: 10, // Add padding for buttons
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
                label={t(sheet.difficulty)}
                size="small"
                color={getDifficultyColor(sheet.difficulty)}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          }
          secondary={
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: pianoTheme.colors.secondary,
                    opacity: 0.85,
                  }}
                >
                  {sheet.artist.name}
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
                    • ~{Math.ceil(sheet.durationSeconds / 60)} {t('min')} • {sheet.tempo} {t('bpm')}
                  </Typography>
                )}
              </Box>
              {/* Tags */}
              {sheet.tags.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {sheet.tags.slice(0, 3).map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        backgroundColor: `${pianoTheme.colors.accent}15`,
                        color: pianoTheme.colors.secondary,
                        borderColor: pianoTheme.colors.border,
                        border: '1px solid',
                        '& .MuiChip-label': {
                          px: 0.75,
                        },
                      }}
                    />
                  ))}
                  {sheet.tags.length > 3 && (
                    <Typography
                      variant="caption"
                      sx={{
                        alignSelf: 'center',
                        color: pianoTheme.colors.secondary,
                        fontSize: '0.6rem',
                        opacity: 0.6,
                      }}
                    >
                      +{sheet.tags.length - 3}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          }
        />
      </StyledListItemButton>
      
      {/* Manually positioned buttons */}
      <Box
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: 0.5,
          zIndex: 100,
        }}
      >
        <IconButton
          size="small"
          onClick={handleFavoriteClick}
          onMouseDown={(e) => e.stopPropagation()}
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
        <IconButton
          size="small"
          onClick={handleDeleteClick}
          onMouseDown={(e) => e.stopPropagation()}
          sx={{
            color: pianoTheme.colors.secondary,
            transition: 'all 0.2s ease',
            opacity: 0.7,
            '&:hover': {
              color: pianoTheme.isLight ? '#d32f2f' : '#ff5252',
              opacity: 1,
              backgroundColor: pianoTheme.isLight ? 'rgba(211, 47, 47, 0.08)' : 'rgba(255, 82, 82, 0.08)',
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </StyledListItem>
  );
};
