import React from 'react';
import { List, Typography, Box, Divider } from '@mui/material';
import { PianoTheme } from '../themes';
import type { MusicSheetMetadata } from '@/services/sheet-library';
import { SheetItem } from './sheet-item';

interface SheetSectionProps {
  title: string;
  sheets: MusicSheetMetadata[];
  pianoTheme: PianoTheme;
  favorites: string[];
  onSelectSheet: (sheetId: string) => void;
  onToggleFavorite: (sheetId: string, event: React.MouseEvent) => void;
  showDivider?: boolean;
  emptyMessage?: string;
}

/**
 * Reusable section component for displaying a list of sheets
 */
export const SheetSection: React.FC<SheetSectionProps> = ({
  title,
  sheets,
  pianoTheme,
  favorites,
  onSelectSheet,
  onToggleFavorite,
  showDivider = false,
  emptyMessage,
}) => {
  if (sheets.length === 0 && !emptyMessage) {
    return null;
  }

  return (
    <>
      <Typography 
        variant="overline" 
        sx={{ 
          px: 2, 
          pt: 1,
          pb: 0.5,
          display: 'block',
          color: pianoTheme.colors.secondary,
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}
      >
        {title}
      </Typography>
      <List sx={{ py: 0 }}>
        {sheets.length > 0 ? (
          sheets.map((sheet) => (
            <SheetItem
              key={sheet.id}
              sheet={sheet}
              pianoTheme={pianoTheme}
              favorites={favorites}
              onSelect={onSelectSheet}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          emptyMessage && (
            <Box sx={{ textAlign: 'center', py: 3, px: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: pianoTheme.colors.secondary,
                  opacity: 0.7,
                }}
              >
                {emptyMessage}
              </Typography>
            </Box>
          )
        )}
      </List>
      {showDivider && <Divider sx={{ my: 1, borderColor: pianoTheme.colors.border }} />}
    </>
  );
};
