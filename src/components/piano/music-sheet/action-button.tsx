import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { PianoTheme } from '../themes';
import { MusicSheetThemeColors } from './music-sheet-theme-colors';

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  isActive?: boolean;
  pianoTheme?: PianoTheme;
  customColors?: MusicSheetThemeColors;
  ariaLabel?: string;
  tooltip?: string;
}

/**
 * Reusable action button for music sheet controls
 * Can use either piano theme or custom music sheet theme colors
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  isActive = false,
  pianoTheme,
  customColors,
  ariaLabel,
  tooltip,
}) => {
  // Use custom colors if provided, otherwise fall back to piano theme
  const colors = customColors || {
    primary: pianoTheme?.colors.primary || '#000',
    accent: pianoTheme?.colors.accent || '#666',
    background: pianoTheme?.colors.containerSolid || 'rgba(255,255,255,0.8)',
    border: pianoTheme?.colors.border || 'rgba(0,0,0,0.2)',
    shadow: '102, 102, 102', // Default shadow RGB
  };

  const button = (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        transform: 'scale(0.8)',
        backgroundColor: colors.background,
        color: isActive ? colors.accent : colors.primary,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: `rgba(${colors.shadow}, 0.2)`,
          color: colors.accent,
          borderColor: colors.accent,
          boxShadow: `0 0 12px rgba(${colors.shadow}, 0.4)`,
        },
      }}
      size="small"
    >
      {icon}
    </IconButton>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement="top" arrow>
        <span>{button}</span>
      </Tooltip>
    );
  }

  return button;
};
