import React, { useState } from 'react';
import {
  Typography,
  Box,
  Popper,
  ClickAwayListener,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Piano as PianoIcon,
  Wallpaper as BackgroundIcon,
  LibraryMusic as MusicSheetIcon,
} from '@mui/icons-material';
import { getAllThemes, PianoTheme } from './themes';
import { BACKGROUND_THEMES } from './background-themes';
import { MUSIC_SHEET_THEMES } from './music-sheet-themes';
import {
  StyledPopupPaper,
  PopupHeaderBox,
  PopupContentBox,
} from './popup-styled-components';
import { PopupSearchBar } from './popup-search-bar';
import { ThemeSection } from './theme-section';
import { PresetSelector } from './preset-selector';
import { useThemeFilter } from '../../hooks/use-theme-filter';
import { ThemePreset } from './theme-presets';

interface StyleSettingsPopupProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  currentPianoTheme: string;
  currentBackgroundTheme: string;
  currentMusicSheetTheme: string;
  onClose: () => void;
  onPianoThemeChange: (themeId: string) => void;
  onBackgroundThemeChange: (themeId: string) => void;
  onMusicSheetThemeChange: (themeId: string) => void;
  pianoTheme: PianoTheme;
  /** Whether to show the search bar (default: true) */
  showSearch?: boolean;
  /** Whether to show preset selector (default: true) */
  showPresets?: boolean;
}


export const StyleSettingsPopup: React.FC<StyleSettingsPopupProps> = ({
  open,
  anchorEl,
  currentPianoTheme,
  currentBackgroundTheme,
  currentMusicSheetTheme,
  onClose,
  onPianoThemeChange,
  onBackgroundThemeChange,
  onMusicSheetThemeChange,
  pianoTheme,
  showSearch = true,
  showPresets = true,
}) => {
  const theme = useTheme();
  const pianoThemes = getAllThemes();
  const [searchQuery, setSearchQuery] = useState('');
  const [pianoThemeExpanded, setPianoThemeExpanded] = useState(false);
  const [backgroundThemeExpanded, setBackgroundThemeExpanded] = useState(false);
  const [musicSheetThemeExpanded, setMusicSheetThemeExpanded] = useState(false);

  // Filter themes based on search query using custom hook
  const filteredPianoThemes = useThemeFilter(pianoThemes, searchQuery);
  const filteredBackgroundThemes = useThemeFilter(BACKGROUND_THEMES, searchQuery);
  const filteredMusicSheetThemes = useThemeFilter(MUSIC_SHEET_THEMES, searchQuery);


  const showPianoThemes = filteredPianoThemes.length > 0;
  const showBackgroundThemes = filteredBackgroundThemes.length > 0;
  const showMusicSheetThemes = filteredMusicSheetThemes.length > 0;
  const showNoResults = !showPianoThemes && !showBackgroundThemes && !showMusicSheetThemes && searchQuery.trim();

  // Handle preset application
  const handlePresetApply = (preset: ThemePreset) => {
    onPianoThemeChange(preset.pianoTheme);
    onBackgroundThemeChange(preset.backgroundTheme);
    onMusicSheetThemeChange(preset.musicSheetTheme);
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{ zIndex: theme.zIndex.modal }}
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
              {/* Preset Selector */}
              {showPresets && !searchQuery.trim() && (
                <>
                  <PresetSelector
                    pianoTheme={pianoTheme}
                    currentPianoTheme={currentPianoTheme}
                    currentBackgroundTheme={currentBackgroundTheme}
                    currentMusicSheetTheme={currentMusicSheetTheme}
                    onPresetApply={handlePresetApply}
                    searchQuery={searchQuery}
                  />
                  <Divider sx={{ borderColor: pianoTheme.colors.border }} />
                </>
              )}
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
                  enableGrouping={false}
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
                  categoryOrder={['basics', 'cultural', 'gradients']}
                />
              )}

              {/* Divider between sections */}
              {(showPianoThemes || showBackgroundThemes) && showMusicSheetThemes && (
                <Divider sx={{ borderColor: pianoTheme.colors.border }} />
              )}

              {/* Music Sheet Theme Section */}
              {showMusicSheetThemes && (
                <ThemeSection
                  title="Music Sheet Theme"
                  icon={
                    <MusicSheetIcon
                      sx={{
                        color: pianoTheme.colors.secondary,
                        fontSize: '1.1rem',
                      }}
                    />
                  }
                  themes={filteredMusicSheetThemes}
                  currentTheme={currentMusicSheetTheme}
                  onThemeSelect={onMusicSheetThemeChange}
                  pianoTheme={pianoTheme}
                  type="musicsheet"
                  expanded={musicSheetThemeExpanded}
                  onToggleExpand={() => setMusicSheetThemeExpanded(!musicSheetThemeExpanded)}
                  categoryOrder={['papers']}
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
