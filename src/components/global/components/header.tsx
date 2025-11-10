/**
 * Branded header component for the download UI
 */

import React from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import { useAppSelector } from '@/store/hook';
import { getPianoIcon, getTextColor } from '@/components/header/header-utils';
import { getChipStyle } from '@/components/header/header-chip-styles';
import { getHeaderTypographyStyle, getCategoryDefaultStyle } from '@/components/header/header-typography';
import { isDarkBackgroundTheme } from '@/theme/definitions/background-themes';
import { THEME_PRESETS } from '@/components/piano/theme-presets';
import type { HeaderTypographyStyle } from '@/components/header/header-typography';

export const Header: React.FC = () => {
  // Get theme state from redux
  const pianoThemeId = useAppSelector((state) => state.theme.pianoTheme);
  const backgroundThemeId = useAppSelector((state) => state.theme.backgroundTheme);
  const musicSheetThemeId = useAppSelector((state) => state.theme.musicSheetTheme);

  // Determine if background is dark
  const isDarkBackground = isDarkBackgroundTheme(backgroundThemeId);

  // Find current preset to get header style
  const currentPreset = THEME_PRESETS.find(
    (preset) =>
      preset.pianoTheme === pianoThemeId &&
      preset.backgroundTheme === backgroundThemeId &&
      preset.musicSheetTheme === musicSheetThemeId
  );

  // Get appropriate styling
  const pianoIcon = getPianoIcon(backgroundThemeId, isDarkBackground);
  const textColor = getTextColor(isDarkBackground);

  // Use provided headerStyle, or fall back to category default, or use modern-sans
  const finalStyle = currentPreset?.headerStyle ||
    (currentPreset?.category ? getCategoryDefaultStyle(currentPreset.category) : 'modern-sans');
  const titleStyles = getHeaderTypographyStyle(finalStyle, textColor);
  const chipStyle = getChipStyle(backgroundThemeId, isDarkBackground);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        mb: 0,
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
        '&:hover': {
          opacity: 0.8,
        },
        '&:active': {
          opacity: 0.6,
        },
      }}
    >
      <IconButton>
        <Box
          component="img"
          src={pianoIcon}
          alt="Piano Icon"
          sx={{
            width: 18,
            height: 18,
            objectFit: 'contain',
          }}
        />
      </IconButton>
      <Typography
        variant="subtitle2"
        sx={{
          ...titleStyles,
          fontSize: '1rem',
          fontWeight: 600,
          letterSpacing: '0.01em',
          transition: 'all 0.3s ease',
        }}
      >
        Zen Virtual Piano
      </Typography>
      <Chip label="Beta" size="small" sx={chipStyle} />
    </Box>
  );
};
