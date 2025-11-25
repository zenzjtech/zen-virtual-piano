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
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setPianoTheme, setBackgroundTheme, setMusicSheetTheme, setPatternTheme } from '@/store/reducers/theme-slice';
import {
  Palette as PaletteIcon,
  Piano as PianoIcon,
  Wallpaper as BackgroundIcon,
  LibraryMusic as MusicSheetIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { getAllThemes, getTheme } from './themes';
import {
  StyledPopupPaper,
  PopupHeaderBox,
  PopupContentBox,
} from './popup-styled-components';
import { PopupSearchBar } from './popup-search-bar';
import { ThemeSection } from './theme-section';
import { PresetSelector } from './preset-selector';
import { useThemeFilter } from '../../hooks/use-theme-filter';
import { useTranslation } from '@/hooks/use-translation';
import { ThemePreset, THEME_PRESETS } from './theme-presets';
import { BACKGROUND_THEMES } from '@/theme/definitions/background-themes';
import { MUSIC_SHEET_THEMES } from '@/theme/definitions/music-sheet-themes';

interface StyleSettingsPopupProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  /** Whether to show the search bar (default: true) */
  showSearch?: boolean;
  /** Whether to show preset selector (default: true) */
  showPresets?: boolean;
  /** Callback to open global settings dialog */
  onOpenSettings?: () => void;
}


export const StyleSettingsPopup: React.FC<StyleSettingsPopupProps> = ({
  open,
  anchorEl,
  onClose,
  showSearch = true,
  showPresets = true,
  onOpenSettings,
}) => {
  const dispatch = useAppDispatch();
  
  // Get current theme state from Redux
  const currentPianoTheme = useAppSelector((state) => state.theme.pianoTheme);
  const currentBackgroundTheme = useAppSelector((state) => state.theme.backgroundTheme);
  const currentMusicSheetTheme = useAppSelector((state) => state.theme.musicSheetTheme);
  const pianoTheme = getTheme(currentPianoTheme);
  
  const theme = useTheme();
  const pianoThemes = getAllThemes();
  const [searchQuery, setSearchQuery] = useState('');
  const [pianoThemeExpanded, setPianoThemeExpanded] = useState(false);
  const [backgroundThemeExpanded, setBackgroundThemeExpanded] = useState(false);
  const [musicSheetThemeExpanded, setMusicSheetThemeExpanded] = useState(false);

  const { t } = useTranslation('piano');

  // Filter themes based on search query using custom hook
  const filteredPianoThemes = useThemeFilter(pianoThemes, searchQuery);
  const filteredBackgroundThemes = useThemeFilter(BACKGROUND_THEMES, searchQuery);
  const filteredMusicSheetThemes = useThemeFilter(MUSIC_SHEET_THEMES, searchQuery);
  
  // Filter presets based on search query
  const filteredPresets = searchQuery.trim()
    ? THEME_PRESETS.filter(
        preset =>
          preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          preset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          preset.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : THEME_PRESETS;


  const showPianoThemes = filteredPianoThemes.length > 0;
  const showBackgroundThemes = filteredBackgroundThemes.length > 0;
  const showMusicSheetThemes = filteredMusicSheetThemes.length > 0;
  const showPresetsSection = showPresets && filteredPresets.length > 0;
  const showNoResults = !showPianoThemes && !showBackgroundThemes && !showMusicSheetThemes && !showPresetsSection && searchQuery.trim();

  // Handle theme changes - dispatch directly to Redux
  const handlePianoThemeChange = (themeId: string) => {
    dispatch(setPianoTheme(themeId));
  };

  const handleBackgroundThemeChange = (themeId: string) => {
    dispatch(setBackgroundTheme(themeId));
  };

  const handleMusicSheetThemeChange = (themeId: string) => {
    dispatch(setMusicSheetTheme(themeId));
  };

  // Handle preset application - dispatch directly to Redux
  const handlePresetApply = (preset: ThemePreset) => {
    dispatch(setPianoTheme(preset.pianoTheme));
    dispatch(setBackgroundTheme(preset.backgroundTheme));
    dispatch(setMusicSheetTheme(preset.musicSheetTheme));
    dispatch(setPatternTheme(preset.patternTheme || 'none'));
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="top-start"
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
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
                  {t('styleSettings')}
                </Typography>
              </Box>
              
              {/* Settings Button */}
              {onOpenSettings && (
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSettings();
                  }}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    backgroundColor: pianoTheme.isLight
                      ? 'rgba(0, 0, 0, 0.05)'
                      : 'rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: pianoTheme.isLight
                        ? 'rgba(0, 0, 0, 0.1)'
                        : 'rgba(255, 255, 255, 0.15)',
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                  }}
                >
                  <SettingsIcon
                    sx={{
                      fontSize: '1.1rem',
                      color: pianoTheme.colors.primary,
                      filter: `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))`,
                    }}
                  />
                </Box>
              )}
            </Box>
          </PopupHeaderBox>
          
          {/* Search Box */}
          {showSearch && (
            <PopupSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('searchStyles')}
              pianoTheme={pianoTheme}
              isOpen={open}
            />
          )}
          
          <PopupContentBox pianoTheme={pianoTheme}>
            <Stack spacing={3}>
              {/* Preset Selector */}
              {showPresetsSection && (
                <>
                  <PresetSelector
                    pianoTheme={pianoTheme}
                    currentPianoTheme={currentPianoTheme}
                    currentBackgroundTheme={currentBackgroundTheme}
                    currentMusicSheetTheme={currentMusicSheetTheme}
                    onPresetApply={handlePresetApply}
                    searchQuery={searchQuery}
                  />
                  {(showPianoThemes || showBackgroundThemes || showMusicSheetThemes) && (
                    <Divider sx={{ borderColor: pianoTheme.colors.border }} />
                  )}
                </>
              )}
              {/* Piano Theme Section */}
              {showPianoThemes && (
                <ThemeSection
                  title={t('pianoTheme')}
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
                  onThemeSelect={handlePianoThemeChange}
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
                  title={t('backgroundTheme')}
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
                  onThemeSelect={handleBackgroundThemeChange}
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
                  title={t('musicSheetTheme')}
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
                  onThemeSelect={handleMusicSheetThemeChange}
                  pianoTheme={pianoTheme}
                  type="musicSheet"
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
                    {t('noStylesFound', { searchQuery })}
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
