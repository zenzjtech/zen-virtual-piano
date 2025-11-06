import React from 'react';
import { IconButton } from '@mui/material';
import { PianoTheme } from '../themes';

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  isActive?: boolean;
  pianoTheme: PianoTheme;
  ariaLabel?: string;
}

/**
 * Reusable action button for music sheet controls
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  isActive = false,
  pianoTheme,
  ariaLabel,
}) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        transform: 'scale(0.8)',
        backgroundColor: pianoTheme.colors.containerSolid,
        color: isActive ? pianoTheme.colors.accent : pianoTheme.colors.primary,
        border: `1px solid ${pianoTheme.colors.border}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: `${pianoTheme.colors.accent}33`,
          color: pianoTheme.colors.accent,
          borderColor: pianoTheme.colors.accent,
          boxShadow: `0 0 12px ${pianoTheme.colors.accent}66`,
        },
      }}
      size="small"
    >
      {icon}
    </IconButton>
  );
};
