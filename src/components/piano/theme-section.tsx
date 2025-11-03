import React from 'react';
import {
  List,
  Typography,
  Box,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { PianoTheme } from './themes';
import { BackgroundTheme } from './background-themes';
import { ThemeListItem } from './theme-list-item';

interface ThemeSectionProps {
  title: string;
  icon: React.ReactNode;
  themes: (PianoTheme | BackgroundTheme)[];
  currentTheme: string;
  onThemeSelect: (themeId: string) => void;
  pianoTheme: PianoTheme;
  type: 'piano' | 'background';
  expanded: boolean;
  onToggleExpand: () => void;
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({
  title,
  icon,
  themes,
  currentTheme,
  onThemeSelect,
  pianoTheme,
  type,
  expanded,
  onToggleExpand,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: expanded ? 1.5 : 0,
          cursor: 'pointer',
          padding: '8px',
          margin: '-8px',
          borderRadius: '6px',
          transition: 'background 0.2s ease',
          '&:hover': {
            background: pianoTheme.isLight
              ? 'rgba(0,0,0,0.03)'
              : 'rgba(255,255,255,0.05)',
          },
        }}
        onClick={onToggleExpand}
      >
        {icon}
        <Typography
          variant="subtitle1"
          fontWeight="600"
          sx={{
            color: pianoTheme.colors.primary,
            letterSpacing: '0.3px',
            flex: 1,
          }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            color: pianoTheme.colors.secondary,
          }}
        >
          <ExpandMoreIcon fontSize="small" />
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout={300}>
        <List sx={{ py: 0 }}>
          {themes.map((theme) => (
            <ThemeListItem
              key={theme.id}
              theme={theme}
              isSelected={theme.id === currentTheme}
              onSelect={onThemeSelect}
              pianoTheme={pianoTheme}
              type={type}
            />
          ))}
        </List>
      </Collapse>
    </Box>
  );
};
