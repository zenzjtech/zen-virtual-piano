import React from 'react';
import {
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { PianoTheme } from './themes';
import { BackgroundTheme } from './background-themes';
import {
  StyledListItem,
  StyledListItemButton,
} from './popup-styled-components';

interface ThemeListItemProps {
  theme: PianoTheme | BackgroundTheme;
  isSelected: boolean;
  onSelect: (themeId: string) => void;
  pianoTheme: PianoTheme;
  type: 'piano' | 'background';
}

export const ThemeListItem: React.FC<ThemeListItemProps> = ({
  theme,
  isSelected,
  onSelect,
  pianoTheme,
  type,
}) => {
  const getPreviewBox = () => {
    if (type === 'piano') {
      const pianoThemeItem = theme as PianoTheme;
      return (
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: pianoThemeItem.container.background,
            border: `2px solid ${pianoThemeItem.container.border}`,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '.MuiListItemButton-root:hover &': {
              transform: 'scale(1.3) rotate(180deg)',
              boxShadow: `
                0 0 12px ${pianoThemeItem.colors.accent}88,
                0 2px 8px rgba(0, 0, 0, 0.4)
              `,
            },
          }}
        />
      );
    } else {
      const backgroundThemeItem = theme as BackgroundTheme;
      return (
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '4px',
            background: backgroundThemeItem.gradient || backgroundThemeItem.color,
            border: `2px solid ${pianoTheme.colors.border}`,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '.MuiListItemButton-root:hover &': {
              transform: 'scale(1.4) rotate(5deg)',
              borderRadius: '8px',
              boxShadow: `
                0 0 16px ${backgroundThemeItem.color}88,
                0 4px 12px rgba(0, 0, 0, 0.4)
              `,
            },
          }}
        />
      );
    }
  };

  return (
    <StyledListItem disablePadding pianoTheme={pianoTheme}>
      <StyledListItemButton
        selected={isSelected}
        isSelected={isSelected}
        onClick={() => onSelect(theme.id)}
        pianoTheme={pianoTheme}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {isSelected ? (
            <CheckCircleIcon
              sx={{
                color: pianoTheme.colors.accent,
                fontSize: '1.25rem',
                filter: `drop-shadow(0 0 4px ${pianoTheme.colors.accent}66)`,
                transition: 'all 0.3s ease',
                '.MuiListItemButton-root:hover &': {
                  transform: 'scale(1.15)',
                  filter: `drop-shadow(0 0 8px ${pianoTheme.colors.accent}99)`,
                },
              }}
            />
          ) : (
            getPreviewBox()
          )}
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography
              variant="body1"
              fontWeight={isSelected ? 600 : 500}
              sx={{
                color: pianoTheme.colors.primary,
                textShadow: `0 1px 1px rgba(0, 0, 0, 0.2)`,
                letterSpacing: '0.3px',
                transition: 'all 0.2s ease',
                '.MuiListItemButton-root:hover &': {
                  letterSpacing: '0.5px',
                  color: pianoTheme.colors.accent,
                },
              }}
            >
              {theme.name}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.75rem',
                color: pianoTheme.colors.secondary,
                opacity: 0.85,
                transition: 'opacity 0.2s ease',
                '.MuiListItemButton-root:hover &': {
                  opacity: 1,
                },
              }}
            >
              {theme.description}
            </Typography>
          }
        />
      </StyledListItemButton>
    </StyledListItem>
  );
};
