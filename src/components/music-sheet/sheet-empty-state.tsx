import React from 'react';
import { Box, Typography } from '@mui/material';
import { MusicNote as MusicNoteIcon } from '@mui/icons-material';
import { PianoTheme } from '../piano/themes';

interface SheetEmptyStateProps {
  pianoTheme: PianoTheme;
}

/**
 * Empty state component for when no sheets are available
 */
export const SheetEmptyState: React.FC<SheetEmptyStateProps> = ({ pianoTheme }) => {
  return (
    <Box sx={{ 
      textAlign: 'center', 
      py: 6,
      px: 3,
    }}>
      <MusicNoteIcon
        sx={{
          fontSize: 64,
          color: pianoTheme.colors.secondary,
          opacity: 0.3,
          mb: 2,
        }}
      />
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          color: pianoTheme.colors.secondary,
          fontWeight: 500,
        }}
      >
        No sheets available yet
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: pianoTheme.colors.secondary,
          opacity: 0.6,
        }}
      >
        The sheet library is being loaded...
      </Typography>
    </Box>
  );
};
