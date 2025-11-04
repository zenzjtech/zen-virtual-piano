import React from 'react';
import { List, Typography, Box, Divider } from '@mui/material';
import { PianoTheme } from '../themes';
import type { MusicSheet } from './types';
import { SheetItem } from './sheet-item';

interface SheetSectionProps {
  title: string;
  sheets: MusicSheet[];
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
          color: 'text.secondary',
          fontWeight: 600,
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
              <Typography variant="body2" color="text.secondary">
                {emptyMessage}
              </Typography>
            </Box>
          )
        )}
      </List>
      {showDivider && <Divider sx={{ my: 1 }} />}
    </>
  );
};
