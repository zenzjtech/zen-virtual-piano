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
import { BackgroundTheme, BACKGROUND_THEME_CATEGORIES } from './background-themes';
import { ThemeListItem } from './theme-list-item';
import { useThemeGroups } from '../../hooks/use-theme-groups';
import { CategoryHeader } from './category-header';

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
  /** Enable category grouping (default: true) */
  enableGrouping?: boolean;
  /** Optional category order for grouping */
  categoryOrder?: string[];
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
  enableGrouping = true,
  categoryOrder,
}) => {
  // Group themes by category if enabled
  const themeGroups = useThemeGroups<PianoTheme | BackgroundTheme>(themes, categoryOrder);
  const shouldGroup = enableGrouping && themeGroups.length > 1;

  // Get category metadata for background themes
  const getCategoryInfo = (category: string) => {
    if (type === 'background' && category in BACKGROUND_THEME_CATEGORIES) {
      return BACKGROUND_THEME_CATEGORIES[category as keyof typeof BACKGROUND_THEME_CATEGORIES];
    }
    return undefined;
  };
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
          {shouldGroup ? (
            // Render grouped themes with category headers
            themeGroups.map((group, groupIndex) => (
              <React.Fragment key={group.category}>
                <CategoryHeader
                  category={group.category}
                  categoryInfo={getCategoryInfo(group.category)}
                  pianoTheme={pianoTheme}
                  index={groupIndex}
                />
                {group.themes.map((theme, themeIndex) => (
                  <ThemeListItem
                    key={theme.id}
                    theme={theme}
                    isSelected={theme.id === currentTheme}
                    onSelect={onThemeSelect}
                    pianoTheme={pianoTheme}
                    type={type}
                    index={themeIndex}
                  />
                ))}
              </React.Fragment>
            ))
          ) : (
            // Render themes without grouping
            themes.map((theme, index) => (
              <ThemeListItem
                key={theme.id}
                theme={theme}
                isSelected={theme.id === currentTheme}
                onSelect={onThemeSelect}
                pianoTheme={pianoTheme}
                type={type}
                index={index}
              />
            ))
          )}
        </List>
      </Collapse>
    </Box>
  );
};
