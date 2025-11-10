/**
 * Sheet Banner Component
 *
 * Displays sheet title and artist when a sheet is detected from virtualpiano.net
 */

import React from 'react';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import { Person } from '@mui/icons-material';
import { isDarkBackgroundTheme } from '@/theme/definitions/background-themes';

interface SheetBannerProps {
  title: string;
  artist: string;
  backgroundThemeId?: string;
}

/**
 * Banner component showing detected sheet information
 */
export const SheetBanner: React.FC<SheetBannerProps> = ({ title, artist, backgroundThemeId }) => {
  const theme = useTheme();
  const isDark = backgroundThemeId ? isDarkBackgroundTheme(backgroundThemeId) : false;
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: 2,
        backgroundColor: isDark 
          ? 'rgba(255, 255, 255, 0.1)' 
          : theme.palette.grey[50], // Light grey background for subtle separation
        borderRadius: 2,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : theme.palette.grey[200]}`,
        width: '100%',
        maxWidth: '280px',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: isDark ? '#ffffff' : theme.palette.text.primary, // White text for dark backgrounds, dark grey for light
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
          backgroundColor: isDark ? theme.palette.primary.light : theme.palette.primary.main, // Lighter green for dark backgrounds
          color: isDark ? theme.palette.primary.contrastText : theme.palette.primary.contrastText, // White text in both modes
          border: `1px solid ${isDark ? theme.palette.primary.main : theme.palette.primary.dark}`, // Adjusted border for contrast
          '& .MuiChip-icon': {
            color: theme.palette.primary.contrastText,
          },
        }}
      />
    </Box>
  );
};
