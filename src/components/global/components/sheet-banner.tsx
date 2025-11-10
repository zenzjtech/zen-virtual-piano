/**
 * Sheet Banner Component
 *
 * Displays sheet title and artist when a sheet is detected from virtualpiano.net
 */

import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Person } from '@mui/icons-material';

interface SheetBannerProps {
  title: string;
  artist: string;
}

/**
 * Banner component showing detected sheet information
 */
export const SheetBanner: React.FC<SheetBannerProps> = ({ title, artist }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: '100%',
        maxWidth: '280px',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
          fontSize: '1.1rem',
          lineHeight: 1.2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {title}
      </Typography>

      <Chip
        icon={<Person sx={{ fontSize: '1rem' }} />}
        label={artist}
        size="small"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          '& .MuiChip-icon': {
            color: 'white',
          },
        }}
      />
    </Box>
  );
};
