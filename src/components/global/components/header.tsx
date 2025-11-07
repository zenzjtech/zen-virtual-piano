/**
 * Branded header component for the download UI
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { MusicNote } from '@mui/icons-material';

export const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 0.5,
      }}
    >
      <MusicNote
        sx={{
          color: 'secondary.main',
          fontSize: 20,
        }}
      />
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          letterSpacing: '0.01em',
        }}
      >
        Zen Virtual Piano
      </Typography>
    </Box>
  );
};
