/**
 * Branded header component for the download UI
 */

import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import icon from '@/assets/image/Icon.png';

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
      <IconButton>
        <img src={icon} alt="icon" style={{ width: 20, height: 20 }} />
      </IconButton>
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
