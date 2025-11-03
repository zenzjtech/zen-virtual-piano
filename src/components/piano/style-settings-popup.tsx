import React, { useState, useMemo } from 'react';
import {
  Typography,
  Box,
  Popper,
  ClickAwayListener,
  Divider,
  Stack,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Piano as PianoIcon,
  Wallpaper as BackgroundIcon,
} from '@mui/icons-material';
import { getAllThemes, PianoTheme } from './themes';
import { BACKGROUND_THEMES } from './background-themes';
import {
  StyledPopupPaper,
  PopupHeaderBox,
  PopupContentBox,
} from './popup-styled-components';
import { PopupSearchBar } from './popup-search-bar';
import { ThemeSection } from './theme-section';

interface StyleSettingsPopupProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  currentPianoTheme: string;
  currentBackgroundTheme: string;
  onClose: () => void;
  onPianoThemeChange: (themeId: string) => void;
  onBackgroundThemeChange: (themeId: string) => void;
  pianoTheme: PianoTheme;
  /** Whether to show the search bar (default: true) */
  showSearch?: boolean;
}


export const StyleSettingsPopup: React.FC<StyleSettingsPopupProps> = ({
  open,
  anchorEl,
  currentPianoTheme,
  currentBackgroundTheme,
  onClose,
  onPianoThemeChange,
  onBackgroundThemeChange,
  pianoTheme,
  showSearch = true,
}) => {
  const pianoThemes = getAllThemes();
  const [searchQuery, setSearchQuery] = useState('');
  const [pianoThemeExpanded, setPianoThemeExpanded] = useState(false);
  const [backgroundThemeExpanded, setBackgroundThemeExpanded] = useState(false);

  // Filter themes based on search query
  const filteredPianoThemes = useMemo(() => {
    if (!searchQuery.trim()) {
      return pianoThemes;
    }
    
    const query = searchQuery.toLowerCase();
    return pianoThemes.filter(theme => 
      theme.name.toLowerCase().includes(query) ||
      theme.description.toLowerCase().includes(query)
    );
  }, [pianoThemes, searchQuery]);

  const filteredBackgroundThemes = useMemo(() => {
    if (!searchQuery.trim()) {
      return BACKGROUND_THEMES;
    }
    
    const query = searchQuery.toLowerCase();
    return BACKGROUND_THEMES.filter(theme => 
      theme.name.toLowerCase().includes(query) ||
      theme.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);


  const showPianoThemes = filteredPianoThemes.length > 0;
  const showBackgroundThemes = filteredBackgroundThemes.length > 0;
  const showNoResults = !showPianoThemes && !showBackgroundThemes && searchQuery.trim();

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{ zIndex: 1300 }}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            fallbackPlacements: ['top-start', 'bottom-start'],
          },
        },
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            padding: 8,
          },
        },
      ]}
    >
      <ClickAwayListener onClickAway={onClose}>
        <StyledPopupPaper elevation={8} pianoTheme={pianoTheme}>
          <PopupHeaderBox pianoTheme={pianoTheme}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PaletteIcon
                sx={{
                  color: pianoTheme.colors.accent,
                  fontSize: '1.5rem',
                  filter: `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))`,
                }}
              />
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{
                  color: pianoTheme.colors.primary,
                  textShadow: `
                    0 1px 2px rgba(0, 0, 0, 0.3),
                    0 -1px 0 rgba(255, 255, 255, ${pianoTheme.isLight ? 0.1 : 0.05})
                  `,
                  letterSpacing: '0.5px',
                }}
              >
                Style Settings
              </Typography>
            </Box>
          </PopupHeaderBox>
          
          {/* Search Box */}
          {showSearch && (
            <PopupSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search styles..."
              pianoTheme={pianoTheme}
              isOpen={open}
            />
          )}
          
          <PopupContentBox pianoTheme={pianoTheme}>
            <Stack spacing={3}>
              {/* Piano Theme Section */}
              {showPianoThemes && (
                <ThemeSection
                  title="Piano Theme"
                  icon={
                    <PianoIcon
                      sx={{
                        color: pianoTheme.colors.secondary,
                        fontSize: '1.1rem',
                      }}
                    />
                  }
                  themes={filteredPianoThemes}
                  currentTheme={currentPianoTheme}
                  onThemeSelect={onPianoThemeChange}
                  pianoTheme={pianoTheme}
                  type="piano"
                  expanded={pianoThemeExpanded}
                  onToggleExpand={() => setPianoThemeExpanded(!pianoThemeExpanded)}
                />
              )}

              {/* Divider between sections */}
              {showPianoThemes && showBackgroundThemes && (
                <Divider sx={{ borderColor: pianoTheme.colors.border }} />
              )}

              {/* Background Theme Section */}
              {showBackgroundThemes && (
                <ThemeSection
                  title="Background Theme"
                  icon={
                    <BackgroundIcon
                      sx={{
                        color: pianoTheme.colors.secondary,
                        fontSize: '1.1rem',
                      }}
                    />
                  }
                  themes={filteredBackgroundThemes}
                  currentTheme={currentBackgroundTheme}
                  onThemeSelect={onBackgroundThemeChange}
                  pianoTheme={pianoTheme}
                  type="background"
                  expanded={backgroundThemeExpanded}
                  onToggleExpand={() => setBackgroundThemeExpanded(!backgroundThemeExpanded)}
                />
              )}

              {/* No results message */}
              {showNoResults && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: pianoTheme.colors.secondary,
                      opacity: 0.7,
                    }}
                  >
                    No styles found matching "{searchQuery}"
                  </Typography>
                </Box>
              )}
            </Stack>
          </PopupContentBox>
        </StyledPopupPaper>
      </ClickAwayListener>
    </Popper>
  );
};
