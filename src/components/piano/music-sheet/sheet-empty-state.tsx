import React from 'react';
import { Box, Typography } from '@mui/material';
import { MusicNote as MusicNoteIcon } from '@mui/icons-material';

/**
 * Empty state component for when no sheets are available
 */
export const SheetEmptyState: React.FC = () => {
  return (
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
  );
};
