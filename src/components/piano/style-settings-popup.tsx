import React, { useState, useMemo } from 'react';
import {
  List,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Popper,
  ClickAwayListener,
  Divider,
  Stack,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Palette as PaletteIcon,
  Piano as PianoIcon,
  Wallpaper as BackgroundIcon,
} from '@mui/icons-material';
import { getAllThemes, PianoTheme } from './themes';
import {
  StyledPopupPaper,
  PopupHeaderBox,
  StyledListItem,
  StyledListItemButton,
  PopupContentBox,
} from './popup-styled-components';
import { PopupSearchBar } from './popup-search-bar';

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

// Background theme options
interface BackgroundTheme {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient?: string;
}

const BACKGROUND_THEMES: BackgroundTheme[] = [
  {
    id: 'white',
    name: 'Pure White',
    description: 'Clean white background',
    color: '#FFFFFF',
  },
  {
    id: 'light-gray',
    name: 'Light Gray',
    description: 'Soft light gray background',
    color: '#F5F5F5',
  },
  {
    id: 'warm',
    name: 'Warm Beige',
    description: 'Warm beige tone',
    color: '#FFF8F0',
  },
  {
    id: 'cool',
    name: 'Cool Blue',
    description: 'Cool blue-gray tone',
    color: '#F0F4F8',
  },
  {
    id: 'dark',
    name: 'Dark Gray',
    description: 'Dark charcoal background',
    color: '#2C2C2C',
  },
  {
    id: 'gradient-sunset',
    name: 'Sunset Gradient',
    description: 'Warm sunset gradient',
    color: '#FF9A8B',
    gradient: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
  },
  {
    id: 'gradient-ocean',
    name: 'Ocean Gradient',
    description: 'Cool ocean gradient',
    color: '#667EEA',
    gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
  },
  {
    id: 'gradient-forest',
    name: 'Forest Gradient',
    description: 'Natural forest gradient',
    color: '#56AB2F',
    gradient: 'linear-gradient(135deg, #56AB2F 0%, #A8E063 100%)',
  },
];

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

  const handlePianoThemeSelect = (themeId: string) => {
    onPianoThemeChange(themeId);
  };

  const handleBackgroundThemeSelect = (themeId: string) => {
    onBackgroundThemeChange(themeId);
  };

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
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <PianoIcon
                      sx={{
                        color: pianoTheme.colors.secondary,
                        fontSize: '1.1rem',
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      sx={{
                        color: pianoTheme.colors.primary,
                        letterSpacing: '0.3px',
                      }}
                    >
                      Piano Theme
                    </Typography>
                  </Box>
                  <List sx={{ py: 0 }}>
                    {filteredPianoThemes.map((theme: PianoTheme) => {
                      const isSelected = theme.id === currentPianoTheme;
                      
                      return (
                        <StyledListItem key={theme.id} disablePadding pianoTheme={pianoTheme}>
                          <StyledListItemButton
                            selected={isSelected}
                            isSelected={isSelected}
                            onClick={() => handlePianoThemeSelect(theme.id)}
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
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    background: theme.container.background,
                                    border: `2px solid ${theme.container.border}`,
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '.MuiListItemButton-root:hover &': {
                                      transform: 'scale(1.3) rotate(180deg)',
                                      boxShadow: `
                                        0 0 12px ${theme.colors.accent}88,
                                        0 2px 8px rgba(0, 0, 0, 0.4)
                                      `,
                                    },
                                  }}
                                />
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
                    })}
                  </List>
                </Box>
              )}

              {/* Divider between sections */}
              {showPianoThemes && showBackgroundThemes && (
                <Divider sx={{ borderColor: pianoTheme.colors.border }} />
              )}

              {/* Background Theme Section */}
              {showBackgroundThemes && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <BackgroundIcon
                      sx={{
                        color: pianoTheme.colors.secondary,
                        fontSize: '1.1rem',
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      sx={{
                        color: pianoTheme.colors.primary,
                        letterSpacing: '0.3px',
                      }}
                    >
                      Background Theme
                    </Typography>
                  </Box>
                  <List sx={{ py: 0 }}>
                    {filteredBackgroundThemes.map((theme: BackgroundTheme) => {
                      const isSelected = theme.id === currentBackgroundTheme;
                      
                      return (
                        <StyledListItem key={theme.id} disablePadding pianoTheme={pianoTheme}>
                          <StyledListItemButton
                            selected={isSelected}
                            isSelected={isSelected}
                            onClick={() => handleBackgroundThemeSelect(theme.id)}
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
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '4px',
                                    background: theme.gradient || theme.color,
                                    border: `2px solid ${pianoTheme.colors.border}`,
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '.MuiListItemButton-root:hover &': {
                                      transform: 'scale(1.4) rotate(5deg)',
                                      borderRadius: '8px',
                                      boxShadow: `
                                        0 0 16px ${theme.color}88,
                                        0 4px 12px rgba(0, 0, 0, 0.4)
                                      `,
                                    },
                                  }}
                                />
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
                    })}
                  </List>
                </Box>
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
